import { useState, useEffect } from "react";
import { API_BASE } from "../stripe/api";
import TaxStatus from "./TaxStatus.jsx"; // create this tiny file

export default function CoachBusinessProfileCard({ coachUid }) {
  const [v, setV] = useState({ url:"", product_description:"Coaching services", mcc:"7299", support_email:"", support_phone:"" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(`${API_BASE}/coach/account?coachUid=${encodeURIComponent(coachUid)}`);
      const data = await res.json();
      if (mounted && data?.business_profile) {
        setV({
          url: data.business_profile.url || "",
          product_description: data.business_profile.product_description || "Coaching services",
          mcc: data.business_profile.mcc || "7299",
          support_email: data.business_profile.support_email || "",
          support_phone: data.business_profile.support_phone || "",
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [coachUid]);

  async function save() {
    setSaving(true);
    const res = await fetch(`${API_BASE}/coach/update-profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coachUid, business_profile: v })
    });
    const data = await res.json();
    setSaving(false);
    setMsg(data.error ? `Error: ${data.error}` : "Business profile saved.");
  }

  if (loading) return <div>Loading business profile…</div>;
  const input = { border: "1px solid #ccc", padding: 8, borderRadius: 6, width: "100%" };
  const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };

  return (
    <div style={{ border:"1px solid #ddd", borderRadius:10, padding:16 }}>
      <h3 style={{marginTop:0}}>Business Profile</h3>
      <div style={grid}>
        <input placeholder="Public URL" value={v.url} onChange={e=>setV({...v, url:e.target.value})} style={{...input, gridColumn:"1 / span 2"}} />
        <input placeholder="Product description" value={v.product_description} onChange={e=>setV({...v, product_description:e.target.value})} style={{...input, gridColumn:"1 / span 2"}} />
        <input placeholder="Support email" value={v.support_email} onChange={e=>setV({...v, support_email:e.target.value})} style={input} />
        <input placeholder="Support phone" value={v.support_phone} onChange={e=>setV({...v, support_phone:e.target.value})} style={input} />
        <input placeholder="MCC (e.g., 7299)" value={v.mcc} onChange={e=>setV({...v, mcc:e.target.value})} style={input} />
      </div>
      <div style={{ marginTop:12, display:"flex", gap:8 }}>
        <button onClick={save} disabled={saving} style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #000", background:"#000", color:"#fff" }}>
          {saving ? "Saving…" : "Save"}
        </button>
        {msg && <span style={{ fontSize:12 }}>{msg}</span>}
      </div>
      <TaxStatus coachUid={coachUid} />

    </div>
  );
}
