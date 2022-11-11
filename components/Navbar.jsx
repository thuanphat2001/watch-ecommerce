import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineSearch } from "react-icons/ai";
import _, { set } from "lodash";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { client, urlFor } from "../lib/client";
import { useRouter } from "next/router";
import { borderColor } from "@mui/system";
import { grey } from "@mui/material/colors";

const Navbar = () => {
  const router = useRouter();
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchHover, setIsSearchHover] = useState(false);

  useEffect(() => {
    query && client.fetch(query).then((result) => setData(result));
  }, [query]);

  const handleSearchDebounce = _.debounce((event) => {
    const { value } = event.target;
    if (value.length == 0) {
      setData([]);
      return;
    }
    setQuery(`*[_type == "product" && slug.current match "${value}*"]`);
  }, 800);

  function onNavigate(product) {
    router.push(`/product/${product.slug.current}`);
    setIsSearchFocused(false);
  }

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
        <Link href="/men">
          <a className="nav-item">
            <li>Men</li>
          </a>
        </Link>
        <Link href="/women">
          <a className="nav-item">
            <li>Women</li>
          </a>
        </Link>
        <Link href="/collection">
          <a className="nav-item">
            <li>Collection</li>
          </a>
        </Link>
        <Link href="/news">
          <a className="nav-item">
            <li>News</li>
          </a>
        </Link>
        <Link href="/about Us">
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
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => !isSearchHover && setIsSearchFocused(false)}
          />
          <button type="button" className="search-icon" onClick="">
            <AiOutlineSearch />
          </button>
        </form>
        {isSearchFocused && (
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              width: "100%",
              backgroundColor: "white",
              border: "1px solid grey",
              borderRadius: "10px",
            }}
            onMouseOver={() => setIsSearchHover(true)}
            onMouseLeave={() => setIsSearchHover(false)}
          >
            {data?.map((item) => {
              return (
                <div
                  onClick={() => onNavigate(item)}
                  style={{
                    padding: "10px",
                    borderTop: "1px",
                    borderBottom: "1px",
                    borderColor: "grey",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      src={urlFor(item.image[0])}
                      width={50}
                      height={50}
                      className="product-image"
                    />
                    <h2>{item.name}</h2>
                  </div>
                  <h2>${item.price}</h2>
                </div>
              );
            })}
          </div>
        )}
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
