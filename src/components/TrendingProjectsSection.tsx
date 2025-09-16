import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MapPin, Bed, Home } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const locations = [
  "Western Mumbai",
  "Eastern Mumbai", 
  "Central Mumbai",
  "Mumbai Metropolitan",
  "Thane-Kalyan",
  "Navi Mumbai"
];

const projects = [
  {
    id: 1,
    name: "RNA NG Royal Park",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    beds: "1 bhk, 2 bhk",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=500&fit=crop"
  },
  {
    id: 2,
    name: "RNA NG Royal Park",
    location: "Kanjurmarg", 
    price: "₹1.48 Cr",
    beds: "1 bhk, 2 bhk",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=500&fit=crop"
  },
  {
    id: 3,
    name: "RNA NG Royal Park",
    location: "Kanjurmarg",
    price: "₹1.48 Cr", 
    beds: "1 bhk, 2 bhk",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=500&fit=crop"
  },
  {
    id: 4,
    name: "RNA NG Royal Park",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    beds: "1 bhk, 2 bhk", 
    type: "Residential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=500&fit=crop"
  },
  {
    id: 5,
    name: "RNA NG Royal Park",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    beds: "1 bhk, 2 bhk", 
    type: "Residential",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=500&fit=crop"
  }
];

const TrendingProjectsSection = () => {
  const [activeLocation, setActiveLocation] = useState("Western Mumbai");

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Trending Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find what's hot in the city — top-rated developments<br />
            making waves in Mumbai's real estate scene.
          </p>
        </div>

        {/* Location tabs */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setActiveLocation(location)}
              className={`text-lg font-medium transition-colors pb-2 border-b-2 ${
                activeLocation === location
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {location}
            </button>
          ))}
        </div>

        {/* Projects carousel */}
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {projects.map((project) => (
              <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  {/* Project image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                      {/* Project name */}
                      <h3 className="text-xl font-bold">{project.name}</h3>
                      
                      {/* Bottom content */}
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">{project.location}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-2" />
                          <span className="text-sm">{project.beds}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2" />
                          <span className="text-sm">{project.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price section */}
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Starting At</div>
                        <div className="text-lg font-bold text-gray-800">{project.price}</div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

        {/* View more button */}
        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-12 py-3 text-lg">
            View more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProjectsSection;