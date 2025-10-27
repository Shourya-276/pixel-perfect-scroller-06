import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

interface Bank {
  id: number;
  name: string;
  logo: string;
}

interface BanksData {
  title: string;
  description: string;
  contactText: string;
  ctaText: string;
  banks: Bank[];
}

// Utility to check if a string is a base64 image
const isBase64Image = (str: string) => str && typeof str === 'string' && str.startsWith('data:image/');

const BanksSection = () => {
  const { websiteData } = useWebsiteData();
  const { title, description, contactText, ctaText, banks } = websiteData.banks as BanksData;

  console.log('BanksSection data:', { title, description, contactText, ctaText, banks });

  return (
    <section className="py-6 lg:py-10 bg-primary">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-4 lg:mb-8">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-4">{title}</h2>
          <p className="text-xs lg:text-sm text-white/90 max-w-2xl mx-auto mb-1 lg:mb-3">
            {description}
          </p>
          <p className="text-xs lg:text-sm text-white/90 font-medium">{contactText}</p>
        </div>

        {/* Static grid for large screens */}
        <div className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {banks.slice(0, 6).map((bank) => (
            <div
              key={bank.id}
              className="rounded-xl p-6 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: '#0D6ABC' }}
            >
              <div className="w-12 h-12 flex-shrink-0">
                <img src={bank.logo} alt={bank.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-white font-semibold text-lg">{bank.name}</h3>
            </div>
          ))}
        </div>

        {/* Static grid for small screens (mobile) */}
        <div className="lg:hidden grid grid-cols-2 gap-3 max-w-md mx-auto">
          {banks.slice(0, 6).map((bank) => (
            <div
              key={bank.id}
              className="rounded-lg p-3 flex items-center gap-3 shadow-lg"
              style={{ backgroundColor: '#0D6ABC' }}
            >
              <div className="w-10 h-10 flex-shrink-0 bg-white rounded flex items-center justify-center">
                <img src={bank.logo} alt={bank.name} className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-white font-semibold text-sm leading-tight">{bank.name}</h3>
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-4 lg:mt-8">
          <Button
            variant="secondary"
            size="default"
            className="bg-white text-primary hover:bg-white/90 px-5 py-2 text-sm font-semibold lg:px-6 lg:py-2 lg:text-base"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BanksSection;