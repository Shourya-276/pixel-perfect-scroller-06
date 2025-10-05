import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Mic, Camera } from "lucide-react";
import buildingComplex from "@/assets/building-complex.png";
import exploreNowBadge from "@/assets/explore-now-badge.png";
import trainImage from "@/assets/train.png";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#0D6ABC] via-[#1580D8] to-[#1A88DD] min-h-[700px] lg:min-h-[800px] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Decorative wave shape - only visible on large screens */}
      <div className="absolute inset-0 hidden lg:block">
        <svg
          viewBox="0 0 1200 800"
          className="absolute top-0 right-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D6ABC" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1A88DD" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M800,0 Q900,200 1000,300 Q1100,400 1200,350 L1200,0 Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-12 lg:pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left content - Enhanced typography and layout */}
          <div className="text-primary-foreground text-center lg:text-left space-y-6 lg:space-y-8">
            {/* Main Heading with enhanced typography */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Discover<br />
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Mumbai Homes
                </span>
              </h1>
            </div>
            
            {/* Enhanced Search bar with glassmorphism */}
            <div className="backdrop-blur-lg bg-white/95 rounded-2xl p-3 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center flex-1 w-full gap-2 px-2">
                  <Search className="text-primary h-5 w-5 flex-shrink-0" />
                  <Input
                    placeholder="Enter Locality / Project / Society / Landmark"
                    className="border-0 bg-transparent focus-visible:ring-0 text-gray-700 flex-1 placeholder:text-gray-500 text-sm lg:text-base"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button 
                    size="icon"
                    variant="ghost"
                    className="bg-blue-50 hover:bg-blue-100 text-primary rounded-xl h-10 w-10"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon"
                    variant="ghost"
                    className="bg-blue-50 hover:bg-blue-100 text-primary rounded-xl h-10 w-10"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 px-6 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto font-semibold">
                    <MapPin className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Description text with better spacing */}
            <div className="space-y-4">
              <p className="text-base lg:text-lg leading-relaxed opacity-95 max-w-xl mx-auto lg:mx-0">
                Discover the Perfect Residential Destination with Mumbai Homes,
                Offering a Variety of Options to Suit your Lifestyle Needs
              </p>
              
              <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <p className="text-lg lg:text-xl font-bold">
                  100% Happiness With 0% Brokerage
                </p>
              </div>
            </div>
            
            {/* CTA Button with enhanced styling */}
            <div className="pt-2">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-50 px-10 py-6 text-base lg:text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                Enquiry Now
              </Button>
            </div>
          </div>

          {/* Right content - Enhanced image presentation */}
          <div className="relative mt-8 lg:mt-0 group">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Main building image with enhanced styling */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={buildingComplex}
                alt="Luxury Mumbai residential buildings with modern architecture"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay for better badge visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Enhanced circular badge with better animation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-28 md:w-36 md:h-36 animate-spin-slow drop-shadow-2xl">
              <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50"></div>
              <img
                src={exploreNowBadge}
                alt="Explore Now - Interactive badge"
                className="relative w-full h-full object-contain drop-shadow-lg hover:drop-shadow-2xl transition-all"
              />
            </div>

            {/* Floating stats cards */}
            <div className="absolute top-4 right-4 backdrop-blur-md bg-white/90 rounded-2xl p-4 shadow-xl hidden lg:block animate-float-up">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-xs text-gray-600">Premium Projects</p>
              </div>
            </div>
            
            <div className="absolute top-24 left-4 backdrop-blur-md bg-white/90 rounded-2xl p-4 shadow-xl hidden lg:block animate-float-up delay-300">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">10K+</p>
                <p className="text-xs text-gray-600">Happy Families</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Train Animation - Enhanced */}
      <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden z-20">
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <img
          src={trainImage}
          alt="Mumbai Local Train animation"
          className="absolute bottom-0 h-14 w-auto animate-train-move drop-shadow-lg"
          style={{ minWidth: '200px' }}
        />
      </div>
    </section>
  );
};

export default HeroSection;