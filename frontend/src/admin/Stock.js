import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function removeEmptyKeys(obj) {
  // Filter out key-value pairs with empty values
  const filteredEntries = Object.entries(obj).filter(([key, value]) => {
    // Exclude empty values
    return value !== "";
  });

  // Convert the filtered entries back into an object
  const filteredObj = Object.fromEntries(filteredEntries);

  return filteredObj;
}

const Admin = () => {
  const [status, setStatus] = useState("idle");
  const [focusproduct, setfocusproduct] = useState(null);
  const handleChange = (event) => {};

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [products, setProducts] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = async (event) => {
    setIsOpen(!isOpen);
    let id = event.target.getAttribute("id");
    const response = await fetch(
      `http://localhost:3001/products/getproductbyid/${id}`
    );
    const data = await response.json();
    setfocusproduct(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/products/getproduct");
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    let id = focusproduct.id;
    console.log(id);
    data = removeEmptyKeys(data);
    data = { ...data };
    console.log(data);
    try {
      setStatus("working");
      const response = await fetch(
        `http://localhost:3001/products/updateproductbyid/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        setStatus("failed");

        throw new Error("Failed to update product.");
      }

      const Data = await response.json();
      console.log("Product updated:", Data);
      setStatus("success");

      // Handle the updated product data here
    } catch (error) {
      console.error("Error:", error);
      // Handle the error here
    }
  };

  const handleDelete = async(event) => {
    let id = event.target.getAttribute('name');
    try {
      const response = await fetch(
        `http://localhost:3001/products/deletebyid/${id}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
          
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      
      window.location.href = "http://localhost:3000/getmetoadmin/stock";
    

      // Handle the updated product data here
    } catch (error) {
      console.error("Error:", error);
      // Handle the error here
    }
  }





  return (
    <>
      <div className="grid grid-cols-4 gap-4 h-screen">
        {/* Sidebar */}
        <div className="col-span-1 bg-gray-100 p-4">
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
        <div className="col-span-3 p-4 bg-white">
          {/* Loading message */}
          {!products ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* Product List */}
              {products.map((product) => (
                <div key={product.id} className="flex mb-4">
                  <div className="w-16">
                    <img src={product.thumbnail} alt={product.title} />
                  </div>
                  <div className="flex-1 ml-4">
                    <p className="text-lg font-medium">{product.title}</p>
                    <p>Price: ${product.price}</p>
                    <p>Rating: {product.rating}</p>
                    <p>Stock: {product.stock}</p>
                    <button
                      id={product.id}
                      onClick={toggleModal}
                      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      name={product.id}
                      onClick={handleDelete}
                      className="mt-4 mx-2 bg-red-700 hover:bg-red-900 text-black font-semibold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {/* Edit button */}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && focusproduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-1/2 p-6 rounded shadow-lg">
            <form
              className="max-w-md mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                    valueholder={focusproduct.title}
                    {...register("title")}
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
                    valueholder={focusproduct.description}
                    {...register("description")}
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
                    valueholder={focusproduct.price}
                    {...register("price")}
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
                    valueholder={focusproduct.discountPercentage}
                    {...register("discountPercentage")}
                    type="text"
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
                    valueholder={focusproduct.rating}
                    {...register("rating")}
                    type="text"
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
                    valueholder={focusproduct.stock}
                    {...register("stock")}
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
                    valueholder={focusproduct.brand}
                    {...register("brand")}
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
                    valueholder={focusproduct.category}
                    {...register("category")}
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
                    valueholder={focusproduct.thumbnail}
                    {...register("thumbnail")}
                    type="text"
                    id="thumbnail"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Update Product
              </button>
            </form>
            {status === "success" && <h1>Product Successfully Added</h1>}
            {status === "failed" && <h1>Could Not Add Product</h1>}

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
