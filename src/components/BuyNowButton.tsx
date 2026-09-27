"use client";

import { useState } from "react";
import { buyNow } from "@/app/actions";

type BuyNowButtonProps = {
  variantId: string;
  availableForSale: boolean;
};

export default function BuyNowButton({
  variantId,
  availableForSale,
}: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!availableForSale) {
    return (
      <button type="button" className="primary-button buy-now-button" disabled>
        Sold Out
      </button>
    );
  }

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    const result = await buyNow(variantId);

    if (result.url) {
      window.location.href = result.url;
      return;
    }

    setError(result.error ?? "Something went wrong.");
    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        className="primary-button buy-now-button"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Starting Checkout…" : "Buy Now"}
      </button>

      {error && <p className="buy-now-error">{error}</p>}
    </>
  );
}
