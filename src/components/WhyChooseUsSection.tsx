import { Zap, Users, Shield, ThumbsUp, MapPin } from "lucide-react";
import handshakeImage from "@/assets/handshake.png";
import modernBuilding from "@/assets/modern-building.png";

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose Us ?</h2>
        </div>

        {/* Mobile: Single dark card with all features stacked */}
        <div className="lg:hidden flex justify-center">
          <div className="w-full max-w-xl bg-[#1A253A]/90 backdrop-blur rounded-2xl px-4 py-8 text-white text-center shadow-lg">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 mt-1 flex-shrink-0" />
                <span className="text-base text-left">Smart Tools - Use price comparison, EMI calculators & site visit schedulers to make informed decisions.</span>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 mt-1 flex-shrink-0" />
                <span className="text-base text-left">Verified Properties – No fakes, no fluff.</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                <span className="text-base text-left">Location Intelligence - Get deep insights on areas, pricing trends & upcoming growth zones.</span>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 mt-1 flex-shrink-0" />
                <span className="text-base text-left">Personalized Assistance - Talk to experts, not bots.</span>
              </div>
              <div className="flex items-start gap-3">
                <ThumbsUp className="h-6 w-6 mt-1 flex-shrink-0" />
                <span className="text-base text-left">Hassle-Free Experience – Mumbai Homes has you covered for a smooth, stress-free property journey.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Grid layout matching reference image */}
        <div className="hidden lg:block">
          {/* Top row - 3 cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Top left card - Smart Tools */}
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 p-3 rounded-xl">
                  <Zap className="h-8 w-8 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">
                    Smart Tools - Use price comparison, EMI calculators & site visit schedulers to make informed decisions.
                  </h3>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Users className="h-8 w-8 text-gray-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">
                      Personalized Assistance - Talk to experts, not bots.
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Top middle card - Building image */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <img
                src={modernBuilding}
                alt="Modern building complex"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top right card - Location Intelligence */}
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 p-3 rounded-xl">
                  <MapPin className="h-8 w-8 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">
                    Location Intelligence - Get deep insights on areas, pricing trends & upcoming growth zones.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row - 2 cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Bottom left card - Handshake image */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <img
                src={handshakeImage}
                alt="Professional handshake deal"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom right card - Features */}
            <div className="bg-white rounded-2xl p-8">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Shield className="h-8 w-8 text-gray-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">
                      Verified Properties – No fakes, no fluff.
                    </h3>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <ThumbsUp className="h-8 w-8 text-gray-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">
                      Hassle-Free Experience – From virtual tours to legal help, we've got you covered. Choose Mumbai Homes for a smoother, smarter, and stress-free property journey.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;