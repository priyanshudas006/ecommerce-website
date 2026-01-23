import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to sync cart");
      }
    }
  };

  /* ---------------- CART COUNT ---------------- */
  const getCartCount = () => {
    let totalCount = 0;

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }

    return totalCount;
  };

  /* ---------------- UPDATE QUANTITY ---------------- */
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to update cart");
      }
    }
  };

  /* ---------------- CART AMOUNT ---------------- */
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId);
      if (!product) continue;

      for (const size in cartItems[productId]) {
        totalAmount += product.price * cartItems[productId][size];
      }
    }

    return totalAmount;
  };

  /* ---------------- PRODUCTS ---------------- */
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------------- GET USER CART ---------------- */
  const getUserCart = async (savedToken) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token: savedToken } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, []);

  /* ---------------- CONTEXT VALUE ---------------- */
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
