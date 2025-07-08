"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  User,
  Phone,
  MapPin,
  MessageSquare,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import type { CustomerInfo } from "@/components/checkout-modal";

interface CustomerInfoStepProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: CustomerInfo) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CustomerInfoStep({
  customerInfo,
  onCustomerInfoChange,
  onNext,
  onPrev
}: CustomerInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedInfo = { ...customerInfo, [name]: value };
    onCustomerInfoChange(updatedInfo);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = "Անունը պարտադիր է";
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Հեռախոսը պարտադիր է";
    }

    // else if (
    //   !/^\+374\s?\d{2}\s?\d{3}\s?\d{3}$/.test(
    //     customerInfo.phone.replace(/\s/g, "")
    //   )
    // ) {
    //   newErrors.phone = "Հեռախոսի ֆորմատը սխալ է";
    // }

    if (!customerInfo.address.trim()) {
      newErrors.address = "Հասցեն պարտադիր է";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='text-center mb-6'>
        <h3
          className='text-xl font-semibold text-gray-900 mb-2'
          style={{ fontFamily: "Arial" }}
        >
          Լրացրեք ձեր տվյալները
        </h3>
        <p className='text-gray-600' style={{ fontFamily: "Arial" }}>
          Մենք կապ կհաստատվենք ձեզ հետ պատվերը հաստատելու համար
        </p>
      </div>

      <div className='space-y-4'>
        {/* Name and Phone Fields - Flex Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Name Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='name'
              className='text-sm font-medium text-gray-700 flex items-center'
            >
              <User className='h-4 w-4 mr-2 text-red-600' />
              Անուն *
            </Label>
            <Input
              id='name'
              name='name'
              type='text'
              value={customerInfo.name}
              onChange={handleInputChange}
              className={`transition-all duration-200 ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-red-600"
              }`}
              placeholder='Ձեր անունը'
            />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='phone'
              className='text-sm font-medium text-gray-700 flex items-center'
            >
              <Phone className='h-4 w-4 mr-2 text-red-600' />
              Հեռախոս *
            </Label>
            <Input
              id='phone'
              name='phone'
              type='tel'
              value={customerInfo.phone}
              onChange={handleInputChange}
              className={`transition-all duration-200 ${
                errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-red-600"
              }`}
              placeholder='+374 XX XXX XXX'
            />
            {errors.phone && (
              <p className='text-sm text-red-500'>{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Address Field - Reduced Height */}
        <div className='space-y-2'>
          <Label
            htmlFor='address'
            className='text-sm font-medium text-gray-700 flex items-center'
          >
            <MapPin className='h-4 w-4 mr-2 text-red-600' />
            Հասցե *
          </Label>
          <Textarea
            id='address'
            name='address'
            rows={2}
            value={customerInfo.address}
            onChange={handleInputChange}
            className={`transition-all duration-200 resize-none ${
              errors.address
                ? "border-red-500 focus:border-red-500"
                : "focus:border-red-600"
            }`}
            placeholder='Ձեր հասցեն (փողոց, տուն, բնակարան)'
          />
          {errors.address && (
            <p className='text-sm text-red-500'>{errors.address}</p>
          )}
        </div>

        {/* Notes Field - Reduced Height */}
        {/* <div className='space-y-2'>
          <Label
            htmlFor='notes'
            className='text-sm font-medium text-gray-700 flex items-center'
          >
            <MessageSquare className='h-4 w-4 mr-2 text-red-600' />
            Լրացուցիչ նշումներ
          </Label>
          <Textarea
            id='notes'
            name='notes'
            rows={1}
            value={customerInfo.notes}
            onChange={handleInputChange}
            className='focus:border-red-600 transition-all duration-200 resize-none'
            placeholder='Ցանկացած լրացուցիչ տեղեկություններ...'
          />
        </div> */}
      </div>

      {/* Action Buttons */}
      <div className='flex gap-4 pt-4'>
        <Button
          variant='outline'
          onClick={onPrev}
          className='flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200 bg-transparent'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Հետ
        </Button>
        <Button
          onClick={handleNext}
          className='flex-1 bg-red-600 hover:bg-red-700 text-white transition-all duration-300 transform hover:scale-105'
        >
          <span>Հաջորդ</span>
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
