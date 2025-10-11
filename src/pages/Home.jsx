import React from "react";
import About from "./About";
import ProductSection from "./Products";
import Hero from "../components/Hero";


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
    <ProductSection />
    </>
  );
};
