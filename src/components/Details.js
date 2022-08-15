import React from "react";
import { useGlobalContext } from "../context";
import ButtonContainer from "./Button";
import { Link } from "react-router-dom";

function Details() {
  const { detailProduct, addToCart } = useGlobalContext();

  const { id, company, img, info, price, title, inCart } = detailProduct;

  return (
    <div className="container py-5">
      {/* title */}
      <div className="row">
        <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
          <h1>{title}</h1>
        </div>
      </div>
      {/* end of title */}
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3">
          <img src={img} className="img-fluid" alt="" />
        </div>
        {/* prdoduct info */}
        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
          <h1>model : {title}</h1>
          <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
            made by : <span className="text-uppercase">{company}</span>
          </h4>
          <h4 className="text-blue">
            <strong>
              price : <span>$</span>
              {price}
            </strong>
          </h4>
          <p className="text-capitalize font-weight-bold mt-3 mb-0">
            some info about product :
          </p>
          <p className="text-muted lead">{info}</p>
          {/* buttons */}
          <div>
            <Link to="/">
              <ButtonContainer>back to products</ButtonContainer>
            </Link>
            <ButtonContainer
              cart
              onClick={() => addToCart}
              disabled={inCart ? true : false}
            >
              {inCart ? "in cart" : "add to cart"}
            </ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
