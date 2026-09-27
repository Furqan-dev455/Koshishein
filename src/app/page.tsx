import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSnippet from "@/components/AboutSnippet";
import Services from "@/components/Services";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <AboutSnippet />
      <Services />
    </main>
  );
}
