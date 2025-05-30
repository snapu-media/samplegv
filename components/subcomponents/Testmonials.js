// pages/index.js
'use client';

import {useState, useEffect, useRef } from 'react';


export default function Testimonials() {

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

    {/* Testimonials Section */}
<section id="testimonials" className="py-16 sm:py-20 px-4 bg-white">
  <div className="container mx-auto">
    <div className="text-center mb-12 sm:mb-16 opacity-0 translate-y-10 animate-fadeInUp" ref={el => textRefs.current[14] = el}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3 sm:mb-4">
        What Our Customers Say
      </h2>
      <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
        Real experiences from pickle lovers
      </p>
      <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-green-500 mx-auto mt-4 sm:mt-6 rounded-full"></div>
    </div>
    
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className="bg-green-50 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transition duration-300 opacity-0 translate-y-10 animate-fadeInUp"
          ref={el => textRefs.current[15 + index] = el}
        >
          <div className="flex items-center mb-3 sm:mb-4">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.rating ? 'text-green-500' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700 italic mb-4 sm:mb-6 text-xs sm:text-sm">
            "{testimonial.comment}"
          </p>
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3"></div>
            <div>
              <h4 className="font-bold text-green-900 text-sm sm:text-base">{testimonial.name}</h4>
              <p className="text-gray-600 text-xs sm:text-sm">{testimonial.location}</p>
            </div>
          </div>
        </div>
      ))}
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