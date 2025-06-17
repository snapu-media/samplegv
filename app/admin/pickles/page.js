"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
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
            onClick={handleLogout}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 md:space-x-8 overflow-x-auto py-4">
              {['dashboard', 'products', 'add', 'orders', 'customers', 'analytics'].map((tab) => (
                <Link
                  key={tab}
                  href={tab === 'add' ? '/admin/products/add' : `/admin?tab=${tab}`}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'add' ? 'Add Product' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-6">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">
                {activeTab === 'add' ? 'Add New Product' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + ' Overview'}
              </h2>
              
              {/* Dashboard Content */}
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <StatCard title="Total Products" value="127" />
                  <StatCard title="Pending Orders" value="24" />
                  <StatCard title="New Customers" value="12" />
                </div>
              )}
              
              {/* Products Content */}
              {activeTab === 'products' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                    <h3 className="text-lg font-medium">Product List</h3>
                    <Link 
                      href="/admin/products/add"
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add New Product
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Seller</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[1, 2, 3].map((item) => (
                          <tr key={item}>
                            <td className="px-6 py-4 whitespace-nowrap">Spicy Dill Pickles</td>
                            <td className="px-6 py-4 whitespace-nowrap">Veg Pickle</td>
                            <td className="px-6 py-4 whitespace-nowrap">$5.99</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Yes
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                              <button className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Add Product Redirect */}
              {activeTab === 'add' && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p>Redirecting to add product page...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable stat card component
function StatCard({ title, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">{value}</p>
    </div>
  );
}