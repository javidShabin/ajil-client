import Hero from "../components/Hero";
import ProductTypes from "../components/ProductType";

import About from "./About";
import ProductSection from "./Products";

export const Home = () => {
  const user = { name: "Ramshiya" };
  const products = [
    { name: "Cooking Pan", price: 499, quantity: 1 },
    { name: "Knife Set", price: 299, quantity: 2 },
  ];
  return (
    <>
      <Hero />
      <About />
      <ProductTypes />
    </>
  );
};
