//cart.js
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../productlist/Productlistslice";

export default function Cart(props) {
  const dispatch = useDispatch();
  let val = useSelector((state) => state.product.flag);

  let products = [];

  products = JSON.parse(localStorage.getItem("cartItems")).items;
  useEffect(() => {
    products = JSON.parse(localStorage.getItem("cartItems")).items;
    console.log("Your Cart Is : ", products);
   
  }, [val]);

  const handleClick = () => {
    props.setvisibility(false);
  };
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
    console.log("index:",items[index]);
    if (index !== -1) {
      items[index].quantity = items[index].quantity + 1; // Increment the quantity of the item
      console.log(data);
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
    console.log("index:",items[index]);
    if (index !== -1) {
      items[index].quantity = items[index].quantity - 1; // Increment the quantity of the item
      console.log(data);
    }
  
    localStorage.setItem("cartItems", JSON.stringify(data)); // Store the updated data back to localStorage
  
    dispatch(increment());
  };
  const totalPrice = products
  .map(item => item.quantity * item.price)
  .reduce((acc, curr) => acc + curr, 0);
  

  return (
    <Transition.Root show={props.visibility} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setvisibility}>
        <Transition.Child
          show={props.visibility}
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => props.setvisibility(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              onClick={handleClick}
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

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
                                          onClick={handleRemoveClick}
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
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
