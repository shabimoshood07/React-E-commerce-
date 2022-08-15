import React, { useState, useContext, useEffect } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [state, setState] = useState({
    products: [],
    detailProduct: detailProduct,
    cart: [],
  });

  const setProducts = () => {
    let tempProduct = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProduct = [...tempProduct, singleItem];
    });

    setState(() => {
      return { ...state, products: tempProduct };
    });
  };

  useEffect(() => {
    setProducts();
    console.log('setting product')
  }, []);

  const getItem = (id) => {
    const product = state.products.find((item) => {
      return item.id === id;
    });
    return product;
  };

  // Handle product detail
  const handleDetail = (id) => {
    const product = getItem(id);
    setState({
      ...state,
      detailProduct: product,
    });
  };

  // Handle Add to cart

  const addToCart = (id) => {
    setState((currentState) => {
      let tempProducts = [...currentState.products];
      const p = currentState.products.find((item) => item.id === id);
      const product = { ...p, inCart: true, total: p.price, count: 1 };
      console.log(product);

      console.log({
        products: tempProducts,
        cart: [...currentState.cart, product],
        detailProduct: { ...product },
      });
      return {
        products: tempProducts,
        cart: [...currentState.cart, product],
        detailProduct: { ...product },
      };
    });
  };

  return (
    <ProductContext.Provider value={{ ...state, handleDetail, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductProvider };
