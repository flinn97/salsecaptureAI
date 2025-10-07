import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_live_51Mca07F4F22xjWRcc69NUAxKmFVroJFBHhZgJO1WHx4AreweNgwRmIH8NfIDBwMqRmGQq6PmyoZLzeCvOvJgzmQk00L7T98OwJ");

export default function StripeProvider({ children }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
