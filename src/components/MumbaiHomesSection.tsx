import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import mumbaiHomesLogo from "@/assets/mumbai-homes-logo.png";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

// CHANGE: Define interfaces for type safety
interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

interface CompanyLink {
  id: number;
  text: string;
  url: string;
}

interface MumbaiHomesData {
  logo: string;
  title: string;
  description: string;
  companyLinks: CompanyLink[];
  disclaimer: string;
  copyright: string;
  socialLinks: SocialLink[];
}

const MumbaiHomesSection = () => {
  // CHANGE: Use context data
  const { websiteData } = useWebsiteData();
  const mumbaiHomesData: MumbaiHomesData = websiteData.mumbaiHomes;

  // CHANGE: Map icon strings to Lucide components
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Instagram: Instagram,
    Facebook: Facebook,
    LinkedIn: Linkedin,
    YouTube: Youtube,
    Twitter: Twitter,
  };

  return (
    <section className="py-6 md:py-12 text-white" style={{ backgroundColor: "#0D6ABC" }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {/* Left Column - Logo and About */}
          <div className="text-center md:text-left">
            <div className="mb-6 md:mb-0 md:-mt-10 md:-mb-2">
              <img
                src={mumbaiHomesData.logo || mumbaiHomesLogo}
                alt="Mumbai Homes Logo"
                className="h-[120px] sm:h-[150px] w-auto mx-auto md:mx-0 md:ml-[50px]"
              />
            </div>

            {/* Our Company (Mobile) */}
            <div className="mb-6 md:hidden">
              <h3 className="text-base font-bold mb-3">Our Company</h3>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm max-w-sm mx-auto">
                {mumbaiHomesData.companyLinks.map((link) => (
                  <a key={link.id} href={link.url} className="hover:underline">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>

            <div className="max-w-full">
              <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4">
                {mumbaiHomesData.title}
              </h3>
              {/* CHANGE: Render description as HTML to support <strong> tags */}
              <div
                className="text-sm opacity-90 text-left md:text-left leading-relaxed max-w-lg md:max-w-none md:mx-0 mx-auto"
                dangerouslySetInnerHTML={{ __html: mumbaiHomesData.description }}
              />
            </div>
          </div>

          {/* Right Column - Company Info and Disclaimer */}
          <div className="grid grid-cols-1 gap-4 md:gap-8 text-center md:text-left">
            {/* Our Company (Desktop) */}
            <div className="hidden md:block">
              <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4">Our Company</h3>
              <div className="flex space-x-4 text-sm">
                {mumbaiHomesData.companyLinks.map((link) => (
                  <a key={link.id} href={link.url} className="hover:underline">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div>
              <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4">Disclaimer</h3>
              {/* CHANGE: Render disclaimer as HTML */}
              <div
                className="text-xs md:text-sm leading-relaxed opacity-90"
                dangerouslySetInnerHTML={{ __html: mumbaiHomesData.disclaimer }}
              />
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-10 pt-4 md:pt-6 border-t border-white/20 text-xs md:text-sm">
          <div className="mb-3 md:mb-0 text-center">
            {/* CHANGE: Render copyright as HTML */}
            <div dangerouslySetInnerHTML={{ __html: mumbaiHomesData.copyright }} />
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <a href="#" className="underline">Privacy Policy</a>
            <div className="flex space-x-2 ml-2 md:space-x-3 md:ml-4">
              {mumbaiHomesData.socialLinks.map((link) => {
                const IconComponent = iconMap[link.icon];
                return IconComponent ? (
                  <Button
                    key={link.id}
                    variant="ghost"
                    size="sm"
                    className="p-1 text-white hover:bg-white/10"
                    asChild
                  >
                    <a href={link.url}>
                      <span className="sr-only">{link.platform}</span>
                      <IconComponent className="h-4 w-4" />
                    </a>
                  </Button>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MumbaiHomesSection;