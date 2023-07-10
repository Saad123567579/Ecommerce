import React  from 'react'
import {Link} from "react-router-dom";

const Admin = () => {
  


    
  
  

  return (
    <div className="grid grid-cols-4 gap-4 h-screen">
    {/* Sidebar */}
    <div className="col-span-1 bg-gray-100 p-4">
      {/* Vertical Tabs */}
      <ul className="space-y-4">
        <li>
          <Link
            to="/getmetoadmin/newproduct"
            className="text-gray-500 hover:text-gray-900 font-medium "
          >
            Add A Product
          </Link>
        </li>
        <li>
          <Link
            to="/getmetoadmin/orders"
            className="text-gray-500 hover:text-gray-900 font-medium "
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/getmetoadmin/stock"
            className="text-gray-500 hover:text-gray-900 font-medium "
          >
            Stocks
          </Link>
        </li>
      </ul>
    </div>
  
    {/* Content Area */}
    <div className="col-span-3 p-4 bg-white">
      {/* Content Goes Here */}
    </div>
  </div>
  
  )
}

export default Admin
