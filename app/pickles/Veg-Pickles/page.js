"use client";

const products = [
  {
    name: "Royal Mango Pickle",
    description: "Authentic Punjabi style mango pickle with aromatic spices",
    price: "349",
    isBestSeller: true,
    image: "https://images.unsplash.com/photo-1603105037880-8805c7b1d7c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuZ28lMjBwaWNrbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Classic Lemon Pickle",
    description: "Tangy and spicy lemon pickle made with traditional ingredients",
    price: "299",
    isBestSeller: false,
    image: "https://images.unsplash.com/photo-1586796446657-1d0a8cbd7d45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVtb24lMjBwaWNrbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Andhra Avakaya Pickle",
    description: "Bold and spicy mango pickle from Andhra Pradesh",
    price: "379",
    isBestSeller: true,
    image: "https://images.unsplash.com/photo-1612522016694-0a2f5d3e9a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW5kaHJhJTIwcGlja2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Garlic Pickle",
    description: "Flavor-packed garlic pickle with a spicy twist",
    price: "319",
    isBestSeller: false,
    image: "https://images.unsplash.com/photo-1633352616330-1c5f5f0f5e0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FybGljJTIwcGlja2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Mixed Vegetable Pickle",
    description: "A crunchy mix of vegetables in a spicy masala base",
    price: "289",
    isBestSeller: false,
    image: "https://images.unsplash.com/photo-1603105037880-8805c7b1d7c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWl4ZWQlMjB2ZWdldGFibGUlMjBwaWNrbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Green Chili Pickle",
    description: "Hot and spicy green chili pickle for heat lovers",
    price: "269",
    isBestSeller: false,
    image: "https://images.unsplash.com/photo-1603361513133-3bd1f0b6a9c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBjaGlsaSUyMHBpY2tsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  }
];

export default function VegPicklePrices() {
  return (
    <div className="bg-white">
      {/* Products Section */}
      <section id="products" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3">
              Our Premium Pickle Collection
            </h2>
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
              Discover our range of authentic Indian pickles
            </p>
            <div className="w-20 h-0.5 bg-green-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full"
              >
                {/* Image container with actual image */}
                <div className="relative overflow-hidden h-40 sm:h-48">
                  <div className="w-full h-full">
                    {/* Actual product image */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  {product.isBestSeller && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Best Seller
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-base font-bold text-green-900 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-green-600 font-bold text-sm sm:text-base">
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
    </div>
  );
}