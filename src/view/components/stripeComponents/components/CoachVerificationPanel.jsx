import { useEffect, useState } from "react";
import { API_BASE } from "../stripe/api";

export default function CoachVerificationPanel({ coachUid }) {
  const [acc, setAcc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch(`${API_BASE}/coach/account?coachUid=${encodeURIComponent(coachUid)}`);
    const data = await res.json();
    setAcc(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, [coachUid]);

  async function saveProfile(fields) {
    setSaving(true);
    const res = await fetch(`${API_BASE}/coach/update-profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coachUid, ...fields }),
    });
    const data = await res.json();
    setSaving(false);
    setMsg(data.error ? `Error: ${data.error}` : "Saved.");
    load();
  }

  async function uploadId(side, file) {
    const base64 = await fileToBase64(file);
    const res = await fetch(`${API_BASE}/coach/upload-id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coachUid,
        side,
        filename: file.name,
        contentType: file.type,
        base64: base64.split(",")[1],
      }),
    });
    const data = await res.json();
    setMsg(data.error ? `Error: ${data.error}` : "ID uploaded.");
    load();
  }

  if (loading) return <div>Loading verification…</div>;
  if (!acc || acc.error) return <div>Error loading account.</div>;

  const due = acc.requirements?.currently_due || [];
  const errs = acc.requirements?.errors || [];

  return (
    <div style={{border:"1px solid #ddd", borderRadius:8, padding:16, maxWidth:720}}>
      <h3>Verification</h3>
      <div style={{display:"flex", gap:12, marginBottom:12}}>
        <Badge ok={acc.capabilities?.card_payments === "active"} label="Card payments" />
        <Badge ok={acc.capabilities?.transfers === "active"} label="Payouts (transfers)" />
        <Badge ok={!!acc.charges_enabled} label="Charges enabled" />
        <Badge ok={!!acc.payouts_enabled} label="Payouts enabled" />
      </div>

      {errs.length > 0 && (
        <div style={{background:"#fff5f5", border:"1px solid #f5c2c2", padding:8, borderRadius:6, marginBottom:8}}>
          <strong>Issues:</strong>
          <ul>{errs.map((e,i)=><li key={i}>{e.reason || e.code}</li>)}</ul>
        </div>
      )}

      <Section title="Business profile">
        <ProfileEditor
          initial={{
            url: acc.business_profile?.url || "",
            product_description: acc.business_profile?.product_description || "Coaching services",
            mcc: acc.business_profile?.mcc || "7299",
            support_email: acc.business_profile?.support_email || "",
            support_phone: acc.business_profile?.support_phone || "",
          }}
          onSave={(vals)=>saveProfile({ business_profile: vals })}
          saving={saving}
        />
      </Section>

      <Section title="Individual details">
        <IndividualEditor
          initial={{
            first_name: acc.individual?.first_name || "",
            last_name: acc.individual?.last_name || "",
            email: acc.individual?.email || "",
            phone: acc.individual?.phone || "",
            address: acc.individual?.address || { line1:"", line2:"", city:"", state:"", postal_code:"" },
            dob: acc.individual?.dob || { day:"", month:"", year:"" },
          }}
          onSave={(vals)=>saveProfile({ individual: vals })}
          saving={saving}
        />
      </Section>

      {due.includes("individual.verification.document") && (
        <Section title="Government ID">
          <IdUpload onUploadFront={(f)=>uploadId("front", f)} onUploadBack={(f)=>uploadId("back", f)} />
        </Section>
      )}

      {msg && <p style={{fontSize:12, color:"#444"}}>{msg}</p>}
      {due.length === 0 && <p>All set! No additional information required.</p>}
    </div>
  );
}

function Badge({ ok, label }) {
  return <span style={{
    padding:"4px 8px",
    borderRadius:999,
    fontSize:12,
    background: ok ? "#e6ffed" : "#fff4e5",
    border: `1px solid ${ok ? "#a6f3b4" : "#ffd79a"}`,
  }}>{label}: {ok ? "active" : "pending"}</span>;
}
function Section({ title, children }) {
  return <div style={{marginTop:12}}>
    <h4 style={{margin:"8px 0"}}>{title}</h4>
    {children}
  </div>;
}
function ProfileEditor({ initial, onSave, saving }) {
  const [v, setV] = useState(initial);
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
      <input placeholder="Public URL" value={v.url} onChange={e=>setV({...v,url:e.target.value})}/>
      <input placeholder="MCC (e.g., 7299)" value={v.mcc} onChange={e=>setV({...v,mcc:e.target.value})}/>
      <input placeholder="Support email" value={v.support_email} onChange={e=>setV({...v,support_email:e.target.value})}/>
      <input placeholder="Support phone" value={v.support_phone} onChange={e=>setV({...v,support_phone:e.target.value})}/>
      <input placeholder="Product description" value={v.product_description} onChange={e=>setV({...v,product_description:e.target.value})} style={{gridColumn:"1 / span 2"}}/>
      <button disabled={saving} onClick={()=>onSave(v)}>{saving ? "Saving…" : "Save profile"}</button>
    </div>
  );
}
function IndividualEditor({ initial, onSave, saving }) {
  const [v, setV] = useState(initial);
  const upd = (k,val)=>setV({...v,[k]:val});
  const upda = (k,val)=>setV({...v, address:{...v.address,[k]:val}});
  const updd = (k,val)=>setV({...v, dob:{...v.dob,[k]:val}});
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
      <input placeholder="First name" value={v.first_name} onChange={e=>upd("first_name",e.target.value)}/>
      <input placeholder="Last name" value={v.last_name} onChange={e=>upd("last_name",e.target.value)}/>
      <input placeholder="Email" value={v.email} onChange={e=>upd("email",e.target.value)}/>
      <input placeholder="Phone" value={v.phone} onChange={e=>upd("phone",e.target.value)}/>
      <input placeholder="Address line 1" value={v.address.line1||""} onChange={e=>upda("line1",e.target.value)} style={{gridColumn:"1 / span 2"}}/>
      <input placeholder="Line 2" value={v.address.line2||""} onChange={e=>upda("line2",e.target.value)} style={{gridColumn:"1 / span 2"}}/>
      <input placeholder="City" value={v.address.city||""} onChange={e=>upda("city",e.target.value)}/>
      <input placeholder="State" value={v.address.state||""} onChange={e=>upda("state",e.target.value)}/>
      <input placeholder="Postal code" value={v.address.postal_code||""} onChange={e=>upda("postal_code",e.target.value)}/>
      <input placeholder="DOB day" value={v.dob.day||""} onChange={e=>updd("day",e.target.value)}/>
      <input placeholder="DOB month" value={v.dob.month||""} onChange={e=>updd("month",e.target.value)}/>
      <input placeholder="DOB year" value={v.dob.year||""} onChange={e=>updd("year",e.target.value)}/>
      <button disabled={saving} onClick={()=>onSave(v)} style={{gridColumn:"1 / span 2"}}>{saving ? "Saving…" : "Save individual"}</button>
    </div>
  );
}
function IdUpload({ onUploadFront, onUploadBack }) {
  return (
    <div style={{display:"flex", gap:12}}>
      <label>Front <input type="file" accept="image/*" onChange={e=>e.target.files[0] && onUploadFront(e.target.files[0])}/></label>
      <label>Back  <input type="file" accept="image/*" onChange={e=>e.target.files[0] && onUploadBack(e.target.files[0])}/></label>
    </div>
  );
}
function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}
