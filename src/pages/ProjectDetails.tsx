import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Play, X, Building, Home, Square, Link as LinkIcon, Building2, Car, Clock } from "lucide-react";
import Header from "@/components/Header";
import MumbaiHomesSection from "@/components/MumbaiHomesSection";
import FrequentlyAskedQuestionsSection from "@/components/FrequentlyAskedQuestionsSection";
import projectHero from "@/assets/project-hero.jpg";
import projectBuilding from "@/assets/project-building.png";
import projectAerial from "@/assets/project-aerial.png";
import floorPlan from "@/assets/floor-plan.png";
import ProjectInfoBox from "@/components/ProjectInfoBox";
import EnquiryFormModal from "@/components/EnquiryFormModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const amenitiesList = [
  { icon: "🏊", name: "Swimming pool" },
  { icon: "🎮", name: "Playground" },
  { icon: "🐕", name: "Pet Friendly" },
  { icon: "🌿", name: "Garden" },
  { icon: "💪", name: "Fitness center" },
  { icon: "🚗", name: "Parking" },
  { icon: "🔒", name: "Security" },
  { icon: "⚡", name: "Power Backup" },
  { icon: "💧", name: "Water Supply" },
  { icon: "🏢", name: "Club House" },
  { icon: "🎾", name: "Tennis Court" },
  { icon: "🧘", name: "Yoga Center" },
  { icon: "👶", name: "Kids Play Area" },
  { icon: "🎯", name: "Indoor Games" },
  { icon: "📚", name: "Library" }
];

const floorPlans = [
  { type: "1BHK", area: "380 RCA Sq. Ft.", price: "Click for price" },
  { type: "1BHK", area: "390 RCA Sq. Ft.", price: "Click for price" },
  { type: "1BHK", area: "407 RCA Sq. Ft.", price: "Click for price" },
  { type: "1BHK", area: "411 RCA Sq. Ft.", price: "Click for price" },
];

const similarProjects = [
  {
    id: 1,
    name: "RNA NG Royal Park",
    type: "1 BHK, 2 BHK residential apartments",
    location: "Kanjurmarg",
    price: "Starting At ₹70 Lakhs +",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "RNA NG Royal Park",
    type: "1 BHK, 2 BHK residential apartments", 
    location: "Kanjurmarg",
    price: "Starting At ₹70 Lakhs +",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "RNA NG Royal Park",
    type: "1 BHK, 2 BHK residential apartments",
    location: "Kanjurmarg", 
    price: "Starting At ₹70 Lakhs +",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=300&h=200&fit=crop"
  }
];

const virtualTours = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    alt: "Virtual Tour 1"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517840901100-8179e9d84967?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Virtual Tour 2"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Virtual Tour 3"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    alt: "Virtual Tour 4"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1517840901100-8179e9d84967?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Virtual Tour 5"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Virtual Tour 6"
  },
];

const AmenitiesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Amenities</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {amenitiesList.map((amenity, index) => (
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

const ProjectDetails = () => {
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showFloorPlan, setShowFloorPlan] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={projectHero}
          alt="Codename Chembur Pinnacle"
          className="w-full h-full object-cover object-center md:object-fill"
        />
        
        {/* Enquiry Now Button */}
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
        
        {/* Suji Platinum Section (true edge-to-edge bg-[#EDF4FC], no container constraint) */}
        <div className="mb-8 w-full py-12 bg-[#EDF4FC]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {/* Left: Project Details */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold">Suji Platinum</h1>
                  <div className="flex flex-wrap gap-2 sm:space-x-2">
                    <Badge className="bg-blue-100 text-blue-600">Under Construction</Badge>
                    <Badge className="bg-green-100 text-green-600">RERA</Badge>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={projectBuilding}
                    alt="Suji Platinum"
                    className="w-full h-48 sm:h-64 lg:h-[480px] object-cover rounded-lg"
                  />
                  {/* View all overlay */}
                  <div className="absolute bottom-4 left-4">
                    <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                      View all
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">₹78 L - 1.24 Cr</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm sm:text-base">Vikhroli, Central Mumbai Suburbs, Mumbai</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Amenities */}
              <div className="hidden lg:block lg:col-span-1 mt-8 lg:mt-0">
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <h3 className="text-xl font-bold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {amenitiesList.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 text-sm">{amenity.icon}</span>
                        </div>
                        <span className="text-blue-600 text-sm">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setShowAmenitiesModal(true)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          {/* About Project Section (no box, just content) */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">About Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: About Text + Project Overview */}
              <div>
                <p className="text-gray-700 mb-4">
                  The Suji Platinum Project in Vikhroli, By Suji Builders and Developers. This Project is
                  Priced at ₹78 L - 1.24 Cr and offers 1 and 2 BHK apartments, & Project Size 394.00 sq.
                  ft. to 639.00 sq. ft. Embrace luxury living in a vibrant community.
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Suji Builders and Developers</span>
                </div>
                {/* Project Overview - now within this column */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Project Overview</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                    <div className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Project Type</p>
                        <p className="font-medium text-xs sm:text-sm">Residential</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <Home className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Units</p>
                        <p className="font-medium text-xs sm:text-sm">1, 2 BHK</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <Square className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">Area</p>
                        <p className="font-medium text-xs sm:text-sm">394-639 sq.ft</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500">RERA No.</p>
                        <p className="font-medium text-xs sm:text-sm">P51800053230</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column: Image */}
              <div>
                <img
                  src={projectAerial}
                  alt="Project Aerial View"
                  className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Mobile Amenities Section */}
          <div className="lg:hidden mt-8">
            <h3 className="text-xl font-bold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              {amenitiesList.slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">{amenity.icon}</span>
                  </div>
                  <span className="text-blue-600 text-sm">{amenity.name}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setShowAmenitiesModal(true)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
            >
              View more
            </Button>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section className="py-8 bg-[#EDF4FC]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`${showFloorPlan ? 'block' : 'hidden lg:block'}`}>
              <img
                src={floorPlan}
                alt="Floor Plan"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Floor Plans and Configuration</h2>
              <div className="flex flex-nowrap gap-2 mb-6 overflow-x-auto scrollbar-hide -mx-2 px-2">
                <Button variant="outline" className="bg-blue-600 text-white border-blue-600 whitespace-nowrap">1 BHK</Button>
                <Button variant="outline" className="whitespace-nowrap">2 BHK</Button>
                <Button variant="outline" className="whitespace-nowrap">3 BHK</Button>
                <Button variant="outline" className="text-xs whitespace-nowrap">Typical Floor Plan</Button>
                <Button 
                  variant="outline" 
                  className="text-xs whitespace-nowrap"
                  onClick={() => setShowFloorPlan(!showFloorPlan)}
                >
                  Brochure Floor Plan
                </Button>
              </div>
              <div className="space-y-3 mb-6">
  {floorPlans.map((plan, index) => (
    <div key={index} className="p-3 sm:p-4 bg-white rounded-lg border-2 border-blue-600">
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-sm sm:text-base flex-shrink-0">{plan.type}</span>
        <span className="text-gray-900 text-xs sm:text-base font-medium text-center flex-1">{plan.area}</span>
        <Button size="sm" variant="outline" className="text-xs sm:text-sm whitespace-nowrap border-black">
          {plan.price}
        </Button>
      </div>
    </div>
  ))}
</div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                  View Floorplan
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Virtual Tour</h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full relative"
          >
            <CarouselContent className="flex -ml-4">
              {virtualTours.map((tour) => (
                <CarouselItem key={tour.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="relative h-[600px] sm:h-[480px] md:h-[600px] bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.alt}
                      className="w-full h-full object-cover"
                    />
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
              <span className="whitespace-nowrap text-center">Location: Vikhroli East</span>
              <span className="whitespace-nowrap text-center">Zone: Central Mumbai</span>
              <span className="whitespace-nowrap text-center col-span-2 sm:col-span-1">Pincode: 400083</span>
            </div>
          </div>
          
          <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200 rounded-lg overflow-hidden mb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8!2d72.9!3d19.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzAwLjAiTiA3MsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                View on Google Maps
              </Button>
            </div>
          </div>
          
          <Carousel
            plugins={[
              Autoplay({
                delay: 0,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
              duration: 10000,
            }}
          >
            <CarouselContent className="-ml-6">
              <CarouselItem className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="relative group rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
                    alt="Building View 1"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white text-blue-600">
                      View Brochure
                    </Button>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="relative group rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
                    alt="Building View 2"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white text-blue-600">
                      View Brochure
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="relative group rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop"
                    alt="Building View 3"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white text-blue-600">
                      View Brochure
                    </Button>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="relative group rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
                    alt="Building View 1"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white text-blue-600">
                      View Brochure
                    </Button>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="relative group rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
                    alt="Building View 2"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white text-blue-600">
                      View Brochure
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="relative group rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop"
                    alt="Building View 3"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white text-blue-600">
                      View Brochure
                    </Button>
                  </div>
                </div>
              </CarouselItem>

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
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
              duration: 5000,
            }}
            className="w-full"
          >
            <CarouselContent className="flex -ml-4">
              {similarProjects.map((project) => (
                <CarouselItem key={project.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{project.type}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{project.price}</span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
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
        </div>
      </section>

      {/* FAQ Section */}
      <FrequentlyAskedQuestionsSection />

      {/* Footer */}
      <MumbaiHomesSection />

      {/* Amenities Modal */}
      <AmenitiesModal 
        isOpen={showAmenitiesModal} 
        onClose={() => setShowAmenitiesModal(false)} 
      />
      <EnquiryFormModal
        isOpen={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
      />
    </div>
  );
};

export default ProjectDetails;