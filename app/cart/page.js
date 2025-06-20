// app/cart/page.js
"use client";

import { useState, useEffect } from 'react';
import { useCart } from '../../components/context/CartContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  useEffect(() => {
    // Calculate subtotal
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setSubtotal(total);
    
    // Calculate shipping: free for orders over ₹999, else ₹49
    setShipping(total > 999 ? 0 : 49);
    
    // Reset coupon if cart is empty
    if (cart.length === 0) {
      setAppliedCoupon('');
      setIsCouponApplied(false);
      setDiscount(0);
    }
  }, [cart]);

  const handleApplyCoupon = () => {
    if (appliedCoupon.toUpperCase() === 'PICKLE10') {
      setDiscount(subtotal * 0.1); // 10% discount
      setCouponMessage('10% discount applied!');
      setIsCouponApplied(true);
    } else if (appliedCoupon.toUpperCase() === 'FIRSTORDER') {
      setDiscount(100); // ₹100 discount
      setCouponMessage('₹100 discount applied!');
      setIsCouponApplied(true);
    } else {
      setCouponMessage('Invalid coupon code');
      setIsCouponApplied(false);
      setDiscount(0);
    }
  };

  const handleQuantityChange = (id, weight, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, weight, newQuantity);
    } else {
      removeFromCart(id, weight);
    }
  };

  const total = subtotal + shipping - discount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any delicious pickles to your cart yet!</p>
            <Link href="/veg-pickles">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full"
              >
                Browse Veg Pickles
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 bg-green-50 px-6 py-3 border-b border-green-100">
                <div className="col-span-5 font-medium text-green-800">Product</div>
                <div className="col-span-2 font-medium text-green-800">Price</div>
                <div className="col-span-3 font-medium text-green-800">Quantity</div>
                <div className="col-span-2 font-medium text-green-800 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cart.map((item, index) => (
                  <motion.div 
                    key={`${item.id}-${item.weight}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-12 gap-4 p-6"
                  >
                    {/* Product Info */}
                    <div className="col-span-12 md:col-span-5 flex items-start">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-100">
                        {item.imageUrl ? (
                          <Image 
                            src={item.imageUrl} 
                            alt={item.name} 
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl">🥒</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.weight}</p>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-4 md:col-span-2 flex items-center">
                      <div className="md:hidden text-gray-600 text-sm">Price:</div>
                      <div className="font-medium text-gray-900">₹{item.price.toFixed(2)}</div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-8 md:col-span-3 flex items-center">
                      <div className="md:hidden text-gray-600 text-sm mr-2">Qty:</div>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.weight, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:text-gray-900"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.weight, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:text-gray-900"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.weight)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Total */}
                    <div className="col-span-12 md:col-span-2 flex md:justify-end items-center mt-4 md:mt-0">
                      <div className="md:hidden text-gray-600 text-sm mr-2">Total:</div>
                      <div className="font-bold text-green-700">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="bg-white rounded-xl shadow-md mt-6 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Apply Coupon</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={appliedCoupon}
                  onChange={(e) => setAppliedCoupon(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isCouponApplied}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleApplyCoupon}
                  disabled={isCouponApplied}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    isCouponApplied 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Apply
                </motion.button>
              </div>
              {couponMessage && (
                <p className={`mt-3 text-sm ${isCouponApplied ? 'text-green-600' : 'text-red-600'}`}>
                  {couponMessage}
                </p>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-green-700">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg"
              >
                Proceed to Checkout
              </motion.button>
              
              <div className="mt-6 text-center">
                <Link href="/veg-pickles" className="text-green-600 hover:text-green-800 font-medium flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Info */}
            <div className="bg-green-50 rounded-xl shadow-md mt-6 p-6">
              <h3 className="text-lg font-medium text-green-800 mb-4">Order Information</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Free shipping on orders over ₹999</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Delivery in 3-5 business days</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Easy returns within 30 days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Mobile Order Summary */}
        <div className="lg:hidden mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `₹${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">-₹{discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-green-700">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg"
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>
    </div>
  );
}