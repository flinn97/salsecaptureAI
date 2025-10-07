export async function postJSON(path, body) {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
  
  // Point to your deployed function URL, e.g., https://<region>-<proj>.cloudfunctions.net/api
//   export const API_BASE = "https://us-central1-viridian-3afda.cloudfunctions.net/"; //import.meta.env.VITE_FUNCTIONS_URL || "/api"; // proxy in dev
  export const API_BASE = "https://us-central1-viridian-3afda.cloudfunctions.net/api"; 
