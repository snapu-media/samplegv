"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AddProduct() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  
  // Form state
  const [product, setProduct] = useState({
    name: '',
    description: '',
    imageUrl: '',
    isBestSeller: false,
    category: '',
    weights: [
      { weight: '250gm', price: '' },
      { weight: '500gm', price: '' },
      { weight: '1kg', price: '' }
    ]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Categories
  const categories = [
    'Veg Pickle',
    'Non Veg Pickle',
    'Podis',
    'Snacks',
    'Sweets',
    'Chutneys',
    'Papads',
    'Others'
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setUser(user);
      }
    });
    
    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle weight price changes
  const handleWeightPriceChange = (index, value) => {
    const newWeights = [...product.weights];
    newWeights[index].price = value;
    setProduct({
      ...product,
      weights: newWeights
    });
  };

  // Add new weight option
  const addWeightOption = () => {
    setProduct({
      ...product,
      weights: [...product.weights, { weight: '', price: '' }]
    });
  };

  // Remove weight option
  const removeWeightOption = (index) => {
    if (product.weights.length <= 1) return;
    const newWeights = [...product.weights];
    newWeights.splice(index, 1);
    setProduct({
      ...product,
      weights: newWeights
    });
  };

  // Update weight label
  const handleWeightLabelChange = (index, value) => {
    const newWeights = [...product.weights];
    newWeights[index].weight = value;
    setProduct({
      ...product,
      weights: newWeights
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    // Basic validation
    if (!product.name || !product.description || !product.category) {
      setSubmitError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Validate at least one weight option has a price
    const hasValidPrice = product.weights.some(w => w.price && !isNaN(parseFloat(w.price)));
    if (!hasValidPrice) {
      setSubmitError('Please add at least one valid price for a weight option');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare weights data
      const weightsData = product.weights.map(w => ({
        weight: w.weight,
        price: parseFloat(w.price)
      })).filter(w => w.price && !isNaN(w.price));

      // Add product to Firestore
      await addDoc(collection(db, 'products'), {
        ...product,
        weights: weightsData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      setSubmitSuccess(true);
      // Reset form after successful submission
      setProduct({
        name: '',
        description: '',
        imageUrl: '',
        isBestSeller: false,
        category: '',
        weights: [
          { weight: '250gm', price: '' },
          { weight: '500gm', price: '' },
          { weight: '1kg', price: '' }
        ]
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding product: ', error);
      setSubmitError('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
              <span className="text-xl">🥒</span>
            </div>
            <h1 className="text-xl font-bold text-green-600">Pickles Admin</h1>
          </div>
          <button
            onClick={() => signOut(auth).then(() => router.push('/admin/login'))}
            className="text-red-600 hover:text-red-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Add New Pickle Product</h1>
              <button 
                onClick={() => router.push('/admin/products')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Products
              </button>
            </div>
            
            {submitError && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {submitError}
              </div>
            )}
            
            {submitSuccess && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                Product added successfully!
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Spicy Mango Pickle"
                    required
                  />
                </div>
                
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                {/* Best Seller */}
                <div className="flex items-end">
                  <div className="flex items-center h-5">
                    <input
                      id="isBestSeller"
                      name="isBestSeller"
                      type="checkbox"
                      checked={product.isBestSeller}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="isBestSeller" className="font-medium text-gray-700">
                      Mark as Best Seller
                    </label>
                  </div>
                </div>
                
                {/* Weight Options */}
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Weight Options & Prices *
                    </label>
                    <button
                      type="button"
                      onClick={addWeightOption}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Weight
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {product.weights.map((weightOption, index) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                        <div className="sm:col-span-5">
                          <label className="block text-xs text-gray-500 mb-1">
                            Weight
                          </label>
                          <input
                            type="text"
                            value={weightOption.weight}
                            onChange={(e) => handleWeightLabelChange(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            placeholder="e.g., 250gm, 500gm, 1kg"
                            required
                          />
                        </div>
                        <div className="sm:col-span-5">
                          <label className="block text-xs text-gray-500 mb-1">
                            Price (₹)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={weightOption.price}
                            onChange={(e) => handleWeightPriceChange(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            placeholder="Price for this weight"
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          {product.weights.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeWeightOption(index)}
                              className="w-full py-2 px-3 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center justify-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Image URL */}
                <div className="md:col-span-2">
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="https://example.com/pickle-image.jpg"
                  />
                  {product.imageUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                      <div className="border rounded-md p-2 w-40 h-40 flex items-center justify-center">
                        <img 
                          src={product.imageUrl} 
                          alt="Preview" 
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' /%3E%3C/svg%3E"}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={product.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe the product in detail..."
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Product...
                    </>
                  ) : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}