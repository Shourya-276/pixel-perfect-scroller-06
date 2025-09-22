import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const homepageVirtualTours = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    alt: "Virtual Tour 1"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517840901100-8179e9d84967?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Virtual Tour 2"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Virtual Tour 3"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    alt: "Virtual Tour 4"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1517840901100-8179e9d84967?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Virtual Tour 5"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Virtual Tour 6"
  },
];

const companyLogos = [
  {
    id: 1,
    initials: "YP",
    name: "YOGESHA PROPERTY",
    color: "bg-blue-600 text-white",
    textColor: "text-blue-600",
    description: "",
  },
  {
    id: 2,
    initials: "P",
    name: "PRAKRITHI REALTORS",
    color: "bg-yellow-500 text-white",
    textColor: "text-yellow-600",
    description: "Constructing the Future",
  },
  {
    id: 3,
    initials: "V",
    name: "VIGHNAHARTA GROUP",
    color: "bg-red-600 text-white",
    textColor: "text-red-600",
    description: "A VISION FOR YOUR LIFE",
  },
  {
    id: 4,
    initials: "S",
    name: "SWASTIK",
    color: "bg-blue-700 text-white",
    textColor: "text-blue-700",
    description: "BUILDERS & DEVELOPERS",
    subDescription: "A legacy of trust",
  },
  {
    id: 5,
    initials: "S",
    name: "SUJI",
    color: "bg-blue-800 text-white",
    textColor: "text-blue-800",
    description: "Builders & Developers",
    subDescription: "CREATING LIFE EXPERIENCES & BUILDING LEGACIES",
  },
];

const VirtualTourSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Virtual Tour Section */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Virtual Tour</h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full relative"
          >
            <CarouselContent className="flex -ml-4">
              {homepageVirtualTours.map((tour) => (
                <CarouselItem key={tour.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="relative h-[600px] sm:h-[480px] md:h-[600px] bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="icon" className="bg-white/90 hover:bg-white text-black rounded-full p-3 h-14 w-14 sm:h-16 sm:w-16">
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Company logos section */}
        <Carousel
          plugins={[
            Autoplay({
              delay: 0,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
            duration: 15000,
          }}
          className="w-full mt-12 lg:mt-16"
        >
          <CarouselContent className="-ml-4">
            {/* Duplicate companyLogos for seamless loop */}
            {[...companyLogos, ...companyLogos].map((logo, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div className="flex flex-col items-center space-y-2 p-2">
                  <div className={`${logo.color} p-3 rounded-lg w-16 h-16 flex items-center justify-center text-xl font-bold`}>
                    {logo.initials}
                  </div>
                  <div className="text-center">
                    <div className={`${logo.textColor} font-bold text-sm`}>{logo.name}</div>
                    {logo.description && <div className="text-xs text-gray-600">{logo.description}</div>}
                    {logo.subDescription && <div className="text-xs text-gray-600">{logo.subDescription}</div>}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default VirtualTourSection;