import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/collection") && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  return showSearch && visible ? (
    <div className="border-t bg-gray-100 text-center">
      <div className="inline-flex items-center justify-between border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 gap-3">
        
        <input
          type="text"
          placeholder="Search products"
          className="flex-1 outline-none bg-transparent text-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <img
          src={assets.search_icon}
          className="w-4 opacity-60"
          alt="search"
        />

        <img
          src={assets.cross_icon}
          className="w-3 cursor-pointer"
          onClick={() => {
            setShowSearch(false);
            setSearch("");
          }}
          alt="close"
        />

      </div>
    </div>
  ) : null;
};

export default SearchBar;
