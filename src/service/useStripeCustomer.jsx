// src/components/billing/useStripeCustomer.js
import { useEffect, useState } from "react";
import { apiFetch } from "./api";

export function useStripeCustomer({ therapistId, clientId, email, name, phone }) {
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const resp = await apiFetch("ensureStripeCustomer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ therapistId, clientId, email, name, phone })
        });
        if (mounted) setCustomerId(resp.customerId);
      } catch (e) {
        if (mounted) setErr(e.message || "Failed to ensure customer");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [therapistId, clientId, email, name, phone]);

  return { customerId, loading, error: err };
}