"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, X, Phone, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isAnimating, setIsAnimating] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["hero", "menu", "team", "about", "contact", "gallery"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      setIsAnimating(true);
    } else {
      document.body.style.overflow = "unset";
      setIsAnimating(false);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Գլխավոր", id: "hero" },
    { name: "Մենյու", id: "menu" },
    { name: "Թիմ", id: "team" },
    { name: "Մեր մասին", id: "about" },
    { name: "Կապ", id: "contact" }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToTop {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .menu-enter {
          animation: slideInFromTop 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .menu-exit {
          animation: slideOutToTop 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19)
            forwards;
        }

        .nav-item {
          animation: fadeInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }

        .social-buttons {
          animation: scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16 lg:h-20'>
            {/* Logo Image */}
            <div className='flex items-center'>
              <Image
                src='/logo-red.png'
                alt='ՏԻԳ-ԳՈՌ Logo'
                width={180}
                height={60}
                className='h-8 lg:h-12 w-auto'
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-12'>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative font-semibold transition-colors duration-300 px-0 py-2 ${
                    activeSection === item.id
                      ? "text-[#DC2626]"
                      : "text-gray-800 hover:text-[#DC2626]"
                  } group`}
                  style={{ fontFamily: "Arial" }}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ease-out ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </nav>

            {/* Cart and Mobile Menu */}
            <div className='flex items-center space-x-4'>
              <Button
                variant='ghost'
                size='icon'
                onClick={onCartClick}
                className='relative p-3 bg-red-600/20 text-red-600 hover:bg-red-600/30 hover:text-red-600 border border-red-600/30 transition-all duration-300'
              >
                <ShoppingCart className='h-7 w-7' />
                {totalItems > 0 && (
                  <span className='absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold'>
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='lg:hidden hover:bg-[#DC2626]/10 transition-all duration-300 p-3 bg-red-600/20 text-red-600 hover:bg-red-600/30 hover:text-red-600 border border-red-600/30 flex items-center justify-center'
              >
                <div className='relative w-6 h-6 flex items-center justify-center'>
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Full Screen Mobile Navigation */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-[9999] lg:hidden ${
            isAnimating ? "menu-enter" : "menu-exit"
          }`}
        >
          {/* Animated Background */}
          <div className='absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800'>
            {/* Animated Pattern Overlay */}
            <div className='absolute inset-0 opacity-10'>
              <div className='absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-pulse'></div>
              <div className='absolute top-32 right-16 w-16 h-16 border border-white rounded-full animate-pulse delay-1000'></div>
              <div className='absolute bottom-20 left-20 w-24 h-24 border border-white rounded-full animate-pulse delay-500'></div>
              <div className='absolute bottom-40 right-10 w-12 h-12 border border-white rounded-full animate-pulse delay-1500'></div>
            </div>
          </div>

          <div className='relative flex flex-col h-full text-white'>
            {/* Header */}
            <div className='flex items-center justify-between p-6 border-b border-white/20'>
              <Image
                src='/logo-red.png'
                alt='ՏԻԳ-ԳՈՌ Logo'
                width={120}
                height={40}
                className='h-10 w-auto brightness-0 invert'
              />
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsMenuOpen(false)}
                className='text-white hover:bg-white/10 transition-all duration-300 hover:rotate-90'
              >
                <X className='h-7 w-7' />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className='flex-1 px-6 py-8 flex flex-col justify-center'>
              <div className='space-y-2'>
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-item block w-full text-left px-6 py-4 text-2xl font-bold transition-all duration-300 rounded-2xl ${
                      activeSection === item.id
                        ? "text-white bg-white/20 shadow-lg"
                        : "text-white/90 hover:bg-white/10 hover:text-white hover:translate-x-2"
                    }`}
                    style={{
                      fontFamily: "Arial",
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </nav>

            {/* Contact Actions */}
            <div
              className='p-6 space-y-6 social-buttons'
              style={{ animationDelay: "0.8s" }}
            >
              {/* Call Button */}
              <a
                href='tel:+37410123456'
                className='flex items-center justify-center w-full bg-white/20 hover:bg-white/30 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30'
              >
                <Phone className='h-6 w-6 mr-3' />
                Զանգահարել
              </a>

              {/* Social Media */}
              <div className='flex items-center justify-center space-x-6'>
                <a
                  href='#'
                  className='flex items-center justify-center w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg'
                >
                  <Facebook className='h-8 w-8' />
                </a>
                <a
                  href='#'
                  className='flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg'
                >
                  <Instagram className='h-8 w-8' />
                </a>
              </div>

              {/* Footer Text */}
              <div className='text-center text-white/70 text-sm pt-4'>
                <p style={{ fontFamily: "Arial" }}>© 2024 ՏԻԳ-ԳՈՌ</p>
                <p style={{ fontFamily: "Arial" }}>
                  Բարձրորակ հայկական խոհանոց
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
