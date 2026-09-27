import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/shopify";
import siteConfig from "@/data/siteConfig";

export default async function CollectionPage() {
  const products = await getAllProducts();

  return (
    <main>
      {/* Page Banner */}
      <section className="collection-page-banner">
        <div className="container">
          <p className="section-eyebrow">KOSHISHEIN</p>
          <h1>Our Collections</h1>
          <p>
            Discover our signature designs and everyday classic watches.
          </p>
        </div>
      </section>

      {/* Custom Engraving */}
      {/* <section className="collection-section custom-stitching-section">
        <div className="container">
          <div className="collection-intro">
            <div>
              <p className="section-eyebrow">CUSTOM ENGRAVING</p>

              <h2>
                Your watch.
                <span>Our perfect engraving.</span>
              </h2>
            </div>

            <div>
              <p>
                Bring your own watch and chosen design. Our experienced team
                will turn it into a beautifully personalized keepsake.
              </p>

              <p className="collection-note">
                Delivery charges are separate.
              </p>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Assalamualaikum, I want to book custom engraving."
                )}`}
                className="primary-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Your Engraving
              </a>
            </div>
          </div>
          
          <div className="stitching-gallery">
            <div className="stitching-gallery-main">
              <Image
                src="/images/engraving/engraving-sample-cartier.jpg"
                alt="Koshishein watch with engraving-ready packaging"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="stitching-gallery-medium">
              <Image
                src="/images/engraving/engraving-sample-skmei.jpg"
                alt="Koshishein watch in gift box"
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
              />
            </div>

            <div className="stitching-gallery-small">
              <Image
                src="/images/engraving/engraving-sample-aura.jpg"
                alt="Koshishein watch in gift box"
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
            
          </div>
        </div>
      </section> */}

      {/* Watches */}
      <section className="collection-section handmade-section">
        <div className="container">
          <div className="collection-heading">
            <div>
              {/* <p className="section-eyebrow">KOSHISHEIN WATCHES</p> */}

              {/* <h2>
                Designs
                <span>built for distinction.</span>
              </h2> */}
            </div>

            {/* <p>
              Explore our current watches, created for customers who
              appreciate elegant details and timeless style.
            </p> */}
          </div>

          <div className="collection-product-grid">
            {products.map((product) => (
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

                  <strong>PKR {product.price.toLocaleString()}</strong>
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
        </div>
      </section>
    </main>
  );
}
