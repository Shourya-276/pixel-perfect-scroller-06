import { Zap, Users, Shield, ThumbsUp, MapPin } from "lucide-react";
import handshakeImage from "@/assets/handshake.png";
import modernBuilding from "@/assets/modern-building.png";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

const WhyChooseUsSection = () => {
  const { websiteData } = useWebsiteData();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return Zap;
      case "Users": return Users;
      case "Shield": return Shield;
      case "ThumbsUp": return ThumbsUp;
      case "MapPin": return MapPin;
      default: return Zap;
    }
  };

  return (
    <section className="py-10 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {websiteData.whyChooseUs.title}
          </h2>
        </div>

        {/* Desktop Layout - 2 rows */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          {/* First Row - 3 columns */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* Top Left Card */}
            <div
              className="bg-white p-6"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                borderBottomLeftRadius: "100px",
                borderBottomRightRadius: "15px",
                height: "200px",
                width: "600px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              {websiteData.whyChooseUs.features.slice(0, 2).map((feature, index) => {
                const IconComponent = getIcon(feature.icon);
                return (
                  <div key={feature.id} className="flex items-start space-x-4 mb-4">
                    <IconComponent className="h-7 w-7 text-gray-800 flex-shrink-0" />
                    <h3 className="text-base font-bold text-gray-800 leading-tight">
                      {feature.title} - {feature.description}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Top Center - Building Image */}
            <div className="flex justify-end">
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "20px",
                  height: "200px",
                  width: "235px"
                }}
              >
                <img
                  src={websiteData.whyChooseUs.buildingImage || modernBuilding}
                  alt="Modern building complex"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "right" }}
                />
              </div>
            </div>

            {/* Top Right Card */}
            <div
              className="bg-white p-6 flex items-center"
              style={{
                borderRadius: "24px",
                height: "200px"
              }}
            >
              {websiteData.whyChooseUs.features.slice(2, 3).map((feature) => {
                const IconComponent = getIcon(feature.icon);
                return (
                  <>
                    <IconComponent className="h-7 w-7 text-gray-800 mr-3 flex-shrink-0" />
                    <h3 className="text-base font-bold text-gray-800 leading-tight">
                      {feature.title} - {feature.description}
                    </h3>
                  </>
                );
              })}
            </div>
          </div>

          {/* Second Row - Bottom Handshake + Card */}
          <div className="flex gap-4">
            {/* Bottom Left - Handshake Image */}
            <div
              className="overflow-hidden"
              style={{
                borderTopRightRadius: "20px",
                borderTopLeftRadius: "150px",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
                height: "200px",
                width: "604px"
              }}
            >
              <img
                src={websiteData.whyChooseUs.handshakeImage || handshakeImage}
                alt="Professional handshake deal"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Right Card */}
            <div className="flex-1">
              <div
                className="bg-white p-6 flex flex-col justify-center"
                style={{
                  borderRadius: "24px",
                  height: "200px"
                }}
              >
                {websiteData.whyChooseUs.features.slice(3).map((feature, index) => {
                  const IconComponent = getIcon(feature.icon);
                  return (
                    <div key={feature.id} className="flex items-start space-x-4 mb-4">
                      <IconComponent className="h-7 w-7 text-gray-800 flex-shrink-0" />
                      <h3 className="text-base font-bold text-gray-800 leading-tight">
                        {feature.title} - {feature.description}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex justify-center">
          <div className="w-full max-w-xl bg-[#1A253A]/90 backdrop-blur rounded-2xl px-4 py-8 text-white text-center shadow-lg">
            <div className="space-y-6">
              {websiteData.whyChooseUs.features.map((feature) => {
                const IconComponent = getIcon(feature.icon);
                return (
                  <div key={feature.id} className="flex items-start gap-3">
                    <IconComponent className="h-6 w-6 mt-1 flex-shrink-0" />
                    <span className="text-base text-left">
                      {feature.title} - {feature.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;