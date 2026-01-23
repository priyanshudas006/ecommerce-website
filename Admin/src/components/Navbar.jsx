import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <nav className="flex items-center justify-between px-[4%] sm:px-8">
      {/* Logo */}
      <img
        className="w-[max(10%,80px)]"
        src={assets.logo}
        alt="Logo"
      />

      {/* Logout Button */}
      <button onClick={()=>{setToken('')}} className="bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-sm hover:bg-gray-700 transition">
        Logout
      </button>
    </nav>
  )
}

export default Navbar
