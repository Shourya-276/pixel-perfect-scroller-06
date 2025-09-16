import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "New Projects",
    items: [
      "New Projects in Chembur",
      "New Projects in Vikhroli", 
      "New Projects in Bhandup",
      "New Projects in Ghatkopar"
    ],
    link: "View All"
  },
  {
    id: 2,
    title: "Trending Projects", 
    items: [
      "Trending Projects in Chembur",
      "Trending Projects in Vikhroli",
      "Trending Projects in Bhandup", 
      "Trending Projects in Ghatkopar"
    ],
    link: "View All"
  },
  {
    id: 3,
    title: "1&2 BHK Flats",
    items: [
      "1&2 BHK Flats in Chembur",
      "1 BHK Flats in Vikhroli",
      "1 BHK Flats in Bhandup",
      "1 BHK Flats in Ghatkopar"
    ],
    link: "View All"
  },
  {
    id: 4,
    title: "3&4 BHK Flats",
    items: [
      "3&4 BHK Flats in Chembur",
      "3&4 BHK Flats in Vikhroli", 
      "3&4 BHK Flats in Bhandup",
      "3&4 BHK Flats in Ghatkopar"
    ],
    link: "View All"
  },
  {
    id: 5,
    title: "Complex Projects",
    items: [
      "Complex Projects",
      "Complex Projects",
      "Complex Projects",
      "Complex Projects"
    ],
    link: "View All"
  }
];

const DiscoverNeighborhoodsSection = () => {
  return (
    <section className="py-16" style={{ backgroundColor: '#E2EFFC' }}>
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Discover the city's prime neighbourhoods.</h2>
        </div>

        {/* Navigation and Categories */}
        <div className="relative">
          {/* Navigation arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-12">
            {categories.map((category) => (
              <div key={category.id} className="space-y-4">
                <h3 className="text-xl font-bold text-primary mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, index) => (
                    <li key={index}>
                      <button className="text-gray-700 hover:text-primary transition-colors text-left">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="link" 
                  className="text-primary p-0 h-auto font-medium hover:underline"
                >
                  {category.link}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverNeighborhoodsSection;