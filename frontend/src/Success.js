import React ,{useEffect,useState} from 'react'
import {useParams } from "react-router-dom";
import { increment } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';
import {Link} from "react-router-dom";

const Success = () => {
    const [info,setinfo] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/orders/${id}`);
            const data = await response.json();
            setinfo(data);
          };
          fetchData();
    }, [])
    useEffect(() => {
        console.log(info);
      
        const updateStockLevels = async () => {
          try {
            const updatedItems = info.items.map(async (product) => {
              const getProductResponse = await fetch(`http://localhost:8080/products/${product.id}`);
              const fetchedProduct = await getProductResponse.json();
              const updatedStock = {...fetchedProduct,"stock":fetchedProduct.stock - product.quantity};
              const updateProductResponse = await fetch(`http://localhost:8080/products/${product.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({  ...updatedStock }),
              });
      
              if (!updateProductResponse.ok) {
                throw new Error('Error updating stock levels');
              }
      
              const updatedProduct = await updateProductResponse.json();
              return updatedProduct;
            });
      
            const updatedItemsData = await Promise.all(updatedItems);
            console.log('Updated stock levels:', updatedItemsData);
          } catch (error) {
            console.error('Error updating stock levels:', error);
          }
        };
      
        if (info && info.items) {
          updateStockLevels();
        }
      }, [info]);
      

      if (!info) {
        // Display loading indicator or a message while data is being fetched
        return <p>Loading...</p>;
      }
    
    

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold mb-4">Order Success</h1>
          <p className="text-gray-600 mb-4">Thank you for your order!</p>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Order Details</h2>
            <p>Order ID: {id}</p>
            <p>Name: {info.name}</p>
            <p>Email: {info.email}</p>
            <p>Address: {info.address}</p>
            <p>City: {info.city}</p>
            <p>Total: ${info.total}</p>
            <p>Status: {info.status}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Ordered Items</h2>
            {info.items.map((item) => (
              <div key={item.id} className="flex items-center my-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-12 w-12 object-contain rounded-md mr-2"
                />
                <p className="text-gray-800">{item.title}</p>
                <p className="text-gray-800 mx-2">   Quantity:{item.quantity}</p>

              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              to="/tracking"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
