import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Home } from "lucide-react";
import { useEffect, useRef } from "react";

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
    name: "RNA NG Royal Park",
    location: "Kanjurmarg", 
    price: "₹1.48 Cr",
    beds: "1 bhk, 2 bhk",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "RNA NG Royal Park",
    location: "Kanjurmarg",
    price: "₹1.48 Cr", 
    beds: "1 bhk, 2 bhk",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "RNA NG Royal Park",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    beds: "1 bhk, 2 bhk", 
    type: "Residential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
  }
];

const NewlyLaunchedSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationFrame: number;
    let scrollAmount = 0;
    const speed = 1; // px per frame
    const animate = () => {
      if (scrollContainer) {
        scrollAmount += speed;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Duplicate properties for infinite loop effect
  const allProperties = [...properties, ...properties];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Newly Launched</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore newly launched homes across Mumbai<br />
            designed for modern living, convenience, and comfort.
          </p>
        </div>

        {/* Animated horizontal scroll */}
        <div className="overflow-x-hidden mb-12">
          <div
            ref={scrollRef}
            className="flex gap-6 w-max animate-none"
            style={{ scrollBehavior: "auto", minWidth: "100%" }}
          >
            {allProperties.map((property, idx) => (
              <div
                key={property.id + '-' + idx}
                className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-80 min-w-[300px] max-w-xs w-full"
                style={{ flex: "0 0 300px" }}
              >
                {/* Background image */}
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                  {/* Top badge */}
                  <div className="flex justify-start">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {property.type}
                    </div>
                  </div>
                  {/* Bottom content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">{property.name}</h3>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-2" />
                      <span className="text-sm">{property.beds}</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      <span className="text-sm">Residential</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm opacity-90">Starting At</div>
                        <div className="text-lg font-bold">{property.price}</div>
                      </div>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="bg-white text-gray-800 hover:bg-gray-100"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-12 py-3 text-lg">
            View more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewlyLaunchedSection;