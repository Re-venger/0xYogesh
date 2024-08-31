"use client";
import React, { useContext, useState } from "react";
import navlinks from "../../../Constants/navlinks";



const Navbar = () => {
  
  const [darktheme, setDarktheme] = useState(false);

  const handleTheme = () => 
    {
    setDarktheme(!darktheme);
    if(darktheme){
        document.body.id = "liteMode"
        console.log(document.body.id);
        
    }else{
        document.body.id = "darkMode"
        console.log(document.body.id);
    }
  };


  return (
    <nav className="flex items-center justify-between pt-5 mb-10 md:mb-16 px-4">
      <h1 className="text-xl md:text-2xl font-bold">0xYogesh</h1>
      <ul className="flex gap-4 font-mono text-sm md:text-normal">
        {navlinks.map((link) => {
          return (
            <li key={link.id}>
              <a href={link.url}>{link.title}</a>
            </li>
          );
        })}
        <button onClick={handleTheme}>{darktheme ? "dark" : "lite"}</button>
      </ul>
    </nav>
  );
};

export default Navbar;
