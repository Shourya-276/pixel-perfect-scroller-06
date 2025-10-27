import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

// Utility to check if a string is a base64 image (same as VirtualTourAdmin)
const isBase64Image = (str: string) => str && typeof str === 'string' && str.startsWith('data:image/');

// Define interfaces to match VirtualTourAdmin
interface VirtualTour {
  id: number;
  image: string;
  alt: string;
}

interface CompanyLogo {
  id: number;
  initials: string; // Stores base64 image or text initials
  name: string;
  color: string;
  textColor: string;
  description: string;
  subDescription?: string;
}

interface VirtualTourData {
  title: string;
  tours: VirtualTour[];
  companyLogos: CompanyLogo[];
}

const VirtualTourSection = () => {
  const { websiteData } = useWebsiteData();
  const { title, tours, companyLogos } = websiteData.virtualTour as VirtualTourData;

  // Log data for debugging
  console.log('VirtualTourSection data:', { title, tours, companyLogos });

  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Virtual Tour Section */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">{title}</h2>
          {tours.length > 0 ? (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="flex -ml-4">
                {tours.map((tour) => (
                  <CarouselItem
                    key={tour.id}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="relative h-[600px] sm:h-[480px] md:h-[600px] bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="icon"
                          className="bg-white/90 hover:bg-white text-black rounded-full p-3 h-14 w-14 sm:h-16 sm:w-16"
                        >
                          <Play className="h-8 w-8" />
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <p className="text-center text-gray-600">No virtual tours available.</p>
          )}
        </div>

        {/* Company Logos Section */}
        {companyLogos.length > 0 && (
          <Carousel
            plugins={[
              Autoplay({
                delay: 0,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
              duration: 15000,
            }}
            className="w-full mt-12 lg:mt-16"
          >
            <CarouselContent className="-ml-4">
              {companyLogos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="flex flex-col items-center space-y-1 p-2">
                    {isBase64Image(logo.initials) ? (
                      <img
                        src={logo.initials}
                        alt={logo.name}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                    ) : (
                      <div
                        className={`${logo.color} p-3 rounded-lg w-16 h-16 flex items-center justify-center text-xl font-bold`}
                      >
                        {logo.initials || 'N/A'}
                      </div>
                    )}
                    <div className="text-center">
                      <div className={`${logo.textColor} font-bold text-sm`}>{logo.name}</div>
                      {logo.description && (
                        <div className="text-xs text-gray-600">{logo.description}</div>
                      )}
                      {logo.subDescription && (
                        <div className="text-xs text-gray-600">{logo.subDescription}</div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default VirtualTourSection;