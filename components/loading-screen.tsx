"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({
  onLoadingComplete
}: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Ensure loading screen shows for at least 2 seconds
    const minLoadingTime = setTimeout(() => {
      setIsAnimating(false);
      // Start fade out animation
      setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete();
      }, 500); // 500ms fade out duration
    }, 2000); // 2 seconds minimum loading time

    return () => clearTimeout(minLoadingTime);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-red-600 via-red-700 to-red-800 transition-all duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Animated Background Pattern */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse'></div>
        <div className='absolute top-32 right-16 w-16 h-16 border border-white/20 rounded-full animate-pulse delay-1000'></div>
        <div className='absolute bottom-20 left-20 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-500'></div>
        <div className='absolute bottom-40 right-10 w-12 h-12 border border-white/20 rounded-full animate-pulse delay-1500'></div>

        {/* Floating particles */}
        <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce'></div>
        <div className='absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-300'></div>
        <div className='absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-white/25 rounded-full animate-bounce delay-700'></div>
        <div className='absolute bottom-1/3 right-1/4 w-1 h-1 bg-white/50 rounded-full animate-bounce delay-1000'></div>
      </div>

      {/* Content Container */}
      <div className='relative z-10 flex flex-col items-center space-y-8'>
        {/* Logo */}
        <div
          className={`transform transition-all duration-1000 ${
            isAnimating
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-[-20px] opacity-0 scale-95"
          }`}
        >
          <Image
            src='/logo-red.png'
            alt='ՏԻԳ-ԳՈՌ Logo'
            width={200}
            height={80}
            className='h-16 lg:h-20 w-auto brightness-0 invert drop-shadow-lg'
            priority
          />
        </div>

        {/* Loading Spinner */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isAnimating
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-[20px] opacity-0 scale-95"
          }`}
        >
          <div className='relative'>
            <Image
              src='/loading-spinner.gif'
              alt='Loading...'
              width={80}
              height={80}
              className='w-16 h-16 lg:w-20 lg:h-20'
              unoptimized // Important for GIFs to animate
            />
            {/* Glow effect around spinner */}
            <div className='absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse'></div>
          </div>
        </div>

        {/* Loading Text */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isAnimating
              ? "translate-y-0 opacity-100"
              : "translate-y-[20px] opacity-0"
          }`}
        >
          <div className='text-center space-y-2'>
            <h2
              className='text-white text-xl lg:text-2xl font-bold'
              style={{ fontFamily: "Arial" }}
            >
              Բարի գալուստ
            </h2>
            <p
              className='text-white/80 text-sm lg:text-base'
              style={{ fontFamily: "Arial" }}
            >
              Բեռնվում է...
            </p>
          </div>
        </div>

        {/* Progress Dots */}
        <div
          className={`flex space-x-2 transform transition-all duration-1000 delay-700 ${
            isAnimating
              ? "translate-y-0 opacity-100"
              : "translate-y-[20px] opacity-0"
          }`}
        >
          <div className='w-2 h-2 bg-white/60 rounded-full animate-pulse'></div>
          <div className='w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200'></div>
          <div className='w-2 h-2 bg-white/60 rounded-full animate-pulse delay-400'></div>
        </div>
      </div>

      {/* Bottom Branding */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isAnimating
            ? "translate-y-0 opacity-100"
            : "translate-y-[20px] opacity-0"
        }`}
      >
        <p
          className='text-white/60 text-xs text-center'
          style={{ fontFamily: "Arial" }}
        >
          Հայկական ավանդական խոհանոց
        </p>
      </div>
    </div>
  );
}
