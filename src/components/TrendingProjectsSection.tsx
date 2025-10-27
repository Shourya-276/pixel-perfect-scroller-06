import { useState, useRef, useEffect } from "react";
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

const TrendingProjectsSection = () => {
  const { websiteData } = useWebsiteData();
  const projects = websiteData.trendingProjects.projects;

  // Derive unique locations from projects (only those with at least one project)
  const uniqueLocations = Array.from(new Set(projects.map((p) => p.location))).filter(Boolean).sort();

  const [activeLocation, setActiveLocation] = useState(uniqueLocations[0] || "");

  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  // Filter projects based on active location
  const filteredProjects = projects.filter((project) => project.location === activeLocation);

  // Update activeLocation if uniqueLocations change and current is invalid
  useEffect(() => {
    if (uniqueLocations.length > 0 && !uniqueLocations.includes(activeLocation)) {
      setActiveLocation(uniqueLocations[0]);
    }
  }, [uniqueLocations, activeLocation]);

  if (uniqueLocations.length === 0) {
    return null; // Or show a message like "No trending projects available"
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {websiteData.trendingProjects.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto whitespace-pre-line">
            {websiteData.trendingProjects.description}
          </p>
        </div>

        {/* Location Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-x-6 px-2 -mx-2 lg:flex-wrap lg:justify-center lg:gap-8 lg:px-0 lg:mx-0">
            {uniqueLocations.map((location) => (
              <button
                key={location}
                onClick={() => setActiveLocation(location)}
                className={`text-lg font-medium transition-colors pb-2 border-b-2 whitespace-nowrap ${
                  activeLocation === location
                    ? "text-primary border-primary"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
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
            {filteredProjects.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 relative"
              >
                <div
                  className="relative bg-white rounded-xl shadow-lg transition-all duration-500 
                             group will-change-transform hover:z-20 hover:scale-110 hover:-translate-y-4 
                             hover:rotate-1 transform-gpu"
                >
                  {/* Image */}
                  <div className="relative h-72 rounded-t-xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                      <div>
                        <h3 className="text-xl font-bold tracking-wide">
                          {project.name}
                        </h3>
                        <div className="w-0 h-0.5 bg-primary mt-2 group-hover:w-full transition-all duration-500 ease-out" />
                      </div>

                      <div className="space-y-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">
                            {project.location}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">
                            {project.beds}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">
                            {project.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Button */}
                  <div className="p-5 bg-white">
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
          <CarouselPrevious className="left-4 hover:scale-110 transition-transform duration-200" />
          <CarouselNext className="right-4 hover:scale-110 transition-transform duration-200" />
        </Carousel>

        <div className="text-center mt-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-12 py-3 text-lg">
            View more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProjectsSection;