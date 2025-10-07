// src/components/billing/ChargeButtons.jsx
import { useEffect, useMemo, useState } from "react";
import { apiFetch, apiRequest } from "../../api";
import getStripe from "../../stripe.js";     // <-- default import, path matches file

export function ChargeButtons({ therapistId, clientId, sessionId, customerId }) {
  const [fees, setFees] = useState(null);
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await apiFetch("getClientFees", {
          method: "GET",
          query: { therapistId, clientId }
        });
        setFees(r);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [therapistId, clientId]);

  const fmt = (cents) => (typeof cents === "number" ? (cents / 100).toFixed(2) : "--");

  const labels = useMemo(() => {
    if (!fees) return { std: "Charge (attended)", ns: "Charge (no-show)" };
    const cur = (fees.currency || "usd").toUpperCase();
    return {
      std: `Mark attended & charge ${fmt(fees.standardCents)} ${cur}`,
      ns: `Mark no-show & charge ${fmt(fees.noShowCents)} ${cur}`
    };
  }, [fees]);

  async function charge(kind) {
    try {
      setBusy(kind);
      setErr(null);

      // Use raw request so we can catch 409 for SCA
      const { ok, status, json } = await apiRequest("chargeForSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          therapistId,
          clientId,
          sessionId,
          customerId,
          chargeType: kind
          // paymentMethodId: "pm_..." // optional
        })
      });

      if (ok) {
        alert(`Payment ${json.status} (PI: ${json.paymentIntentId})`);
        return;
      }

      if (status === 409 && json?.requiresAction && json?.clientSecret) {
        const stripe = await getStripe();
        const res = await stripe.confirmCardPayment(json.clientSecret);
        if (res.error) {
          alert(res.error.message || "Authentication failed");
        } else {
          alert("Payment completed after authentication.");
        }
      } else {
        throw new Error(json?.error || `Charge failed (status ${status})`);
      }
    } catch (e) {
      setErr(e.message || "Charge failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <button disabled={!fees || busy === "standard"} onClick={() => charge("standard")}>
        {busy === "standard" ? "Charging…" : labels.std}
      </button>
      <button disabled={!fees || busy === "no_show"} onClick={() => charge("no_show")}>
        {busy === "no_show" ? "Charging…" : labels.ns}
      </button>
      {err && <span style={{ color: "red" }}>Error: {err}</span>}
    </div>
  );
}
