/**
 * stripe/utils.js
 * Shared utility functions for Stripe onboarding & payouts.
 */

// --- Split a YYYY-MM-DD string into { day, month, year } for Stripe
export function splitDob(dobIso) {
    if (!dobIso || typeof dobIso !== "string") {
      throw new Error("DOB missing or invalid");
    }
    const [year, month, day] = dobIso.split("-").map((x) => parseInt(x, 10));
    if (!year || !month || !day) {
      throw new Error("Invalid DOB format; expected YYYY-MM-DD");
    }
    return { day, month, year };
  }
  
  // --- Convert between cents and dollars
  export function formatAmount(value, to = "cents") {
    if (value == null || isNaN(value)) return 0;
    return to === "cents" ? Math.round(parseFloat(value) * 100) : (value / 100).toFixed(2);
  }
  

  export function maskBankAccount(accountNumber) {
    if (!accountNumber) return "";
    const str = String(accountNumber);
    return str.length > 4 ? `•••• ${str.slice(-4)}` : str;
  }
  
  
  // --- Graceful Stripe error handling
  export function handleStripeError(err) {
    const msg =
      err?.message ||
      err?.error?.message ||
      "Unexpected Stripe error — please try again.";
    console.error("Stripe Error:", err);
    return msg;
  }