"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Խոզի խորոված",
    nameEn: "Pork Barbecue",
    price: 3500,
    image: "/menu/mixed-barbecue.png",
    category: "grilled"
  },
  {
    id: "2",
    name: "Տավարի խորոված",
    nameEn: "Beef Barbecue",
    price: 4000,
    image: "/menu/tavari-xorovac.jpg",
    category: "grilled"
  },
  {
    id: "3",
    name: "Հավի խորոված",
    nameEn: "Chicken Barbecue",
    price: 3000,
    image: "/menu/chicken-barbecue.png",
    category: "grilled"
  },
  {
    id: "4",
    name: "Գառան խորոված",
    nameEn: "Lamb Barbecue",
    price: 4500,
    image: "/menu/lamb-barbecue.png",
    category: "grilled"
  },

  {
    id: "5",
    name: "Հավի շաուրմա",
    nameEn: "Chicken Shawarma",
    price: 1800,
    image: "/menu/chicken-shawarma.png",
    category: "shawarma"
  },
  {
    id: "6",
    name: "Տավարի շաուրմա",
    nameEn: "Beef Shawarma",
    price: 2200,
    image: "/menu/beef-shawarma.png",
    category: "shawarma"
  },
  {
    id: "13",
    name: "Կոկա-Կոլա",
    nameEn: "Coca-Cola",
    price: 500,
    image: "/menu/coca-cola.png",
    category: "drinks"
  },
  {
    id: "14",
    name: "Ջերմուկ",
    nameEn: "Jermuk",
    price: 300,
    image: "/menu/jermuk.jpg",
    category: "drinks"
  },
  {
    id: "15",
    name: "Թան",
    nameEn: "Tan (Yogurt Drink)",
    price: 600,
    image: "/menu/tan.png",
    category: "drinks"
  },
  {
    id: "16",
    name: "Ֆանտա",
    nameEn: "Fanta",
    price: 500,
    image: "/menu/fanta.jpg",
    category: "drinks"
  },
  {
    id: "17",
    name: "Հոթ-Դոգ",
    nameEn: "Hot Dog",
    price: 1200,
    image: "/menu/hot-dog.jpg",
    category: "snacks"
  },
  {
    id: "18",
    name: "Կարկանդակ",
    nameEn: "Perajki",
    price: 1500,
    image: "/menu/perazhki.jpg",
    category: "snacks"
  },
  {
    id: "19",
    name: "Լահմաջո",
    nameEn: "Lahmajo",
    price: 1800,
    image: "/menu/lahmajo.jpg",
    category: "snacks"
  },
  {
    id: "21",
    name: "Նարնջի հյութ",
    nameEn: "Orange Juice",
    price: 700,
    image: "/menu/narnji.jpg",
    category: "drinks"
  },
  {
    id: "22",
    name: "Լիմոնադ",
    nameEn: "Lemonade",
    price: 600,
    image: "/menu/limonad.jpg",
    category: "drinks"
  },
  {
    id: "23",
    name: "Գիռոս շաուրմա",
    nameEn: "Gyros",
    price: 600,
    image: "/menu/gyros.jpg",
    category: "shawarma"
  }
];

const categories = [
  { id: "all", name: "Բոլորը", nameEn: "All" },
  { id: "grilled", name: "Խորոված", nameEn: "Grilled" },
  { id: "shawarma", name: "Շաուրմա", nameEn: "Shawarma" },
  { id: "drinks", name: "Ըմպելիքներ", nameEn: "Drinks" }
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem, updateQuantity, removeItem, items } = useCart();

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const getItemQuantityInCart = (itemId: string) => {
    const cartItem = items.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    toast.success(`${item.name} ավելացվել է զամբյուղում`);
  };

  const handleIncreaseQuantity = (item: MenuItem) => {
    const currentQuantity = getItemQuantityInCart(item.id);
    if (currentQuantity > 0) {
      updateQuantity(item.id, currentQuantity + 1);
    } else {
      handleAddToCart(item);
    }
  };

  const handleDecreaseQuantity = (item: MenuItem) => {
    const currentQuantity = getItemQuantityInCart(item.id);
    if (currentQuantity > 1) {
      updateQuantity(item.id, currentQuantity - 1);
    } else if (currentQuantity === 1) {
      removeItem(item.id);
      toast.success(`${item.name} հեռացվել է զամբյուղից`);
    }
  };

  return (
    <section id='menu' className='py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2
            className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'
            style={{ fontFamily: "Arial" }}
          >
            Մեր <span className='text-[#DC2626]'>ցանկը</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Բարձրորակ բաղադրիչներով և ավանդական բաղադրատոմսերով պատրաստված համեղ
            ուտեստներ
          </p>
        </div>

        {/* Category Filter */}
        <div className='flex flex-wrap justify-center gap-2 mb-12'>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              } transition-all duration-300`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
          {filteredItems.map((item) => {
            const quantityInCart = getItemQuantityInCart(item.id);

            return (
              <Card
                key={item.id}
                className='group hover:shadow-xl transition-all duration-300 transform  bg-white border-0 shadow-lg h-full flex flex-col'
              >
                <div className='relative overflow-hidden rounded-t-lg'>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={300}
                    className='w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300'></div>
                  {quantityInCart > 0 && (
                    <div className='absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center animate-pulse'>
                      {quantityInCart}
                    </div>
                  )}
                </div>
                <CardContent className='p-2 sm:p-3 md:p-4 flex flex-col flex-1'>
                  <div className='flex justify-between items-start mb-1 sm:mb-2'>
                    <h3 className='font-semibold text-sm sm:text-base md:text-lg text-gray-900 group-hover:text-[#DC2626] transition-colors leading-tight'>
                      {item.name}
                    </h3>
                    <Badge
                      variant='secondary'
                      className='bg-red-600 text-white font-semibold text-xs sm:text-sm ml-1 flex-shrink-0'
                    >
                      {item.price}֏
                    </Badge>
                  </div>
                  <p className='text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 md:mb-4 flex-1'>
                    {/* {item.nameEn} */}
                  </p>

                  {/* Dynamic Button - Add to Cart or Quantity Controls - Always at bottom */}
                  <div className='mt-auto'>
                    {quantityInCart === 0 ? (
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className='w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm py-1.5 sm:py-2'
                      >
                        <Plus className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2' />
                        <span className='hidden sm:inline'>
                          Ավելացնել զամբյուղում
                        </span>
                        <span className='sm:hidden'>Ավելացնել</span>
                      </Button>
                    ) : (
                      <div className='flex items-center justify-between w-full'>
                        <Button
                          onClick={() => handleDecreaseQuantity(item)}
                          variant='outline'
                          size='sm'
                          className='h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-110'
                        >
                          <Minus className='h-3 w-3 sm:h-4 sm:w-4' />
                        </Button>

                        <div className='flex-1 text-center'>
                          <span className='text-sm sm:text-base md:text-lg font-bold text-gray-900 bg-gray-50 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg mx-1 sm:mx-2'>
                            {quantityInCart}
                          </span>
                        </div>

                        <Button
                          onClick={() => handleIncreaseQuantity(item)}
                          variant='outline'
                          size='sm'
                          className='h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-110'
                        >
                          <Plus className='h-3 w-3 sm:h-4 sm:w-4' />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
