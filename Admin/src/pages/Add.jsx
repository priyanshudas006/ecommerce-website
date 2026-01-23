import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const onSubmitHandeler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        setBestseller(false);
        setCategory("Men");
        setSubCategory("Topwear");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={(e) => {
          onSubmitHandeler(e);
        }}
        className="flex flex-col gap-6 max-w-3xl"
      >
        {/* Upload Images */}
        <div>
          <p className="mb-2 font-medium">Upload Image</p>

          <div className="flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20 cursor-pointer"
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt=""
              />
              <input
                type="file"
                id="image1"
                hidden
                onChange={(e) => setImage1(e.target.files[0])}
              />
            </label>

            <label htmlFor="image2">
              <img
                className="w-20 cursor-pointer"
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt=""
              />
              <input
                type="file"
                id="image2"
                hidden
                onChange={(e) => setImage2(e.target.files[0])}
              />
            </label>

            <label htmlFor="image3">
              <img
                className="w-20 cursor-pointer"
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt=""
              />
              <input
                type="file"
                id="image3"
                hidden
                onChange={(e) => setImage3(e.target.files[0])}
              />
            </label>

            <label htmlFor="image4">
              <img
                className="w-20 cursor-pointer"
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt=""
              />
              <input
                type="file"
                id="image4"
                hidden
                onChange={(e) => setImage4(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <p>Product name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            placeholder="Type here"
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-2">
          <p>Product description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border rounded resize-none"
            placeholder="Type here"
            rows={4}
          />
        </div>

        {/* Category & Subcategory */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-2 w-full">
            <p>Product category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <p>Product subcategory</p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <p>Product price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full max-w-[200px] px-3 py-2 border rounded"
            placeholder="0"
          />
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-2">
          <p>Product Size</p>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <p
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-1 rounded cursor-pointer
                  ${
                    sizes.includes(size)
                      ? "bg-pink-300 text-white"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
              >
                {size}
              </p>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
          />
          <label htmlFor="bestseller" className="cursor-pointer">
            Add to bestseller
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-32 py-3 mt-4 bg-black text-white rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
