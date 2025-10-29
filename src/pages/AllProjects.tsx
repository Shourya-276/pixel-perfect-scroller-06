import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, MapPin, Search, X, ChevronDown, Plus } from "lucide-react";
import Header from "@/components/Header";
import MumbaiHomesSection from "@/components/MumbaiHomesSection";
import ProjectsInKandivaliSection from "@/components/ProjectsInKandivaliSection";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

// Mock project data (fallback)
const projectsFallback = [
  {
    id: 1,
    name: "Suji Platinum - Residential",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    type: "1BHK, 2 BHK Apartments available",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    builder: "Builder Name",
    status: "Under Construction - Completion by July 2027",
    isLiked: false,
    isViewed: false,
    reraApproved: true
  },
  {
    id: 2,
    name: "Suji Platinum - Residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    type: "1BHK, 2 BHK Apartments available",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    builder: "Builder Name",
    status: "Under Construction - Completion by July 2027",
    isLiked: true,
    isViewed: true,
    reraApproved: true
  },
  {
    id: 3,
    name: "Suji Platinum - Residential",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop",
    type: "1BHK, 2 BHK Apartments available",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    builder: "Builder Name",
    status: "Under Construction - Completion by July 2027",
    isLiked: false,
    isViewed: false,
    reraApproved: true
  },
  {
    id: 4,
    name: "Suji Platinum - Residential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
    type: "1BHK, 2 BHK Apartments available",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    builder: "Builder Name",
    status: "Under Construction - Completion by July 2027",
    isLiked: true,
    isViewed: true,
    reraApproved: true
  },
  {
    id: 5,
    name: "Suji Platinum - Residential",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
    type: "1BHK, 2 BHK Apartments available",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    builder: "Builder Name",
    status: "Under Construction - Completion by July 2027",
    isLiked: false,
    isViewed: false,
    reraApproved: true
  },
  {
    id: 6,
    name: "Suji Platinum - Residential",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    type: "1BHK, 2 BHK Apartments available",
    location: "Kanjurmarg",
    price: "₹1.48 Cr",
    builder: "Builder Name",
    status: "Under Construction - Completion by July 2027",
    isLiked: false,
    isViewed: false,
    reraApproved: true
  }
];

const limitedOffers = [
  {
    id: 1,
    name: "RNA NG Royal Park",
    type: "1 BHK, 2 BHK residential apartments",
    location: "Kanjurmarg",
    price: "₹70 Lakhs +",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "RNA NG Royal Park",
    type: "1 BHK, 2 BHK residential apartments",
    location: "Kanjurmarg",
    price: "₹70 Lakhs +",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop"
  }
];

const ProjectCard = ({ project, onLikeToggle }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-48 object-cover"
        />
        {project.reraApproved && (
          <Badge className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1">
            RERA
          </Badge>
        )}
        {project.isViewed && (
          <Badge className="absolute top-3 right-12 bg-purple-500 text-white text-xs px-2 py-1">
            Viewed
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 p-1 h-7 w-7 bg-white/80 hover:bg-white"
          onClick={() => onLikeToggle(project.id)}
        >
          <Heart className={`h-4 w-4 ${project.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
        <div className="absolute bottom-3 left-3 right-3">
          <Badge variant="secondary" className="bg-black/70 text-white text-xs px-2 py-1">
            {project.status}
          </Badge>
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{project.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{project.type}</p>
        
        <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
          <MapPin className="h-3 w-3 mr-1 sm:h-4 sm:w-4" />
          {project.location}
        </div>
        
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div>
            <p className="text-xs text-gray-500">Starting At</p>
            <p className="font-semibold text-base sm:text-lg">{project.price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Builder Name</p>
            <p className="text-xs sm:text-sm">{project.builder}</p>
          </div>
        </div>
        
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-sm px-3 py-1 sm:px-4 sm:py-2 h-auto"
          onClick={() => window.location.href = `/project/${project.id}`}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

const FilterSection = ({ title, children, isExpandable = false }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="border-b border-gray-200 pb-3 mb-3 lg:pb-4 lg:mb-4">
      <div className="flex items-center justify-between mb-2 lg:mb-3">
        <h3 className="font-medium text-sm lg:text-base text-gray-900">{title}</h3>
        {isExpandable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0 h-auto w-auto"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
        )}
      </div>
      {isExpanded && children}
    </div>
  );
};

const AllProjects = () => {
  const { websiteData } = useWebsiteData();
  const [searchParams] = useSearchParams();
  const mapFromContext = () => (
    (websiteData.projects && websiteData.projects.length > 0)
      ? websiteData.projects.map(p => ({
          id: p.id,
          name: `${p.projectName} - Residential`,
          image: p.mainImage || p.heroImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          type: p.cardType || p.overview?.projectType || "1BHK, 2 BHK Apartments available",
          location: p.locationInfo?.location || p.locationText || "Mumbai",
          price: p.priceRange || "₹1.00 Cr",
          builder: p.builder || p.developerName || "Builder Name",
          status: p.status || (p.statusBadges?.[0] || "Under Construction"),
          isLiked: false,
          isViewed: false,
          reraApproved: !!p.reraApproved,
        }))
      : projectsFallback
  );
  const [projectList, setProjectList] = useState(mapFromContext());

  useEffect(() => {
    setProjectList(mapFromContext());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websiteData.projects]);
  const [hideAlreadySeen, setHideAlreadySeen] = useState(false);
  const [verifiedProperties, setVerifiedProperties] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [offerLikes, setOfferLikes] = useState({});
  
  // Filter states
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedPurchaseType, setSelectedPurchaseType] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFurnishing, setSelectedFurnishing] = useState([]);
  const [selectedRera, setSelectedRera] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [selectedConstruction, setSelectedConstruction] = useState([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState([]);
  const [budgetRange, setBudgetRange] = useState([0]);
  const [areaRange, setAreaRange] = useState([0]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Apply filters from URL parameters on mount
  useEffect(() => {
    const locality = searchParams.get('locality');
    const bedrooms = searchParams.get('bedrooms');
    
    if (locality) {
      setSelectedLocalities([locality]);
    }
    
    if (bedrooms) {
      const bedroomArray = bedrooms.split(',');
      setSelectedBedrooms(bedroomArray);
    }
  }, [searchParams]);

  const handleLikeToggle = (projectId) => {
    setProjectList(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, isLiked: !project.isLiked }
          : project
      )
    );
  };

  const handleOfferLikeToggle = (offerId) => {
    setOfferLikes((prev) => ({
      ...prev,
      [offerId]: !prev[offerId],
    }));
  };

  // Filter projects based on search query and other filters
  const filteredProjects = useMemo(() => {
    let filtered = [...projectList];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.type.toLowerCase().includes(query) ||
        project.builder.toLowerCase().includes(query) ||
        project.status.toLowerCase().includes(query)
      );
    }

    // Apply "hide already seen" filter
    if (hideAlreadySeen) {
      filtered = filtered.filter(project => !project.isViewed);
    }

    // Apply verified properties filter
    if (verifiedProperties) {
      filtered = filtered.filter(project => project.reraApproved);
    }

    // Apply other filters
    if (selectedLocalities.length > 0) {
      filtered = filtered.filter(project => selectedLocalities.includes(project.location));
    }
    if (selectedProjects.length > 0) {
      filtered = filtered.filter(project => selectedProjects.includes(project.name));
    }
    // Commented out filters for properties not in data structure
    // if (selectedPurchaseType.length > 0) {
    //   filtered = filtered.filter(project => selectedPurchaseType.includes(project.purchaseType));
    // }
    // if (selectedAmenities.length > 0) {
    //   filtered = filtered.filter(project => 
    //     selectedAmenities.every(amenity => project.amenities.includes(amenity))
    //   );
    // }
    // if (selectedFurnishing.length > 0) {
    //   filtered = filtered.filter(project => selectedFurnishing.includes(project.furnishing));
    // }
    if (selectedRera.length > 0) {
      filtered = filtered.filter(project => selectedRera.includes(project.reraApproved ? "Yes" : "No"));
    }
    // if (selectedPostedBy.length > 0) {
    //   filtered = filtered.filter(project => selectedPostedBy.includes(project.postedBy));
    // }
    if (selectedConstruction.length > 0) {
      filtered = filtered.filter(project => selectedConstruction.includes(project.status));
    }
    // if (selectedBedrooms.length > 0) {
    //   filtered = filtered.filter(project => selectedBedrooms.some(bed => project.beds.includes(bed)));
    // }
    if (selectedPropertyType.length > 0) {
      filtered = filtered.filter(project => selectedPropertyType.includes(project.type));
    }
    // Budget range filter
    if (budgetRange[0] > 0 || budgetRange[1] > 0) {
      filtered = filtered.filter(project => {
        const price = parseFloat(project.price.replace(/[^0-9.]/g, ''));
        const unit = project.price.includes("Cr") ? 10000000 : 100000;
        const minBudget = budgetRange[0] * unit;
        const maxBudget = budgetRange[1] * unit;
        return price >= minBudget && price <= maxBudget;
      });
    }
    // Area range filter - commented out as area property doesn't exist
    // if (areaRange[0] > 0 || areaRange[1] > 0) {
    //   filtered = filtered.filter(project => {
    //     const area = parseFloat(project.area.replace(/[^0-9.]/g, ''));
    //     return area >= areaRange[0] && area <= areaRange[1];
    //   });
    // }

    return filtered;
  }, [projectList, searchQuery, hideAlreadySeen, verifiedProperties, selectedLocalities, selectedProjects, selectedPurchaseType, selectedAmenities, selectedFurnishing, selectedRera, selectedPostedBy, selectedConstruction, selectedBedrooms, selectedPropertyType, budgetRange, areaRange]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Search Section */}
      <section className="bg-white py-4 sm:py-6 border-b">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto w-full">
            <div className="sm:flex sm:items-center sm:gap-2 w-full">
              <div className="relative flex-1 w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Locality / Project / Society / Landmark"
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
              </div>
              <div className="mt-2 sm:mt-0 hidden sm:flex w-full sm:w-auto justify-center sm:justify-end gap-2">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 w-9 p-0" aria-label="Search">
                🔍
              </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 w-9 p-0" aria-label="Use current location">
                📍
              </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            {/* Mobile Filter Trigger */}
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full bg-primary text-white hover:bg-primary/90 hover:text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Show Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full bg-white px-4 py-4 pb-24 overflow-y-auto">
                  <h2 className="text-xl font-bold mb-3">Filters</h2>
                  <div className="bg-white rounded-lg p-0 shadow-none border-none space-y-6">
                    {/* Applied Filters - Mobile */}
                    <div className="pt-2 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold text-gray-900 text-sm">Applied Filters</h2>
                        <Button 
                          variant="link" 
                          className="text-primary p-0 h-auto text-xs whitespace-nowrap"
                          onClick={() => {
                            setSelectedLocalities([]);
                            setSelectedProjects([]);
                            setSelectedPurchaseType([]);
                            setSelectedAmenities([]);
                            setSelectedFurnishing([]);
                            setSelectedRera([]);
                            setSelectedPostedBy([]);
                            setSelectedConstruction([]);
                            setSelectedBedrooms([]);
                            setSelectedPropertyType([]);
                            setBudgetRange([0]);
                            setAreaRange([0]);
                          }}
                        >
                          Clear All
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                        {selectedLocalities.map((locality) => (
                          <Badge key={locality} variant="secondary" className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5">
                            {locality}
                            <button
                              onClick={() => setSelectedLocalities(selectedLocalities.filter(l => l !== locality))}
                              className="ml-1 hover:text-red-500 flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {selectedProjects.map((project) => (
                          <Badge key={project} variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                            {project}
                            <button
                              onClick={() => setSelectedProjects(selectedProjects.filter(p => p !== project))}
                              className="ml-1 hover:text-red-500 flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {selectedPurchaseType.map((type) => (
                          <Badge key={type} variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                            {type}
                            <button
                              onClick={() => setSelectedPurchaseType(selectedPurchaseType.filter(t => t !== type))}
                              className="ml-1 hover:text-red-500 flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {selectedAmenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5">
                            <span className="truncate max-w-20">{amenity}</span>
                            <button
                              onClick={() => setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))}
                              className="ml-1 hover:text-red-500 flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {selectedFurnishing.map((status) => (
                          <Badge key={status} variant="secondary" className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                            {status}
                            <button
                              onClick={() => setSelectedFurnishing(selectedFurnishing.filter(s => s !== status))}
                              className="ml-1 hover:text-red-500 flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {selectedBedrooms.map((bedroom) => (
                          <Badge key={bedroom} variant="secondary" className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5">
                            {bedroom}
                            <button
                              onClick={() => setSelectedBedrooms(selectedBedrooms.filter(b => b !== bedroom))}
                              className="ml-1 hover:text-red-500 flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {budgetRange[0] > 0 && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs px-2 py-0.5">
                            Budget: ₹{budgetRange[0]} Cr+
                            <button
                              onClick={() => setBudgetRange([0])}
                              className="ml-1 hover:text-red-500 flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}
                        {areaRange[0] > 0 && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5">
                            Area: {areaRange[0]} sq.ft+
                            <button
                              onClick={() => setAreaRange([0])}
                              className="ml-1 hover:text-red-500 flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}
                        {(selectedLocalities.length === 0 && selectedProjects.length === 0 && selectedPurchaseType.length === 0 && selectedAmenities.length === 0 && selectedFurnishing.length === 0 && selectedBedrooms.length === 0 && budgetRange[0] === 0 && areaRange[0] === 0) && (
                          <span className="text-xs text-gray-500 italic">No filters applied</span>
                        )}
                      </div>
                    </div>
                    {/* Filter sections - Mobile */}
                    <FilterSection title="Hide already seen" isExpandable={true}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Hide already seen</span>
                        <Switch 
                          checked={hideAlreadySeen}
                          onCheckedChange={setHideAlreadySeen}
                        />
                      </div>
                    </FilterSection>
                    {/* Other mobile filter sections will go here, using the same FilterSection component with adjusted sizes */}
                    <FilterSection title="New Projects/Societies" isExpandable={true}>
                      <div className="space-y-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search more"
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {['Sheth Vasant Oasis', 'Lodha Eternis', 'Runell Orbis', 'Naman Habitat', 'Kanakia Sevens'].map((project) => (
                            <div key={project} className="flex items-center space-x-2">
                              <Checkbox
                                id={project}
                                checked={selectedProjects.includes(project)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedProjects([...selectedProjects, project]);
                                  } else {
                                    setSelectedProjects(selectedProjects.filter(p => p !== project));
                                  }
                                }}
                              />
                              <label htmlFor={project} className="text-sm text-gray-700">{project}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FilterSection>

                    <FilterSection title="Localities" isExpandable={true}>
                      <div className="flex items-center justify-between mb-3">
                        <span></span>
                        <Button variant="link" className="text-primary p-0 h-auto text-sm">
                          Clear All
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search more"
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {['Andheri', 'Kandivali', 'Malad', 'Kandivali East', 'Andheri West', 'Chembur', 'Vikhroli', 'Bhandup', 'Ghatkopar'].map((locality) => (
                            <div key={locality} className="flex items-center space-x-2">
                              <Checkbox
                                id={locality}
                                checked={selectedLocalities.includes(locality)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedLocalities([...selectedLocalities, locality]);
                                  } else {
                                    setSelectedLocalities(selectedLocalities.filter(l => l !== locality));
                                  }
                                }}
                              />
                              <label htmlFor={locality} className="text-sm text-gray-700">{locality}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FilterSection>

                    <FilterSection title="Purchase type" isExpandable={true}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['Resale', 'New Booking'].map((type) => (
                          <Button
                            key={type}
                            variant={selectedPurchaseType.includes(type) ? "default" : "outline"}
                            size="sm"
                            className="text-xs w-full sm:flex-1 min-w-0"
                            onClick={() => {
                              if (selectedPurchaseType.includes(type)) {
                                setSelectedPurchaseType(selectedPurchaseType.filter(t => t !== type));
                              } else {
                                setSelectedPurchaseType([...selectedPurchaseType, type]);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {type}
                          </Button>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="Amenities" isExpandable={true}>
                      <div className="flex items-center justify-between mb-3">
                        <span></span>
                        <Button variant="link" className="text-primary p-0 h-auto text-sm">
                          Clear All
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['Parking', 'Lift', 'Power Backup', 'Park', 'Gymnasium', 'Swimming Pool', 'Vaastu Compliant', 'Club house', 'Gas Pipeline', 'Security Personnel'].map((amenity) => (
                          <Button
                            key={amenity}
                            variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                            size="sm"
                            className="text-xs justify-start h-auto py-2 px-2 min-h-8"
                            onClick={() => {
                              if (selectedAmenities.includes(amenity)) {
                                setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                              } else {
                                setSelectedAmenities([...selectedAmenities, amenity]);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{amenity}</span>
                          </Button>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="Furnishing Status" isExpandable={true}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['Unfurnished', 'Semifurnished', 'Furnished'].map((status) => (
                          <Button
                            key={status}
                            variant={selectedFurnishing.includes(status) ? "default" : "outline"}
                            size="sm"
                            className="text-xs w-full sm:flex-1 min-w-0"
                            onClick={() => {
                              if (selectedFurnishing.includes(status)) {
                                setSelectedFurnishing(selectedFurnishing.filter(s => s !== status));
                              } else {
                                setSelectedFurnishing([...selectedFurnishing, status]);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            <span className="truncate">{status}</span>
                          </Button>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="RERA Approved" isExpandable={true}>
                      <div className="space-y-2">
                        {['RERA approved properties', 'RERA registered dealers'].map((rera) => (
                          <Button
                            key={rera}
                            variant={selectedRera.includes(rera) ? "default" : "outline"}
                            size="sm"
                            className="text-xs w-full justify-start h-auto py-2"
                            onClick={() => {
                              if (selectedRera.includes(rera)) {
                                setSelectedRera(selectedRera.filter(r => r !== rera));
                              } else {
                                setSelectedRera([...selectedRera, rera]);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{rera}</span>
                          </Button>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="Area" isExpandable={true}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Sq.ft</span>
                        <Button variant="link" className="text-primary p-0 h-auto text-xs">
                          Clear All
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">0 sq.ft.</span>
                          <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">4000+ sq.ft.</span>
                        </div>
                        <Slider
                          value={areaRange}
                          onValueChange={setAreaRange}
                          max={4000}
                          step={100}
                          className="w-full"
                        />
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                            <option>Min Area</option>
                          </select>
                          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                            <option>Max Area</option>
                          </select>
                        </div>
                      </div>
                    </FilterSection>

                    <FilterSection title="Posted by" isExpandable={true}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['Owner', 'Builder', 'Dealer', 'Feature Dealer'].map((poster) => (
                          <Button
                            key={poster}
                            variant={selectedPostedBy.includes(poster) ? "default" : "outline"}
                            size="sm"
                            className="text-xs justify-start h-auto py-2"
                            onClick={() => {
                              if (selectedPostedBy.includes(poster)) {
                                setSelectedPostedBy(selectedPostedBy.filter(p => p !== poster));
                              } else {
                                setSelectedPostedBy([...selectedPostedBy, poster]);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{poster}</span>
                          </Button>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="Construction Status" isExpandable={true}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['New launch', 'Under Construction', 'Ready to move'].map((status) => (
                          <Button
                            key={status}
                            variant={selectedConstruction.includes(status) ? "default" : "outline"}
                            size="sm"
                            className="text-xs flex-1 min-w-0"
                            onClick={() => {
                              if (selectedConstruction.includes(status)) {
                                setSelectedConstruction(selectedConstruction.filter(s => s !== status));
                              } else {
                                setSelectedConstruction([...selectedConstruction, status]);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            <span className="truncate">{status}</span>
                          </Button>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="No. of Bedrooms" isExpandable={true}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['1 RK/1 BHK', '2bhk', '3 bhk', '4 bhk', '5 bhk'].map((bedroom) => (
                          <Button
                            key={bedroom}
                            variant={selectedBedrooms.includes(bedroom) ? "default" : "outline"}
                            size="sm"
                            className="text-xs flex-1 min-w-0"
                            onClick={() => {
                              if (selectedBedrooms.includes(bedroom)) {
                                setSelectedBedrooms(selectedBedrooms.filter(b => b !== bedroom));
                              } else {
                                setSelectedBedrooms([...selectedBedrooms, bedroom]);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            <span className="truncate">{bedroom}</span>
                          </Button>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="Type of property" isExpandable={true}>
                      <div className="space-y-2">
                        {['Residential Apartment', 'Independent House/Villa', 'Independent/builder Floor', '1 RK/Studio Apartment', 'Residential Land', 'Farm house'].map((type) => (
                          <Button
                            key={type}
                            variant={selectedPropertyType.includes(type) ? "default" : "outline"}
                            size="sm"
                            className="text-xs w-full justify-start h-auto py-2 px-2"
                            onClick={() => {
                              if (selectedPropertyType.includes(type)) {
                                setSelectedPropertyType(selectedPropertyType.filter(t => t !== type));
                              } else {
                                setSelectedPropertyType([...selectedPropertyType, type]);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate text-left">{type}</span>
                          </Button>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection title="Budget" isExpandable={true}>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">0</span>
                          <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">100+ Crores</span>
                        </div>
                        <Slider
                          value={budgetRange}
                          onValueChange={setBudgetRange}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                        <div className="grid grid-cols-2 gap-1">
                          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                            <option>Min Budget</option>
                          </select>
                          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                            <option>Max Budget</option>
                          </select>
                        </div>
                      </div>
                    </FilterSection>

                    <FilterSection title="Properties with photos" isExpandable={true}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Properties with photos</span>
                        <Switch />
                      </div>
                    </FilterSection>

                    <FilterSection title="Properties with videos" isExpandable={true}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Properties with videos</span>
                        <Switch />
                      </div>
                    </FilterSection>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block bg-white rounded-lg p-6 shadow-sm border">
              {/* Applied Filters - Desktop */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-900">Applied Filters</h2>
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto text-sm"
                    onClick={() => {
                      setSelectedLocalities([]);
                      setSelectedProjects([]);
                      setSelectedPurchaseType([]);
                      setSelectedAmenities([]);
                      setSelectedFurnishing([]);
                      setSelectedRera([]);
                      setSelectedPostedBy([]);
                      setSelectedConstruction([]);
                      setSelectedBedrooms([]);
                      setSelectedPropertyType([]);
                      setBudgetRange([0]);
                      setAreaRange([0]);
                    }}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {selectedLocalities.map((locality) => (
                    <Badge key={locality} variant="secondary" className="bg-gray-100 text-gray-700 text-xs px-2 py-1">
                      {locality}
                      <button
                        onClick={() => setSelectedLocalities(selectedLocalities.filter(l => l !== locality))}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedProjects.map((project) => (
                    <Badge key={project} variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-1">
                      {project}
                      <button
                        onClick={() => setSelectedProjects(selectedProjects.filter(p => p !== project))}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedPurchaseType.map((type) => (
                    <Badge key={type} variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                      {type}
                      <button
                        onClick={() => setSelectedPurchaseType(selectedPurchaseType.filter(t => t !== type))}
                        className="ml-1 hover:text-red-500 flex-shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedAmenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="bg-purple-100 text-purple-700 text-xs px-2 py-1">
                      <span className="truncate max-w-20">{amenity}</span>
                      <button
                        onClick={() => setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))}
                        className="ml-1 hover:text-red-500 flex-shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedFurnishing.map((status) => (
                    <Badge key={status} variant="secondary" className="bg-orange-100 text-orange-700 text-xs px-2 py-1">
                      {status}
                      <button
                        onClick={() => setSelectedFurnishing(selectedFurnishing.filter(s => s !== status))}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedBedrooms.map((bedroom) => (
                    <Badge key={bedroom} variant="secondary" className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1">
                      {bedroom}
                      <button
                        onClick={() => setSelectedBedrooms(selectedBedrooms.filter(b => b !== bedroom))}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {budgetRange[0] > 0 && (
                    <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs px-2 py-0.5">
                      Budget: ₹{budgetRange[0]} Cr+
                      <button
                        onClick={() => setBudgetRange([0])}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {areaRange[0] > 0 && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5">
                      Area: {areaRange[0]} sq.ft+
                      <button
                        onClick={() => setAreaRange([0])}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {(selectedLocalities.length === 0 && selectedProjects.length === 0 && selectedPurchaseType.length === 0 && selectedAmenities.length === 0 && selectedFurnishing.length === 0 && selectedBedrooms.length === 0 && budgetRange[0] === 0 && areaRange[0] === 0) && (
                    <span className="text-xs text-gray-500 italic">No filters applied</span>
                  )}
                </div>
              </div>

              {/* Hide already seen */}
              <FilterSection title="Hide already seen" isExpandable>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Hide already seen</span>
                  <Switch 
                    checked={hideAlreadySeen}
                    onCheckedChange={setHideAlreadySeen}
                  />
                </div>
              </FilterSection>

              {/* Verified Properties */}
              <FilterSection title="Verified Properties" isExpandable={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-700">Verified Properties</span>
                    <div className="text-xs text-gray-500">by mumbai homes</div>
                  </div>
                  <Switch 
                    checked={verifiedProperties}
                    onCheckedChange={setVerifiedProperties}
                  />
                </div>
              </FilterSection>

              {/* New Projects/Societies */}
              <FilterSection title="New Projects/Societies" isExpandable>
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search more"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  {['Sheth Vasant Oasis', 'Lodha Eternis', 'Runell Orbis', 'Naman Habitat', 'Kanakia Sevens'].map((project) => (
                    <div key={project} className="flex items-center space-x-2">
                      <Checkbox
                        id={project}
                        checked={selectedProjects.includes(project)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedProjects([...selectedProjects, project]);
                          } else {
                            setSelectedProjects(selectedProjects.filter(p => p !== project));
                          }
                        }}
                      />
                      <label htmlFor={project} className="text-sm text-gray-700">{project}</label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Localities */}
              <FilterSection title="Localities" isExpandable>
                <div className="flex items-center justify-between mb-3">
                  <span></span>
                  <Button variant="link" className="text-primary p-0 h-auto text-sm">
                    Clear All
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search more"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  {['Andheri', 'Kandivali', 'Malad', 'Kandivali East', 'Andheri West', 'Chembur', 'Vikhroli', 'Bhandup', 'Ghatkopar'].map((locality) => (
                    <div key={locality} className="flex items-center space-x-2">
                      <Checkbox
                        id={locality}
                        checked={selectedLocalities.includes(locality)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLocalities([...selectedLocalities, locality]);
                          } else {
                            setSelectedLocalities(selectedLocalities.filter(l => l !== locality));
                          }
                        }}
                      />
                      <label htmlFor={locality} className="text-sm text-gray-700">{locality}</label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Purchase Type */}
              <FilterSection title="Purchase type" isExpandable>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Resale', 'New Booking'].map((type) => (
                    <Button
                      key={type}
                      variant={selectedPurchaseType.includes(type) ? "default" : "outline"}
                      size="sm"
                      className="text-xs flex-1 min-w-0"
                      onClick={() => {
                        if (selectedPurchaseType.includes(type)) {
                          setSelectedPurchaseType(selectedPurchaseType.filter(t => t !== type));
                        } else {
                          setSelectedPurchaseType([...selectedPurchaseType, type]);
                        }
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {type}
                    </Button>
                  ))}
                </div>
              </FilterSection>

              {/* Amenities */}
              <FilterSection title="Amenities" isExpandable>
                <div className="flex items-center justify-between mb-3">
                  <span></span>
                  <Button variant="link" className="text-primary p-0 h-auto text-sm">
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Parking', 'Lift', 'Power Backup', 'Park', 'Gymnasium', 'Swimming Pool', 'Vaastu Compliant', 'Club house', 'Gas Pipeline', 'Security Personnel'].map((amenity) => (
                    <Button
                      key={amenity}
                      variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                      size="sm"
                      className="text-xs justify-start h-auto py-2 px-2 min-h-8"
                      onClick={() => {
                        if (selectedAmenities.includes(amenity)) {
                          setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                        } else {
                          setSelectedAmenities([...selectedAmenities, amenity]);
                        }
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </Button>
                  ))}
                </div>
              </FilterSection>

              {/* Furnishing Status */}
              <FilterSection title="Furnishing Status" isExpandable>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Unfurnished', 'Semifurnished', 'Furnished'].map((status) => (
                    <Button
                      key={status}
                      variant={selectedFurnishing.includes(status) ? "default" : "outline"}
                      size="sm"
                      className="text-xs flex-1 min-w-0"
                      onClick={() => {
                        if (selectedFurnishing.includes(status)) {
                          setSelectedFurnishing(selectedFurnishing.filter(s => s !== status));
                        } else {
                          setSelectedFurnishing([...selectedFurnishing, status]);
                        }
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      <span className="truncate">{status}</span>
                    </Button>
                  ))}
                </div>
              </FilterSection>

              {/* RERA Approved */}
              <FilterSection title="RERA Approved" isExpandable>
                <div className="space-y-2">
                  {['RERA approved properties', 'RERA registered dealers'].map((rera) => (
                    <Button
                      key={rera}
                      variant={selectedRera.includes(rera) ? "default" : "outline"}
                      size="sm"
                      className="text-xs w-full justify-start h-auto py-2"
                      onClick={() => {
                        if (selectedRera.includes(rera)) {
                          setSelectedRera(selectedRera.filter(r => r !== rera));
                        } else {
                          setSelectedRera([...selectedRera, rera]);
                        }
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{rera}</span>
                    </Button>
                  ))}
                </div>
              </FilterSection>

              {/* Area */}
              <FilterSection title="Area" isExpandable>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Sq.ft</span>
                  <Button variant="link" className="text-primary p-0 h-auto text-xs">
                    Clear All
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">0 sq.ft.</span>
                    <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">4000+ sq.ft.</span>
                  </div>
                  <Slider
                    value={areaRange}
                    onValueChange={setAreaRange}
                    max={4000}
                    step={100}
                    className="w-full"
                  />
                  <div className="grid grid-cols-2 gap-1">
                    <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                      <option>Min Area</option>
                    </select>
                    <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                      <option>Max Area</option>
                    </select>
                  </div>
                </div>
              </FilterSection>

              {/* Posted by */}
              <FilterSection title="Posted by" isExpandable>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Owner', 'Builder', 'Dealer', 'Feature Dealer'].map((poster) => (
                    <Button
                      key={poster}
                      variant={selectedPostedBy.includes(poster) ? "default" : "outline"}
                      size="sm"
                      className="text-xs justify-start h-auto py-2"
                      onClick={() => {
                        if (selectedPostedBy.includes(poster)) {
                          setSelectedPostedBy(selectedPostedBy.filter(p => p !== poster));
                        } else {
                          setSelectedPostedBy([...selectedPostedBy, poster]);
                        }
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{poster}</span>
                    </Button>
                  ))}
                </div>
              </FilterSection>

              {/* Construction Status */}
              <FilterSection title="Construction Status" isExpandable>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['New launch', 'Under Construction', 'Ready to move'].map((status) => (
                    <Button
                      key={status}
                      variant={selectedConstruction.includes(status) ? "default" : "outline"}
                      size="sm"
                      className="text-xs flex-1 min-w-0"
                      onClick={() => {
                        if (selectedConstruction.includes(status)) {
                          setSelectedConstruction(selectedConstruction.filter(s => s !== status));
                        } else {
                          setSelectedConstruction([...selectedConstruction, status]);
                        }
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      <span className="truncate">{status}</span>
                    </Button>
                  ))}
                </div>
              </FilterSection>

              {/* No. of Bedrooms */}
              <FilterSection title="No. of Bedrooms" isExpandable>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['1 RK/1 BHK', '2bhk', '3 bhk', '4 bhk', '5 bhk'].map((bedroom) => (
                    <Button
                      key={bedroom}
                      variant={selectedBedrooms.includes(bedroom) ? "default" : "outline"}
                      size="sm"
                      className="text-xs flex-1 min-w-0"
                      onClick={() => {
                        if (selectedBedrooms.includes(bedroom)) {
                          setSelectedBedrooms(selectedBedrooms.filter(b => b !== bedroom));
                        } else {
                          setSelectedBedrooms([...selectedBedrooms, bedroom]);
                        }
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      <span className="truncate">{bedroom}</span>
                    </Button>
                  ))}
                </div>
              </FilterSection>

              {/* Type of property */}
              <FilterSection title="Type of property" isExpandable>
                <div className="space-y-2">
                  {['Residential Apartment', 'Independent House/Villa', 'Independent/builder Floor', '1 RK/Studio Apartment', 'Residential Land', 'Farm house'].map((type) => (
                    <Button
                      key={type}
                      variant={selectedPropertyType.includes(type) ? "default" : "outline"}
                      size="sm"
                      className="text-xs w-full justify-start h-auto py-2 px-2"
                      onClick={() => {
                        if (selectedPropertyType.includes(type)) {
                          setSelectedPropertyType(selectedPropertyType.filter(t => t !== type));
                        } else {
                          setSelectedPropertyType([...selectedPropertyType, type]);
                        }
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate text-left">{type}</span>
                    </Button>
                  ))}
                </div>
              </FilterSection>

              {/* Budget */}
              <FilterSection title="Budget" isExpandable>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">0</span>
                    <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">100+ Crores</span>
                  </div>
                  <Slider
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="grid grid-cols-2 gap-1">
                    <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                      <option>Min Budget</option>
                    </select>
                    <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                      <option>Max Budget</option>
                    </select>
                  </div>
                </div>
              </FilterSection>

              {/* Properties with photos */}
              <FilterSection title="Properties with photos" isExpandable>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Properties with photos</span>
                  <Switch />
                </div>
              </FilterSection>

              {/* Properties with videos */}
              <FilterSection title="Properties with videos" isExpandable>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Properties with videos</span>
                  <Switch />
                </div>
              </FilterSection>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onLikeToggle={handleLikeToggle}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 sm:py-12">
                  <div className="text-gray-500 text-base sm:text-lg mb-1 sm:mb-2">No projects found</div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
                  </div>
                </div>
              )}
            </div>

            {/* Limited Offers Section */}
            <section className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Limited Offers in Central Mumbai</h2>

              {/* Mobile: single row horizontal scroll */}
              <div className="md:hidden -mx-4 px-4">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                  {limitedOffers.map((offer) => (
                    <div key={offer.id} className="min-w-[85%] bg-[#EDF4FC] rounded-lg overflow-hidden shadow-md relative">
                      {/* Heart button top right */}
                      <button
                        className="absolute top-2 right-2 p-1 h-7 w-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"
                        onClick={() => handleOfferLikeToggle(offer.id)}
                      >
                        <Heart className={`h-4 w-4 ${offerLikes[offer.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </button>
                      <div className="flex">
                        <img
                          src={offer.image}
                          alt={offer.name}
                          className="w-32 h-32 object-cover flex-shrink-0"
                        />
                        <div className="flex-1 p-3">
                          <h3 className="font-semibold text-base mb-1">{offer.name}</h3>
                          <p className="text-xs text-gray-600 mb-2">{offer.type}</p>
                          <div className="flex items-center text-xs text-gray-600 mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            {offer.location}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{offer.price}</span>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs px-3 py-1 h-auto">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop/Tablet: keep grid */}
              <div className="hidden md:grid grid-cols-2 gap-6">
                {limitedOffers.map((offer) => (
                  <div key={offer.id} className="bg-[#EDF4FC] rounded-lg overflow-hidden shadow-md relative">
                    {/* Heart button top right */}
                    <button
                      className="absolute top-2 right-2 p-1 h-7 w-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"
                      onClick={() => handleOfferLikeToggle(offer.id)}
                    >
                      <Heart className={`h-4 w-4 ${offerLikes[offer.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                    <div className="flex">
                      <img
                        src={offer.image}
                        alt={offer.name}
                        className="w-32 h-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 p-4">
                        <h3 className="font-semibold text-lg mb-1">{offer.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{offer.type}</p>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {offer.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{offer.price}</span>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* More Projects Grid */}
            {filteredProjects.length > 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {filteredProjects.slice(4, 8).map((project) => (
                  <ProjectCard 
                    key={`bottom-${project.id}`} 
                    project={project} 
                    onLikeToggle={handleLikeToggle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom section - Kandivali projects above MumbaiHomesSection */}
      <ProjectsInKandivaliSection />
      {/* Bottom section - same as home page */}
      <MumbaiHomesSection />
    </div>
  );
};

export default AllProjects;