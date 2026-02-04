import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";
import { Phone } from "lucide-react";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 sm:p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Order Page</h3>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start bg-white border border-gray-200 rounded-lg shadow-sm p-5 md:p-6 text-xs sm:text-sm text-gray-700 hover:shadow-md transition-shadow"
          >
            <img className="w-12" src={assets.parcel_icon} alt="parcel" />

            <div>
              <p className="font-medium text-gray-800 mb-2">Order Items:</p>
              {order.items.map((item, idx) => (
                <p className="py-0.5 text-gray-600" key={idx}>
                  {item.name} x {item.quantity} <span className="text-gray-500">({item.size})</span>
                </p>
              ))}
            </div>

            <div>
              <p className="font-medium text-gray-800 mb-1">Customer:</p>
              <p className="text-gray-600">
                {order.address.firstName} {order.address.lastName}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-800 mb-1">Address:</p>
              <p className="text-gray-600">{order.address.street}</p>
              <p className="text-gray-600">
                {order.address.city}, {order.address.state}, {order.address.country}
              </p>
              <p className="text-gray-600 mt-1 flex items-center gap-1">
                <Phone size={14} /> {order.address.phone}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-800 mb-1">Order Details:</p>
              <p className="text-gray-600">Items: {order.items.length}</p>
              <p className="text-gray-600">Method: {order.paymentMethod}</p>
              <p className="text-gray-600">
                Payment: <span className={order.payment ? "text-green-600 font-medium" : "text-orange-600 font-medium"}>
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-base font-semibold text-gray-800">
              {currency}{order.amount}
            </p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;