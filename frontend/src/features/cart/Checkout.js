import React,{useEffect,useState} from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import { Link ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../productlist/Productlistslice";
const Checkout = () => {
    const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  let val = useSelector((state) => state.product.flag);

  const onSubmit = async(data) => {
    let username = JSON.parse(localStorage.getItem("token"));
    let items = JSON.parse(localStorage.getItem("cartItems")).items;
    let total = items.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);

    data = {...data,"username":username,"items":items,"total":total,"status":"Processing"};

    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Error creating order');
      }
  
      const result = await response.json();
      console.log('Order created:', result);
      
      let update = {"items":[]};
      localStorage.setItem("cartItems",JSON.stringify(update));
      // dispatch(increment());
      window.location.href = `/success/${result.id}`;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  let products = [];

  products = JSON.parse(localStorage.getItem("cartItems")).items;
  useEffect(() => {
    products = JSON.parse(localStorage.getItem("cartItems")).items;
   
  }, [val]);
  

  const handleRemoveClick = (event) => {
    let id = event.target.getAttribute("id");
    let ls = JSON.parse(localStorage.getItem("cartItems"));
    let items = ls.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        items.splice(i, 1);
        break; // Exit the loop after removing the element
      }
    }
    let newCart = { items: items };
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    dispatch(increment());
  };
  const handleAdd = (event) => {
    let id = event.target.getAttribute("name");
    let data = JSON.parse(localStorage.getItem("cartItems"));
    let items = data.items;
    let index = -1
    for(let i=0;i<=items.length;i++){
      if(items[i].id==id){
        index=i;break;
      }
      
    }
    if (index !== -1) {
      items[index].quantity = items[index].quantity + 1; // Increment the quantity of the item
    }
  
    localStorage.setItem("cartItems", JSON.stringify(data)); // Store the updated data back to localStorage
  
    dispatch(increment());
  };
  
  
  const handleSub = (event) => {
    let id = event.target.getAttribute("name");
    let data = JSON.parse(localStorage.getItem("cartItems"));
    let items = data.items;
    let index = -1
    for(let i=0;i<=items.length;i++){
      if(items[i].id==id){
        index=i;break;
      }
      
    }
    if (index !== -1) {
      items[index].quantity = items[index].quantity - 1; // Increment the quantity of the item
    }
  
    localStorage.setItem("cartItems", JSON.stringify(data)); // Store the updated data back to localStorage
  
    dispatch(increment());
  };
  var totalPrice = products
  .map(item => item.quantity * item.price)
  .reduce((acc, curr) => acc + curr, 0);
  useEffect(() => {
    if(totalPrice==0)
    navigate("/");
  
  }, [val])
  
  


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Column 1: Form inputs */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="flex items-center">
                <FaEnvelope className="mr-2" />
                Email
              </label>
              <input type="email" id="email" name="email" {...register('email', { required: true })} className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full" />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="flex items-center">
                <FaUser className="mr-2" />
                Name
              </label>
              <input type="text" id="name" name="name" {...register('name', { required: true })} className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full" />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                City
              </label>
              <input type="text" id="city" name="city" {...register('city', { required: true })} className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full" />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                Address
              </label>
              <textarea id="address" name="address" rows="4" {...register('address', { required: true })} className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full" />
            </div>

            <div className="mb-4">
              <label htmlFor="payment" className="flex items-center">
                <FaCreditCard className="mr-2" />
                Payment Method
              </label>
              <select id="payment" name="payment" {...register('payment', { required: true })} className="border border-gray-300 px-3 py-2 mt-1 rounded-md w-full">
                <option value="">Select payment method</option>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash-on-delivery">Cash on Delivery</option>
              </select>
            </div>

            <input type="submit" value="Place Order" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" />
          </form>
        </div>

        {/* Column 2: Product information */}
        <div>
          {/* Add your own code or components to display product information here */}
          {/* Leave space for displaying the products and add your own styling */}
          {/* You can add a comment like this to indicate where to insert your code */}
          {/* Add your product display logic here */}
          <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products.length != 0 ? (
                              products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt="No Image Available"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link
                                            to={`/product/${product.id - 1}`}
                                          >
                                            {product.title}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">${product.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <button
                                        class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                                        name={product.id}
                                        id="sub"
                                        onClick={handleSub}
                                        disabled={product.quantity <= 1}
                                      >
                                        -
                                      </button>
                                      <p className="text-gray-500">
                                        Qty {product.quantity}
                                      </p>
                                      <button
                                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                                        name={product.id}
                                        id="add"
                                        onClick={handleAdd}
                                        
                                      >
                                        +
                                      </button>{" "}
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          id={product.id}
                                          onClick = {handleRemoveClick}
                                         
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <h3>Empty</h3>
                            )}
                          </ul>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      </div>
                      </div>






        </div>
      </div>
    </div>
  );
};

export default Checkout;
