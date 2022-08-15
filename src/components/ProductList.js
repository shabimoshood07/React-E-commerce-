import React, { useState } from "react";
// import Product from "./Product";
import Product from "./Product";
import Title from "./Title";
import styled from "styled-components";
import { useGlobalContext} from "../context";

function ProductList() {
  const { products } = useGlobalContext();

  return (
    <>
      <ProductWrapper className="py-5">
        <div className="container">
          <Title name="our" title="products" />
        </div>
        <div className="row p-5">
          {products.map((product) => {
            return <Product key={product.id} product = {product} />;
          })}
        </div>
      </ProductWrapper>
    </>
  );
}
const ProductWrapper = styled.section``;

export default ProductList;
