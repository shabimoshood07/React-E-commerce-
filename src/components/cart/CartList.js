import React, { Component } from "react";
import CartItem from "./CartItem";
import { useGlobalContext } from "../../context";



function CartList() {
  const { cart } = useGlobalContext();
  return (
    <div className="container-fluid">
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CartList

