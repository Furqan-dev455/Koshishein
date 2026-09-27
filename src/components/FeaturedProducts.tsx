import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/shopify";
import ProductPrice from "@/components/ProductPrice";

export default async function FeaturedProducts() {
  const products = await getAllProducts();
  const featured = products.slice(0, 3);

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="featured-products-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">FEATURED WATCHES</p>

            <h2>
              Straight from
              <span>the collection.</span>
            </h2>
          </div>

          <p>
            A look at a few of our current pieces. Browse the full catalog
            for everything in stock.
          </p>
        </div>

        <div className="collection-product-grid">
          {featured.map((product) => (
            <article className="collection-product-card" key={product.id}>
              <Link
                href={`/catalog?product=${product.handle}`}
                className="collection-product-image"
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </Link>

              <div className="collection-product-info">
                <div>
                  <h3>{product.title}</h3>
                  <p>
                    {product.description.slice(0, 140)}
                    {product.description.length > 140 ? "…" : ""}
                  </p>
                </div>

                <ProductPrice
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                />
              </div>

              <Link
                href={`/catalog?product=${product.handle}`}
                className="product-order-link"
              >
                View & Order
                <span>→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="featured-products-cta">
          <Link href="/catalog" className="primary-button">
            View Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
