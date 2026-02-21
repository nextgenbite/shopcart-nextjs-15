import Container from "@/components/landing/Container";
import Hero from "@/components/landing/Hero";
import ProductGrid from "@/components/landing/ProductGrid";

const Home = async() => {

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