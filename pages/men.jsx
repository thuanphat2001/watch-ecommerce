import React from "react";

const men = () => {
  return (
    <div className="products-container">
      {products?.map((product) => (
        <>
          <Product key={product._id} product={product} />
          <Product key={product._id} product={product} />
          <Product key={product._id} product={product} />
        </>
      ))}
    </div>
  );
};

export default men;
