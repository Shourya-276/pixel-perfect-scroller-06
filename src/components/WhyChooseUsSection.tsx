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

        {/* Desktop: New curved card layout matching the reference */}
        <div className="hidden lg:grid grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Top left card - Smart Tools & Personalized Assistance with curved bottom-right */}
          <div className="relative bg-white p-8 h-80" style={{
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)'
          }}>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 p-3 rounded-xl">
                  <Zap className="h-8 w-8 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Smart Tools - Use price comparison, EMI calculators & site visit schedulers to make informed decisions.
                  </h3>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 p-3 rounded-xl">
                  <Users className="h-8 w-8 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Personalized Assistance - Talk to experts, not bots.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Top right card - Location Intelligence with curved bottom-left */}
          <div className="relative bg-white p-8 h-80" style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)'
          }}>
            <div className="flex items-start space-x-4 h-full">
              <div className="bg-gray-100 p-3 rounded-xl">
                <MapPin className="h-8 w-8 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Location Intelligence - Get deep insights on areas, pricing trends & upcoming growth zones.
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom left card - Handshake image with curved top-right */}
          <div className="relative overflow-hidden h-80" style={{
            clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0 100%)'
          }}>
            <img
              src={handshakeImage}
              alt="Handshake deal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom right card - Verified Properties & Hassle-Free Experience */}
          <div className="bg-white p-8 h-80 rounded-3xl">
            <div className="space-y-8 h-full flex flex-col justify-center">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 p-3 rounded-xl">
                  <Shield className="h-8 w-8 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Verified Properties - No fakes, no fluff.</h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 p-3 rounded-xl">
                  <ThumbsUp className="h-8 w-8 text-gray-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Hassle-Free Experience - From virtual tours to legal help, we've got you covered. Choose Mumbai Homes for a smoother, smarter, and stress-free property journey.</h3>
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