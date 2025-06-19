// pages/index.js
'use client';

import {useState, useEffect, useRef } from 'react';
import Image from 'next/image';


export default function PickleBusinessHome() {

  const textRefs = useRef([]);
  const particlesRef = useRef([]);
  const [scrolled, setScrolled] = useState(false);

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
              <div className="bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 rounded-xl w-full h-80 sm:h-64 md:h-84 relative overflow-hidden">
  <Image
    src="/pickle1.png" // Update with your actual image path
    alt="Artisanal Pickle Jar"
    fill
    className="object-fill"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    priority
  />
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    

     

    

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
