import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { fetchAllProductsAsync, increment } from "./Productlistslice";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Productlist() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  var products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
  ];

  const subCategories = [
    { name: "Totes", href: "#" },
    { name: "Backpacks", href: "#" },
    { name: "Travel Bags", href: "#" },
    { name: "Hip Bags", href: "#" },
    { name: "Laptop Sleeves", href: "#" },
  ];
  

  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: true },
        { value: "brown", label: "Brown", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "purple", label: "Purple", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "new-arrivals", label: "New Arrivals", checked: false },
        { value: "sale", label: "Sale", checked: false },
        { value: "travel", label: "Travel", checked: true },
        { value: "organization", label: "Organization", checked: false },
        { value: "accessories", label: "Accessories", checked: false },
      ],
    },
    {
      id: "size",
      name: "Size",
      options: [
        { value: "2l", label: "2L", checked: false },
        { value: "6l", label: "6L", checked: false },
        { value: "12l", label: "12L", checked: false },
        { value: "18l", label: "18L", checked: false },
        { value: "20l", label: "20L", checked: false },
        { value: "40l", label: "40L", checked: true },
      ],
    },
  ];

  const handleClick = (event) => {
    let id = event.target.getAttribute('id');
    let product = {};
    for(let i=0;i<=products.length;i++){
      if(products[i].id == id){
        product = products[i];
        break;
      }
    }
    
    let existingCartItems = JSON.parse(localStorage.getItem("cartItems"));
    let newItem = {
      "id": product.id,
      "title": product.title,
      "price": product.price,
      "quantity": 1,
      "image": product.thumbnail,
    };

    // Check if the new item already exists in the items array
    if (existingCartItems.items.some((item) => item.id === newItem.id)) {
      return; // If the item exists, exit the function to avoid duplicates
    }

    existingCartItems.items.push(newItem);
    let updatedArrayString = JSON.stringify(existingCartItems);
    localStorage.setItem("cartItems", updatedArrayString);
    dispatch(increment());
  };

  return (
    <div className="bg-warmGray-300">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-hidden"
            onClose={setMobileFiltersOpen}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Filters
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setMobileFiltersOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 relative flex-1 px-4 sm:px-6">
                        {/* Filters */}
                        <form className="space-y-6">
                          <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              Categories
                            </h3>
                            <ul role="list" className="mt-3 space-y-1">
                              {subCategories.map((category) => (
                                <li
                                  key={category.name}
                                  className="px-2 py-1 text-base"
                                >
                                  <a
                                    href={category.href}
                                    className="text-gray-900"
                                  >
                                    {category.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {filters.map((section) => (
                            <Disclosure
                              as="div"
                              key={section.id}
                              className="border-t border-gray-200 pt-6"
                            >
                              {({ open }) => (
                                <>
                                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {section.name}
                                  </h3>
                                  <div className="mt-3">
                                    <Disclosure.Button className="group relative w-full flex justify-between items-center py-2 text-sm font-medium text-gray-900">
                                      <span>{section.name}</span>
                                      <span className="ml-6 flex items-center">
                                        {open ? (
                                          <MinusIcon
                                            className="block h-4 w-4 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <PlusIcon
                                            className="block h-4 w-4 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                          />
                                        )}
                                      </span>
                                    </Disclosure.Button>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-200"
                                      enterFrom="opacity-0 max-h-0"
                                      enterTo="opacity-100 max-h-xl"
                                      leave="transition ease-in duration-150"
                                      leaveFrom="opacity-100 max-h-xl"
                                      leaveTo="opacity-0 max-h-0"
                                    >
                                      <Disclosure.Panel className="overflow-hidden transition-height ease-in-out duration-300">
                                        <div className="px-4 mt-2 space-y-4">
                                          {section.options.map(
                                            (option, optionIdx) => (
                                              <div
                                                key={option.value}
                                                className="flex items-center"
                                              >
                                                <input
                                                  id={`${section.id}-${optionIdx}`}
                                                  name={`${section.id}[]`}
                                                  defaultValue={option.value}
                                                  type="checkbox"
                                                  defaultChecked={
                                                    option.checked
                                                  }
                                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label
                                                  htmlFor={`${section.id}-${optionIdx}`}
                                                  className="ml-3 pr-6 text-sm font-medium text-gray-900"
                                                >
                                                  {option.label}
                                                </label>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </Disclosure.Panel>
                                    </Transition>
                                  </div>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </form>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-40 bg-white origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
              </button> */}
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="jsx
                                  ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}

              <div className="lg:col-span-3">
                {/* Your content my content starts here*/}
                <div className="bg-warmGray-500">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-warmGray-300">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                      Browse Our Products
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="max-w-xs mx-auto mb-8 bg-white rounded-md overflow-hidden shadow-lg"
                        >
                          <div className="relative">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="object-cover w-full h-64 sm:h-48 md:h-64 lg:h-56 xl:h-64"
                            />
                            <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-3 m-2 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 1l2.928 6.856 6.072.442-4.64 4.49 1.1 6.067L10 15.464l-5.46 2.29 1.1-6.067L1 8.298l6.072-.443L10 1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {product.rating}
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {product.title}
                            </h3>
                            <div className="flex items-center mt-2">
                              <span className="text-sm text-yellow-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-1"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 1l2.928 6.856 6.072.442-4.64 4.49 1.1 6.067L10 15.464l-5.46 2.29 1.1-6.067L1 8.298l6.072-.443L10 1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {product.rating}
                              </span>
                            </div>
                            <div className="flex justify-between mt-4">
                              <div className="text-lg font-medium text-gray-900">
                                ${product.price}
                              </div>
                              <div className="text-xs text-gray-500 line-through">
                                $
                                {Math.round(
                                  product.price +
                                    (product.price *
                                      product.discountPercentage) /
                                      100
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between mt-4">
                              <button
                                id={`${product.id}`}
                                className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2"
                                onClick={handleClick}
                              >
                                Add to Cart
                              </button>
                              <button className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded ml-2">
                                <Link to={`/product/${product.id}`}>
                                  View Product
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {products.map((product) => (
                        <div
                          key={product.id - 1}
                          className="max-w-xs mx-auto mb-8 bg-white rounded-md overflow-hidden shadow-lg"
                        >
                          <div className="relative">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="object-cover w-full h-64 sm:h-48 md:h-64 lg:h-56 xl:h-64"
                            />
                            <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-3 m-2 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 1l2.928 6.856 6.072.442-4.64 4.49 1.1 6.067L10 15.464l-5.46 2.29 1.1-6.067L1 8.298l6.072-.443L10 1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {product.rating}
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {product.title}
                            </h3>
                            <div className="flex items-center mt-2">
                              <span className="text-sm text-yellow-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-1"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 1l2.928 6.856 6.072.442-4.64 4.49 1.1 6.067L10 15.464l-5.46 2.29 1.1-6.067L1 8.298l6.072-.443L10 1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {product.rating}
                              </span>
                            </div>
                            <div className="flex justify-between mt-4">
                              <div className="text-lg font-medium text-gray-900">
                                ${product.price}
                              </div>
                              <div className="text-xs text-gray-500 line-through">
                                $
                                {Math.round(
                                  product.price +
                                    (product.price *
                                      product.discountPercentage) /
                                      100
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between mt-4">
                              <button
                                id={product.id}
                                className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2"
                                onClick={(event) => handleClick(event)}
                              >
                                Add to Cart
                              </button>
                              <button className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded ml-2">
                                <Link to={`/product/${product.id}`}>
                                  View Product
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
