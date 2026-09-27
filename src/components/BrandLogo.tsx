import Image from "next/image";

type BrandLogoProps = {
  variant?: "light" | "dark";
};

export default function BrandLogo({ variant = "dark" }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo--${variant}`}>
      <Image
        className="brand-logo-image"
        src="/images/koshishein-wordmark-transparent.png"
        alt="Koshishein"
        width={320}
        height={25}
      />
    </span>
  );
}
