import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineSearch } from "react-icons/ai";
import _, { set } from "lodash";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { client, urlFor } from "../lib/client";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null);

  const handleSearchDebounce = _.debounce((event) => {
    const { value } = event.target;
    setQuery(`*[_type == "product" && slug.current match "${value}*"]`);
  }, 800);
  useEffect(() => {
    query && client.fetch(query).then((result) => setData(result));
  }, [query]);

  return (
    <header className="navbar-container">
      <p className="logo">
        <Link href="/">E-Commerce Watch</Link>
      </p>
      <ul className="navbar-list">
        <Link href="/product">
          <a className="nav-item">
            <li>Product</li>
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
      <div className="input-wrapper" style={{ position: "relative" }}>
        <form className="input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Search your product"
            onChange={handleSearchDebounce}
          />
          <button type="button" className="search-icon" onClick="">
            <AiOutlineSearch />
          </button>
        </form>
        <div style={{ position: "absolute" }}>
          {data?.map((item) => {
            return (
              <>
                <img src={urlFor(item.image)[0]} />
                <h2>{item.name}</h2>
                <h2>{item.price}</h2>
              </>
            );
          })}
        </div>
      </div>
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
