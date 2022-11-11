import React from "react";
import { client } from "../lib/client";
import { Product } from "../components";

const women = ({ products }) => {
  return (
    <div className="products-container">
      {products
        ?.filter((product) => product.gender == false)
        .map((product) => (
          <>
            <Product key={product._id} product={product} />
          </>
        ))}
    </div>
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

export default women;
