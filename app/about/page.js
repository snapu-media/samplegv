// app/about/page.js
'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { FaLeaf, FaHandsHelping, FaHeart, FaAward } from 'react-icons/fa';

export default function AboutPage() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } }
  };

  const values = [
    { 
      icon: FaLeaf, 
      title: "Natural Ingredients", 
      description: "We use only the freshest vegetables and natural spices in our recipes" 
    },
    { 
      icon: FaHandsHelping, 
      title: "Traditional Methods", 
      description: "Our pickles are made using time-honored techniques passed down through generations" 
    },
    { 
      icon: FaHeart, 
      title: "Made with Love", 
      description: "Every jar is prepared with care and attention to detail" 
    },
    { 
      icon: FaAward, 
      title: "Quality Guarantee", 
      description: "We stand behind the exceptional taste and quality of every product" 
    }
  ];

  const timeline = [
    { 
      year: "1995", 
      title: "Family Recipe Beginnings", 
      description: "Grandma Priya started making pickles in her home kitchen using recipes from her village in Punjab" 
    },
    { 
      year: "2005", 
      title: "First Farmers Market Stall", 
      description: "We set up our first stall at the local farmers market, introducing our pickles to the community" 
    },
    { 
      year: "2015", 
      title: "Commercial Kitchen", 
      description: "With growing demand, we established our first certified commercial production facility" 
    },
    { 
      year: "2020", 
      title: "National Distribution", 
      description: "Our products became available in specialty stores across the country" 
    },
    { 
      year: "2023", 
      title: "International Recognition", 
      description: "Won the Gourmet Gold Award for Best Artisanal Pickle Brand" 
    }
  ];

  const team = [
    { 
      name: "Priya Sharma", 
      role: "Founder & Master Pickler", 
      bio: "With over 30 years of experience, Priya brings traditional recipes to life",
      img: "/team-priya.jpg"
    },
    { 
      name: "Raj Patel", 
      role: "Production Manager", 
      bio: "Ensures every jar meets our exacting standards of quality",
      img: "/team-raj.jpg"
    },
    { 
      name: "Ananya Gupta", 
      role: "Head of Innovation", 
      bio: "Develops new flavors while respecting our heritage recipes",
      img: "/team-ananya.jpg"
    },
    { 
      name: "Vikram Singh", 
      role: "Distribution Director", 
      bio: "Makes sure our pickles reach you fresh and on time",
      img: "/team-vikram.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="w-full lg:w-1/2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 mb-6"
                variants={item}
              >
                Our <span className="text-amber-500">Pickle</span> Journey
              </motion.h1>
              
              <motion.p 
                className="text-xl text-green-800 mb-8 max-w-2xl"
                variants={item}
              >
                From a family kitchen to your table, we've been crafting exceptional pickles with passion and tradition for over 25 years.
              </motion.p>
              
              <motion.div variants={item}>
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  Taste Our Story
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-amber-100 to-green-50 rounded-3xl shadow-2xl p-6 transform rotate-3">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 rounded-xl w-full h-80 sm:h-64 md:h-90 relative overflow-hidden">
                     <Image
                       src="/pickle2.png" // Update with your actual image path
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
              
              <div className="absolute -bottom-6 -left-6 bg-green-200 rounded-full w-40 h-40 z-0"></div>
              <div className="absolute -top-6 -right-6 bg-amber-200 rounded-full w-32 h-32 z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-50 to-white -translate-y-full"></div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Our Humble Beginnings</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-xl text-green-800 max-w-3xl mx-auto">
              What started as a family tradition has grown into a beloved brand, but our commitment to quality remains unchanged.
            </p>
          </motion.div>
          
          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {timeline.map((event, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row mb-16"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="md:w-1/3 mb-4 md:mb-0"
                  variants={item}
                >
                  <div className="flex items-center">
                    <div className="bg-amber-500 rounded-full w-4 h-4"></div>
                    <div className="h-px bg-green-300 flex-grow mx-2"></div>
                    <span className="text-2xl font-bold text-amber-600">{event.year}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="md:w-2/3 bg-green-50 rounded-2xl p-6 md:ml-4 shadow-md border border-green-100"
                  variants={item}
                >
                  <h3 className="text-xl font-bold text-green-900 mb-2">{event.title}</h3>
                  <p className="text-green-800">{event.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 relative bg-gradient-to-br from-green-100 to-amber-50">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-green-100 -translate-y-full"></div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-xl text-green-800 max-w-3xl mx-auto">
              These principles guide every jar we make and every decision we take.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 text-center"
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-2xl text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-3">{value.title}</h3>
                <p className="text-green-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-50 to-white -translate-y-full"></div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Meet Our Pickle Artisans</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-xl text-green-800 max-w-3xl mx-auto">
              The passionate team behind every jar of crunchy goodness.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-5">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white">{member.bio}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-green-900">{member.name}</h3>
                <p className="text-amber-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-900 to-green-800 text-white relative overflow-hidden">
        <div className="absolute -top-32 -right-32 bg-green-700 opacity-20 rounded-full w-96 h-96"></div>
        <div className="absolute -bottom-40 -left-40 bg-amber-500 opacity-20 rounded-full w-80 h-80"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to Excellence</h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-8"></div>
              <p className="text-xl mb-10 opacity-90">
                We promise to always use the finest ingredients, traditional methods, and sustainable practices to bring you pickles that taste like home.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <motion.div 
                  className="bg-green-800 bg-opacity-30 rounded-xl p-4"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="text-4xl mb-3">🥒</div>
                  <h3 className="font-bold text-lg">100% Natural</h3>
                </motion.div>
                
                <motion.div 
                  className="bg-green-800 bg-opacity-30 rounded-xl p-4"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="text-4xl mb-3">🌱</div>
                  <h3 className="font-bold text-lg">Eco-Friendly</h3>
                </motion.div>
                
                <motion.div 
                  className="bg-green-800 bg-opacity-30 rounded-xl p-4"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="text-4xl mb-3">❤️</div>
                  <h3 className="font-bold text-lg">Handcrafted</h3>
                </motion.div>
                
                <motion.div 
                  className="bg-green-800 bg-opacity-30 rounded-xl p-4"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="font-bold text-lg">Award Winning</h3>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-3xl p-10 md:p-16 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 bg-white bg-opacity-20 rounded-full w-64 h-64"></div>
            <div className="absolute -bottom-24 -left-24 bg-white bg-opacity-20 rounded-full w-80 h-80"></div>
            
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">Ready to Taste Tradition?</h2>
              <p className="text-xl text-green-800 mb-8 max-w-2xl mx-auto">
                Experience the authentic flavors that have delighted families for generations.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href='/#pickles'>
                <motion.button
                  className="bg-green-800 hover:bg-green-900 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Our Pickles
                </motion.button>
                </a>
                <a href=''>
                <motion.button
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-green-800 font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit Our Store
                </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
        .timeline-dot {
          min-width: 16px;
          min-height: 16px;
        }
        .bg-dotted-pattern {
          background-image: radial-gradient(rgba(134, 239, 172, 0.2) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}