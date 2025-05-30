"use client";

import { useState, useEffect } from 'react';

import { TextReveal } from "../ui/TextReaveal";
import HeroSection from "./HeroSection";
import ScrollingTextPage from './ScrollingText';
import  HomePage2 from "./HomePage2";
import PickleCategories from "./Categories";
import Footer from "./Footer";
import  WhyChoose from "./WhyChoose";
import Testimonials from "./Testmonials"

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
      <ScrollingTextPage/>

      <div className=' bg-gradient-to-t from-green-50 to-emerald-100'>
          <TextReveal>"Bringing Tradition to Your Table, One Pickle at a Time."</TextReveal>

      </div>
      <PickleCategories/>

      < HomePage2/>
      <WhyChoose/>
      
      <Testimonials/>
      <Footer/>
    


     
    </div>
  );
}
