import Container from "@/components/landing/container";
import Hero from "@/components/landing/Hero";
import ProductGrid from "@/components/landing/ProductGrid";

const Home = () => {
  return (
  <div>
    <Container>
      <Hero/>
      <ProductGrid/>
    </Container>
  </div>
  );
};

export default Home;