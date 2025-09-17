import { Button } from "@/components/ui/button";
import { MapPin, Home, SquareIcon, Link } from "lucide-react";
import spotlightBuilding from "@/assets/spotlight-building.png";

const SpotlightProjectSection = () => {
  return (
    <section className="bg-white w-full">
      <div className="relative w-full">
        {/* Main card with asymmetric design */}
        <div className="relative bg-primary overflow-hidden w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[800px] lg:min-h-[auto] max-w-screen-2xl mx-auto px-6">
            {/* Left content panel */}
            <div className="p-6 lg:p-12 text-white space-y-4 lg:space-y-6 relative z-10 text-center lg:text-left">
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

              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 lg:gap-6 lg:py-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4">
                  <div className="flex items-center space-x-2 mb-1 lg:space-x-3 lg:mb-2">
                    <Home className="h-4 w-4 text-white lg:h-5 lg:w-5" />
                    <span className="text-xs text-white/80 lg:text-sm">Project Type</span>
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

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4">
                  <div className="flex items-center space-x-2 mb-1 lg:space-x-3 lg:mb-2">
                    <SquareIcon className="h-4 w-4 text-white lg:h-5 lg:w-5" />
                    <span className="text-xs text-white/80 lg:text-sm">Rera Carpet Area</span>
                  </div>
                  <div className="text-white font-semibold text-sm lg:text-base">379.00sq.ft - 758.00 sq.ft</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4">
                  <div className="flex items-center space-x-2 mb-1 lg:space-x-3 lg:mb-2">
                    <Link className="h-4 w-4 text-white lg:h-5 lg:w-5" />
                    <span className="text-xs text-white/80 lg:text-sm">Maharera Registration no.</span>
                  </div>
                  <div className="text-white font-semibold text-sm lg:text-base">xxxxxxxxxxxxxxxx</div>
                </div>
              </div>

              {/* Price circle and CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-4 lg:pt-6 space-y-4 sm:space-y-0">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-6 py-2 text-base font-semibold lg:px-8 lg:py-3 lg:text-lg"
                >
                  View more
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