// pages/pickle-business.js
import { useEffect, useRef } from 'react';

export default function PickleBusiness() {
  const textRefs = useRef([]);

  useEffect(() => {
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

    return () => {
      textRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-100 to-orange-50">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              background: i % 3 === 0 
                ? 'rgba(76, 175, 80, 0.5)' 
                : i % 3 === 1 
                ? 'rgba(255, 152, 0, 0.4)' 
                : 'rgba(255, 193, 7, 0.3)',
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-20">
          <h1 
            ref={el => textRefs.current[0] = el}
            className="text-4xl md:text-6xl font-bold opacity-0 translate-y-10"
          >
            Crunchy <span className="text-green-600">Pickles</span>, 
            <br className="md:hidden" /> Crisp <span className="text-orange-500">Business</span>
          </h1>

          <p 
            ref={el => textRefs.current[1] = el}
            className="text-xl text-gray-700 opacity-0 translate-y-10"
          >
            Our pickles are handcrafted using traditional recipes passed down through generations, ensuring authentic flavor in every bite.
          </p>

        
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s forwards;
        }
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
      `}</style>
    </div>
  );
}