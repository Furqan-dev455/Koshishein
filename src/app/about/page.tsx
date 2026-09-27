import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      {/* Page Banner */}
      <section className="about-page-banner">
        <div className="container">
          <p className="section-eyebrow">KOSHISHEIN</p>

          <h1>Made with care.</h1>

          <p>
            A watch brand built around thoughtful craftsmanship, timeless
            design, and everyday style.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story">
            <div className="about-story-image">
              <Image
                src="/images/story-timeless.jpg"
                alt="Koshishein timeless watch"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>

            <div className="about-story-content">
              <p className="section-eyebrow">OUR STORY</p>

              <h2>
                Watches made
                <span>with intention.</span>
              </h2>

              <p>
                Koshishein is built around a simple idea: a good watch should
                feel personal. From the case to the strap, every detail
                deserves attention.
              </p>

              <p>
                We offer carefully selected signature and everyday designs,
                giving our customers the freedom to choose what suits their
                style and everyday needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="about-services-section">
        <div className="container">
          <div className="about-section-heading">
            <div>
              <p className="section-eyebrow">WHAT WE DO</p>

              <h2>
                Watches chosen
                <span>for every wrist.</span>
              </h2>
            </div>

            <p>
              From signature pieces to everyday classics, we focus on watches
              with a clean finish and timeless appeal.
            </p>
          </div>

          <div className="about-services-grid">
            <article className="about-service-card">
              <span className="about-service-number">01</span>

              <div>
                <h3>Signature Collection</h3>

                <p>
                  Premium designs created with attention to detail for
                  customers who appreciate distinctive and elegant watches.
                </p>

                <Link href="/collection" className="service-link">
                  Explore Designs
                  <span>→</span>
                </Link>
              </div>
            </article>

            <article className="about-service-card">
              <span className="about-service-number">02</span>

              <div>
                <h3>Everyday Classics</h3>

                <p>
                  Simple, comfortable watches designed for everyday wear
                  without compromising on neat finishing.
                </p>

                <Link href="/collection" className="service-link">
                  View Collection
                  <span>→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="about-values-section">
        <div className="container">
          <div className="about-values-heading">
            <p className="section-eyebrow">OUR APPROACH</p>

            <h2>
              Simple principles.
              <span>Beautiful results.</span>
            </h2>
          </div>

          <div className="about-values-grid">
            <article className="about-value">
              <span>01</span>

              <h3>Quality</h3>

              <p>
                We believe quality starts with careful work and continues
                through every detail of the finished watch.
              </p>
            </article>

            <article className="about-value">
              <span>02</span>

              <h3>Craftsmanship</h3>

              <p>
                A great watch is more than telling time. It is about
                precision, finishing, and attention to detail.
              </p>
            </article>

            <article className="about-value">
              <span>03</span>

              <h3>Timeless Style</h3>

              <p>
                Our designs are created to remain elegant beyond changing
                trends and work naturally on any wrist.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="about-craft-section">
        <div className="container">
          <div className="about-craft">
            <div className="about-craft-content">
              <p className="section-eyebrow">THE KOSHISHEIN APPROACH</p>

              <h2>
                The details
                <span>matter.</span>
              </h2>

              <p>
                Every watch is an opportunity to get the small things right.
                From the way a design comes together to the final finishing,
                our focus is on creating watches that look refined and feel
                comfortable to wear.
              </p>

              <p>
                That attention to detail is what connects our signature and
                everyday collections.
              </p>
            </div>

            <div className="about-craft-image">
              <Image
                src="/images/craft-detail.jpg"
                alt="Koshishein craftsmanship detail"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container">
          <p className="section-eyebrow">DISCOVER KOSHISHEIN</p>

          <h2>
            Find something
            <span>made for you.</span>
          </h2>

          <p>
            Explore our signature designs and everyday classics.
          </p>

          <Link href="/collection" className="primary-button">
            Explore Our Collections
          </Link>
        </div>
      </section>
    </main>
  );
}
