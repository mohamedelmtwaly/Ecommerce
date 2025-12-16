import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { Navlinks } from '../components'
import { BsCart3 } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useEffect, useState } from "react";

import { userGlobal } from "../context/userContext";
import { useCartGlobalContext } from "../context/cartContext";

export default function Navbar() {

  const navigate = useNavigate()
  const { User} = userGlobal()
  const {NumberofCartitems } = useCartGlobalContext()

   function Logout(){

    localStorage.removeItem("token")
    localStorage.removeItem("name")

    navigate('/login')
   }
   
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className=" navbar align-element">
          {/* start */}
          <div className=" navbar-start">
            {/* title */}
            <NavLink to='/' className='hidden lg:flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl rounded-lg transition-all duration-300 shadow-md hover:shadow-lg' > FreshCart</NavLink>
            {/* Drobdown */}
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden" >
                  <FaBarsStaggered className=" h-6 w-6"/>
                </label>
                {User && <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-53 border border-gray-200">
                    <Navlinks/>
                
                </ul>}
              </div>
          </div>
          {/* center */}
          <div className="navbar-center hidden lg:flex">
            {User && <ul className=" menu menu-horizontal">
            <Navlinks/>
            </ul>}
          </div>
          {/* end */}
          <div className="navbar-end">
            {/* cart */}
            <NavLink to='/cart' className='btn btn-ghost btn-circle btn-md hover:bg-green-50 transition-colors duration-200'>
              <div className=" indicator">
                <BsCart3 className="h-6 w-6"/>
                {User && NumberofCartitems > 0 && (
                  <span className=" badge badge-sm bg-green-600 text-white border-green-600 indicator-item">
                      {NumberofCartitems}
                  </span>
                )}
              </div>
            </NavLink>
            
            {User ? (
              <button onClick={Logout} className="btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none ml-5 shadow-md hover:shadow-lg transition-all duration-300">
                Logout
              </button>
            ) : (
              <NavLink 
                to='/login' 
                className="btn bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none ml-5 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
    </nav>
  )
}