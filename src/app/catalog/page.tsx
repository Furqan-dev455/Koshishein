import Image from "next/image";
import Link from "next/link";

import { getAllProducts } from "@/lib/shopify";
import ProductGallery from "@/components/ProductGallery";
import ProductPrice from "@/components/ProductPrice";
import siteConfig from "@/data/siteConfig";

type CatalogPageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

export default async function CatalogPage({
  searchParams,
}: CatalogPageProps) {
  const params = await searchParams;
  const selectedProductId = params.product;

  const products = await getAllProducts();

  const selectedProduct = selectedProductId
    ? products.find((product) => product.handle === selectedProductId)
    : null;

  return (
    <main>
      {/* Page Banner */}
      <section className="catalog-page-banner">
        <div className="container">
          <p className="section-eyebrow">KOSHISHEIN</p>

          <h1>Our Catalog</h1>

          <p>
            Explore our signature designs and everyday classics. Choose a
            watch and contact us directly to place your order.
          </p>
        </div>
      </section>

      {/* Selected Product */}
      {selectedProduct ? (
        <section className="catalog-product-section">
          <div className="container">
            <Link href="/catalog" className="catalog-back-link">
              <span>←</span>
              Back to Catalog
            </Link>

            <div className="catalog-product-detail">
              <ProductGallery
                images={
                  selectedProduct.images.length > 0
                    ? selectedProduct.images
                    : [{ url: selectedProduct.image, alt: selectedProduct.imageAlt }]
                }
                title={selectedProduct.title}
              />

              <div className="catalog-product-content">
                <p className="section-eyebrow">KOSHISHEIN</p>

                <h2>{selectedProduct.title}</h2>

                <ProductPrice
                  className="catalog-product-price"
                  price={selectedProduct.price}
                  compareAtPrice={selectedProduct.compareAtPrice}
                />

                <p className="catalog-product-description">
                  {selectedProduct.description}
                </p>

                <div className="catalog-product-actions">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      `Assalamualaikum, I would like to order ${selectedProduct.title}.`
                    )}`}
                    className="primary-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Order on WhatsApp
                  </a>
                </div>

                <div className="catalog-product-note">
                  <strong>Ordering Information</strong>

                  <p>
                    Tap &ldquo;Order on WhatsApp&rdquo; to place your order. For
                    sizing or delivery questions, message us on WhatsApp anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* All Products */
        <section className="catalog-section">
          <div className="container">
            <div className="catalog-heading">
              <div>
                <p className="section-eyebrow">ALL WATCHES</p>

                <h2>
                  Find your
                  <span>next favorite.</span>
                </h2>
              </div>

              <p>
                Browse our current watches and select any piece to view its
                details and place an order.
              </p>
            </div>

            <div className="catalog-product-grid">
              {products.map((product) => (
                <article className="catalog-card" key={product.id}>
                  <Link
                    href={`/catalog?product=${product.handle}`}
                    className="catalog-card-image"
                  >
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  </Link>

                  <div className="catalog-card-info">
                    <div>
                      <h3>{product.title}</h3>

                      <p>{product.description.slice(0, 140)}{product.description.length > 140 ? "…" : ""}</p>
                    </div>

                    <ProductPrice
                      price={product.price}
                      compareAtPrice={product.compareAtPrice}
                    />
                  </div>

                  <Link
                    href={`/catalog?product=${product.handle}`}
                    className="catalog-card-link"
                  >
                    View Details
                    <span>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Engraving CTA */}
      {/* <section className="catalog-stitching-cta">
        <div className="container">
          <p className="section-eyebrow">CUSTOM ENGRAVING</p>

          <h2>
            Have your own
            <span>watch?</span>
          </h2>

          <p>
            Bring your own watch and chosen design. Our team can engrave a
            beautifully finished keepsake.
          </p>

          <Link href="/collection" className="primary-button">
            Explore Custom Engraving
          </Link>
        </div>
      </section> */}
    </main>
  );
}
