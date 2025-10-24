import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  {
    id: 1,
    title: "New Projects",
    items: [
      { text: "New Projects in Chembur", locality: "Chembur" },
      { text: "New Projects in Vikhroli", locality: "Vikhroli" }, 
      { text: "New Projects in Bhandup", locality: "Bhandup" },
      { text: "New Projects in Ghatkopar", locality: "Ghatkopar" }
    ],
    link: "View All"
  },
  {
    id: 2,
    title: "Trending Projects", 
    items: [
      { text: "Trending Projects in Chembur", locality: "Chembur" },
      { text: "Trending Projects in Vikhroli", locality: "Vikhroli" },
      { text: "Trending Projects in Bhandup", locality: "Bhandup" }, 
      { text: "Trending Projects in Ghatkopar", locality: "Ghatkopar" }
    ],
    link: "View All"
  },
  {
    id: 3,
    title: "1&2 BHK Flats",
    items: [
      { text: "1&2 BHK Flats in Chembur", locality: "Chembur", bedrooms: "1 BHK,2 BHK" },
      { text: "1 BHK Flats in Vikhroli", locality: "Vikhroli", bedrooms: "1 BHK" },
      { text: "1 BHK Flats in Bhandup", locality: "Bhandup", bedrooms: "1 BHK" },
      { text: "1 BHK Flats in Ghatkopar", locality: "Ghatkopar", bedrooms: "1 BHK" }
    ],
    link: "View All"
  },
  {
    id: 4,
    title: "3&4 BHK Flats",
    items: [
      { text: "3&4 BHK Flats in Chembur", locality: "Chembur", bedrooms: "3 BHK,4 BHK" },
      { text: "3&4 BHK Flats in Vikhroli", locality: "Vikhroli", bedrooms: "3 BHK,4 BHK" }, 
      { text: "3&4 BHK Flats in Bhandup", locality: "Bhandup", bedrooms: "3 BHK,4 BHK" },
      { text: "3&4 BHK Flats in Ghatkopar", locality: "Ghatkopar", bedrooms: "3 BHK,4 BHK" }
    ],
    link: "View All"
  },
  {
    id: 5,
    title: "Complex Projects",
    items: [
      { text: "Complex Projects" },
      { text: "Complex Projects" },
      { text: "Complex Projects" },
      { text: "Complex Projects" }
    ],
    link: "View All"
  }
];

// Helper function to build filter URL
const buildFilterUrl = (locality?: string, bedrooms?: string) => {
  const params = new URLSearchParams();
  if (locality) params.append('locality', locality);
  if (bedrooms) params.append('bedrooms', bedrooms);
  return `/all-projects${params.toString() ? '?' + params.toString() : ''}`;
};

const DiscoverNeighborhoodsSection = () => {
  return (
    <section className="py-8" style={{ backgroundColor: '#E2EFFC' }}>
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section header */}
        <div className="mb-6 lg:mb-12">
          <h2 className="text-xl lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-4 text-center lg:text-left">Discover the city's prime neighbourhoods.</h2>
        </div>

        {/* Navigation and Categories */}
        <div className="relative">
          {/* Navigation arrows */}
          <button className="hidden lg:absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button className="hidden lg:absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Categories Carousel for small screens, Grid for large screens */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8 lg:px-0">
            {categories.map((category) => (
              <div key={category.id} className="space-y-2 lg:space-y-4 text-center sm:text-left">
                <h3 className="text-base lg:text-xl font-bold text-primary mb-2 lg:mb-4">{category.title}</h3>
                <ul className="space-y-1 lg:space-y-3">
                  {category.items.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={buildFilterUrl(item.locality, item.bedrooms)}
                        className="text-gray-700 hover:text-primary transition-colors text-sm lg:text-left block"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/all-projects">
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto font-medium hover:underline text-sm lg:text-base"
                  >
                    {category.link}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Carousel for small screens */}
          <Carousel
            opts={{
              align: "start",
            }}
            className="lg:hidden"
          >
            <CarouselContent className="-ml-4">
              {categories.map((category) => (
                <CarouselItem key={category.id} className="pl-4 basis-full sm:basis-1/2">
                  <div className="space-y-2 text-center sm:text-left">
                    <h3 className="text-base font-bold text-primary mb-2">{category.title}</h3>
                    <ul className="space-y-1">
                      {category.items.map((item, index) => (
                        <li key={index}>
                          <Link 
                            to={buildFilterUrl(item.locality, item.bedrooms)}
                            className="text-gray-700 hover:text-primary transition-colors text-sm block"
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to="/all-projects">
                      <Button 
                        variant="link" 
                        className="text-primary p-0 h-auto font-medium hover:underline text-sm"
                      >
                        {category.link}
                      </Button>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default DiscoverNeighborhoodsSection;