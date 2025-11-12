import { Button } from "@/components/ui/button";
import { MapPin, Home, SquareIcon, Link } from "lucide-react";
import spotlightBuilding from "@/assets/spotlight-building.png";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

const SpotlightProjectSection = () => {
  const { websiteData } = useWebsiteData();

  return (
    <section className="bg-white w-full">
      <div className="relative w-full">
        {/* Main card with asymmetric design */}
        <div className="relative bg-primary overflow-hidden w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[650px] max-w-screen-2xl mx-auto px-6">
            {/* Left image panel with gradient border */}
            <div className="relative w-full order-2 lg:order-1 mt-6 lg:mt-0 flex items-center justify-center lg:py-4">
              {/* Gradient border container */}
              <div 
                className="relative max-w-[700px] h-[590px] mx-auto rounded-[200px] p-6 shadow-2xl w-full"
                style={{
                  background: 'linear-gradient(180deg, #D7EBFC 0%, #419FF2 100%)',
                }}
              >
                {/* Inner container with image */}
                <div className="relative w-full h-full rounded-[160px] overflow-hidden bg-gradient-to-b from-[#F0F7FD] to-[#E8F4FD]">
                  <img
                    src={websiteData.spotlightProject.image || spotlightBuilding}
                    alt={websiteData.spotlightProject.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5" />
                </div>
              </div>
            </div>

            {/* Right content panel */}
            <div className="p-5 lg:p-8 text-white space-y-3 lg:space-y-4 relative z-10 text-center lg:text-left order-1 lg:order-2">
              {/* Spotlight badge */}
              <div className="inline-block">
                <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-semibold text-sm lg:text-base">
                  {websiteData.spotlightProject.badge}
                </div>
              </div>

              {/* Project title */}
              <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                {websiteData.spotlightProject.title}
              </h2>

              {/* Location */}
              <div className="flex items-center justify-center space-x-2 text-white lg:justify-start">
                <MapPin className="h-5 w-5 lg:h-6 lg:w-6" />
                <span className="text-lg lg:text-xl font-medium">{websiteData.spotlightProject.location}</span>
              </div>

              {/* Description */}
              <p className="text-white/90 text-base leading-relaxed lg:text-lg max-w-2xl">
                {websiteData.spotlightProject.description}
              </p>

              {/* Features container with price circle and info grid */}
              <div className="relative backdrop-blur-md p-5 lg:p-6 mt-6" style={{ borderRadius: '24px 24px 24px 250px', backgroundColor: '#1A88DD' }}>
                {/* Project Type - standalone on left */}
                <div className="flex items-start space-x-3 mb-6">
                  <Home className="h-7 w-7 text-white flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-sm text-white/80 mb-1">Project Type</div>
                    <div className="text-white font-semibold text-lg lg:text-xl">{websiteData.spotlightProject.projectType}</div>
                  </div>
                </div>

                {/* Price circle positioned absolutely on the left, lower position */}
                <div className="absolute left-8 bottom--1 hidden lg:block">
                  <div className="bg-[#2C5F8D] rounded-full w-40 h-40 flex flex-col items-center justify-center text-white shadow-xl">
                    <div className="text-sm opacity-90">Starting At</div>
                    <div className="text-3xl font-bold">{websiteData.spotlightProject.price}</div>
                  </div>
                </div>

                {/* Mobile price circle */}
                <div className="flex justify-center mb-5 lg:hidden">
                  <div className="bg-[#2C5F8D] rounded-full w-32 h-32 flex flex-col items-center justify-center text-white shadow-xl">
                    <div className="text-sm opacity-90">Starting At</div>
                    <div className="text-2xl font-bold">{websiteData.spotlightProject.price}</div>
                  </div>
                </div>

                {/* Right side features - all aligned with left margin */}
                <div className="space-y-4 lg:ml-56 lg:-mt-16">
                  {/* Apartment Types */}
                  <div className="flex items-start space-x-3">
                    <Home className="h-7 w-7 text-white flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm text-white/80 mb-1">Apartment Types</div>
                      <div className="text-white font-semibold text-lg lg:text-xl">{websiteData.spotlightProject.apartmentTypes}</div>
                    </div>
                  </div>

                  {/* Rera Carpet Area */}
                  <div className="flex items-start space-x-3">
                    <SquareIcon className="h-7 w-7 text-white flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm text-white/80 mb-1">Rera Carpet Area</div>
                      <div className="text-white font-semibold text-lg lg:text-xl">{websiteData.spotlightProject.reraArea}</div>
                    </div>
                  </div>

                  {/* Maharera Registration */}
                  <div className="flex items-start space-x-3">
                    <Link className="h-7 w-7 text-white flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm text-white/80 mb-1">Maharera Registration no.</div>
                      <div className="text-white font-semibold text-lg lg:text-xl">{websiteData.spotlightProject.reraNumber}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2 lg:pt-4 flex justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-7 py-2.5 text-base font-semibold lg:px-9 lg:py-3.5 lg:text-lg"
                >
                  {websiteData.spotlightProject.ctaText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightProjectSection;