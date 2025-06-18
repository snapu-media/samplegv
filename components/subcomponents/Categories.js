// app/pickles/page.js
import React from 'react';
import Link from 'next/link';

export default function PickleCategories() {
  const categories = [
    {
      id: 'veg',
      title: 'Veg Pickles',
      description: 'Traditional vegetable-based pickles with authentic flavors',
      image: '/pickles/Mango1.jpg',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    },
    {
      id: 'non-veg',
      title: 'Non Veg Pickles',
      description: 'Meat and seafood specialty pickles',
      image: '/pickles/chicken1.jpg',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100'
    },
    {
      id: 'podi-karams',
      title: 'Podi/Karams',
      description: 'Spice blends and powders for authentic flavors',
      image: '/pickles/podi1.jpg',
      bgColor: 'bg-yellow-50',
      hoverColor: 'hover:bg-yellow-100'
    },
    {
      id: 'snacks',
      title: 'Snacks',
      description: 'Ready-to-eat pickle snacks and accompaniments',
      image: '/pickles/snacks1.jpg',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'others',
      title: 'Others',
      description: 'Special and seasonal varieties',
      image: '/pickles/others1.jpg',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Our Pickle Collection
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Handcrafted with traditional recipes passed down through generations
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-amber-500 rounded-full"></div>
          </div>
        </div>

       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
  {categories.map((category) => (
    <Link 
      key={category.id} 
      href={`/pickles/${category.id}`}
      className={`rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${category.bgColor} ${category.hoverColor}`}
    >
      <div className="flex flex-col h-full">
        {/* Image container with actual image */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={category.image} 
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{category.title}</h3>
          <p className="text-sm text-gray-600 mb-3 flex-grow">{category.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-amber-600 px-2 py-1 bg-amber-100 rounded-full">
              Explore
            </span>
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentic Homemade Pickles</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our pickles are made using traditional methods with the finest ingredients, ensuring authentic flavors and exceptional quality. 
            Each jar is crafted with care to bring you the taste of homemade goodness.
          </p>
        </div>
      </div>
    </div>
  );
}