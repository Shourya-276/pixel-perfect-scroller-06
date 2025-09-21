import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const zones = [
  {
    id: 1,
    name: "Western",
    projects: "700 Projects",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Eastern", 
    projects: "500 Projects",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Central",
    projects: "1000 Projects", 
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Mumbai Metropolitan",
    projects: "450 Projects",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    name: "Thane-Kalyan",
    projects: "600 Projects",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Navi Mumbai",
    projects: "300 Projects",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
  }
];

const HomesInEveryZoneSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Homes in Every Zone</h2>
        </div>

        {/* Zones grid */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Existing grid for larger screens */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer h-56 sm:h-64"
            >
              <img
                src={zone.image}
                alt={zone.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{zone.name}</h3>
                <p className="text-base sm:text-lg">{zone.projects}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel for small screens */}
        <div className="lg:hidden relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {zones.map((zone, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2">
                  <div
                    className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer h-56"
                  >
                    <img
                      src={zone.image}
                      alt={zone.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                      <h3 className="text-2xl font-bold mb-2">{zone.name}</h3>
                      <p className="text-base">{zone.projects}</p>
                    </div>
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

export default HomesInEveryZoneSection;