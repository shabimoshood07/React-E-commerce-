import React, { useState, useContext, useEffect } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [state, setState] = useState({
    products: [],
    detailProduct: detailProduct,
    modalOpen: true,
    modalProduct: detailProduct,
    cart: [],
  });

  // const [modalProduct, setModalProduct] = useState({});
  // const [cart, setCart] = useState([]);
  // const [modalOpen, setModalOpen] = useState(true);

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

    // setCart((cart) => [...cart, product]);

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
        modalOpen:true
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

  return (
    <ProductContext.Provider
      value={{ ...state, handleDetail, addToCart, openModal, closeModal }}
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

// const addToCart = (id) => {
//   setState((currentState) => {
//     let tempProducts = [...currentState.products];
//     const p = tempProducts.find((item) => item.id === id);
//     const product = { ...p, inCart: true, total: p.price, count: 1 };
//     console.log(product);

//     console.log({
//       products: tempProducts,
//       cart: [...state.cart, product],
//       detailProduct: { ...product },
//     });
//     return {
//       products: tempProducts,
//       cart: [...currentState.cart, product],
//       detailProduct: { ...product },
//     };
//   });
// };
