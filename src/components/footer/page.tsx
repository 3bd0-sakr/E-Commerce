import React from "react";
import ShopIcon from "../shopicon/page";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-6 mt-15">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
        <div>
          <div className="flex items-center mb-3">
            <span><ShopIcon/></span>
            <h2 className="text-2xl font-semibold">ShopMart</h2>
          </div>
          <p className="text-gray-600 text-sm leading-6">
            Your one-stop destination for the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer service.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold text-lg mb-3">SHOP</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Garden</li>
            <li>Sports</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-lg mb-3">CUSTOMER SERVICE</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Track Your Order</li>
            <li>Returns & Exchanges</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold text-lg mb-3">POLICIES</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
            <li>Shipping Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}