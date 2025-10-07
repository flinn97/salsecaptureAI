import { useState, useEffect } from "react";
import { API_BASE } from "../stripe/api";

export default function TaxStatus({ coachUid }) {
  const [ytd, setYtd] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE}/coach/tax/ytd?coachUid=${encodeURIComponent(coachUid)}`);
      setYtd(await res.json());
    })();
  }, [coachUid]);

  if (!ytd || ytd.error) return null;
  const dollars = (ytd.total_cents / 100).toFixed(2);
  const nearing = ytd.total_cents >= 50000 && ytd.total_cents < 60000;
  const met = ytd.total_cents >= 60000;

  return (
    <div style={{ fontSize: 12, marginTop: 8 }}>
      YTD: ${dollars}{" "}
      {nearing && "(nearing 1099)"} {met && "(≥ $600 — tax forms required)"}
    </div>
  );
}
