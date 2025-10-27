import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";
import { X } from "lucide-react";

// Define interfaces within the file
interface Zone {
  id: number;
  name: string;
  projects: string;
  image: string;
}

interface HomesInEveryZoneData {
  title: string;
  zones: Zone[];
}

const HomesInEveryZoneSection = () => {
  const { websiteData } = useWebsiteData();
  const { title, zones } = websiteData.homesInEveryZone as HomesInEveryZoneData;
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with selected zone
  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone);
    setIsModalOpen(true);
  };

  // Filter other zones for sidebar
  const otherZones = selectedZone ? zones.filter((z) => z.id !== selectedZone.id) : zones;

  console.log('HomesInEveryZoneSection data:', { title, zoneIds: zones.map(z => z.id), selectedZoneId: selectedZone?.id });

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {title || "Homes in Every Zone"}
          </h2>
        </div>

        {/* Zones grid (Large screens) */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="relative bg-white overflow-hidden group cursor-pointer h-56 sm:h-64"
              onClick={() => handleZoneClick(zone)}
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
                <CarouselItem key={zone.id} className="pl-4 basis-full sm:basis-1/2">
                  <div
                    className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer h-56"
                    onClick={() => handleZoneClick(zone)}
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
            <CarouselPrevious className="left-2 h-8 w-8 bg-white/90 hover:bg-white" />
            <CarouselNext className="right-2 h-8 w-8 bg-white/90 hover:bg-white" />
          </Carousel>
        </div>

        {/* Zone Detail Modal */}
        {selectedZone && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedZone.name}</span>
                  <DialogClose className="text-gray-500 hover:text-gray-700">
                    <X className="h-5 w-5" />
                  </DialogClose>
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Zone Content */}
                <div className="lg:col-span-2">
                  <article className="bg-white rounded-lg p-6">
                    <img
                      src={selectedZone.image}
                      alt={selectedZone.name}
                      className="w-full h-64 sm:h-80 object-cover rounded-lg mb-6"
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                      {selectedZone.name}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 mb-6">{selectedZone.projects}</p>
                    <Button
                      className="mt-6 bg-primary hover:bg-primary/90"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </Button>
                  </article>
                </div>
                {/* Sidebar: Other Zones */}
                <div className="lg:col-span-1">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Other Zones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {otherZones.length > 0 ? (
                        otherZones.map((zone) => (
                          <div
                            key={zone.id}
                            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => handleZoneClick(zone)}
                          >
                            <img
                              src={zone.image}
                              alt={zone.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                {zone.name}
                              </h3>
                              <p className="text-xs text-gray-600">{zone.projects}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No other zones available.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default HomesInEveryZoneSection;