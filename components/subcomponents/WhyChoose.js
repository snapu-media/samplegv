// pages/index.js
'use client';

import {useState, useEffect, useRef } from 'react';
import Image from 'next/image';


export default function WhyChoose() {

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
    

      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[1] = el}>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Why Choose Our Pickles?</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We combine tradition with quality to bring you the finest pickles
            </p>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[2] = el}>
              <div className="text-green-500 mb-2">
                <div className="bg-green-100 w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-md md:text-xl font-bold text-green-900 mb-3">Premium Quality</h3>
              <p className="text-sm md:text-lg text-gray-700">Made with the finest ingredients and traditional recipes for authentic taste.</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[3] = el}>
              <div className="text-green-500 mb-2">
                <div className="bg-green-100 w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-md md:text-xl font-bold text-green-900 mb-3">Worldwide Delivery</h3>
              <p className="text-sm md:text-lg text-gray-700">We deliver across India and worldwide with secure packaging.</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[4] = el}>
              <div className="text-green-500 mb-2">
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

    

    {/* About Section */}
<section id="about" className="py-16 sm:py-20 bg-green-50 px-4">
  <div className="container mx-auto">
    <div className="flex flex-col lg:flex-row items-center">
      {/* Image Column - full width on mobile, half on desktop */}
       <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-8 xl:pr-10 opacity-0 translate-y-10 animate-fadeInUp" 
           ref={el => textRefs.current[12] = el}>
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 transform lg:-rotate-3">
          <div className="relative rounded-lg sm:rounded-xl w-full h-64 sm:h-80 md:h-96 overflow-hidden">
            <Image
              src="/ourstory.jpg" // Update with your actual image path
              alt="Green Valley Pickles Story"
              layout="fill"
              objectFit="cover"
              className="rounded-lg sm:rounded-xl"
            />
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