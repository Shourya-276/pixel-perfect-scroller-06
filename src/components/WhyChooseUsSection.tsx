import { Zap, Users, Shield, ThumbsUp, MapPin } from "lucide-react";
import handshakeImage from "@/assets/handshake.png";
import modernBuilding from "@/assets/modern-building.png";

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us ?</h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top left card - Smart Tools */}
          <div className="bg-white rounded-3xl p-8 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 p-3 rounded-2xl">
                <Zap className="h-8 w-8 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Smart Tools - Use price comparison, EMI calculators & site visit schedulers to make informed decisions.
                </h3>
              </div>
            </div>
          </div>

          {/* Top middle card - Building image */}
          <div className="bg-white rounded-3xl overflow-hidden">
            <img
              src={modernBuilding}
              alt="Modern building"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top right card - Location Intelligence */}
          <div className="bg-white rounded-3xl p-8 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 p-3 rounded-2xl">
                <MapPin className="h-8 w-8 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Location Intelligence - Get deep insights on areas, pricing trends & upcoming growth zones.
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom left card - Handshake image */}
          <div className="bg-white rounded-3xl overflow-hidden">
            <img
              src={handshakeImage}
              alt="Handshake deal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom right card - Features */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 p-3 rounded-2xl">
                <Users className="h-8 w-8 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Personalized Assistance - Talk to experts, not bots.
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <Shield className="h-6 w-6 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Verified Properties</h4>
                  <p className="text-gray-600">No fakes, no fluff.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <ThumbsUp className="h-6 w-6 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Hassle-Free Experience</h4>
                  <p className="text-gray-600">From virtual tours to legal help, we've got you covered. Choose Mumbai Homes for a smoother, smarter, and stress-free property journey.</p>
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