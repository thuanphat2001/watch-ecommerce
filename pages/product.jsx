import React from "react";

import { client } from "../lib/client";
import { Product, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading" key={products._id}>
        <h2>Product List</h2>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <>
            <Product key={product._id} product={product} />
          </>
        ))}
      </div>
    </>
  );
};

// get all data from sanity
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData },
  };
};

export default Home;
