import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Home } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

interface Project {
  id: number;
  name: string;
  location: string;
  price: string;
  beds: string;
  type: string;
  image: string;
}

const NewlyLaunchedSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const { websiteData } = useWebsiteData();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.overflow = "visible";
    }
  }, []);

  useEffect(() => {
    if (api) {
      api.reInit(); // Reinitialize carousel when projects change
    }
  }, [api, websiteData.newlyLaunched.projects]);

  return (
    <section className="py-12 bg-gray-50 overflow-visible relative z-0">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {websiteData.newlyLaunched.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto whitespace-pre-line">
            {websiteData.newlyLaunched.description}
          </p>
        </div>

        <div className="relative overflow-visible">
          <Carousel
            setApi={setApi}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full overflow-visible relative z-0"
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
          >
            <CarouselContent
              className="-ml-6 overflow-visible relative z-0"
              ref={containerRef}
            >
              {websiteData.newlyLaunched.projects.map((project: Project, idx: number) => (
                <CarouselItem
                  key={`${project.id}-${idx}`}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 overflow-visible"
                >
                  <div className="relative rounded-xl shadow-lg transition-all duration-500 group h-80 w-full hover:shadow-2xl hover:-translate-y-4 hover:scale-105 hover:z-10">
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                      <div className="flex justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {project.type}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </div>
                        <div className="flex items-center text-sm">
                          <Bed className="h-4 w-4 mr-1" />
                          {project.beds}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <div className="text-xs opacity-80">Starting At</div>
                            <div className="text-lg font-bold">{project.price}</div>
                          </div>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white text-gray-900 hover:bg-gray-100"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Explore All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewlyLaunchedSection;