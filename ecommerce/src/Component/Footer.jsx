import React, { useState } from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between">
      
        <div className="mb-6 md:mb-0">

          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: support@strickerslocker.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: 123 Football Street, Mumbai, India</p>
          
        </div>

     
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a  href="https://www.facebook.com"  target="_blank"  rel="noopener noreferrer"  className="hover:text-blue-500">
              Facebook
            </a>
            <a  href="https://www.instagram.com"  target="_blank"  rel="noopener noreferrer"  className="hover:text-pink-500">
              Instagram
            </a>
            <a    href="https://www.youtube.com"    target="_blank" rel="noopener noreferrer"   className="hover:text-red-500"  > YouTube  </a>
          </div>
        </div>
      </div>

    
      <div className="bg-gray-800 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} Stricker's Locker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
