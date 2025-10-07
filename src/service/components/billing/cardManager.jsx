// src/components/billing/CardManager.jsx
import { useEffect, useState } from "react";
import { apiFetch } from "../../api";

export function CardManager({ therapistId, clientId, customerId }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(null);

  async function refresh() {
    try {
      setLoading(true);
      setErr(null);
      const resp = await apiFetch("stripeListCards", {
        method: "GET",
        query: { customerId }
      });
      setList(resp.paymentMethods || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, [customerId]);

  async function setDefault(paymentMethodId) {
    try {
      setBusy(paymentMethodId);
      await apiFetch("stripeSetDefaultPaymentMethod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ therapistId, clientId, customerId, paymentMethodId })
      });
      await refresh();
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy(null);
    }
  }

  async function detach(paymentMethodId) {
    if (!confirm("Remove this card?")) return;
    try {
      setBusy(paymentMethodId);
      await apiFetch("stripeDetachPaymentMethod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId })
      });
      await refresh();
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy(null);
    }
  }

  if (loading) return <div>Loading cards…</div>;
  if (err) return <div style={{ color: "red" }}>Error: {err}</div>;
  if (!list.length) return <div>No saved cards yet.</div>;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {list.map((pm) => (
        <div key={pm.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ minWidth: 200 }}>
            {(pm.card?.brand || "").toUpperCase()} •••• {pm.card?.last4}{" "}
            (exp {pm.card?.exp_month}/{pm.card?.exp_year})
          </div>
          <button disabled={busy === pm.id} onClick={() => setDefault(pm.id)}>
            {busy === pm.id ? "Setting…" : "Set default"}
          </button>
          <button disabled={busy === pm.id} onClick={() => detach(pm.id)}>
            {busy === pm.id ? "Removing…" : "Remove"}
          </button>
        </div>
      ))}
    </div>
  );
}
