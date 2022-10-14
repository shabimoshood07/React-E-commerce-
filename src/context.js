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

  const getTotals = () => {
    let subTotal = 0;
    const tempCart = [...state.cart];
    tempCart.map((item) => {
      subTotal += item.total;
    });
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total,
    };
  };

  const addTotal = async () => {
    const totals = await getTotals();
    setState((state) => {
      return {
        ...state,
        cartSubTotal: totals.subTotal,
        cartTax: totals.tax,
        cartTotal: totals.total,
      };
    });
  };

  // Handle Add to cart
  const addToCart = (id) => {
    let tempProducts = [...state.products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    setState((state) => {
      return {
        ...state,
        cart: [...state.cart, product],
        products: [...tempProducts],
        detailProduct: { ...product },
      };
    }, addTotal());
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
    let tempCart = [...state.cart];
    const selectedProduct = tempCart.find((item) => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;

    setState((state) => {
      return { ...state, cart: tempCart };
    }, addTotal());
  };

  const decrement = (id) => {
    let tempCart = [...state.cart];
    const selectedProduct = tempCart.find((item) => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    const count = product.count - 1;
    if (count < 1) {
      removeItem(id);
    } else {
      product.count = count;
      product.total = product.count * product.price;
      setState((state) => {
        return { ...state, cart: tempCart };
      }, addTotal());
    }
  };

  const removeItem = (id) => {
    let tempCart = [...state.cart];

    const newCart = tempCart.filter((item) => {
      return item.id !== id;
    });

    let tempProducts = [...state.products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = false;
    product.count = 0;
    product.total = 0;
    console.log(newCart);

    setState((state) => {
      return { ...state, products: tempProducts, cart: newCart };
    }, addTotal());
  };

  const clearCart = () => {
    setState((state) => {
      return {
        ...state,
        cartSubTotal: 0,
        cartTotal: 0,
        cartTax: 0,
        cart: [],
      };
    }, setProducts());
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
        addTotal,
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
