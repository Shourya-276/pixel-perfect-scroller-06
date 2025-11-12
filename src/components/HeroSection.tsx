import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import buildingComplex from "@/assets/building-complex.png";
import exploreNowBadge from "@/assets/explore-now-badge.png";
import trainImage from "@/assets/train.png";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

const HeroSection = () => {
  const { websiteData } = useWebsiteData();
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight whitespace-pre-line">
              {websiteData.heroSection.title}
            </h1>
            {/* Search bar */}
            <div className="bg-white rounded-lg p-2 mb-6 flex flex-col sm:flex-row items-center shadow-lg">
              <Search className="text-gray-400 ml-3 h-5 w-5 mb-2 sm:mb-0" />
              <Input
                placeholder={websiteData.heroSection.searchPlaceholder}
                className="border-0 bg-transparent focus-visible:ring-0 text-gray-700 flex-1 w-full sm:w-auto mb-2 sm:mb-0"
              />
              <Button className="bg-primary hover:bg-primary/90 px-6 w-full sm:w-auto">
                <MapPin className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <p className="text-base lg:text-lg mb-4 opacity-90 whitespace-pre-line">
              {websiteData.heroSection.description}
            </p>
            <p className="text-lg lg:text-xl font-semibold mb-8">
              {websiteData.heroSection.subtitle}
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-base lg:text-lg font-semibold">
              {websiteData.heroSection.ctaText}
            </Button>
          </div>
        </div>
      </div>

      {/* Right content - Uploaded image with gradient border, moved OUTSIDE .container for true absolute positioning */}
      <div className="hidden lg:flex lg:absolute lg:top-[20px] lg:bottom-[70px] lg:right-0 lg:w-[calc(58vw-130px)] lg:min-h-[500px] lg:max-h-[calc(100vh-140px)] lg:max-w-[900px] items-end justify-end z-20">
        {/* Gradient border container */}
        <div 
          className="relative w-full h-full rounded-[64px] p-4 shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, #68AFEE 0%, #D4EAFD 100%)',
          }}
        >
          {/* Inner container with subtle gradient background */}
          <div className="relative rounded-[60px] overflow-hidden bg-gradient-to-b from-[#F0F7FD] to-[#E8F4FD] h-full w-full">
            <img
              src={websiteData.heroSection.backgroundImage || buildingComplex}
              alt="Hero image"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Circular badge with rotating animation */}
          <div className="absolute -bottom-3 -left-3 w-[105px] h-[105px] md:w-[121px] md:h-[121px] z-20 rounded-full flex items-center justify-center drop-shadow-xl pointer-events-none select-none">
            <img
              src={exploreNowBadge}
              alt="Explore Now"
              className="w-full h-full object-contain origin-center animate-spin-slow select-none pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Train Animation */}
      <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden z-20">
        <img
          src={trainImage}
          alt="Mumbai Local Train"
          className="absolute bottom-0 h-12 w-auto animate-train-move"
          style={{ minWidth: "200px" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;