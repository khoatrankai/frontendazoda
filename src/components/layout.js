"use client"
import React, { useContext } from "react";
import Navbar from "./Navbar.js";
import CheckProvider from "@/Context/CheckPage.js";


const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      <Navbar />
      
        <div className="container px-6 pt-20 pb-3 bg-stone-300">
        <CheckProvider>
          {children}
        </CheckProvider>
        </div>
      
    </div>
  );
};

export default Layout;