"use client";

import { useState, useEffect } from 'react';

import { TextReveal } from "../ui/TextReaveal";
import HeroSection from "./HeroSection"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen ">
      <HeroSection />

      <div className=' bg-gradient-to-t from-green-50 to-emerald-100'>
          <TextReveal>"Bringing Tradition to Your Table, One Pickle at a Time."</TextReveal>

      </div>
    


     
    </div>
  );
}
