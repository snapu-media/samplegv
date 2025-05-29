// Updated HeroSection component with image fixes
import { useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  useEffect(() => {
    // Add any custom scroll animations here if needed
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 to-emerald-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 animate-float rounded-full bg-emerald-200/30 mix-blend-multiply blur-2xl"></div>
        <div className="absolute -right-20 -bottom-20 h-96 w-96 animate-float-delayed rounded-full bg-yellow-200/30 mix-blend-multiply blur-2xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:flex lg:min-h-screen lg:items-center lg:px-8 lg:pt-0">
        {/* Text Content */}
        <div className="lg:w-1/2">
        <div className="space-y-8 text-center lg:text-left">
            <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                Crunchy, Tangy,
              </span>
              <span className="block mt-2 bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text text-transparent">
                Perfection in Every Jar
              </span>
            </h1>

            <p className="animate-fade-in-up mx-auto max-w-md text-lg text-gray-600 md:max-w-2xl md:text-xl lg:mx-0">
              Handcrafted organic pickles made with generations-old recipes. Experience the perfect balance of crispness and flavor that'll make your taste buds dance!
            </p>

           <div className="animate-fade-in-up flex flex-col sm:flex-row items-center gap-4 lg:justify-start">
  <div className="flex flex-row justify-center gap-2 sm:gap-4">
    <button className="group relative flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200">
      <span>Shop Now</span>
      <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
        &rarr;
      </span>
    </button>
    <button className="flex items-center rounded-full bg-white px-6 py-3 sm:px-8 sm:py-4 font-semibold text-emerald-700 ring-2 ring-emerald-600 transition-all hover:bg-emerald-50 hover:shadow-md">
      Learn More
    </button>
  </div>
</div>
          </div>
        </div>

        {/* Image Container - Updated Section */}
        <div className="relative mt-16 lg:mt-0 lg:w-1/2 lg:pl-8 xl:pl-16">
          <div className="animate-float mx-auto max-w-2xl lg:relative lg:h-full lg:max-w-none">
            {/* Glassmorphism Jar Label */}
            <div className="absolute left-1/2 bottom-16 z-10 -translate-x-1/2 translate-y-1/2 animate-float-delayed rounded-2xl bg-white/30 p-4 backdrop-blur-md sm:bottom-24 lg:bottom-20 xl:bottom-24">
      <div className="text-center">
        <span className="block font-bold text-emerald-800">Family Recipe</span>
        <span className="text-sm text-emerald-700">Since 1992</span>
      </div>
    </div>

            {/* Main Pickle Jar Image - Updated Container */}
           <div className="relative aspect-square w-full lg:aspect-[0.8] lg:h-[80vh] rounded-2xl overflow-hidden">
  <Image
    src="/heroimages/heroimg2.png"
    alt="Organic Pickle Jar"
    layout="fill"
    objectFit="contain"
    className="rotate-3 transform lg:rotate-2"
    priority
  />
</div>


            {/* Floating Herbs Decorations - Adjusted for Desktop */}
            <div className="absolute -left-20 top-1/3 h-24 w-24 animate-float-slow bg-[url('/dill.png')] bg-contain bg-no-repeat opacity-70 lg:-left-10 lg:top-1/4 lg:h-32 lg:w-32"></div>
            <div className="absolute -right-20 bottom-1/4 h-32 w-32 animate-float-slower bg-[url('/garlic.png')] bg-contain bg-no-repeat opacity-70 lg:-right-10 lg:bottom-1/3 lg:h-40 lg:w-40"></div>
          </div>
        </div>
      </div>

      {/* Keep custom animations the same */}
       <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out 1s infinite;
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 10s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}