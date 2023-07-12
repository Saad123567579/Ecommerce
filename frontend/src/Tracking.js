import React, { useState,useRef } from "react";

const Tracking = () => {
  const ref = useRef();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");


  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(e.target.value);

    try {
      setStatus("loading");
      let id = ref.current.value;
      const response = await fetch(`http://localhost:3001/orders/getorderbyid/${id}`);
      if (!response.ok) {
        setStatus("failed");
        throw new Error("Order not found");
      }

      const data = await response.json();
      console.log(data);
      setOrder(data);
      setStatus("fulfilled");
      setError(null);
    } catch (error) {
      setOrder(null);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Order Tracking</h1>
      <form onSubmit={handleSearch}>
        <div className="flex items-center">
          <input
            type="text"
            ref={ref}
            
            placeholder="Enter order ID"
            className="border border-gray-300 px-3 py-2 mr-2 rounded-md w-64"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Search
          </button>
        </div>
      </form>

      {status === "loading" && <p>Loading...</p>}

      {status === "failed" && <p>Failed to find the order.</p>}

      {status === "fulfilled" && order && (
        <div
          key={order._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
              <p className="text-gray-600">Total: ${order.total}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Ordered Items</h3>
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center my-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-12 w-12 object-contain rounded-md mr-2"
                  />
                  <p className="text-gray-800">{item.title}</p>
                  <p className="text-gray-800 mx-2">
                    Quantity: {item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <div>
                <h4 className="text-lg font-medium mb-2">Shipping Address</h4>
                <p>{order.address}</p>
                <p>{order.city}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;
