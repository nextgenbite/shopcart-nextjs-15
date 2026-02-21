import Stripe from "stripe";

if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, {
  apiVersion: "2025-03-31.basil",
});

export default stripe;
