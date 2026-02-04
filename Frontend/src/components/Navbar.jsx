import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); // ✅ FIX

  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center text-gray-700">
          <p>HOME</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>

        <NavLink
          to="/collection"
          className="flex flex-col items-center text-gray-700"
        >
          <p>COLLECTION</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>

        <NavLink
          to="/about"
          className="flex flex-col items-center text-gray-700"
        >
          <p>ABOUT</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>

        <NavLink
          to="/contact"
          className="flex flex-col items-center text-gray-700"
        >
          <p>CONTACT</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => navigate(token ? "/profile" : "/login")}
            src={assets.profile_icon}
            className="w-5 cursor-pointer z-10"
            alt=""
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-4 pointer-events-none group-hover:pointer-events-auto">
              <div className="flex flex-col gap-2 w-36 py-3 px-6 bg-slate-100 text-gray-500 rounded">
                <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=>navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer min-w-5"
            alt=""
          />

          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => {
            console.log("cliked");

            setVisible(true);
          }}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setVisible(false);
            }}
            className="flex itmes-center gap-6 p-3"
          >
            <img src={assets.dropdown_icon} className="w-3 rotate-180" alt="" />
            <p className="absolute ml-6 text-gray-400">Back</p>
          </div>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 border pl-7 border-gray-200"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 border pl-7 border-gray-200"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 border pl-7 border-gray-200"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 border pl-7 border-gray-200"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
