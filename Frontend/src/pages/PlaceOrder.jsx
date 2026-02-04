import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Titel from "../components/Titel";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {

  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandeler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const product = products.find(
              (item) => item._id === productId
            );

            if (product) {
              orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: size,
                quantity: cartItems[productId][size],
              });
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      if (method === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          {
            headers: { token },
          }
        );

        if (response.data.success) {
          toast.success("Order Placed Successfully");

          // cart should be cleared AFTER order is saved
          setCartItems({});

          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      } 
      else if (method === "stripe") {
        const response = await axios.post(
          backendUrl + "/api/order/stripe",
          orderData,
          {
            headers: { token },
          }
        );

        if (response.data.success) {
          // Redirect to Stripe checkout page
          window.location.href = response.data.session_url;
        } else {
          toast.error(response.data.message);
        }
      }
      else if (method === "razorpay") {
        toast.info("Razorpay payment coming soon!");
      }
      else {
        toast.error("Select Payment Method");
      }
    } catch (error) {
      console.log("Order Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <form
        onSubmit={onSubmitHandeler}
        className="flex flex-col gap-4 w-full sm:max-w-[480px]"
      >
        <div className="text-xl my-3 sm:text-2xl">
          <Titel text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            type="text"
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
          />

          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            type="text"
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
          />
        </div>

        <input
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          type="email"
          className="border rounded py-1.5 px-3.5 w-full"
          placeholder="Email"
        />

        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          type="text"
          className="border rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            type="text"
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />

          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            type="text"
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            type="number"
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="Zipcode"
          />

          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            type="text"
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          type="number"
          className="border rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
        />

        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors"
          >
            PLACE ORDER
          </button>
        </div>
      </form>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Titel text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-3 flex-col lg:flex-row w-full">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-green-400 transition-colors"
            >
              <p
                className={`w-[14px] h-[14px] border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              />
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="Stripe" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-green-400 transition-colors"
            >
              <p
                className={`w-[14px] h-[14px] border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              />
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="Razorpay" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:border-green-400 transition-colors"
            >
              <p
                className={`w-[14px] h-[14px] border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              />
              <p className="text-gray-700 text-sm font-medium px-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;