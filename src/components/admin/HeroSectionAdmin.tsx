import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Edit, Save, Search, MapPin } from "lucide-react";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";
import buildingComplex from "@/assets/building-complex.png";
import exploreNowBadge from "@/assets/explore-now-badge.png";
import trainImage from "@/assets/train.png";

interface HeroSectionData {
  title: string;
  subtitle: string;
  description: string;
  searchPlaceholder: string;
  ctaText: string;
  backgroundImage: string;
}

const HeroSectionAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateHeroSection } = useWebsiteData();
  
  const [heroData, setHeroData] = useState<HeroSectionData>(websiteData.heroSection);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHeroData(websiteData.heroSection);
  }, [websiteData.heroSection]);

  const handleInputChange = (field: keyof HeroSectionData, value: string) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setHeroData(prev => ({
          ...prev,
          backgroundImage: imageDataUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setHeroData(prev => ({
      ...prev,
      backgroundImage: ""
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    updateHeroSection(heroData);
    toast({
      title: "Success",
      description: "Hero section data saved successfully!",
    });
    setIsEditing(false);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setHeroData(websiteData.heroSection);
    setIsEditing(false);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Hero Section Configuration</h3>
        <div className="space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button onClick={handleEdit} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Hero Section</span>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Current Hero Section Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-hero min-h-[400px] overflow-hidden rounded-lg">
            {/* Background wave shape */}
            <div className="absolute inset-0">
              <svg
                viewBox="0 0 1200 600"
                className="absolute bottom-0 right-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M600,300 Q800,200 1200,400 L1200,600 L0,600 L0,300 Q200,100 600,300 Z"
                  fill="url(#heroGradient)"
                  className="opacity-90"
                />
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0D6ABC" />
                    <stop offset="100%" stopColor="#1A88DD" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10 pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left content */}
                <div className="text-primary-foreground text-center lg:text-left">
                  <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight whitespace-pre-line">
                    {heroData.title}
                  </h1>
                  
                  {/* Search bar */}
                  <div className="bg-white rounded-lg p-2 mb-4 flex flex-col sm:flex-row items-center shadow-lg">
                    <Search className="text-gray-400 ml-3 h-4 w-4 mb-2 sm:mb-0" />
                    <Input
                      placeholder={heroData.searchPlaceholder}
                      className="border-0 bg-transparent focus-visible:ring-0 text-gray-700 flex-1 w-full sm:w-auto mb-2 sm:mb-0 text-sm"
                      readOnly
                    />
                    <Button className="bg-primary hover:bg-primary/90 px-4 w-full sm:w-auto text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      Search
                    </Button>
                  </div>
                  
                  <p className="text-sm mb-2 opacity-90 whitespace-pre-line">
                    {heroData.description}
                  </p>
                  
                  <p className="text-base font-semibold mb-4">
                    {heroData.subtitle}
                  </p>
                  
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-6 py-2 text-sm font-semibold">
                    {heroData.ctaText}
                  </Button>
                </div>

                {/* Right content - Uploaded image */}
                <div className="relative mt-6 lg:mt-0">
                  <img
                    src={heroData.backgroundImage || buildingComplex}
                    alt="Hero image"
                    className="w-full h-auto rounded-lg max-w-md mx-auto max-h-[400px] object-cover"
                  />
                  
                  {/* Circular badge with rotating animation */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 animate-spin-slow md:w-24 md:h-24">
                    <img
                      src={exploreNowBadge}
                      alt="Explore Now"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Train Animation */}
            <div className="absolute bottom-0 left-0 w-full h-12 overflow-hidden z-20">
              <img
                src={trainImage}
                alt="Mumbai Local Train"
                className="absolute bottom-0 h-8 w-auto animate-train-move"
                style={{ minWidth: '150px' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero Section Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Hero Section</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label>Background Image</Label>
              <div className="flex flex-col items-center space-y-4">
                {heroData.backgroundImage ? (
                  <div className="relative">
                    <img
                      src={heroData.backgroundImage}
                      alt="Background preview"
                      className="w-64 h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-64 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No background image</p>
                  </div>
                )}
                
                <div className="flex flex-col items-center space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="background-image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{heroData.backgroundImage ? 'Change Background Image' : 'Upload Background Image'}</span>
                  </Button>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Content Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Textarea
                  id="title"
                  value={heroData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter main title (use \n for line breaks)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={heroData.subtitle}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  placeholder="Enter subtitle"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={heroData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description (use \n for line breaks)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="searchPlaceholder">Search Placeholder</Label>
                <Input
                  id="searchPlaceholder"
                  value={heroData.searchPlaceholder}
                  onChange={(e) => handleInputChange('searchPlaceholder', e.target.value)}
                  placeholder="Enter search placeholder text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaText">Call-to-Action Text</Label>
                <Input
                  id="ctaText"
                  value={heroData.ctaText}
                  onChange={(e) => handleInputChange('ctaText', e.target.value)}
                  placeholder="Enter CTA button text"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSectionAdmin;