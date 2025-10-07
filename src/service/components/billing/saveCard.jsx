import { useEffect, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import getStripe from "../../stripe.js";     // <-- default import, path matches file
import { apiFetch } from "../../api.js";             // <-- include .js if your project needs it

function SaveCardInner({ customerId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await apiFetch("stripeCreateSetupIntent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId })
        });
        setClientSecret(r.clientSecret);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [customerId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setSaving(true);
    setError(null);

    const { setupIntent, error } = await stripe.confirmSetup({
      elements,
      clientSecret
      // confirmParams: { return_url: window.location.origin + "/billing/saved" }
    });

    setSaving(false);
    if (error) setError(error.message || "Failed to save card");
    else if (setupIntent?.status === "succeeded") setDone(true);
  };

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!clientSecret) return <div>Loading payment form…</div>;
  if (done) return <div style={{ color: "green" }}>Card saved ✔︎</div>;

return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420, display: "grid", gap: 12 }}>
      <PaymentElement />
      <button disabled={!stripe || saving} type="submit">
        {saving ? "Saving…" : "Save card for future charges"}
      </button>
    </form>
  );
}

export function SaveCard({ customerId }) {   // <-- default export
  const [stripe, setStripe] = useState(null);
  useEffect(() => { getStripe().then(setStripe); }, []);
  if (!stripe) return null;

  return (
    <Elements stripe={stripe}>
      <SaveCardInner customerId={customerId} />
    </Elements>
  );
}