import { Header } from "../components/Layout/Header";
import { Hero } from "../components/Route/Hero/Hero";
import { Categories } from "../components/Route/Categories/Categories.jsx";
import { BestDeals } from "../components/Route/BestDeals/BestDeals";
import { FeatureProducts } from "../components/Route/FeatureProducts/FeatureProducts";
import { Events } from "../components/Route/Events/Events";
import { Sponsored } from "../components/Route/Sponsored/Sponsored";
import { Footer } from "../components/Layout/Footer.jsx";
export const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeatureProducts />
      <Sponsored />
      <Footer />
    </div>
  );
};
