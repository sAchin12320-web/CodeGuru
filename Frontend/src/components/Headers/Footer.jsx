import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/classes" className="hover:underline">Courses</a>
            <a href="/about" className="hover:underline">About</a>
            <a href="/register" className="hover:underline">Register</a>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </div>
        </div>
        <div className="mb-8">
          <p className="my-2">Email: info@onlinecourses.com</p>
          <p className="my-2">Phone: +123 456 7890</p>
        </div>
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            <a href="https://www.facebook.com" className="text-gray-600 hover:text-blue-700 mx-2"><FaFacebookF size="24" /></a>
            <a href="https://www.twitter.com" className="text-gray-600 hover:text-blue-400 mx-2"><FaTwitter size="24" /></a>
            <a href="https://www.instagram.com" className="text-gray-600 hover:text-pink-600 mx-2"><FaInstagram size="24" /></a>
            <a href="https://www.linkedin.com" className="text-gray-600 hover:text-blue-800 mx-2"><FaLinkedinIn size="24" /></a>
          </div>
        </div>
        <div className="text-gray-500">
          &copy; {new Date().getFullYear()} OnlineCourses | All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
