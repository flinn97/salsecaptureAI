import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { API_BASE, postJSON } from "../stripe/api.js";

export default function ClientCheckout({ coachUid, customerId }) {
    const stripe = useStripe();
    const elements = useElements();

    const [amount, setAmount] = useState(10000); // cents
    const [fee, setFee] = useState(2000); // platform fee in cents
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    async function pay(e) {
        e.preventDefault();
        setLoading(true);
        setStatus("Creating PaymentIntent…");
        try {
            const amt = Number(amount) | 0;
            const feeAmt = Number(fee) | 0;

            if (!Number.isFinite(amt) || amt < 50) {
                setStatus("Amount must be at least 50 cents."); setLoading(false); return;
            }
            if (!Number.isFinite(feeAmt) || feeAmt < 0) {
                setStatus("Platform fee must be zero or positive."); setLoading(false); return;
            }
            if (feeAmt >= amt) {
                setStatus("Platform fee must be less than the amount."); setLoading(false); return;
            }
            const { clientSecret } = await postJSON(`${API_BASE}/payments/create-intent`, {
                coachUid,
                amount: Number(amount),
                currency: "usd",
                customerId: customerId || null,
                application_fee_amount: Number(fee)
            });

            setStatus("Confirming card…");
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) }
            });

            if (result.error) throw result.error;
            if (result.paymentIntent?.status === "succeeded") {
                setStatus("Payment succeeded!");
            } else {
                setStatus(`Status: ${result.paymentIntent?.status}`);
            }
        } catch (err) {
            console.error(err);
            setStatus(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    const formStyle = { maxWidth: 520, display: "flex", flexDirection: "column", gap: 16 };
    const labelStyle = { display: "block", fontSize: 13, marginBottom: 4 };
    const inputStyle = { border: "1px solid #ccc", padding: 8, width: "100%", borderRadius: 4 };
    const headingStyle = { fontSize: 20, fontWeight: 600, margin: 0 };
    const statusStyle = { fontSize: 13, color: "#444" };
    const buttonStyle = {
        backgroundColor: "#000",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: 6,
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1
    };

    return (
        <form onSubmit={pay} style={formStyle}>
            <h2 style={headingStyle}>Pay Your Coach</h2>
            <label style={labelStyle}>Amount (cents)</label>
            <input style={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label style={labelStyle}>Platform Fee (cents)</label>
            <input style={inputStyle} value={fee} onChange={(e) => setFee(e.target.value)} />

            <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 4 }}>
                <CardElement options={{ hidePostalCode: true }} />
            </div>

            <button disabled={!stripe || loading} style={buttonStyle}>
                {loading ? "Processing…" : "Pay"}
            </button>

            {status && <p style={statusStyle}>{status}</p>}
        </form>
    );
}
