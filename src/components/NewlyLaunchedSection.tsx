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

const properties = [
  {
    id: 1,
    name: "RNA NG Royal Park",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    beds: "1 bhk, 2 bhk",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Lodha Amara",
    location: "Thane", 
    price: "₹2.25 Cr",
    beds: "2 bhk, 3 bhk",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Godrej Properties",
    location: "Vikhroli",
    price: "₹1.85 Cr", 
    beds: "1 bhk, 2 bhk",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Mahindra Lifespaces",
    location: "Bhandup",
    price: "₹1.95 Cr",
    beds: "2 bhk, 3 bhk", 
    type: "Residential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Oberoi Realty",
    location: "Goregaon",
    price: "₹3.45 Cr",
    beds: "3 bhk, 4 bhk", 
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Tata Housing",
    location: "Mulund",
    price: "₹2.15 Cr",
    beds: "2 bhk, 3 bhk", 
    type: "Residential",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
  }
];

const NewlyLaunchedSection = () => {
  // Create multiple duplicates for seamless loop
  const allProperties = [...properties];

  return (
    <section className="py-12 bg-gray-50 overflow-visible">
      <div className="container mx-auto px-6 overflow-visible">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Newly Launched</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore newly launched homes across Mumbai<br />
            designed for modern living, convenience, and comfort.
          </p>
        </div>

        {/* Animated horizontal scroll */}
        <Carousel
          plugins={[
            Autoplay({
              delay: 0,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full overflow-visible"
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
            duration: 5000,
          }}
        >
          <CarouselContent className="-ml-6 overflow-visible">
            {allProperties.map((property, idx) => (
              <CarouselItem key={property.id + "-" + idx} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 overflow-visible">
                <div
                  className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-6 hover:scale-110 hover:rotate-1 group h-80 w-full flex-shrink-0 hover:z-10 transform-gpu perspective-1000"
                  style={{
                    filter: 'hover:drop-shadow(0 25px 35px rgba(0, 0, 0, 0.25))'
                  }}
                >
                  {/* Background image */}
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                    {/* Top badge with glow effect */}
                    <div className="flex justify-start">
                      <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/20">
                        {property.type}
                      </div>
                    </div>
                    
                    {/* Bottom content */}
                    <div className="space-y-3 transform transition-transform duration-300 group-hover:translate-y-0">
                      <h3 className="text-xl font-bold tracking-wide">{property.name}</h3>
                      <div className="flex items-center text-white/90">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex items-center text-white/90">
                        <Bed className="h-4 w-4 mr-2" />
                        <span className="text-sm">{property.beds}</span>
                      </div>
                      <div className="flex items-center text-white/90">
                        <Home className="h-4 w-4 mr-2" />
                        <span className="text-sm">{property.type}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <div className="text-sm opacity-80">Starting At</div>
                          <div className="text-xl font-bold text-white">{property.price}</div>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="bg-white/95 text-gray-800 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
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

export default NewlyLaunchedSection;