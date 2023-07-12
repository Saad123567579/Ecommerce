import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const ref = useRef();
  const [orders, setOrders] = useState(null);
  const [profit, setProfit] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [id, setid] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/orders/getorder");
        const data = await response.json();
        console.log(data);
        setOrders(data);
        let totalSum = data.reduce(
          (accumulator, currentValue) => accumulator + currentValue.total,
          0
        );
        setProfit(totalSum);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const handleModalOpen = (orderId) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedOrderId(null);
    setModalOpen(false);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("i was clicked");
    e.preventDefault();

    let x = ref.current.value;

    const response = await fetch(
      `http://localhost:3001/orders/updateorderbyid/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "status": x }),
      }
    );

    if (!response.ok) {
      throw new Error("Patch request failed");
    }
    console.log("Order successfully updated");
    window.location.href = "http://localhost:3000/getmetoadmin/orders";

    console.log("job done");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
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

      <div className="w-3/4 bg-white p-4">
        {orders && orders.length > 0 ? (
          <>
            <h1>Estimated Revenue ${profit}</h1>
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-slate-200 shadow-lg rounded-lg overflow-hidden mx-2 my-4"
              >
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                      Order ID: {order._id} Status: {order.status}
                    </h2>
                    <button
                      name={order._id}
                      onClick={(event) => {
                        handleModalOpen(order._id);
                        setid(event.target.getAttribute("name"));
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                    >
                      Edit
                    </button>
                    <p className="text-gray-600">Total: ${order.total}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Ordered Items
                    </h3>
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
                      <h4 className="text-lg font-medium mb-2">
                        Shipping Address
                      </h4>
                      <p>{order.address}</p>
                      <p>{order.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p>Total Profit: {profit}</p>
          </>
        ) : (
          <div>Loading...</div>
        )}

        {selectedOrderId && modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Order</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Text Field
                  </label>
                  <input
                    ref={ref}
                    type="text"
                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
