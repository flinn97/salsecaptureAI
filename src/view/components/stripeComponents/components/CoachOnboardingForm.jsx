import { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { API_BASE, postJSON } from "../stripe/api.js";
import { splitDob } from "../stripe/utils.js";

/**
 * Collects KYC + bank details fully in‑app (no Stripe-hosted pages).
 * IMPORTANT: Do not persist SSN/bank numbers; send to backend → Stripe, then discard.
 */
export default function CoachOnboardingForm({ coachUid }) {
    const stripe = useStripe();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const [form, setForm] = useState({
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        dobIso: "", // YYYY-MM-DD
        ssn_last_4: "",
        address: { line1: "", line2: "", city: "", state: "", postal_code: "" },
        bank: { account_holder_name: "", routing_number: "", account_number: "" }
    });

    const update = (path, value) => {
        setForm((f) => {
            const copy = { ...f };
            if (path.startsWith("address.")) {
                copy.address = { ...copy.address, [path.split(".")[1]]: value };
            } else if (path.startsWith("bank.")) {
                copy.bank = { ...copy.bank, [path.split(".")[1]]: value };
            } else {
                copy[path] = value;
            }
            return copy;
        });
    };

    async function submit(e) {
        e.preventDefault();
        setLoading(true);
        setStatus("Creating bank token…");
        try {
            if (!stripe) throw new Error("Stripe not ready");

            // Create bank token in the browser – avoids raw bank data touching your server
            const tokenRes = await stripe.createToken("bank_account", {
                country: "US",
                currency: "usd",
                account_holder_name: form.bank.account_holder_name,
                account_holder_type: "individual",
                routing_number: form.bank.routing_number,
                account_number: form.bank.account_number
            });
            update("bank.account_number", "");
            update("bank.routing_number", "");
            if (tokenRes.error) throw tokenRes.error;

            const dob = splitDob(form.dobIso);

            setStatus("Submitting to server…");
            debugger
            
            const { account } = await postJSON(`${API_BASE}/coach/create-or-update-account`, {
                coachUid,
                email: form.email,
                phone: form.phone,
                individual: {
                    first_name: form.first_name,
                    last_name: form.last_name,
                    dob,
                    ssn_last_4: form.ssn_last_4,
                    address: form.address
                },
                tos_acceptance: agree ? true : false,
                bankToken: tokenRes.token.id
            });

            setStatus(`Onboarding complete. Account: ${account.id}`);
        } catch (err) {
            console.error(err);
            setStatus(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    const inputStyle = { border: "1px solid #ccc", padding: 8, width: "100%", borderRadius: 4 };
    const labelStyle = { display: "block", fontSize: 13, marginBottom: 4 };
    const fieldsetStyle = { border: "1px solid #ddd", padding: 12, borderRadius: 6 };
    const grid2Style = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
    const formStyle = { maxWidth: 640, display: "flex", flexDirection: "column", gap: 16 };
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
    const [agree, setAgree] = useState(false);

    return (
        <form onSubmit={submit} style={formStyle}>
            <h2 style={headingStyle}>Coach Onboarding (US Individual)</h2>

            <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} required />
            </div>
            <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
            </div>
            <div style={grid2Style}>
                <div>
                    <label style={labelStyle}>First name</label>
                    <input style={inputStyle} value={form.first_name} onChange={(e) => update("first_name", e.target.value)} required />
                </div>
                <div>
                    <label style={labelStyle}>Last name</label>
                    <input style={inputStyle} value={form.last_name} onChange={(e) => update("last_name", e.target.value)} required />
                </div>
            </div>
            <div>
                <label style={labelStyle}>DOB (YYYY-MM-DD)</label>
                <input style={inputStyle} value={form.dobIso} onChange={(e) => update("dobIso", e.target.value)} placeholder="1990-01-31" required />
            </div>
            <div>
                <label style={labelStyle}>SSN last 4</label>
                <input style={inputStyle} value={form.ssn_last_4} onChange={(e) => update("ssn_last_4", e.target.value)} required />
            </div>

            <fieldset style={fieldsetStyle}>
                <legend style={{ fontSize: 14, fontWeight: 500 }}>Address</legend>
                <div style={grid2Style}>
                    <input style={inputStyle} placeholder="Line 1" value={form.address.line1} onChange={(e) => update("address.line1", e.target.value)} required />
                    <input style={inputStyle} placeholder="Line 2" value={form.address.line2} onChange={(e) => update("address.line2", e.target.value)} />
                    <input style={inputStyle} placeholder="City" value={form.address.city} onChange={(e) => update("address.city", e.target.value)} required />
                    <input style={inputStyle} placeholder="State" value={form.address.state} onChange={(e) => update("address.state", e.target.value)} required />
                    <input style={inputStyle} placeholder="Postal Code" value={form.address.postal_code} onChange={(e) => update("address.postal_code", e.target.value)} required />
                </div>
            </fieldset>

            <fieldset style={fieldsetStyle}>
                <legend style={{ fontSize: 14, fontWeight: 500 }}>Payout Bank Account</legend>
                <div style={grid2Style}>
                    <input style={inputStyle} placeholder="Account holder name" value={form.bank.account_holder_name} onChange={(e) => update("bank.account_holder_name", e.target.value)} required />
                    <input style={inputStyle} placeholder="Routing number" value={form.bank.routing_number} onChange={(e) => update("bank.routing_number", e.target.value)} required />
                    <input style={inputStyle} placeholder="Account number" value={form.bank.account_number} onChange={(e) => update("bank.account_number", e.target.value)} required />
                </div>
            </fieldset>

            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span>I accept the Stripe Connected Account Agreement.</span>
            </label>
/* disable submit unless checked */
            <button disabled={loading || !stripe || !agree} style={buttonStyle}>
                {loading ? "Submitting…" : "Submit"}
            </button>
            {status && <p style={statusStyle}>{status}</p>}
        </form>
    );
}
