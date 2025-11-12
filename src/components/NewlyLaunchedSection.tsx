import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Home } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

const NewlyLaunchedSection = () => {
  const { websiteData } = useWebsiteData();
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {websiteData.newlyLaunched.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto whitespace-pre-line">
            {websiteData.newlyLaunched.description}
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          plugins={[autoplay.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-6">
            {websiteData.newlyLaunched.projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 relative"
              >
                <div
                  className="relative bg-white rounded-xl shadow-lg transition-all duration-500 
                             group will-change-transform hover:z-20 hover:-translate-y-4 hover:scale-[1.08] transform-gpu"
                >
                  {/* Image */}
                  <div className="relative h-80 rounded-t-xl overflow-hidden">
                    <img
                      src={project.image || "https://via.placeholder.com/300x200"}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 bg-primary/80 text-white px-4 py-2 text-sm font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.type}
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                      <div>
                        <h3 className="text-xl font-bold tracking-wide">
                          {project.name}
                        </h3>
                        <div className="w-0 h-0.5 bg-primary mt-2 group-hover:w-full transition-all duration-500 ease-out" />
                      </div>
                      <div className="space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">{project.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">{project.beds}</span>
                        </div>
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">{project.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Button */}
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600 font-medium">
                          Starting At
                        </div>
                        <div className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                          {project.price}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 h-8 w-8 bg-white/80 hover:bg-white hover:scale-110 transition-transform duration-200" />
          <CarouselNext className="right-2 h-8 w-8 bg-white/80 hover:bg-white hover:scale-110 transition-transform duration-200" />
        </Carousel>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-12 py-3 text-lg">
            Explore All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewlyLaunchedSection;