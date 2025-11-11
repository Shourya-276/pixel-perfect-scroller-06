import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Play, X, Building, Home, Square, Link as LinkIcon, Building2 } from "lucide-react";
import Header from "@/components/Header";
import MumbaiHomesSection from "@/components/MumbaiHomesSection";
import FrequentlyAskedQuestionsSection from "@/components/FrequentlyAskedQuestionsSection";
import projectHero from "@/assets/project-hero.jpg";
import projectBuilding from "@/assets/project-building.png";
import projectAerial from "@/assets/project-aerial.png";
import floorPlan from "@/assets/floor-plan.png";
import EnquiryFormModal from "@/components/EnquiryFormModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";
import { useParams } from "react-router-dom";

const AmenitiesModal = ({ isOpen, onClose, amenities }: { isOpen: boolean; onClose: () => void; amenities: { icon: string; name: string }[] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Amenities</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm">{amenity.icon}</span>
                </div>
                <span className="text-blue-600 text-sm">{amenity.name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
              View Less
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FloorplanGalleryModal = ({ isOpen, onClose, images }: { isOpen: boolean; onClose: () => void; images: string[] }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Floorplan Gallery</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          {images.length === 0 ? (
            <div className="text-center text-gray-500">No floorplan images uploaded.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((src, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden border">
                  <img src={src} alt={`floorplan-${idx}`} className="w-full h-64 object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const { websiteData } = useWebsiteData();
  const projectId = id ? Number(id) : websiteData.projectDetails.id;
  const rawPd = websiteData.projects.find(p => p.id === projectId) || websiteData.projectDetails;

  const pd = {
    ...rawPd,
    statusBadges: Array.isArray(rawPd?.statusBadges) ? rawPd.statusBadges : [],
    amenities: Array.isArray(rawPd?.amenities) ? rawPd.amenities : [],
    floorPlans: Array.isArray(rawPd?.floorPlans) ? rawPd.floorPlans : [],
    virtualTours: Array.isArray(rawPd?.virtualTours) ? rawPd.virtualTours : [],
    similarProjects: Array.isArray(rawPd?.similarProjects) ? rawPd.similarProjects : [],
    viewFloorplanImages: Array.isArray(rawPd?.viewFloorplanImages) ? rawPd.viewFloorplanImages : [],
    heroImages: Array.isArray(rawPd?.heroImages) ? rawPd.heroImages : [],
    floorPlanCategoryImages: rawPd?.floorPlanCategoryImages || {},
    overview: rawPd?.overview || { projectType: "", units: "", area: "", reraNumber: "" },
    locationInfo: rawPd?.locationInfo || { location: "", zone: "", pincode: "", mapEmbedUrl: "", mapsCtaText: "View on Google Maps" },
  } as typeof rawPd;

  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [activeFloorTab, setActiveFloorTab] = useState<'1BHK' | '2BHK' | '3BHK' | 'TYPICAL' | 'BROCHURE'>('1BHK');
  const [showViewFloorplanModal, setShowViewFloorplanModal] = useState(false);

  const heroSrc = pd.heroImage || projectHero;
  const mainSrc = pd.mainImage || projectBuilding;
  const aerialSrc = pd.aerialImage || projectAerial;
  const floorPlanSrc = floorPlan;
  const floorPlans = pd.floorPlans;

  // Get image for current tab
  const getTabImage = () => {
    switch (activeFloorTab) {
      case '1BHK': return pd.floorPlanCategoryImages?.oneBhk || floorPlanSrc;
      case '2BHK': return pd.floorPlanCategoryImages?.twoBhk || floorPlanSrc;
      case '3BHK': return pd.floorPlanCategoryImages?.threeBhk || floorPlanSrc;
      case 'TYPICAL': return pd.floorPlanCategoryImages?.typical || floorPlanSrc;
      case 'BROCHURE': return pd.floorPlanCategoryImages?.brochure || floorPlanSrc;
      default: return floorPlanSrc;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
        {pd.heroImages && pd.heroImages.length > 1 ? (
          <Carousel plugins={[Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: false })]} opts={{ loop: true, duration: 800 }} className="w-full h-full">
            <CarouselContent className="h-full">
              {pd.heroImages.map((src, idx) => (
                <CarouselItem key={idx} className="basis-full h-full">
                  <div className="w-full h-full">
                    <img src={src || heroSrc} alt={`Project Hero ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="w-full h-full">
            <img src={heroSrc} alt="Project Hero" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-40">
          <Button
            className="bg-[#0D6ABC] hover:bg-[#0D6ABC]/90 text-white w-10 h-56 px-0 rounded-l-lg rounded-r-lg shadow-lg flex items-center justify-center enquiry-button-pointer sm:w-12 sm:h-64"
            style={{ writingMode: 'vertical-lr' }}
            onClick={() => setShowEnquiryModal(true)}
          >
            <span className="text-sm">Enquire Now</span>
          </Button>
        </div>
      </section>

      {/* Project Info Section */}
      <section>
        <div className="mb-8 w-full py-12 bg-[#EDF4FC]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold">{pd.projectName}</h1>
                  <div className="flex flex-wrap gap-2 sm:space-x-2">
                    {pd.statusBadges.map((b, i) => (
                      <Badge key={i} className="bg-blue-100 text-blue-600">{b}</Badge>
                    ))}
                  </div>
                </div>
                <div className="relative rounded-lg h-48 sm:h-64 lg:h-[480px] overflow-hidden">
                  <img src={mainSrc} alt="Main Project" className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute bottom-4 left-4">
                    <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">View all</Button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{pd.priceRange}</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm sm:text-base">{pd.locationText}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block lg:col-span-1 mt-8 lg:mt-0">
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <h3 className="text-xl font-bold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {pd.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 text-sm">{amenity.icon}</span>
                        </div>
                        <span className="text-blue-600 text-sm">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => setShowAmenitiesModal(true)} className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                    View more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">About Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 mb-4">{pd.aboutText}</p>
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{pd.developerName}</span>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Project Overview</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                    <div className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Project Type</p>
                        <p className="font-medium text-xs sm:text-sm">{pd.overview.projectType}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <Home className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Units</p>
                        <p className="font-medium text-xs sm:text-sm">{pd.overview.units}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <Square className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Area</p>
                        <p className="font-medium text-xs sm:text-sm">{pd.overview.area}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">RERA No.</p>
                        <p className="font-medium text-xs sm:text-sm">{pd.overview.reraNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src={aerialSrc} alt="Project Aerial View" className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg" />
              </div>
            </div>
          </div>

          {/* Mobile Amenities */}
          <div className="lg:hidden mt-8">
            <h3 className="text-xl font-bold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              {pd.amenities.slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">{amenity.icon}</span>
                  </div>
                  <span className="text-blue-600 text-sm">{amenity.name}</span>
                </div>
              ))}
            </div>
            <Button onClick={() => setShowAmenitiesModal(true)} className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
              View more
            </Button>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section className="py-8 bg-[#EDF4FC]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img src={getTabImage()} alt="Floor Plan" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Floor Plans and Configuration</h2>
              <div className="flex flex-nowrap gap-2 mb-6 overflow-x-auto scrollbar-hide -mx-2 px-2">
                {[
                  { key: '1BHK', label: '1 BHK' },
                  { key: '2BHK', label: '2 BHK' },
                  { key: '3BHK', label: '3 BHK' },
                  { key: 'TYPICAL', label: 'Typical Floor Plan' },
                  { key: 'BROCHURE', label: 'Brochure Floor Plan' },
                ].map(tab => (
                  <Button
                    key={tab.key}
                    variant="outline"
                    className={`${activeFloorTab === tab.key ? 'bg-blue-600 text-white border-blue-600' : ''} whitespace-nowrap text-xs`}
                    onClick={() => setActiveFloorTab(tab.key as any)}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                {floorPlans
                  .filter(fp => fp.type === activeFloorTab)
                  .map((plan, index) => (
                    <div key={index} className="p-3 sm:p-4 bg-white rounded-lg border-2 border-blue-600">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm sm:text-base flex-shrink-0">
                          {plan.type === '1BHK' ? '1 BHK' :
                           plan.type === '2BHK' ? '2 BHK' :
                           plan.type === '3BHK' ? '3 BHK' :
                           plan.type === 'TYPICAL' ? 'Typical Floor Plan' :
                           'Brochure Floor Plan'}
                        </span>
                        <span className="text-gray-900 text-xs sm:text-base font-medium text-center flex-1">
                          {plan.area}
                        </span>
                        {plan.price ? (
                          <Button size="sm" variant="outline" className="text-xs sm:text-sm whitespace-nowrap border-black">
                            {plan.price}
                          </Button>
                        ) : (
                          <span className="text-xs text-gray-500 italic">Price on request</span>
                        )}
                      </div>
                    </div>
                  ))}

                {floorPlans.filter(fp => fp.type === activeFloorTab).length === 0 && (
                  <p className="text-sm text-gray-500 italic text-center py-2">
                    No configuration available for this unit type.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => setShowViewFloorplanModal(true)}>
                  View Floorplan
                </Button>
                {pd.brochurePdf ? (
                  <a href={pd.brochurePdf} download className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Download Brochure
                    </Button>
                  </a>
                ) : (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled>
                    Download Brochure
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Virtual Tour</h2>
          <Carousel opts={{ align: "start" }} className="w-full relative">
            <CarouselContent className="flex -ml-4">
              {pd.virtualTours.map((tour) => (
                <CarouselItem key={tour.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="relative h-[600px] sm:h-[480px] md:h-[600px] bg-gray-200 rounded-lg overflow-hidden">
                    {tour.image?.startsWith('data:video') ? (
                      <video src={tour.image} className="w-full h-full object-cover" controls />
                    ) : (
                      <img src={tour.image} alt={tour.alt} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="icon" className="bg-white/90 hover:bg-white text-black rounded-full p-3 h-14 w-14 sm:h-16 sm:w-16">
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-6">
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-x-6 text-xs sm:text-sm text-gray-600">
              <span className="whitespace-nowrap text-center">Location: {pd.locationInfo.location}</span>
              <span className="whitespace-nowrap text-center">Zone: {pd.locationInfo.zone}</span>
              <span className="whitespace-nowrap text-center col-span-2 sm:col-span-1">Pincode: {pd.locationInfo.pincode}</span>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200 rounded-lg overflow-hidden mb-12">
            <iframe
              src={pd.locationInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 flex items-center justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                {pd.locationInfo.mapsCtaText}
              </Button>
            </div>
          </div>

          <Carousel plugins={[Autoplay({ delay: 0, stopOnInteraction: false, stopOnMouseEnter: true })]} opts={{ align: "start", loop: true, slidesToScroll: 1, duration: 10000 }} className="w-full">
            <CarouselContent className="-ml-6">
              {/* Placeholder images */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CarouselItem key={i} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="relative group rounded-lg overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop`}
                      alt={`Building View ${i}`}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white text-blue-600">
                        View Brochure
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 hover:scale-110 transition-transform duration-200" />
            <CarouselNext className="right-4 hover:scale-110 transition-transform duration-200" />
          </Carousel>
        </div>
      </section>

      {/* Similar Recommendations */}
      <section className="py-8 bg-[#EDF4FC]">
        <div className="container mx-auto px-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Similar Recommendations</h2>
          <Carousel plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]} opts={{ align: "start", loop: true, slidesToScroll: 1, duration: 5000 }} className="w-full">
            <CarouselContent className="flex -ml-4">
              {pd.similarProjects.map((project) => (
                <CarouselItem key={project.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{project.type}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{project.price}</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 hover:scale-110 transition-transform duration-200" />
            <CarouselNext className="right-4 hover:scale-110 transition-transform duration-200" />
          </Carousel>
        </div>
      </section>

      <FrequentlyAskedQuestionsSection />
      <MumbaiHomesSection />

      {/* Modals */}
      <AmenitiesModal isOpen={showAmenitiesModal} onClose={() => setShowAmenitiesModal(false)} amenities={pd.amenities} />
      <FloorplanGalleryModal isOpen={showViewFloorplanModal} onClose={() => setShowViewFloorplanModal(false)} images={pd.viewFloorplanImages} />
      <EnquiryFormModal isOpen={showEnquiryModal} onClose={() => setShowEnquiryModal(false)} />
    </div>
  );
};

export default ProjectDetails;