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
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[800px] max-w-screen-2xl mx-auto px-6">
            {/* Left image panel with gradient border */}
            <div className="relative w-full order-2 lg:order-1 mt-8 lg:mt-0 flex items-center justify-center lg:py-8">
              {/* Gradient border container */}
              <div 
                className="relative max-w-[700px] h-[620px] mx-auto rounded-[200px] p-6 shadow-2xl w-full"
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
            <div className="p-6 lg:p-12 text-white space-y-4 lg:space-y-6 relative z-10 text-center lg:text-left order-1 lg:order-2">
              {/* Spotlight badge */}
              <div className="inline-block">
                <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 text-xs rounded-full font-medium lg:px-6 lg:py-2 lg:text-sm">
                  Spotlight Project
                </div>
              </div>

              {/* Project title */}
              <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
                Ajmera 78 Lakes Town
              </h2>

              {/* Location */}
              <div className="flex items-center justify-center space-x-2 text-white/90 lg:justify-start">
                <MapPin className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="text-base lg:text-lg">Kanjurmarg</span>
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed lg:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
              </p>

              {/* Features container with price circle and info grid */}
              <div className="relative backdrop-blur-md p-6 lg:p-8 mt-8" style={{ borderRadius: '24px 24px 24px 250px', backgroundColor: '#1A88DD' }}>
                {/* Project Type - standalone on left */}
                <div className="flex items-start space-x-3 mb-6">
                  <Home className="h-7 w-7 text-white flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-sm text-white/80 mb-1">Project Type</div>
                    <div className="text-white font-semibold text-lg lg:text-xl">{websiteData.spotlightProject.projectType}</div>
                  </div>
                  <div className="text-white font-semibold text-sm lg:text-base">Residential</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4">
                  <div className="flex items-center space-x-2 mb-1 lg:space-x-3 lg:mb-2">
                    <Home className="h-4 w-4 text-white lg:h-5 lg:w-5" />
                    <span className="text-xs text-white/80 lg:text-sm">Project Type</span>
                  </div>
                  <div className="text-white font-semibold text-sm lg:text-base">1,2 BHK Apartments</div>
                </div>

                {/* Mobile price circle */}
                <div className="flex justify-center mb-6 lg:hidden">
                  <div className="bg-[#2C5F8D] rounded-full w-36 h-36 flex flex-col items-center justify-center text-white shadow-xl">
                    <div className="text-sm opacity-90">Starting At</div>
                    <div className="text-2xl font-bold">{websiteData.spotlightProject.price}</div>
                  </div>
                  <div className="text-white font-semibold text-sm lg:text-base">379.00sq.ft - 758.00 sq.ft</div>
                </div>

                {/* Right side features - all aligned with left margin */}
                <div className="space-y-5 lg:ml-64 lg:-mt-20">
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
                  <div className="text-white font-semibold text-sm lg:text-base">xxxxxxxxxxxxxxxx</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 lg:pt-6 flex justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-base font-semibold lg:px-10 lg:py-4 lg:text-lg"
                >
                  {websiteData.spotlightProject.ctaText}
                </Button>
                
                <div className="bg-primary-border rounded-full w-24 h-24 flex flex-col items-center justify-center text-white border-4 border-primary-border sm:w-32 sm:h-32">
                  <div className="text-xs opacity-90 lg:text-sm">Starting At</div>
                  <div className="text-lg font-bold lg:text-xl">₹1.48 Cr</div>
                </div>
              </div>
            </div>

            {/* Right image panel that breaks out */}
            <div className="relative h-[400px] lg:h-full w-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[50%] lg:max-w-[700px] mt-8 lg:mt-0">
              <div className="relative h-full min-h-[auto] lg:min-h-[900px]">
                <img
                  src={spotlightBuilding}
                  alt="Ajmera 78 Lakes Town"
                  className="w-full h-full object-cover rounded-none lg:rounded-r-3xl"
                />
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-primary/20 rounded-none lg:rounded-r-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightProjectSection;