"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast.success(
      "Ձեր հաղորդագրությունը ուղարկվել է: Մենք կապ կհաստատվենք ձեզ հետ շուտով:"
    );
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id='contact' className='py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2
            className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'
            style={{ fontFamily: "Arial" }}
          >
            Կապ <span className='text-[#DC2626]'>մեզ հետ</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Ունե՞ք հարցեր կամ առաջարկություններ: Մենք միշտ պատրաստ ենք օգնել
            ձեզ: Զանգահարեք կամ լրացրեք ձևը
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Information */}
          <div className='space-y-8'>
            <div>
              <h3
                className='text-2xl font-bold text-gray-900 mb-6'
                style={{ fontFamily: "Arial" }}
              >
                Կապի տվյալներ
              </h3>

              {/* First Row - Address and Phone */}
              <div className='grid md:grid-cols-2 gap-6 mb-6'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>Հասցե</h4>
                    <p className='text-gray-600'>Կապան, Ռ․Մինասյան X</p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>Հեռախոս</h4>
                    <p className='text-gray-600'>+374 10 123 456</p>
                    <p className='text-gray-600'>+374 77 123 456</p>
                  </div>
                </div>
              </div>

              {/* Second Row - Email and Working Hours */}
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>Էլ. փոստ</h4>
                    <p className='text-gray-600'>info@sig-gor.am</p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Clock className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900'>
                      Աշխատանքային ժամեր
                    </h4>
                    <p className='text-gray-600'>Երկուշաբթի - Կիրակի</p>
                    <p className='text-gray-600'>10:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Image */}
            <Card className='overflow-hidden shadow-lg border-0'>
              <div className='h-64 relative'>
                <Image
                  src='/team/contact-image.png'
                  alt='ՏԻԳ-ԳՈՌ Restaurant Team'
                  fill
                  className='object-cover hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                <div className='absolute bottom-4 left-4 bg-red-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
                  <p
                    className='text-sm font-semibold'
                    style={{ fontFamily: "Arial" }}
                  >
                    Մեր թիմը ՏԻԳ-ԳՈՌ-ում
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className='shadow-xl border-0'>
            <CardHeader>
              <CardTitle
                className='text-2xl text-gray-900'
                style={{ fontFamily: "Arial" }}
              >
                Գրեք մեզ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Անուն *
                    </label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className='border-gray-300 focus:border-red-600 focus:ring-red-600'
                      placeholder='Ձեր անունը'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Հեռախոս
                    </label>
                    <Input
                      id='phone'
                      name='phone'
                      type='tel'
                      value={formData.phone}
                      onChange={handleChange}
                      className='border-gray-300 focus:border-red-600 focus:ring-red-600'
                      placeholder='+374 XX XXX XXX'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Էլ. փոստ *
                  </label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className='border-gray-300 focus:border-red-600 focus:ring-red-600'
                    placeholder='your@email.com'
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Հաղորդագրություն *
                  </label>
                  <Textarea
                    id='message'
                    name='message'
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className='border-gray-300 focus:border-red-600 focus:ring-red-600'
                    placeholder='Ձեր հաղորդագրությունը...'
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105'
                >
                  Ուղարկել հաղորդագրությունը
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
