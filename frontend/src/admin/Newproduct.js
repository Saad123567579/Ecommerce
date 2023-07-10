import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
const Newproduct = () => {
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    formdata = { ...formdata, images: [watch("images")] };
    console.log(formdata);
    try {
      setStatus("working");
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (!response.ok) {
        setStatus("failed");
        throw new Error("Failed to add product.");
        
      }

      const data = await response.json();
      console.log("Product added:", data);
      setStatus("success");
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
      // Handle the error here
    }
    reset();
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        {/* Vertical Tabs */}
        <ul className="space-y-4">
          <li>
            <Link
              to="/getmetoadmin/newproduct"
              className="text-gray-500 hover:text-gray-900 font-medium"
            >
              Add A Product
            </Link>
          </li>
          <li>
            <Link
              to="/getmetoadmin/orders"
              className="text-gray-500 hover:text-gray-900 font-medium"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/getmetoadmin/stock"
              className="text-gray-500 hover:text-gray-900 font-medium"
            >
              Stocks
            </Link>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-3/4 bg-gray-100 p-4">
        {/* New Product Form */}
        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                {...register("title", { required: true, minLength: 3 })}
                type="text"
                id="title"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                {...register("description", { required: true, minLength: 3 })}
                id="description"
                rows="3"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                id="price"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium text-gray-700"
              >
                Discount Percentage
              </label>
              <input
                {...register("discountPercentage", { required: true })}
                type="number"
                id="discountPercentage"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <input
                {...register("rating", { required: true })}
                type="number"
                id="rating"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <input
                {...register("stock", { required: true })}
                type="number"
                id="stock"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                {...register("brand", { required: true })}
                type="text"
                id="brand"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                {...register("category", { required: true })}
                type="text"
                id="category"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                Thumbnail
              </label>
              <input
                {...register("thumbnail", { required: true })}
                type="text"
                id="thumbnail"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images
              </label>
              <input
                {...register("images", { required: true })}
                type="text"
                id="images"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
        {status==="success" && <h1>Product Successfully Added</h1>}
        {status==="failed" && <h1>Could Not Add Product</h1>}

      </div>
    </div>
  );
};

export default Newproduct;
