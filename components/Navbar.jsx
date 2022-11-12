import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineShopping,
  AiOutlineSearch,
  AiOutlineMenu,
} from "react-icons/ai";
import _ from "lodash";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { client, urlFor } from "../lib/client";
import { useRouter } from "next/router";

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
      {/* Menu Button  */}
      {/* <button class="menu-btn">
        <AiOutlineMenu />
      </button> */}

      <p className="logo">
        <Link href="/">E-Commerce Watch</Link>
      </p>
      <ul className="navbar-list">
        <Link href="/product">
          <a className="nav-item">
            <li>Sản phẩm</li>
          </a>
        </Link>
        <Link href="/men">
          <a className="nav-item">
            <li>Nam</li>
          </a>
        </Link>
        <Link href="/women">
          <a className="nav-item">
            <li>Nữ</li>
          </a>
        </Link>
        <Link href="/news">
          <a className="nav-item">
            <li>Tin tức</li>
          </a>
        </Link>
        <Link href="/about">
          <a className="nav-item">
            <li>Về chúng tôi</li>
          </a>
        </Link>
      </ul>

      <div className="input-wrapper" style={{ position: "relative" }}>
        <form className="input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Tìm sản phẩm"
            onChange={handleSearchDebounce}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => !isSearchHover && setIsSearchFocused(false)}
          />
          <button type="button" className="search-icon">
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
              borderRadius: "10px",
              border: "1px solid #ebebeb",
            }}
            onMouseOver={() => setIsSearchHover(true)}
            onMouseLeave={() => setIsSearchHover(false)}
          >
            {data?.map((item) => {
              return (
                <div
                  onClick={() => onNavigate(item)}
                  style={{
                    color: "gray",
                    cursor: "pointer",
                    transition: "transform 0.4s ease",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <img
                      src={urlFor(item.image[0])}
                      width={100}
                      height={100}
                      className="product-image"
                    />
                    <p
                      style={{
                        color: " var(--text-color)",
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                  <h4
                    style={{
                      color: "black",
                      marginLeft: "100px",
                      top: "50%",
                      transform: " translateY(-150%)",
                    }}
                  >
                    ${item.price}
                  </h4>
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
