"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Keyboard, A11y } from "swiper/modules";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { WaitingListDialog } from "./WaitingListBtn";
import Link from "next/link";

interface ProductCard {
  id: number;
  title: string;
  description: string;
  price: string;
  src: string;
}

const productCards: ProductCard[] = [
  {
    id: 1,
    title: "8km Power Run",
    description: "T-shirt, backpack & race number",
    price: "R180.00",
    src: "https://www.nativechild.co/wp-content/uploads/2025/09/Group-10369.png",
  },
  {
    id: 2,
    title: "5km Fun Run",
    description: "T-shirt, backpack & race number",
    price: "R120.00",
    src: "https://www.nativechild.co/wp-content/uploads/2025/09/Group-10370.png",
  },
  {
    id: 3,
    title: "Track Runs",
    description:
      "Included in activity passes (100m, 200m, 400m sprints, relays & kids races)",
    price: "R180.00",
    src: "https://www.nativechild.co/wp-content/uploads/2025/09/Group-10371.png",
  },
  {
    id: 4,
    title: "Activities Only Pass",
    description:
      "Obstacle courses, bubble soccer, backyard legends, stage events & more) Does not include runs",
    price: "R180.00",
    src: "https://www.nativechild.co/wp-content/uploads/2025/09/Group-10372.png",
  },
  {
    id: 5,
    title: "All-Inclusive Pass",
    description: "Everything included",
    price: "R249.00",
    src: "https://www.nativechild.co/wp-content/uploads/2025/09/Group-10373.png",
  },
  {
    id: 6,
    title: "Spectator",
    description: "Entry only",
    price: "R80.00",
    src: "https://www.nativechild.co/wp-content/uploads/2025/09/Group-10374.png",
  },
];

export default function Tickets() {
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const handleAddToCart = (card: ProductCard) => {
    setAddedToCart(card.id);

    // Dispatch custom event for cart management
    const event = new CustomEvent("addToCart", {
      detail: { card },
    });
    document.dispatchEvent(event);

    console.log(`Added to cart: ${card.title} - ${card.price}`);

    // Reset button after 2 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };

  return (
    <div className="w-full mx-auto relative">
      <Swiper
        modules={[Navigation, Autoplay, Keyboard, A11y]}
        slidesPerView={1.2}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        grabCursor={true}
        speed={400}
        breakpoints={{
          350: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.1,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3.4,
            spaceBetween: 20,
          },
        }}
        className="pb-4"
      >
        {productCards.map((card) => (
          <SwiperSlide key={card.id} className="w-[280px] h-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)] h-auto">
              {/* Icon/Image */}
              <div className="flex items-center justify-center mx-auto mb-5">
                <Image
                  src={card.src}
                  alt={card.title}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#2c2c2c] mb-2.5 leading-tight">
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm text-gray-600 mb-5 leading-relaxed min-h-[50px] flex items-center justify-center text-center"
                dangerouslySetInnerHTML={{
                  __html: card.description.replace(/\n/g, "<br>"),
                }}
              />

              {/* Price */}
              <div className="text-[28px] font-bold text-[#2c2c2c] mb-6">
                {card.price}
              </div>

              {/* Add to Cart Button */}
              <Link href="https://wa.me/message/E6LOSN5XESLXF1">
                <Button
                  className={`w-full uppercase tracking-wider text-xs font-semibold py-4 h-auto transition-colors duration-200 bg-[#2c2c2c] hover:bg-[#1a1a1a]`}
                >
                  ORDER TICKET
                </Button>
              </Link>
              {/* <WaitingListDialog ticketTitle={card.title} /> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <div className="flex justify-end gap-2.5 mt-5 pr-5">
        <button
          className="swiper-button-prev-custom bg-white w-10 h-10 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-200 hover:bg-gray-50 hover:scale-105 cursor-pointer"
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="swiper-button-next-custom bg-white w-10 h-10 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-200 hover:bg-gray-50 hover:scale-105 cursor-pointer"
          aria-label="Next slide"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
