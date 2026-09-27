"use server";

import { createCheckoutUrl } from "@/lib/shopify";

export async function buyNow(
  variantId: string
): Promise<{ url?: string; error?: string }> {
  if (!variantId) {
    return { error: "This product is unavailable right now." };
  }

  try {
    const url = await createCheckoutUrl(variantId, 1);
    return { url };
  } catch {
    return { error: "Couldn't start checkout. Please try again." };
  }
}
