import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "./features/auth/authSlice";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {

  // const { _id } = useParams();
  const [user,setUser] = useState();
  const [orders, setorders] = useState();
  var id = useParams().username;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3001/users/getuserbyid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        }
      );
      const data = await response.json();
      setUser(data.user);
      const r = await fetch(
        `http://localhost:3001/orders/getorder?userid=${data.user._id}`
      );
      const d = await r.json();
      setorders(d);
    };
    fetchData();
  }, []);



 
  

  
  

  // var user = useSelector((state) => state.user.currentUser);
  const ref = useRef();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // if(!user){ return <>Loading...</>}

  const onSubmit = async (data) => {
    const { image } = data;
    console.log(data);

    const reader = new FileReader();
    reader.onload = async () => {
      ref.current.src = reader.result;
      try {
        const response = await fetch(`http://localhost:3001/users/updateuserbyid/${user._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: reader.result }),
        });

        const data = await response.json();
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    };
    reader.readAsDataURL(image[0]);
  };
  

  if(!user) {return <>Loading...</>}

  if (!orders) {
    return <>Loading...</>;
  }

  if(user === null){
    return <>Loading...</>
  }

  return (
 
    <>
     { user && <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={user.image} alt="Profile" id="img" ref={ref} />
            </div>
            <h3 className="ml-2 text-lg font-medium">{user.name}</h3>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Change Profile Picture</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="file"
                {...register("image", { required: true })}
                accept="image/*"
              />
              {errors.image && <p>Please select an image.</p>}

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        </div>}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Orders</h1>
        <div className="grid grid-cols-1 gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    Order ID: {order._id}
                  </h2>
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
                    <h4 className="text-lg font-medium mb-2">
                      Shipping Address
                    </h4>
                    <p>{order.address}</p>
                    <p>{order.city}</p>
                  </div>
                  <Link
                    to={`/tracking`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
