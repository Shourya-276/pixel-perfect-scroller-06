import { Zap, Users, Shield, ThumbsUp, MapPin } from "lucide-react";
import handshakeImage from "@/assets/handshake.png";
import modernBuilding from "@/assets/modern-building.png";

const cardHeight = "170px"; // Smart Tools/Personalized Assistance and handshake image height

const WhyChooseUsSection = () => (
  <section className="py-10 bg-primary">
    <div className="container mx-auto px-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose Us ?</h2>
      </div>
      {/* Desktop Layout - 2 rows */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        {/* First Row - 3 columns */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Top Left Card */}
          <div
            className="bg-white p-6"
            style={{
              borderRadius: "24px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div className="flex items-start space-x-4 mb-4">
              <Zap className="h-7 w-7 text-gray-800 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-800 leading-tight">
                Smart Tools - Use price comparison, EMI calculators & site visit schedulers to make informed decisions.
              </h3>
            </div>
            <div className="flex items-start space-x-4">
              <Users className="h-7 w-7 text-gray-800 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-800 leading-tight">
                Personalized Assistance - Talk to experts, not bots.
              </h3>
            </div>
          </div>

          {/* Top Center - Building Image (smaller) */}
          <div
            className="overflow-hidden"
            style={{
              borderRadius: "20px",
              height: "200px"
            }}
          >
            <img
              src={modernBuilding}
              alt="Modern building complex"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right Card */}
          <div
            className="bg-white p-6 flex items-center"
            style={{
              borderRadius: "24px",
              height: "200px"
            }}
          >
            <MapPin className="h-7 w-7 text-gray-800 mr-3 flex-shrink-0" />
            <h3 className="text-base font-bold text-gray-800 leading-tight">
              Location Intelligence - Get deep insights on areas, pricing trends & upcoming growth zones.
            </h3>
          </div>
        </div>

        {/* Second Row - 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bottom Left - Handshake Image */}
          <div
            className="overflow-hidden"
            style={{
              borderRadius: "20px",
              height: "200px"
            }}
          >
            <img
              src={handshakeImage}
              alt="Professional handshake deal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Right Card */}
          <div
            className="bg-white p-6 flex flex-col justify-center"
            style={{
              borderRadius: "24px",
              height: "200px"
            }}
          >
            <div className="flex items-start space-x-4 mb-4">
              <Shield className="h-7 w-7 text-gray-800 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-800 leading-tight">
                Verified Properties – No fakes, no fluff.
              </h3>
            </div>
            <div className="flex items-start space-x-4">
              <ThumbsUp className="h-7 w-7 text-gray-800 flex-shrink-0" />
              <h3 className="text-base font-bold text-gray-800 leading-tight">
                Hassle-Free Experience – From virtual tours to legal help, we've got you covered. Choose Mumbai Homes for a smoother, smarter, and stress-free property journey.
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: unchanged */}
      <div className="lg:hidden flex justify-center">
        <div className="w-full max-w-xl bg-[#1A253A]/90 backdrop-blur rounded-2xl px-4 py-8 text-white text-center shadow-lg">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 mt-1 flex-shrink-0" />
              <span className="text-base text-left">
                Smart Tools - Use price comparison, EMI calculators & site visit schedulers to make informed decisions.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 mt-1 flex-shrink-0" />
              <span className="text-base text-left">Verified Properties – No fakes, no fluff.</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
              <span className="text-base text-left">
                Location Intelligence - Get deep insights on areas, pricing trends & upcoming growth zones.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-6 w-6 mt-1 flex-shrink-0" />
              <span className="text-base text-left">
                Personalized Assistance - Talk to experts, not bots.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <ThumbsUp className="h-6 w-6 mt-1 flex-shrink-0" />
              <span className="text-base text-left">
                Hassle-Free Experience – Mumbai Homes has you covered for a smooth, stress-free property journey.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
