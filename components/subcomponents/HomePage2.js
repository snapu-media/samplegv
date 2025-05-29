// pages/index.js
'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function PickleBusinessHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const textRefs = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Text reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    textRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Create floating particles
    const particles = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        id: i,
        size: Math.random() * 15 + 5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        color: i % 4 === 0 ? '#86efac' : i % 4 === 1 ? '#4ade80' : i % 4 === 2 ? '#22c55e' : '#facc15',
      });
    }
    particlesRef.current = particles;

    return () => {
      window.removeEventListener('scroll', handleScroll);
      textRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
    

    
      {/* Hero Section */}
      {/* Hero Section */}
<section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-white z-0"></div>
  
  {/* Floating decorative elements - positioned for mobile */}
  <div className="md:hidden absolute top-10 right-10 bg-green-100 rounded-full w-40 h-40 opacity-70 z-0"></div>
  <div className="md:hidden absolute bottom-10 left-10 bg-green-200 rounded-full w-32 h-32 opacity-70 z-0"></div>
  
  <div className="container mx-auto px-4 sm:px-6 relative z-10">
    <div className="flex flex-col lg:flex-row items-center">
      {/* Text Content - full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <div className="opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[0] = el}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 mb-4 sm:mb-6">
            Crunchy <span className="text-green-500">Pickles</span>,
            <br className="hidden sm:inline" /> 
            Crisp <span className="text-orange-400">Flavors</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-lg">
            Handcrafted pickles made with traditional recipes, fresh ingredients, and a whole lot of love. Experience the authentic taste of India in every bite.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 transform hover:scale-105 text-sm sm:text-base">
              Shop Now
            </button>
            <button className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 text-sm sm:text-base">
              Our Story
            </button>
          </div>
        </div>
      </div>
      
      {/* Image Content - full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 flex justify-center mt-8 sm:mt-12 lg:mt-0">
        <div className="relative w-full max-w-md">
          {/* Decorative circles - hidden on mobile, visible on desktop */}
          <div className="hidden md:block bg-green-100 rounded-full w-64 h-64 absolute -top-6 -left-6 z-0"></div>
          <div className="hidden md:block bg-green-200 rounded-full w-48 h-48 absolute -bottom-6 -right-6 z-0"></div>
          
          <div className="relative z-10 animate-float">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 transform md:rotate-6">
              <div className="bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 rounded-xl w-full h-56 sm:h-64 md:h-80 flex items-center justify-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[1] = el}>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Why Choose Our Pickles?</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We combine tradition with quality to bring you the finest pickles
            </p>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[2] = el}>
              <div className="text-green-500 mb-4">
                <div className="bg-green-100 w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-md md:text-xl font-bold text-green-900 mb-3">Premium Quality</h3>
              <p className="text-gray-700">Made with the finest ingredients and traditional recipes for authentic taste.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[3] = el}>
              <div className="text-green-500 mb-4">
                <div className="bg-green-100 w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-md md:text-xl font-bold text-green-900 mb-3">Worldwide Delivery</h3>
              <p className="text-sm md:text-lg text-gray-700">We deliver across India and worldwide with secure packaging.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[4] = el}>
              <div className="text-green-500 mb-4">
                <div className="bg-green-100 w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-md md:text-xl font-bold text-green-900 mb-3">100% Natural</h3>
              <p className="text-sm md:text-lg text-gray-700">No artificial preservatives or colors. Just pure, natural goodness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
     <section id="products" className="py-16 sm:py-20 px-4 bg-white">
  <div className="container mx-auto">
    <div className="text-center mb-12 sm:mb-16 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[5] = el}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3 sm:mb-4">
        Our Premium Pickle Collection
      </h2>
      <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
        Discover our range of authentic Indian pickles
      </p>
      <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-green-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
    </div>
    
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 opacity-0 translate-y-10 animate-fadeInUp" 
          ref={el => textRefs.current[6 + index] = el}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="relative overflow-hidden h-40 sm:h-56 md:h-64">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-t-lg sm:rounded-t-xl w-full h-full flex items-center justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 sm:w-32 sm:h-32" />
            </div>
            {product.isBestSeller && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs sm:text-sm font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                Best Seller
              </div>
            )}
          </div>
          <div className="p-3 sm:p-4 md:p-6">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-green-900 mb-1 sm:mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 md:mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 font-bold text-sm sm:text-base md:text-lg">
                ₹{product.price}
              </span>
              <button className="bg-green-100 hover:bg-green-200 text-green-800 text-xs sm:text-sm font-medium py-1 px-2 sm:py-2 sm:px-3 rounded-full transition duration-300 whitespace-nowrap">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    {/* About Section */}
<section id="about" className="py-16 sm:py-20 bg-green-50 px-4">
  <div className="container mx-auto">
    <div className="flex flex-col lg:flex-row items-center">
      {/* Image Column - full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-8 xl:pr-10 opacity-0 translate-y-10 animate-fadeInUp" 
           ref={el => textRefs.current[12] = el}>
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 transform lg:-rotate-3">
          <div className="bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl w-full h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48" />
          </div>
        </div>
      </div>
      
      {/* Text Column - full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 opacity-0 translate-y-10 animate-fadeInUp" 
           ref={el => textRefs.current[13] = el}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-4 sm:mb-6">
          Our Story
        </h2>
        <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
          Green Valley Pickles was founded with a passion for preserving traditional pickle recipes that have been passed down through generations.
        </p>
        <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
          What started as a small family kitchen experiment has now grown into a brand that delivers authentic Indian pickles to customers worldwide.
        </p>
        <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
          We take pride in using only the freshest ingredients and traditional methods to create pickles that remind you of home.
        </p>
        <div className="flex items-center bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-md">
          <div className="mr-3 sm:mr-4">
            <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-green-900">Global Presence</h4>
            <p className="text-gray-700 text-sm sm:text-base">Delivering to 15+ countries with love</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[14] = el}>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-700">Real experiences from pickle lovers</p>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-green-50 p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 opacity-0 translate-y-10 animate-fadeInUp"
                ref={el => textRefs.current[15 + index] = el}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-green-500' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
                  <div>
                    <h4 className="font-bold text-green-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">GV</span>
                </div>
                <span className="text-white font-bold text-xl">Green Valley Pickles</span>
              </div>
              <p className="max-w-xs mb-4">Delivering authentic Indian pickles worldwide with love and tradition.</p>
              <div className="flex space-x-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="bg-green-800 hover:bg-green-700 w-10 h-10 rounded-full flex items-center justify-center transition duration-300">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#home" className="hover:text-green-900 transition">Home</a></li>
                  <li><a href="#products" className="hover:text-green-900 transition">Products</a></li>
                  <li><a href="#about" className="hover:text-green-900 transition">About Us</a></li>
                  <li><a href="#testimonials" className="hover:text-green-900 transition">Testimonials</a></li>
                  <li><a href="#contact" className="hover:text-green-900 transition">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Products</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-green-900 transition">Mango Pickle</a></li>
                  <li><a href="#" className="hover:text-green-900 transition">Lemon Pickle</a></li>
                  <li><a href="#" className="hover:text-green-900 transition">Mixed Pickle</a></li>
                  <li><a href="#" className="hover:text-green-900 transition">Chili Pickle</a></li>
                  <li><a href="#" className="hover:text-green-900 transition">Garlic Pickle</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span>+91 98765 43210</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>info@greenvalleypickles.com</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>123 Spice Lane, Mumbai, India</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-900">
            <p>&copy; {new Date().getFullYear()} Green Valley Pickles. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
        }
      `}</style>
    </div>
  );
}

// Sample data  
const products = [
  {
    name: "Royal Mango Pickle",
    description: "Authentic Punjabi style mango pickle with aromatic spices",
    price: "349",
    isBestSeller: true
  },
  {
    name: "Classic Lemon Pickle",
    description: "Tangy and spicy lemon pickle made with traditional ingredients",
    price: "299",
    isBestSeller: false
  },
  {
    name: "Andhra Avakaya Pickle",
    description: "Bold and spicy mango pickle from Andhra Pradesh",
    price: "379",
    isBestSeller: true
  },
  {
    name: "Garlic Pickle",
    description: "Flavor-packed garlic pickle with a spicy twist",
    price: "319",
    isBestSeller: false
  },
  {
    name: "Mixed Vegetable Pickle",
    description: "A crunchy mix of vegetables in a spicy masala base",
    price: "289",
    isBestSeller: false
  },
  {
    name: "Green Chili Pickle",
    description: "Hot and spicy green chili pickle for heat lovers",
    price: "269",
    isBestSeller: false
  }
];

const testimonials = [
  {
    name: "Anita Sharma",
    location: "Mumbai, India",
    rating: 5,
    comment: "Absolutely loved the Royal Mango Pickle! Reminded me of my grandmother’s recipe. Will definitely order again."
  },
  {
    name: "David Thompson",
    location: "Leicester, UK",
    rating: 4,
    comment: "The Lemon Pickle had the perfect tang and spice balance. Packaging was also impressive."
  },
  {
    name: "Priya Verma",
    location: "Bangalore, India",
    rating: 5,
    comment: "Andhra Avakaya is a must-try! Super authentic taste and excellent quality."
  }
];