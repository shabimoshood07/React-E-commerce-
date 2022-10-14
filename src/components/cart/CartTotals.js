import React from "react";
// import PayPalButton from "./PayPalButton";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

function CartTotals() {
  const { cartSubTotal, cartTax, cartTotal, cart, clearCart } =
  useGlobalContext();
  const emptyCart = cart.length === 0 ? true : false;
  // const { history } = this.props;
  return (
    <React.Fragment>
      {!emptyCart && (
        <div className="container">
          <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
              <Link to="/">
                <button
                  className="btn btn-outline-danger text-uppercase mb-3 px-5"
                  type="button"
                  onClick={() => {
                    clearCart();
                  }}
                >
                  clear cart
                </button>
              </Link>
              <h5>
                <span className="text-title"> subtotal :</span>{" "}
                <strong>$ {cartSubTotal} </strong>
              </h5>
              <h5>
                <span className="text-title"> tax :</span>{" "}
                <strong>$ {cartTax} </strong>
              </h5>
              <h5>
                <span className="text-title"> total :</span>{" "}
                <strong>$ {cartTotal} </strong>
              </h5>
              {/* <PayPalButton
                totalAmount={cartTotal}
                clearCart={clearCart}
                history={history}
              /> */}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default CartTotals;
