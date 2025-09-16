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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {amenitiesList.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50">
                <div className="text-2xl mb-2">{amenity.icon}</div>
                <span className="text-sm text-center text-blue-600">{amenity.name}</span>
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src={projectHero}
          alt="Codename Chembur Pinnacle"
          className="w-full h-full object-cover"
        />
        
        {/* Enquiry Now Button */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-40">
          <Button 
            className="bg-[#0D6ABC] hover:bg-[#0D6ABC]/90 text-white w-12 h-48 px-0 py-0 rounded-full shadow-lg writing-mode-vertical flex items-center justify-center"
            onClick={() => setShowEnquiryModal(true)}
          >
            Enquire Now
          </Button>
        </div>
      </section>

      {/* Project Info Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          {/* Suji Platinum Section (true edge-to-edge bg-[#EDF4FC], no container constraint) */}
          <div className="mb-8 w-full py-6 bg-[#EDF4FC]">
            <div className="grid lg:grid-cols-3 gap-8 px-6 max-w-screen-2xl mx-auto relative">
              {/* Left: Project Details */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold">Suji Platinum</h1>
                  <div className="flex space-x-2">
                    <Badge className="bg-blue-100 text-blue-600">Under Construction</Badge>
                    <Badge className="bg-green-100 text-green-600">RERA</Badge>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={projectBuilding}
                    alt="Suji Platinum"
                    className="w-full h-64 object-cover rounded-lg"
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
                    <p className="text-2xl font-bold">₹78 L - 1.24 Cr</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Vikhroli, Central Mumbai Suburbs, Mumbai</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Amenities */}
              <div className="lg:col-span-1 mt-8 lg:mt-0">
                <div>
                  <h3 className="text-xl font-bold mb-4">Amenities</h3>
                  <div className="space-y-3">
                    {amenitiesList.slice(0, 6).map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">{amenity.icon}</span>
                        </div>
                        <span className="text-blue-600">{amenity.name}</span>
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

          {/* About Project Section (no box, just content) */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">About Project</h2>
            <div className="grid md:grid-cols-2 gap-6">
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
              </div>
              <div>
                <img
                  src={projectAerial}
                  alt="Project Aerial View"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
            {/* Project Overview */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Project Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Building2 className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Project Type</p>
                    <p className="font-medium">Residential</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Home className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Project Type</p>
                    <p className="font-medium">1, 2 BHK Apartments</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Square className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Rera Carpet Area</p>
                    <p className="font-medium">394.00 sq. ft. to 639.00 sq. ft.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <LinkIcon className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Maharera Registration no.</p>
                    <p className="font-medium">P51800053230</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section className="py-8 bg-[#0D6ABC]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <img
                src={floorPlan}
                alt="Floor Plan"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Floor Plans and Configuration</h2>
              <div className="flex space-x-4 mb-6">
                <Button variant="outline" className="bg-blue-600 text-white border-blue-600">1 BHK</Button>
                <Button variant="outline">2 BHK</Button>
                <Button variant="outline">3 BHK</Button>
                <Button variant="outline">Typical Floor Plan</Button>
                <Button variant="outline">Brochure Floor Plan</Button>
              </div>
              <div className="space-y-3 mb-6">
                {floorPlans.map((plan, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{plan.type}</span>
                      <span className="text-gray-600">{plan.area}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      {plan.price}
                    </Button>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Virtual Tour</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop"
                alt="Virtual Tour"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-white/90 hover:bg-white text-black rounded-full p-4">
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-8 bg-[#EDF4FC]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <span>Location: Vikhroli East</span>
              <span>Zone: Central Mumbai Suburbs</span>
              <span>Pincode: 400083</span>
            </div>
          </div>
          
          <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
              alt="Building View 1"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
              alt="Building View 2"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop"
              alt="Building View 3"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          
          <div className="text-center mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              View Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Similar Recommendations */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Similar Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
            ))}
          </div>
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