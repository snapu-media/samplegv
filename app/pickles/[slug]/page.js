// app/pickles/veg/[slug]/page.js
"use client";

import { useState, useEffect } from 'react';
import { use } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import Image from 'next/image';
import { useCart } from '../../../components/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const { slug } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'products'), 
          where('category', '==', 'Veg Pickle'));
        
        const querySnapshot = await getDocs(q);
        const productsData = [];
        
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        
        // Find product that matches the slug
        const foundProduct = productsData.find(p => {
          const productSlug = p.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
          return productSlug === slug;
        });
        
        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.weights && foundProduct.weights.length > 0) {
            setSelectedWeight(foundProduct.weights[0]);
          }
          
          // Get related products
          const related = productsData
            .filter(p => p.id !== foundProduct.id)
            .slice(0, 3);
          setRelatedProducts(related);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product && selectedWeight) {
      addToCart({
        id: product.id,
        name: product.name,
        price: selectedWeight.price,
        weight: selectedWeight.weight,
        quantity,
        imageUrl: product.imageUrl,
        slug: slug
      });
      
      // Show toast notification
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="text-gray-600 mt-2">The requested pickle could not be found</p>
          <Link href="/veg-pickles" className="mt-4 inline-block text-green-600 hover:text-green-800">
            Browse our pickles →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
          {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Added to cart!
          </div>
        </motion.div>
      )}
      {/* Product Section */}
      <section className="py-12 md:py-16 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-contain"
                      priority
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-green-100 to-amber-100 h-full flex items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-40 h-40 flex items-center justify-center">
                        <span className="text-5xl">🥒</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="w-full md:w-1/2">
              <div className="sticky top-24">
                <div className="mb-6">
                  <button 
                    onClick={() => router.back()}
                    className="inline-flex items-center text-green-600 hover:text-green-800 mb-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Veg Pickles
                  </button>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  
                  {product.isBestSeller && (
                    <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                      Best Seller
                    </span>
                  )}
                  
                  <p className="text-gray-700 text-lg mb-6">
                    {product.description}
                  </p>
                </div>
                
                {/* Weight Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Size:</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.weights.map((weight, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedWeight(weight)}
                        className={`px-4 py-2 rounded-lg border-2 ${
                          selectedWeight?.weight === weight.weight
                            ? 'border-green-600 bg-green-50 text-green-800 font-bold'
                            : 'border-gray-300 hover:border-green-500'
                        } transition-colors`}
                      >
                        <span>{weight.weight}</span>
                        <span className="block text-sm mt-1">₹{weight.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity and Add to Cart */}
                <div className="mb-8">
                  <div className="flex items-center gap-6">
                    <div>
                      <label className="text-lg font-semibold text-gray-900 mb-2 block">Quantity:</label>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {selectedWeight && (
                      <div>
                        <div className="text-lg font-semibold text-gray-900 mb-2">Total:</div>
                        <div className="text-2xl font-bold text-green-700">
                          ₹{(selectedWeight.price * quantity).toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={!selectedWeight}
                  className={`w-full py-4 px-6 rounded-xl text-lg font-bold text-white shadow-lg ${
                    selectedWeight 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  Add to Cart
                </motion.button>
                
                {/* Product Highlights */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Why You'll Love It:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Made with authentic family recipes passed down for generations</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">100% natural ingredients with no artificial preservatives</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Handcrafted in small batches for consistent quality</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Perfect balance of spices that enhances any meal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Story */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Story Behind Our <span className="text-green-700">{product.name}</span>
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 text-lg mb-6">
              This pickle has a special place in our family's culinary heritage. Originating from the kitchens of Punjab, 
              this recipe was perfected by our grandmother who would make it every summer during mango season.
            </p>
            
            <p className="text-gray-700 text-lg mb-6">
              What makes our {product.name} unique is the careful selection of ingredients. We source organic 
              {product.name.toLowerCase().includes('mango') ? ' mangoes' : ' vegetables'} from local farms and 
              use a special blend of spices that are toasted and ground fresh for each batch.
            </p>
            
            <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100 my-8">
              <h3 className="text-xl font-bold text-green-900 mb-3">Traditional Preparation</h3>
              <p className="text-gray-700 mb-4">
                Each jar is prepared using traditional methods:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sun-dried for natural preservation</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hand-mixed in ceramic vessels</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Aged for 6-8 weeks for optimal flavor</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No artificial preservatives</span>
                </li>
              </ul>
            </div>
            
            <p className="text-gray-700 text-lg">
              We take pride in bringing you this authentic taste of India, prepared with the same care and attention 
              that our grandmother put into every batch she made. We hope you enjoy it as much as our family has for generations.
            </p>
          </div>
        </div>
      </section>

      {/* Serving Suggestions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serving Suggestions
            </h2>
            <p className="text-xl text-gray-600">
              Delicious ways to enjoy your {product.name}
            </p>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-amber-100 to-green-100 flex items-center justify-center">
                <span className="text-6xl">🍚</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">With Rice Dishes</h3>
                <p className="text-gray-600">
                  Pair with biryani, pulao, or simple steamed rice for a flavor boost
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-amber-100 to-green-100 flex items-center justify-center">
                <span className="text-6xl">🍞</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">With Breads</h3>
                <p className="text-gray-600">
                  Perfect accompaniment to parathas, rotis, or naan
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-amber-100 to-green-100 flex items-center justify-center">
                <span className="text-6xl">🥗</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">As a Condiment</h3>
                <p className="text-gray-600">
                  Add to sandwiches, wraps, or salads for a tangy kick
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                You Might Also Like
              </h2>
              <p className="text-gray-600 text-xl">
                Explore more of our delicious veg pickles
              </p>
              <div className="w-24 h-1 bg-green-600 mx-auto mt-6"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((product) => {
                const productSlug = product.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w\-]+/g, '')
                  .replace(/\-\-+/g, '-')
                  .replace(/^-+/, '')
                  .replace(/-+$/, '');
                
                return (
                  <div 
                    key={product.id}
                    onClick={() => router.push(`/pickles/veg/${productSlug}`)}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl cursor-pointer"
                  >
                    <div className="relative h-64">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="bg-gradient-to-br from-green-100 to-amber-100 h-full flex items-center justify-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center">
                            <span className="text-3xl">🥒</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Starting at:</h4>
                          <div className="text-green-700 font-bold">
                            ₹{Math.min(...product.weights.map(w => w.price))}
                          </div>
                        </div>
                        
                        <button className="text-green-600 hover:text-green-800 font-medium flex items-center">
                          View Details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Authentic Flavors?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of satisfied customers enjoying our handcrafted veg pickles
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg"
          >
            {selectedWeight 
              ? `Add to Cart - ₹${(selectedWeight.price * quantity).toFixed(2)}` 
              : 'Add to Cart'}
          </motion.button>
          <div className="mt-4">
            <button 
              onClick={() => router.push('/veg-pickles')}
              className="inline-block text-amber-300 hover:text-amber-100 font-medium"
            >
              Or browse more veg pickles →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}