"use client";

import Button from "@mui/material/Button";
import checkout from "@/app/checkout/actions/checkout";
import getStripe from "@/app/checkout/stripe";

interface CheckoutProps {
  productId: number;
}

export default function Checkout({ productId }: CheckoutProps) {
  const handleCheckout = async () => {
    const session = await checkout(productId);
    console.log("session", session);
    // const stripe = await getStripe();
    // console.log("session", session.data);
    // await stripe?.redirectToCheckout({ sessionId: session.data.id });
  };

  return (
    <Button
      variant="contained"
      className="max-w-[25%]"
      onClick={() => handleCheckout()}
    >
      Buy Now
    </Button>
  );
}
