import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import buildingComplex from "@/assets/building-complex.png";
import exploreNowBadge from "@/assets/explore-now-badge.png";
import trainImage from "@/assets/train.png";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero min-h-[600px] overflow-hidden">
      {/* Background wave shape */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1200 600"
          className="absolute bottom-0 right-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M600,300 Q800,200 1200,400 L1200,600 L0,600 L0,300 Q200,100 600,300 Z"
            fill="url(#heroGradient)"
            className="opacity-90"
          />
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D6ABC" />
              <stop offset="100%" stopColor="#1A88DD" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-primary-foreground text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Discover<br />
              Mumbai Homes
            </h1>
            
            {/* Search bar */}
            <div className="bg-white rounded-lg p-2 mb-6 flex flex-col sm:flex-row items-center shadow-lg">
              <Search className="text-gray-400 ml-3 h-5 w-5 mb-2 sm:mb-0" />
              <Input
                placeholder="Enter Locality / Project / Society / Landmark"
                className="border-0 bg-transparent focus-visible:ring-0 text-gray-700 flex-1 w-full sm:w-auto mb-2 sm:mb-0"
              />
              <Button className="bg-primary hover:bg-primary/90 px-6 w-full sm:w-auto">
                <MapPin className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            <p className="text-base lg:text-lg mb-4 opacity-90">
              Discover the Perfect Residential Destination with Mumbai Homes,<br />
              Offering a Variety of Options to Suit your Lifestyle Needs
            </p>
            
            <p className="text-lg lg:text-xl font-semibold mb-8">
              100% Happiness With 0% Brokerage
            </p>
            
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-base lg:text-lg font-semibold">
              Enquiry Now
            </Button>
          </div>

          {/* Right content - Building image */}
          <div className="relative mt-8 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2 lg:h-full">
            <img
              src={buildingComplex}
              alt="Mumbai residential buildings"
              className="w-full h-full object-cover"
            />
            
            {/* Wavy diagonal border */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,0 Q 15,20 20,30 Q 25,40 30,45 Q 40,55 45,60 Q 55,70 60,75 Q 70,85 80,90 Q 90,95 100,100"
                fill="none"
                stroke="#1A88DD"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            
            {/* Circular badge with rotating animation - positioned at left-bottom */}
            <div className="absolute bottom-8 left-8 w-24 h-24 animate-spin-slow md:w-32 md:h-32 z-10">
              <img
                src={exploreNowBadge}
                alt="Explore Now"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Train Animation */}
      <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden z-20">
        <img
          src={trainImage}
          alt="Mumbai Local Train"
          className="absolute bottom-0 h-12 w-auto animate-train-move"
          style={{ minWidth: '200px' }}
        />
      </div>
    </section>
  );
};

export default HeroSection;