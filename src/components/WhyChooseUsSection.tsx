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

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top left card - Smart Tools */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 space-y-3 lg:space-y-4">
            <div className="flex items-start space-x-3 lg:space-x-4">
              <div className="bg-gray-100 p-2 rounded-xl lg:p-3">
                <Zap className="h-6 w-6 text-gray-800 lg:h-8 lg:w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 lg:text-xl lg:mb-3">
                  Smart Tools - Use price comparison, EMI calculators & site visit schedulers to make informed decisions.
                </h3>
              </div>
            </div>
          </div>

          {/* Top middle card - Building image */}
          <div className="bg-white rounded-3xl overflow-hidden h-64 md:h-auto">
            <img
              src={modernBuilding}
              alt="Modern building"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top right card - Location Intelligence */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 space-y-3 lg:space-y-4">
            <div className="flex items-start space-x-3 lg:space-x-4">
              <div className="bg-gray-100 p-2 rounded-xl lg:p-3">
                <MapPin className="h-6 w-6 text-gray-800 lg:h-8 lg:w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 lg:text-xl lg:mb-3">
                  Location Intelligence - Get deep insights on areas, pricing trends & upcoming growth zones.
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom left card - Handshake image */}
          <div className="bg-white rounded-3xl overflow-hidden h-64 md:h-auto">
            <img
              src={handshakeImage}
              alt="Handshake deal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom right card - Features */}
          <div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-6 lg:p-8 space-y-4 lg:space-y-6">
            <div className="flex items-start space-x-3 lg:space-x-4">
              <div className="bg-gray-100 p-2 rounded-xl lg:p-3">
                <Users className="h-6 w-6 text-gray-800 lg:h-8 lg:w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 lg:text-xl lg:mb-3">
                  Personalized Assistance - Talk to experts, not bots.
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 lg:gap-6">
              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <Shield className="h-6 w-6 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1 lg:mb-2 text-base lg:text-lg">Verified Properties</h4>
                  <p className="text-gray-600 text-sm lg:text-base">No fakes, no fluff.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <ThumbsUp className="h-6 w-6 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1 lg:mb-2 text-base lg:text-lg">Hassle-Free Experience</h4>
                  <p className="text-gray-600 text-sm lg:text-base">From virtual tours to legal help, we've got you covered. Choose Mumbai Homes for a smoother, smarter, and stress-free property journey.</p>
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