import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Titel from "../components/Titel";
import axios from "axios";

const Order = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success && Array.isArray(response.data.orders)) {
        setOrderData([...response.data.orders].reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Fetch current status only (NO mutation)
  const handleTrackOrder = async (orderId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/order/status/${orderId}`,
        { headers: { token } }
      );

      if (response.data.success) {
        setOrderData((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, status: response.data.status }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Tracking failed", error);
    }
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-4">
        <Titel text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="border-t">
        {orderData.map((order) =>
          order.items.map((item, i) => (
            <div
              key={item._id || `${order._id}-${i}`}
              className="py-4 border-b flex items-center justify-between gap-4"
            >
              {/* LEFT: PRODUCT INFO */}
              <div className="flex items-start gap-6 text-sm w-[45%]">
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="w-16 sm:w-20"
                />

                <div>
                  <p className="text-base font-medium">{item.name}</p>

                  <div className="flex flex-wrap gap-3 mt-1 text-gray-700">
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-1 text-gray-400">
                    Date: {new Date(order.date).toDateString()}
                  </p>

                  <p className="text-gray-400">
                    Payment: {order.paymentMethod || "COD"}
                  </p>
                </div>
              </div>

              {/* CENTER: STATUS (LIKE IMAGE) */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{order.status || "Placed"}</span>
              </div>

              {/* RIGHT: TRACK BUTTON */}
              {/* <button
                onClick={() => handleTrackOrder(order._id)}
                className="border px-4 py-2 text-sm rounded hover:bg-gray-100"
              >
                Track Order
              </button> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
