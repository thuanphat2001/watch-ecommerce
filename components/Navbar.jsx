import React from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineSearch } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <header className="navbar-container">
      <p className="logo">
        <Link href="/">E-Commerce Watch</Link>
      </p>
      <ul className="navbar-list">
        <Link href="/brand">
          <a className="nav-item">
            <li>Brand</li>
          </a>
        </Link>
        <Link href="/">
          <a className="nav-item">
            <li>Men</li>
          </a>
        </Link>
        <Link href="/">
          <a className="nav-item">
            <li>Women</li>
          </a>
        </Link>
        <Link href="/">
          <a className="nav-item">
            <li>Collection</li>
          </a>
        </Link>
        <Link href="/">
          <a className="nav-item">
            <li>New</li>
          </a>
        </Link>
        <Link href="/">
          <a className="nav-item">
            <li>About Us</li>
          </a>
        </Link>
      </ul>
      <button type="button" className="search-icon" onClick="">
        <AiOutlineSearch />
      </button>
      {/* Start Cart */}
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
      {/* End Cart */}
    </header>
  );
};

export default Navbar;
