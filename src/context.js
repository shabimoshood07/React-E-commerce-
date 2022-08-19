import React, { useState, useContext, useEffect } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [state, setState] = useState({
    products: [],
    detailProduct: detailProduct,
    modalOpen: false,
    modalProduct: detailProduct,
    cart: [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
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
    let tempProducts = [...state.products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    const price = product.price;
    product.total = price;
    setState((state) => {
      return {
        ...state,
        products: tempProducts,
        detailProduct: { ...product },
        cart: [...state.cart, product],
      };
    });
  };

  // open Modal
  const openModal = (id) => {
    const product = getItem(id);
    setState((state) => {
      return {
        ...state,
        modalProduct: product,
        modalOpen: true,
      };
    });
  };

  // close Modal
  const closeModal = () => {
    setState((state) => {
      return {
        ...state,
        modalOpen: false,
      };
    });
  };

  const increment = (id) => {
    console.log("increment");
  };

  const decrement = (id) => {
    console.log("decrement");
  };
  const removeItem = (id) => {
    console.log("item removed");
  };

  const clearCart = (id) => {
    console.log("cart cleared ");
  };
  return (
    <ProductContext.Provider
      value={{
        ...state,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        decrement,
        increment,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductProvider };
