import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import ButtonContainer from "./Button";
import styled from "styled-components";
import { useGlobalContext } from "../context";

function Navbar() {
  const {addTotal} = useGlobalContext();
  return (
    <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">
      <div className="d-flex">
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              Products
            </Link>
          </li>
        </ul>
      </div>

      <Link to="/cart" className="ml-auto">
        <ButtonContainer onClick={addTotal}>
          <span className="mr-5">
            <i className="fas fa-cart-plus" />
          </span>
          my Cart
        </ButtonContainer>
      </Link>
    </Nav>
  );
}

const Nav = styled.nav`
  background: var(--mainBlue);
  justify-content:space-between;

  .nav-link {
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform:capitalize;
  }
  @media (max-width: 576px) {
    .navbar-nav {
      flex-direction: row !important;
`;

// const ButtonContainer = styled.button`
//   text-transform: capitalize;
// font - size: 1.4rem;
// background: transparent;
// border: 0.05rem solid var(--lightBlue);
// border - radius: 0.5rem;
// padding: 0.2rem 0.5rem;
// outline - color: red;
// cursor: pointer;
// display: inline - block;
// margin: 0.2rem 0.5rem 0.2rem 0;
// transition: all 0.5s ease -in -out;
//   &: hover {
//   background: var(--lightBlue);
//   color: var(--mainBlue);
// }
// `;
export default Navbar;
