const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
const token = process.env.SHOPIFY_STOREFRONT_TOKEN?.trim();
const apiVersion = "2024-10";

export type ShopifyImage = {
  url: string;
  alt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  images: ShopifyImage[];
  price: number;
  compareAtPrice: number | null;
  currencyCode: string;
  variantId: string;
  availableForSale: boolean;
};

type ProductsQueryResponse = {
  products: {
    edges: {
      node: {
        id: string;
        handle: string;
        title: string;
        description: string;
        featuredImage: { url: string; altText: string | null } | null;
        images: {
          edges: { node: { url: string; altText: string | null } }[];
        };
        priceRange: {
          minVariantPrice: { amount: string; currencyCode: string };
        };
        compareAtPriceRange: {
          minVariantPrice: { amount: string; currencyCode: string };
        };
        variants: {
          edges: { node: { id: string; availableForSale: boolean } }[];
        };
      };
    }[];
  };
};

async function shopifyFetch<T>(
  query: string,
  options: { cache?: boolean } = { cache: true }
): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_TOKEN environment variables."
    );
  }

  const res = await fetch(
    `https://${domain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query }),
      ...(options.cache
        ? { next: { revalidate: 300 } }
        : { cache: "no-store" as const }),
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(
      `Shopify Storefront API error: ${JSON.stringify(json.errors)}`
    );
  }

  return json.data as T;
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsQueryResponse>(`{
    products(first: 50) {
      edges {
        node {
          id
          handle
          title
          description
          featuredImage {
            url
            altText
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
              }
            }
          }
        }
      }
    }
  }`);

  return data.products.edges.map(({ node }) => {
    const images = node.images.edges.map(({ node: img }) => ({
      url: img.url,
      alt: img.altText ?? node.title,
    }));
    const variant = node.variants.edges[0]?.node;
    const price = Number(node.priceRange.minVariantPrice.amount);
    const compareAtPrice = Number(
      node.compareAtPriceRange.minVariantPrice.amount
    );

    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description.replace(/\*\*/g, "").trim(),
      image: node.featuredImage?.url ?? images[0]?.url ?? "",
      imageAlt: node.featuredImage?.altText ?? node.title,
      images: images.length > 0 ? images : [],
      price,
      compareAtPrice: compareAtPrice > price ? compareAtPrice : null,
      currencyCode: node.priceRange.minVariantPrice.currencyCode,
      variantId: variant?.id ?? "",
      availableForSale: variant?.availableForSale ?? false,
    };
  });
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const products = await getAllProducts();
  return products.find((product) => product.handle === handle) ?? null;
}

type CartCreateResponse = {
  cartCreate: {
    cart: { checkoutUrl: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
};

export async function createCheckoutUrl(
  variantId: string,
  quantity: number = 1
): Promise<string> {
  const data = await shopifyFetch<CartCreateResponse>(
    `
    mutation {
      cartCreate(input: {
        lines: [{ merchandiseId: "${variantId}", quantity: ${quantity} }]
      }) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
    { cache: false }
  );

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  if (!data.cartCreate.cart) {
    throw new Error("Failed to create checkout.");
  }

  return data.cartCreate.cart.checkoutUrl;
}
