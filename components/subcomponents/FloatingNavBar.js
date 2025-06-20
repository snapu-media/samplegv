"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function FloatingNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <div className="relative flex items-center justify-between h-16 mt-4">
          {/* Modified nav container with adjusted width and transparency */}
          <div className="flex-1 flex items-center justify-between rounded-lg shadow-lg bg-white/30 backdrop-blur-lg border border-white/20 px-4 py-2 lg:max-w-[650px] lg:mx-auto lg:px-6 lg:py-1.5">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-800 lg:text-gray-900 lg:text-lg lg:pr-8">
                GV PREMIUM FOODS
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors hover:bg-white/10 px-3 py-1 rounded-lg">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors hover:bg-white/10 px-3 py-1 rounded-lg">
                About
              </Link>
              <Link href="/pickles" className="text-gray-700 hover:text-gray-900 transition-colors hover:bg-white/10 px-3 py-1 rounded-lg">
                Pickles
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors hover:bg-white/10 px-3 py-1 rounded-lg">
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-colors"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 mt-2">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-colors"
            >
              About
            </Link>
            <Link
              href="/pickles"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-colors"
            >
              Pickles
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}