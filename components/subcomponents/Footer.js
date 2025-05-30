export default function Footer(){
    return(
        <div>
              {/* Footer */}
      <footer className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">GV</span>
                </div>
                <span className="text-white font-bold text-xl">Green Valley Pickles</span>
              </div>
              <p className="max-w-xs mb-4">Delivering authentic Indian pickles worldwide with love and tradition.</p>
              <div className="flex space-x-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="bg-green-800 hover:bg-green-700 w-10 h-10 rounded-full flex items-center justify-center transition duration-300">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#home" className="hover:text-green-900 transition">Home</a></li>
                  <li><a href="#products" className="hover:text-green-900 transition">Products</a></li>
                  <li><a href="#about" className="hover:text-green-900 transition">About Us</a></li>
                  <li><a href="#testimonials" className="hover:text-green-900 transition">Testimonials</a></li>
                  <li><a href="#contact" className="hover:text-green-900 transition">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Products</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-green-900 transition">Mango Pickle</a></li>
                  <li><a href="#" className="hover:text-green-900 transition">Lemon Pickle</a></li>
                  <li><a href="#" className="hover:text-green-900 transition">Mixed Pickle</a></li>
                  <li><a href="#" className="hover:text-green-900 transition">Chili Pickle</a></li>
                  <li><a href="#" className="hover:text-green-900 transition">Garlic Pickle</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span>+91 98765 43210</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>info@greenvalleypickles.com</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>123 Spice Lane, Mumbai, India</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-900">
            <p>&copy; {new Date().getFullYear()} Green Valley Pickles. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </div>
    )
}