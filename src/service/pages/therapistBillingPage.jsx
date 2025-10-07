// src/pages/TherapistBillingPage.jsx
import {SaveCard} from "../components/billing/SaveCard";
import {CardManager} from "../components/billing/CardManager";
import { useStripeCustomer } from "../useStripeCustomer";
import {ChargeButtons} from "../components/billing/ChargeButtons";

export function TherapistBillingPage({ therapistId, clientId, sessionId, email, name, phone }) {
  const { customerId, loading, error } = useStripeCustomer({ therapistId, clientId, email, name, phone });

  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 900, margin: "24px auto" }}>
      <h1>Client Billing</h1>

      {loading && <div>Preparing billing…</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {customerId && (
        <>
          <section style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Save a Card</h2>
            <p>Store a card on file for future, one-click charges.</p>
            <SaveCard customerId={customerId} />
          </section>

          <section style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Saved Cards</h2>
            <CardManager therapistId={therapistId} clientId={clientId} customerId={customerId} />
          </section>

          <section style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Charge for Session</h2>
            <p>Choose the outcome and charge the configured fee.</p>
            <ChargeButtons
              therapistId={therapistId}
              clientId={clientId}
              sessionId={sessionId}
              customerId={customerId}
            />
          </section>
        </>
      )}
    </div>
  );
}
