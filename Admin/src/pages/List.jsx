import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { BadgeX } from "lucide-react";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="mb-4 text-lg font-semibold">All Products List</p>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* Product Rows */}
      {list.length > 0 ? (
        list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 md:gap-0 items-center py-3 px-3 border-b text-sm hover:bg-gray-50 transition"
          >
            {/* Image */}
            <img
              src={item.image?.[0]}
              alt={item.name}
              className="w-16 h-16 object-cover rounded border"
            />

            {/* Name */}
            <p className="font-medium">{item.name}</p>

            {/* Category */}
            <p className="text-gray-600">{item.category}</p>

            {/* Price */}
            <p className="font-semibold">
              {currency}
              {item.price}
            </p>

            {/* Action */}
            <div className="flex justify-center">
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete product"
              >
                <BadgeX size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-6">
          No products found
        </p>
      )}
    </div>
  );
};

export default List;
