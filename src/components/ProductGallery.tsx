"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ShopifyImage } from "@/lib/shopify";

type ProductGalleryProps = {
  images: ShopifyImage[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);

  const count = images.length;

  useEffect(() => {
    if (count <= 1) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % count);
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current - 1 + count) % count);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count]);

  if (count === 0) {
    return null;
  }

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <Image
          src={images[index].url}
          alt={images[index].alt}
          fill
          priority
          sizes="(max-width: 600px) 340px, (max-width: 900px) 420px, 480px"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              className="product-gallery-arrow product-gallery-arrow-prev"
              onClick={() =>
                setIndex((current) => (current - 1 + count) % count)
              }
              aria-label="Previous photo"
            >
              ←
            </button>

            <button
              type="button"
              className="product-gallery-arrow product-gallery-arrow-next"
              onClick={() => setIndex((current) => (current + 1) % count)}
              aria-label="Next photo"
            >
              →
            </button>

            <span className="product-gallery-counter">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="product-gallery-thumbs">
          {images.map((image, position) => (
            <button
              type="button"
              key={image.url}
              className={
                position === index
                  ? "product-gallery-thumb product-gallery-thumb-active"
                  : "product-gallery-thumb"
              }
              onClick={() => setIndex(position)}
              aria-label={`Show photo ${position + 1} of ${title}`}
              aria-current={position === index}
            >
              <Image src={image.url} alt="" fill sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
