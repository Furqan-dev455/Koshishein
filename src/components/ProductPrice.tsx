type ProductPriceProps = {
  price: number;
  compareAtPrice: number | null;
  className?: string;
};

export default function ProductPrice({
  price,
  compareAtPrice,
  className,
}: ProductPriceProps) {
  return (
    <strong className={`product-price ${className ?? ""}`.trim()}>
      {compareAtPrice && (
        <s className="product-price-original">
          PKR {compareAtPrice.toLocaleString()}
        </s>
      )}
      <span className="product-price-current">
        PKR {price.toLocaleString()}
      </span>
    </strong>
  );
}
