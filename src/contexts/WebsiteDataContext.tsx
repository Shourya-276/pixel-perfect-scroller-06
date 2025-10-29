import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface HeroSectionData {
  title: string;
  subtitle: string;
  description: string;
  searchPlaceholder: string;
  ctaText: string;
  backgroundImage: string;
}

interface Project {
  id: number;
  name: string;
  location: string;
  price: string;
  beds: string;
  type: string;
  image: string;
}

interface NewlyLaunchedData {
  title: string;
  description: string;
  projects: Project[];
}

interface TrendingProjectsData {
  title: string;
  description: string;
  locations: string[];
  projects: Project[];
}

interface SpotlightProjectData {
  badge: string;
  title: string;
  location: string;
  description: string;
  projectType: string;
  apartmentTypes: string;
  reraArea: string;
  reraNumber: string;
  price: string;
  ctaText: string;
  image: string;
}

interface WhyChooseUsFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsData {
  title: string;
  features: WhyChooseUsFeature[];
  buildingImage: string;
  handshakeImage: string;
}

interface VirtualTour {
  id: number;
  image: string;
  alt: string;
}

interface CompanyLogo {
  id: number;
  initials: string;
  name: string;
  color: string;
  textColor: string;
  description: string;
  subDescription?: string;
}

interface VirtualTourData {
  title: string;
  tours: VirtualTour[];
  companyLogos: CompanyLogo[];
}

interface Bank {
  id: number;
  name: string;
  logo: string;
}

interface BanksData {
  title: string;
  description: string;
  contactText: string;
  ctaText: string;
  banks: Bank[];
}

interface Blog {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
  image: string;
  content: string; // Added content field
  size: "small" | "large" | "wide";
}

interface BlogsData {
  title: string;
  ctaText: string;
  blogs: Blog[];
}

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

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FrequentlyAskedQuestionsData {
  title: string;
  faqs: FAQ[];
}

interface NeighborhoodItem {
  text: string;
  locality?: string;
  bedrooms?: string;
}

interface Category {
  id: number;
  title: string;
  items: NeighborhoodItem[];
  link: string;
}

interface DiscoverNeighborhoodsData {
  title: string;
  categories: Category[];
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

interface CompanyLink {
  id: number;
  text: string;
  url: string;
}

interface MumbaiHomesData {
  logo: string;
  title: string;
  description: string;
  companyLinks: CompanyLink[];
  disclaimer: string;
  copyright: string;
  socialLinks: SocialLink[];
}

// Project Details Types
interface ProjectAmenity {
  icon: string;
  name: string;
}

interface FloorPlanItem {
  type: string;
  area: string;
  price: string;
  categoryKey?: '1BHK' | '2BHK' | '3BHK' | 'TYPICAL' | 'BROCHURE';
}

interface VirtualTourItem {
  id: number;
  image: string;
  alt: string;
}

interface SimilarProjectItem {
  id: number;
  name: string;
  type: string;
  location: string;
  price: string;
  image: string;
}

interface ProjectOverview {
  projectType: string;
  units: string;
  area: string;
  reraNumber: string;
}

interface ProjectLocationInfo {
  location: string;
  zone: string;
  pincode: string;
  mapEmbedUrl: string;
  mapsCtaText: string;
}

export interface ProjectDetailsData {
  id: number;
  projectName: string;
  statusBadges: string[];
  priceRange: string;
  heroImage: string;
  mainImage: string;
  aerialImage: string;
  brochurePdf?: string;
  locationText: string;
  aboutText: string;
  developerName: string;
  builder?: string;
  status?: string;
  reraApproved?: boolean;
  cardType?: string;
  amenities: ProjectAmenity[];
  overview: ProjectOverview;
  floorPlans: FloorPlanItem[];
  floorPlanCategoryImages: {
    oneBhk?: string;
    twoBhk?: string;
    threeBhk?: string;
    typical?: string;
    brochure?: string;
  };
  viewFloorplanImages: string[];
  virtualTours: VirtualTourItem[];
  locationInfo: ProjectLocationInfo;
  similarProjects: SimilarProjectItem[];
}

interface WebsiteData {
  heroSection: HeroSectionData;
  newlyLaunched: NewlyLaunchedData;
  trendingProjects: TrendingProjectsData;
  spotlightProject: SpotlightProjectData;
  whyChooseUs: WhyChooseUsData;
  virtualTour: VirtualTourData;
  banks: BanksData;
  blogsAndArticles: BlogsData;
  homesInEveryZone: HomesInEveryZoneData;
  frequentlyAskedQuestions: FrequentlyAskedQuestionsData;
  discoverNeighborhoods: DiscoverNeighborhoodsData;
  mumbaiHomes: MumbaiHomesData;
  projectDetails: ProjectDetailsData;
  projects: ProjectDetailsData[];
}

// Default data
const defaultHeroData: HeroSectionData = {
  title: "Discover\nMumbai Homes",
  subtitle: "100% Happiness With 0% Brokerage",
  description: "Discover the Perfect Residential Destination with Mumbai Homes,\nOffering a Variety of Options to Suit your Lifestyle Needs",
  searchPlaceholder: "Enter Locality / Project / Society / Landmark",
  ctaText: "Enquiry Now",
  backgroundImage: "",
};

const defaultNewlyLaunchedData: NewlyLaunchedData = {
  title: "Newly Launched",
  description: "Explore newly launched homes across Mumbai\ndesigned for modern living, convenience, and comfort.",
  projects: [
    {
      id: 1,
      name: "RNA NG Royal Park",
      location: "Kanjurmarg",
      price: "₹1.48 Cr",
      beds: "1 bhk, 2 bhk",
      type: "Residential",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Lodha Amara",
      location: "Thane",
      price: "₹2.25 Cr",
      beds: "2 bhk, 3 bhk",
      type: "Residential",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    },
  ],
};

const defaultTrendingProjectsData: TrendingProjectsData = {
  title: "Trending Projects",
  description: "Find what's hot in the city — top-rated developments\nmaking waves in Mumbai's real estate scene.",
  locations: [
    "Western Mumbai",
    "Eastern Mumbai",
    "Central Mumbai",
    "Mumbai Metropolitan",
    "Thane-Kalyan",
    "Navi Mumbai",
  ],
  projects: [
    {
      id: 1,
      name: "RNA NG Royal Park",
      location: "Kanjurmarg",
      price: "₹1.48 Cr",
      beds: "1 bhk, 2 bhk",
      type: "Residential",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=500&fit=crop",
    },
    {
      id: 2,
      name: "RNA NG Royal Park",
      location: "Kanjurmarg",
      price: "₹1.48 Cr",
      beds: "1 bhk, 2 bhk",
      type: "Residential",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=500&fit=crop",
    },
  ],
};

const defaultSpotlightProjectData: SpotlightProjectData = {
  badge: "Spotlight Project",
  title: "Ajmera 78 Lakes Town",
  location: "Kanjurmarg",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis",
  projectType: "Residential",
  apartmentTypes: "1,2 BHK Apartments",
  reraArea: "379.00sq.ft - 758.00 sq.ft",
  reraNumber: "xxxxxxxxxxxxxxxx",
  price: "₹1.48 Cr",
  ctaText: "View more",
  image: "",
};

const defaultWhyChooseUsData: WhyChooseUsData = {
  title: "Why Choose Us ?",
  features: [
    {
      id: 1,
      icon: "Zap",
      title: "Smart Tools",
      description:
        "Use price comparison, EMI calculators & site visit schedulers to make informed decisions.",
    },
    {
      id: 2,
      icon: "Users",
      title: "Personalized Assistance",
      description: "Talk to experts, not bots.",
    },
    {
      id: 3,
      icon: "MapPin",
      title: "Location Intelligence",
      description: "Get deep insights on areas, pricing trends & upcoming growth zones.",
    },
    {
      id: 4,
      icon: "Shield",
      title: "Verified Properties",
      description: "No fakes, no fluff.",
    },
    {
      id: 5,
      icon: "ThumbsUp",
      title: "Hassle-Free Experience",
      description:
        "From virtual tours to legal help, we've got you covered. Choose Mumbai Homes for a smoother, smarter, and stress-free property journey.",
    },
  ],
  buildingImage: "",
  handshakeImage: "",
};

const defaultVirtualTourData: VirtualTourData = {
  title: "Virtual Tour",
  tours: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
      alt: "Virtual Tour 1",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1517840901100-8179e9d84967?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Virtual Tour 2",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Virtual Tour 3",
    },
  ],
  companyLogos: [
    {
      id: 1,
      initials: "YP",
      name: "YOGESHA PROPERTY",
      color: "bg-blue-600 text-white",
      textColor: "text-blue-600",
      description: "",
    },
    {
      id: 2,
      initials: "P",
      name: "PRAKRITHI REALTORS",
      color: "bg-yellow-500 text-white",
      textColor: "text-yellow-600",
      description: "Constructing the Future",
    },
    {
      id: 3,
      initials: "V",
      name: "VIGHNAHARTA GROUP",
      color: "bg-red-600 text-white",
      textColor: "text-red-600",
      description: "A VISION FOR YOUR LIFE",
    },
  ],
};

const defaultBanksData: BanksData = {
  title: "Banks we work with",
  description:
    "From virtual tours to legal aid, Mumbai Homes delivers end-to-end support for a smoother, smarter, stress-free property journey.",
  contactText: "Contact Us for more details",
  ctaText: "Get Loan Assistance",
  banks: [
    {
      id: 1,
      name: "HDFC Bank",
      logo: "https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-emblem.png",
    },
    {
      id: 2,
      name: "SBI Bank",
      logo: "https://static.vecteezy.com/system/resources/previews/020/975/552/non_2x/sbi-logo-sbi-icon-transparent-free-png.png",
    },
    {
      id: 3,
      name: "ICICI Bank",
      logo: "https://i.pinimg.com/736x/ff/d5/31/ffd531a6a78464512a97848e14506738.jpg",
    },
    {
      id: 4,
      name: "Kotak Mahindra Bank",
      logo: "https://e7.pngegg.com/pngimages/333/464/png-clipart-kotak-mahindra-bank-logo-horizontal-bank-logos-thumbnail.png",
    },
  ],
};

const defaultBlogsData: BlogsData = {
  title: "Blogs and Articles",
  ctaText: "View more",
  blogs: [
    {
      id: 1,
      title: "Current Real Estate Market Trends",
      date: "November 17, 2024",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      content: "Explore the latest trends shaping the real estate market in Mumbai, including pricing, demand, and investment opportunities.", // Added content
      size: "small",
    },
    {
      id: 2,
      title: "Green Real Estate: Sustainable Practices and Benefits",
      date: "November 17, 2024",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      content: "Learn about sustainable practices in real estate and their benefits for homeowners and the environment.", // Added content
      size: "small",
    },
    {
      id: 3,
      title: "Common Mistakes in Real Estate Investing",
      subtitle: "Real estate investing is one of the most popular ways to...",
      date: "November 17, 2024",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      content: "Real estate investing is one of the most popular ways to build wealth, but it comes with pitfalls. This article discusses common mistakes and how to avoid them.", // Added content
      size: "large",
    },
  ],
};

const defaultHomesInEveryZoneData: HomesInEveryZoneData = {
  title: "Homes in Every Zone",
  zones: [
    {
      id: 1,
      name: "Western",
      projects: "700 Projects",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Eastern",
      projects: "500 Projects",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Central",
      projects: "1000 Projects",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop",
    },
  ],
};

const defaultFrequentlyAskedQuestionsData: FrequentlyAskedQuestionsData = {
  title: "Frequently Asked Questions",
  faqs: [
    {
      id: 1,
      question: "What makes Swastik Group a trusted name in real estate in Vikhroli?",
      answer:
        "Swastik Group has been a trusted name in real estate for over 2 decades, delivering quality projects with timely completion and excellent customer service. We focus on creating sustainable communities with modern amenities and infrastructure.",
    },
    {
      id: 2,
      question: "What types of residential projects does Swastik Group offer in Vikhroli?",
      answer:
        "We offer a wide range of residential projects including affordable housing, premium apartments, luxury penthouses, and integrated townships with all modern amenities and facilities.",
    },
  ],
};

const defaultDiscoverNeighborhoodsData: DiscoverNeighborhoodsData = {
  title: "Discover the city's prime neighbourhoods.",
  categories: [
    {
      id: 1,
      title: "New Projects",
      items: [
        { text: "New Projects in Chembur", locality: "Chembur" },
        { text: "New Projects in Vikhroli", locality: "Vikhroli" },
        { text: "New Projects in Bhandup", locality: "Bhandup" },
        { text: "New Projects in Ghatkopar", locality: "Ghatkopar" },
      ],
      link: "View All",
    },
    {
      id: 2,
      title: "Trending Projects",
      items: [
        { text: "Trending Projects in Chembur", locality: "Chembur" },
        { text: "Trending Projects in Vikhroli", locality: "Vikhroli" },
        { text: "Trending Projects in Bhandup", locality: "Bhandup" },
        { text: "Trending Projects in Ghatkopar", locality: "Ghatkopar" },
      ],
      link: "View All",
    },
  ],
};

const defaultMumbaiHomesData: MumbaiHomesData = {
  logo: "",
  title: "About Mumbai Homes",
  description:
    "Welcome to Mumbai Homes by The Avenew – your gateway to luxury living. We specialise in premium properties across the city, offering a curated selection of high-end residences that blend elegance, comfort, and exclusivity.",
  companyLinks: [
    { id: 1, text: "Projects", url: "#" },
    { id: 2, text: "Contact Us", url: "#" },
    { id: 3, text: "Blogs", url: "#" },
    { id: 4, text: "Careers", url: "#" },
  ],
  disclaimer:
    "Mumbai Homes Services Limited acts solely as an intermediary, providing a platform for sellers to showcase properties to buyers. We are not involved in or responsible for any transactions between the two parties.",
  copyright:
    "Copyright 2025 | All Rights Reserved By Swastik Group | Developed by Signature Advertising",
  socialLinks: [
    { id: 1, platform: "Instagram", url: "#", icon: "Instagram" },
    { id: 2, platform: "Facebook", url: "#", icon: "Facebook" },
    { id: 3, platform: "LinkedIn", url: "#", icon: "Linkedin" },
    { id: 4, platform: "YouTube", url: "#", icon: "Youtube" },
  ],
};

const defaultProjectDetailsData: ProjectDetailsData = {
  id: 1,
  projectName: "Suji Platinum",
  statusBadges: ["Under Construction", "RERA"],
  priceRange: "₹78 L - 1.24 Cr",
  heroImage: "",
  mainImage: "",
  aerialImage: "",
  brochurePdf: "",
  locationText: "Vikhroli, Central Mumbai Suburbs, Mumbai",
  aboutText:
    "The Suji Platinum Project in Vikhroli, By Suji Builders and Developers. This Project is Priced at ₹78 L - 1.24 Cr and offers 1 and 2 BHK apartments, & Project Size 394.00 sq. ft. to 639.00 sq. ft. Embrace luxury living in a vibrant community.",
  developerName: "Suji Builders and Developers",
  builder: "Builder Name",
  status: "Under Construction - Completion by July 2027",
  reraApproved: true,
  cardType: "1BHK, 2 BHK Apartments available",
  amenities: [
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
    { icon: "📚", name: "Library" },
  ],
  overview: {
    projectType: "Residential",
    units: "1, 2 BHK",
    area: "394-639 sq.ft",
    reraNumber: "P51800053230",
  },
  floorPlans: [
    { type: "1BHK", area: "380 RCA Sq. Ft.", price: "Click for price", categoryKey: '1BHK' },
    { type: "1BHK", area: "390 RCA Sq. Ft.", price: "Click for price", categoryKey: '1BHK' },
    { type: "2BHK", area: "600 RCA Sq. Ft.", price: "Click for price", categoryKey: '2BHK' },
    { type: "Typical", area: "Typical Layout", price: "Click for price", categoryKey: 'TYPICAL' },
  ],
  floorPlanCategoryImages: {
    oneBhk: "",
    twoBhk: "",
    threeBhk: "",
    typical: "",
    brochure: "",
  },
  viewFloorplanImages: [],
  virtualTours: [
    { id: 1, image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop", alt: "Virtual Tour 1" },
    { id: 2, image: "https://images.unsplash.com/photo-1517840901100-8179e9d84967?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Virtual Tour 2" },
    { id: 3, image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Virtual Tour 3" },
  ],
  locationInfo: {
    location: "Vikhroli East",
    zone: "Central Mumbai",
    pincode: "400083",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8!2d72.9!3d19.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzAwLjAiTiA3MsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1",
    mapsCtaText: "View on Google Maps",
  },
  similarProjects: [
    {
      id: 1,
      name: "RNA NG Royal Park",
      type: "1 BHK, 2 BHK residential apartments",
      location: "Kanjurmarg",
      price: "Starting At ₹70 Lakhs +",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "RNA NG Royal Park",
      type: "1 BHK, 2 BHK residential apartments",
      location: "Kanjurmarg",
      price: "Starting At ₹70 Lakhs +",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "RNA NG Royal Park",
      type: "1 BHK, 2 BHK residential apartments",
      location: "Kanjurmarg",
      price: "Starting At ₹70 Lakhs +",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=300&h=200&fit=crop",
    },
  ],
};

const defaultProjectsData: ProjectDetailsData[] = [
  defaultProjectDetailsData,
  { ...defaultProjectDetailsData, id: 2 },
  { ...defaultProjectDetailsData, id: 3 },
];

const defaultWebsiteData: WebsiteData = {
  heroSection: defaultHeroData,
  newlyLaunched: defaultNewlyLaunchedData,
  trendingProjects: defaultTrendingProjectsData,
  spotlightProject: defaultSpotlightProjectData,
  whyChooseUs: defaultWhyChooseUsData,
  virtualTour: defaultVirtualTourData,
  banks: defaultBanksData,
  blogsAndArticles: defaultBlogsData,
  homesInEveryZone: defaultHomesInEveryZoneData,
  frequentlyAskedQuestions: defaultFrequentlyAskedQuestionsData,
  discoverNeighborhoods: defaultDiscoverNeighborhoodsData,
  mumbaiHomes: defaultMumbaiHomesData,
  projectDetails: defaultProjectDetailsData,
  projects: defaultProjectsData,
};

// Context
interface WebsiteDataContextType {
  websiteData: WebsiteData;
  updateHeroSection: (data: HeroSectionData) => void;
  updateNewlyLaunched: (data: NewlyLaunchedData) => void;
  updateTrendingProjects: (data: TrendingProjectsData) => void;
  updateSpotlightProject: (data: SpotlightProjectData) => void;
  updateWhyChooseUs: (data: WhyChooseUsData) => void;
  updateVirtualTour: (data: VirtualTourData) => void;
  updateBanks: (data: BanksData) => void;
  updateBlogsAndArticles: (data: BlogsData) => void;
  updateHomesInEveryZone: (data: HomesInEveryZoneData) => void;
  updateFrequentlyAskedQuestions: (data: FrequentlyAskedQuestionsData) => void;
  updateDiscoverNeighborhoods: (data: DiscoverNeighborhoodsData) => void;
  updateMumbaiHomes: (data: MumbaiHomesData) => void;
  updateProjectDetails: (data: ProjectDetailsData) => void;
  addProject: (data?: Partial<ProjectDetailsData>) => ProjectDetailsData;
  updateProjectById: (id: number, data: ProjectDetailsData) => void;
  deleteProjectById: (id: number) => void;
  refreshData: () => void;
}

const WebsiteDataContext = createContext<WebsiteDataContextType | undefined>(undefined);

// Provider
interface WebsiteDataProviderProps {
  children: ReactNode;
}

export const WebsiteDataProvider: React.FC<WebsiteDataProviderProps> = ({ children }) => {
  const [websiteData, setWebsiteData] = useState<WebsiteData>(defaultWebsiteData);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const heroData = localStorage.getItem('heroSectionData');
        const newlyLaunchedData = localStorage.getItem('newlyLaunchedData');
        const trendingProjectsData = localStorage.getItem('trendingProjectsData');
        const spotlightProjectData = localStorage.getItem('spotlightProjectData');
        const whyChooseUsData = localStorage.getItem('whyChooseUsData');
        const virtualTourData = localStorage.getItem('virtualTourData');
        const banksData = localStorage.getItem('banksData');
        const blogsAndArticlesData = localStorage.getItem('blogsAndArticlesData');
        const homesInEveryZoneData = localStorage.getItem('homesInEveryZoneData');
        const frequentlyAskedQuestionsData = localStorage.getItem('frequentlyAskedQuestionsData');
        const discoverNeighborhoodsData = localStorage.getItem('discoverNeighborhoodsData');
        const mumbaiHomesData = localStorage.getItem('mumbaiHomesData');
        const projectDetailsData = localStorage.getItem('projectDetailsData');
        const projectsData = localStorage.getItem('projectsData');

        const normalizeProject = (p: any, fallbackId: number = Date.now()) => {
          const base = { ...defaultProjectDetailsData } as any;
          const merged = { ...base, ...(p || {}) };
          merged.id = typeof merged.id === 'number' ? merged.id : fallbackId;
          merged.statusBadges = Array.isArray(merged.statusBadges) ? merged.statusBadges : [];
          merged.amenities = Array.isArray(merged.amenities) ? merged.amenities : base.amenities;
          merged.floorPlans = Array.isArray(merged.floorPlans) ? merged.floorPlans : base.floorPlans;
          merged.viewFloorplanImages = Array.isArray(merged.viewFloorplanImages) ? merged.viewFloorplanImages : [];
          merged.virtualTours = Array.isArray(merged.virtualTours) ? merged.virtualTours : base.virtualTours;
          merged.similarProjects = Array.isArray(merged.similarProjects) ? merged.similarProjects : base.similarProjects;
          merged.overview = merged.overview ? { ...base.overview, ...merged.overview } : base.overview;
          merged.locationInfo = merged.locationInfo ? { ...base.locationInfo, ...merged.locationInfo } : base.locationInfo;
          merged.brochurePdf = typeof merged.brochurePdf === 'string' ? merged.brochurePdf : "";
          merged.floorPlanCategoryImages = merged.floorPlanCategoryImages ? { ...base.floorPlanCategoryImages, ...merged.floorPlanCategoryImages } : base.floorPlanCategoryImages;
          return merged as ProjectDetailsData;
        };

        setWebsiteData({
          heroSection: heroData ? JSON.parse(heroData) : defaultHeroData,
          newlyLaunched: newlyLaunchedData ? JSON.parse(newlyLaunchedData) : defaultNewlyLaunchedData,
          trendingProjects: trendingProjectsData ? JSON.parse(trendingProjectsData) : defaultTrendingProjectsData,
          spotlightProject: spotlightProjectData ? JSON.parse(spotlightProjectData) : defaultSpotlightProjectData,
          whyChooseUs: whyChooseUsData ? JSON.parse(whyChooseUsData) : defaultWhyChooseUsData,
          virtualTour: virtualTourData ? JSON.parse(virtualTourData) : defaultVirtualTourData,
          banks: banksData ? JSON.parse(banksData) : defaultBanksData,
          blogsAndArticles: blogsAndArticlesData
            ? JSON.parse(blogsAndArticlesData)
            : defaultBlogsData,
          homesInEveryZone: homesInEveryZoneData
            ? JSON.parse(homesInEveryZoneData)
            : defaultHomesInEveryZoneData,
          frequentlyAskedQuestions: frequentlyAskedQuestionsData
            ? JSON.parse(frequentlyAskedQuestionsData)
            : defaultFrequentlyAskedQuestionsData,
          discoverNeighborhoods: discoverNeighborhoodsData
            ? JSON.parse(discoverNeighborhoodsData)
            : defaultDiscoverNeighborhoodsData,
          mumbaiHomes: mumbaiHomesData ? JSON.parse(mumbaiHomesData) : defaultMumbaiHomesData,
          projectDetails: normalizeProject(projectDetailsData ? JSON.parse(projectDetailsData) : defaultProjectDetailsData, defaultProjectDetailsData.id),
          projects: (() => {
            try {
              const parsed = projectsData ? JSON.parse(projectsData) : defaultProjectsData;
              if (!Array.isArray(parsed)) return defaultProjectsData;
              return parsed.map((p: any, idx: number) => normalizeProject(p, Date.now() + idx));
            } catch {
              return defaultProjectsData;
            }
          })(),
        });
      } catch (error) {
        console.error('Error loading website data:', error);
        setWebsiteData(defaultWebsiteData);
      }
    };

    loadData();

    // Listen for storage changes (when admin updates data)
    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events for same-tab updates
    window.addEventListener('websiteDataUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('websiteDataUpdated', handleStorageChange);
    };
  }, []);

  const updateHeroSection = (data: HeroSectionData) => {
    setWebsiteData(prev => ({ ...prev, heroSection: data }));
    localStorage.setItem('heroSectionData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateNewlyLaunched = (data: NewlyLaunchedData) => {
    setWebsiteData(prev => ({ ...prev, newlyLaunched: data }));
    localStorage.setItem('newlyLaunchedData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateTrendingProjects = (data: TrendingProjectsData) => {
    setWebsiteData(prev => ({ ...prev, trendingProjects: data }));
    localStorage.setItem('trendingProjectsData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateSpotlightProject = (data: SpotlightProjectData) => {
    setWebsiteData(prev => ({ ...prev, spotlightProject: data }));
    localStorage.setItem('spotlightProjectData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateWhyChooseUs = (data: WhyChooseUsData) => {
    setWebsiteData(prev => ({ ...prev, whyChooseUs: data }));
    localStorage.setItem('whyChooseUsData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateVirtualTour = (data: VirtualTourData) => {
    setWebsiteData(prev => ({ ...prev, virtualTour: data }));
    localStorage.setItem('virtualTourData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateBanks = (data: BanksData) => {
    setWebsiteData(prev => ({ ...prev, banks: data }));
    localStorage.setItem('banksData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateBlogsAndArticles = (data: BlogsData) => {
    setWebsiteData(prev => ({ ...prev, blogsAndArticles: data }));
    localStorage.setItem('blogsAndArticlesData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateHomesInEveryZone = (data: HomesInEveryZoneData) => {
    setWebsiteData(prev => ({ ...prev, homesInEveryZone: data }));
    localStorage.setItem('homesInEveryZoneData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateFrequentlyAskedQuestions = (data: FrequentlyAskedQuestionsData) => {
    setWebsiteData(prev => ({ ...prev, frequentlyAskedQuestions: data }));
    localStorage.setItem('frequentlyAskedQuestionsData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateDiscoverNeighborhoods = (data: DiscoverNeighborhoodsData) => {
    setWebsiteData(prev => ({ ...prev, discoverNeighborhoods: data }));
    localStorage.setItem('discoverNeighborhoodsData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateMumbaiHomes = (data: MumbaiHomesData) => {
    setWebsiteData(prev => ({ ...prev, mumbaiHomes: data }));
    localStorage.setItem('mumbaiHomesData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const updateProjectDetails = (data: ProjectDetailsData) => {
    setWebsiteData(prev => ({ ...prev, projectDetails: data }));
    localStorage.setItem('projectDetailsData', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const addProject = (partial?: Partial<ProjectDetailsData>): ProjectDetailsData => {
    const newId = Date.now();
    const newProject: ProjectDetailsData = {
      ...defaultProjectDetailsData,
      id: newId,
      projectName: partial?.projectName || `New Project ${newId}`,
      ...partial,
    };
    setWebsiteData(prev => {
      const next = { ...prev, projects: [...prev.projects, newProject] };
      localStorage.setItem('projectsData', JSON.stringify(next.projects));
      return next;
    });
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
    return newProject;
  };

  const updateProjectById = (id: number, data: ProjectDetailsData) => {
    setWebsiteData(prev => {
      const nextProjects = prev.projects.map(p => (p.id === id ? data : p));
      const next = { ...prev, projects: nextProjects };
      localStorage.setItem('projectsData', JSON.stringify(nextProjects));
      return next;
    });
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const deleteProjectById = (id: number) => {
    setWebsiteData(prev => {
      const nextProjects = prev.projects.filter(p => p.id !== id);
      const next = { ...prev, projects: nextProjects };
      localStorage.setItem('projectsData', JSON.stringify(nextProjects));
      return next;
    });
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  };

  const refreshData = () => {
    const heroData = localStorage.getItem('heroSectionData');
    const newlyLaunchedData = localStorage.getItem('newlyLaunchedData');
    const trendingProjectsData = localStorage.getItem('trendingProjectsData');
    const spotlightProjectData = localStorage.getItem('spotlightProjectData');
    const whyChooseUsData = localStorage.getItem('whyChooseUsData');
    const virtualTourData = localStorage.getItem('virtualTourData');
    const banksData = localStorage.getItem('banksData');
    const blogsAndArticlesData = localStorage.getItem('blogsAndArticlesData');
    const homesInEveryZoneData = localStorage.getItem('homesInEveryZoneData');
    const frequentlyAskedQuestionsData = localStorage.getItem('frequentlyAskedQuestionsData');
    const discoverNeighborhoodsData = localStorage.getItem('discoverNeighborhoodsData');
    const mumbaiHomesData = localStorage.getItem('mumbaiHomesData');
    const projectDetailsData = localStorage.getItem('projectDetailsData');
    const projectsData = localStorage.getItem('projectsData');

    const normalizeProject = (p: any, fallbackId: number = Date.now()) => {
      const base = { ...defaultProjectDetailsData } as any;
      const merged = { ...base, ...(p || {}) };
      merged.id = typeof merged.id === 'number' ? merged.id : fallbackId;
      merged.statusBadges = Array.isArray(merged.statusBadges) ? merged.statusBadges : [];
      merged.amenities = Array.isArray(merged.amenities) ? merged.amenities : base.amenities;
      merged.floorPlans = Array.isArray(merged.floorPlans) ? merged.floorPlans : base.floorPlans;
      merged.viewFloorplanImages = Array.isArray(merged.viewFloorplanImages) ? merged.viewFloorplanImages : [];
      merged.virtualTours = Array.isArray(merged.virtualTours) ? merged.virtualTours : base.virtualTours;
      merged.similarProjects = Array.isArray(merged.similarProjects) ? merged.similarProjects : base.similarProjects;
      merged.overview = merged.overview ? { ...base.overview, ...merged.overview } : base.overview;
      merged.locationInfo = merged.locationInfo ? { ...base.locationInfo, ...merged.locationInfo } : base.locationInfo;
      merged.brochurePdf = typeof merged.brochurePdf === 'string' ? merged.brochurePdf : "";
      merged.floorPlanCategoryImages = merged.floorPlanCategoryImages ? { ...base.floorPlanCategoryImages, ...merged.floorPlanCategoryImages } : base.floorPlanCategoryImages;
      return merged as ProjectDetailsData;
    };

    setWebsiteData({
      heroSection: heroData ? JSON.parse(heroData) : defaultHeroData,
      newlyLaunched: newlyLaunchedData ? JSON.parse(newlyLaunchedData) : defaultNewlyLaunchedData,
      trendingProjects: trendingProjectsData ? JSON.parse(trendingProjectsData) : defaultTrendingProjectsData,
      spotlightProject: spotlightProjectData ? JSON.parse(spotlightProjectData) : defaultSpotlightProjectData,
      whyChooseUs: whyChooseUsData ? JSON.parse(whyChooseUsData) : defaultWhyChooseUsData,
      virtualTour: virtualTourData ? JSON.parse(virtualTourData) : defaultVirtualTourData,
      banks: banksData ? JSON.parse(banksData) : defaultBanksData,
      blogsAndArticles: blogsAndArticlesData ? JSON.parse(blogsAndArticlesData) : defaultBlogsData,
      homesInEveryZone: homesInEveryZoneData ? JSON.parse(homesInEveryZoneData) : defaultHomesInEveryZoneData,
      frequentlyAskedQuestions: frequentlyAskedQuestionsData
        ? JSON.parse(frequentlyAskedQuestionsData)
        : defaultFrequentlyAskedQuestionsData,
      discoverNeighborhoods: discoverNeighborhoodsData
        ? JSON.parse(discoverNeighborhoodsData)
        : defaultDiscoverNeighborhoodsData,
      mumbaiHomes: mumbaiHomesData ? JSON.parse(mumbaiHomesData) : defaultMumbaiHomesData,
      projectDetails: normalizeProject(projectDetailsData ? JSON.parse(projectDetailsData) : defaultProjectDetailsData, defaultProjectDetailsData.id),
      projects: (() => {
        try {
          const parsed = projectsData ? JSON.parse(projectsData) : defaultProjectsData;
          if (!Array.isArray(parsed)) return defaultProjectsData;
          return parsed.map((p: any, idx: number) => normalizeProject(p, Date.now() + idx));
        } catch {
          return defaultProjectsData;
        }
      })(),
    });
  };

  return (
    <WebsiteDataContext.Provider
      value={{
        websiteData,
        updateHeroSection,
        updateNewlyLaunched,
        updateTrendingProjects,
        updateSpotlightProject,
        updateWhyChooseUs,
        updateVirtualTour,
        updateBanks,
        updateBlogsAndArticles,
        updateHomesInEveryZone,
        updateFrequentlyAskedQuestions,
        updateDiscoverNeighborhoods,
        updateMumbaiHomes,
        updateProjectDetails,
        addProject,
        updateProjectById,
        deleteProjectById,
        refreshData,
      }}
    >
      {children}
    </WebsiteDataContext.Provider>
  );
};

// Hook
export const useWebsiteData = (): WebsiteDataContextType => {
  const context = useContext(WebsiteDataContext);
  if (context === undefined) {
    throw new Error('useWebsiteData must be used within a WebsiteDataProvider');
  }
  return context;
};