import { Button } from "@/components/ui/button";
import { MapPin, Home, SquareIcon, Link } from "lucide-react";
import spotlightBuilding from "@/assets/spotlight-building.png";

const SpotlightProjectSection = () => {
  return (
    <section className="bg-white w-full">
      <div className="relative w-full">
        {/* Main card with asymmetric design */}
        <div className="relative bg-primary overflow-hidden w-full">
          <div className="grid lg:grid-cols-2 items-center min-h-[800px] max-w-screen-2xl mx-auto px-6">
            {/* Left content panel */}
            <div className="p-12 text-white space-y-6 relative z-10">
              {/* Spotlight badge */}
              <div className="inline-block">
                <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium">
                  Spotlight Project
                </div>
              </div>

              {/* Project title */}
              <h2 className="text-4xl font-bold leading-tight">
                Ajmera 78 Lakes Town
              </h2>

              {/* Location */}
              <div className="flex items-center space-x-2 text-white/90">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">Kanjurmarg</span>
              </div>

              {/* Description */}
              <p className="text-white/80 text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-6 py-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Home className="h-5 w-5 text-white" />
                    <span className="text-sm text-white/80">Project Type</span>
                  </div>
                  <div className="text-white font-semibold">Residential</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Home className="h-5 w-5 text-white" />
                    <span className="text-sm text-white/80">Project Type</span>
                  </div>
                  <div className="text-white font-semibold">1,2 BHK Apartments</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <SquareIcon className="h-5 w-5 text-white" />
                    <span className="text-sm text-white/80">Rera Carpet Area</span>
                  </div>
                  <div className="text-white font-semibold">379.00sq.ft - 758.00 sq.ft</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Link className="h-5 w-5 text-white" />
                    <span className="text-sm text-white/80">Maharera Registration no.</span>
                  </div>
                  <div className="text-white font-semibold">xxxxxxxxxxxxxxxx</div>
                </div>
              </div>

              {/* Price circle and CTA */}
              <div className="flex items-center justify-between pt-6">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold"
                >
                  View more
                </Button>
                
                <div className="bg-primary-border rounded-full w-32 h-32 flex flex-col items-center justify-center text-white border-4 border-primary-border">
                  <div className="text-sm opacity-90">Starting At</div>
                  <div className="text-xl font-bold">₹1.48 Cr</div>
                </div>
              </div>
            </div>

            {/* Right image panel that breaks out */}
            <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[50%] lg:max-w-[700px]">
              <div className="relative h-full min-h-[900px]">
                <img
                  src={spotlightBuilding}
                  alt="Ajmera 78 Lakes Town"
                  className="w-full h-full object-cover rounded-r-3xl"
                />
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-primary/20 rounded-r-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightProjectSection;