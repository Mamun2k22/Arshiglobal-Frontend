import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSlider from "../../components/HomeHero/HeroSlider";


const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>
Arshi Tours and Travel</title>
        <meta name="description" content="M.M trading Center" />
        <meta
          name="keywords"
          content="Bholamart, online store, best deals, top products, daily bestsellers, shop Bholamart, popular categories"
        />
        <link rel="canonical" href="https://arshiglobal.com" />
      </Helmet>
      {/* Main Title */}
      <h1 className=" hidden text-lg md:text-3xl font-bold text-center mt-4 text-blue-500">
        
Arshi’s Tours & Travel
      </h1>
      <HeroSlider />

    </div>
  );
};

export default Home;
