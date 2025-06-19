// app/contact/page.js
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        formRef.current.reset();
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const socialIcons = [
    { icon: FaInstagram, name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { icon: FaFacebookF, name: 'Facebook', color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { icon: FaTwitter, name: 'Twitter', color: 'bg-gradient-to-r from-sky-400 to-sky-600' },
    { icon: FaYoutube, name: 'YouTube', color: 'bg-gradient-to-r from-red-500 to-red-700' },
    { icon: FaWhatsapp, name: 'WhatsApp', color: 'bg-gradient-to-r from-green-500 to-green-600' },
    { icon: FaEnvelope, name: 'Email', color: 'bg-gradient-to-r from-amber-500 to-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
     

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-green-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Contact Crunchy Pickles Co.
          </motion.h1>
          <motion.p 
            className="text-xl text-green-700 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We'd love to hear from you! Reach out for orders, wholesale inquiries, or just to say hello.
          </motion.p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Contact Form - Left Side */}
            <motion.div 
              className="w-full lg:w-1/2 p-8 md:p-12"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.h2 
                className="text-3xl font-bold text-green-900 mb-8"
                variants={item}
              >
                Send us a message
              </motion.h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={item}>
                  <label htmlFor="name" className="block text-green-800 mb-2 font-medium">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-100 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <label htmlFor="email" className="block text-green-800 mb-2 font-medium">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-100 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <label htmlFor="phone" className="block text-green-800 mb-2 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-100 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition-all"
                    placeholder="(123) 456-7890"
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <label htmlFor="subject" className="block text-green-800 mb-2 font-medium">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-100 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition-all bg-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Order Inquiry">Order Inquiry</option>
                    <option value="Wholesale Partnership">Wholesale Partnership</option>
                    <option value="Product Feedback">Product Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>
                
                <motion.div variants={item}>
                  <label htmlFor="message" className="block text-green-800 mb-2 font-medium">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-100 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none transition-all"
                    placeholder="Tell us how we can help..."
                    required
                  ></textarea>
                </motion.div>
                
                <motion.div variants={item}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all ${
                      isSubmitting 
                        ? 'bg-green-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800'
                    } shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </motion.div>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Your message has been sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <svg className="w-6 h-6 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    There was an error sending your message. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>
            
            {/* Social Media - Right Side */}
            <motion.div 
              className="w-full lg:w-1/2 bg-gradient-to-br from-green-50 to-green-100 p-8 md:p-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-green-900 mb-6">Connect with us</h2>
                <p className="text-green-800 mb-10 max-w-md">
                  Follow us on social media to stay updated with our latest pickle flavors, recipes, and special offers!
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-12">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`${social.color} rounded-2xl p-5 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="text-2xl mb-2" />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                className="mt-auto pt-8 border-t border-green-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <h3 className="text-2xl font-bold text-green-900 mb-5">Direct Contact</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">Phone</h4>
                      <p className="text-green-700">+1 (555) 123-4567</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">Email</h4>
                      <p className="text-green-700">hello@crunchypickles.com</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">Address</h4>
                      <p className="text-green-700">123 Pickle Lane, Farmville, PV 54321</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <a 
          href="tel:+15551234567" 
          className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 shadow-lg text-white"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
        </a>
      </motion.div>
    </div>
  );
}