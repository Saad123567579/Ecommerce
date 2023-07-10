import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [profit, setProfit] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:8080/orders");
      const data = await response.json();
      console.log(data);
      setOrders(data);
      let totalSum = data.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0);
      setProfit(totalSum);
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        {/* Vertical Tabs */}
        <ul className="space-y-4">
          <li>
            <Link to="/getmetoadmin/newproduct" className="text-gray-500 hover:text-gray-900 font-medium">
              Add A Product
            </Link>
          </li>
          <li>
            <Link to="/getmetoadmin/orders" className="text-gray-500 hover:text-gray-900 font-medium">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/getmetoadmin/stock" className="text-gray-500 hover:text-gray-900 font-medium">
              Stocks
            </Link>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-3/4 bg-white p-4">
        {orders && orders.length > 0 ? (
          <> <h1>Estimated Revenue ${profit}</h1>
            {orders.map((order) => (
              <div key={order.id} className="bg-slate-200 shadow-lg rounded-lg overflow-hidden mx-2 my-4">
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">Order ID: {order.id}  Status: {order.status}</h2>
                    <h2 className="text-lg font-semibold">Status: {order.status}</h2>

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
                        <p className="text-gray-800 mx-2">Quantity: {item.quantity}</p>
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
            ))}
            <p>Total Profit: {profit}</p>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
