import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Edit } from "lucide-react";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";
import { MapPin, Home, SquareIcon, Link } from "lucide-react";
import spotlightBuilding from "@/assets/spotlight-building.png";

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

const SpotlightProjectAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateSpotlightProject } = useWebsiteData();
  const [spotlightData, setSpotlightData] = useState<SpotlightProjectData>(websiteData.spotlightProject);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof SpotlightProjectData, value: string) => {
    const updatedData = { ...spotlightData, [field]: value };

    // Validate required fields
    if (
      !updatedData.badge ||
      !updatedData.title ||
      !updatedData.location ||
      !updatedData.description ||
      !updatedData.projectType ||
      !updatedData.apartmentTypes ||
      !updatedData.reraArea ||
      !updatedData.reraNumber ||
      !updatedData.price ||
      !updatedData.ctaText
    ) {
      toast({
        title: "Warning",
        description: "All fields are required. Changes will not be saved until all fields are filled.",
        variant: "destructive",
      });
      setSpotlightData(updatedData);
      return;
    }

    setSpotlightData(updatedData);
    updateSpotlightProject(updatedData);
    toast({
      title: "Success",
      description: `Spotlight project ${field} updated successfully!`,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size exceeds 10MB limit.",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        const updatedData = { ...spotlightData, image: imageDataUrl };
        setSpotlightData(updatedData);
        updateSpotlightProject(updatedData);
        toast({
          title: "Success",
          description: "Project image updated successfully!",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    const updatedData = { ...spotlightData, image: "" };
    setSpotlightData(updatedData);
    updateSpotlightProject(updatedData);
    toast({
      title: "Success",
      description: "Project image removed successfully!",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setSpotlightData(websiteData.spotlightProject);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Spotlight Project</h2>
        <Button onClick={handleEdit} className="flex items-center space-x-2">
          <Edit className="h-4 w-4" />
          <span>Edit Spotlight Project</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-primary overflow-hidden w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[400px] lg:min-h-[auto] max-w-3xl mx-auto px-4">
              {/* Left content panel */}
              <div className="p-4 lg:p-6 text-white space-y-2 lg:space-y-4 relative z-10 text-center lg:text-left">
                <div className="inline-block">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 text-[0.625rem] rounded-full font-medium lg:px-4 lg:text-xs">
                    {spotlightData.badge}
                  </div>
                </div>
                <h2 className="text-xl font-bold leading-tight lg:text-2xl">
                  {spotlightData.title}
                </h2>
                <div className="flex items-center justify-center space-x-1 text-white/90 lg:justify-start">
                  <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="text-sm lg:text-base">{spotlightData.location}</span>
                </div>
                <p className="text-white/80 text-xs leading-relaxed lg:text-sm">
                  {spotlightData.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2 lg:gap-4 lg:py-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 lg:p-3">
                    <div className="flex items-center space-x-1 mb-1 lg:space-x-2 lg:mb-1">
                      <Home className="h-3 w-3 text-white lg:h-4 lg:w-4" />
                      <span className="text-[0.625rem] text-white/80 lg:text-xs">Project Type</span>
                    </div>
                    <div className="text-white font-semibold text-xs lg:text-sm">
                      {spotlightData.projectType}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 lg:p-3">
                    <div className="flex items-center space-x-1 mb-1 lg:space-x-2 lg:mb-1">
                      <Home className="h-3 w-3 text-white lg:h-4 lg:w-4" />
                      <span className="text-[0.625rem] text-white/80 lg:text-xs">Apartment Types</span>
                    </div>
                    <div className="text-white font-semibold text-xs lg:text-sm">
                      {spotlightData.apartmentTypes}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 lg:p-3">
                    <div className="flex items-center space-x-1 mb-1 lg:space-x-2 lg:mb-1">
                      <SquareIcon className="h-3 w-3 text-white lg:h-4 lg:w-4" />
                      <span className="text-[0.625rem] text-white/80 lg:text-xs">Rera Carpet Area</span>
                    </div>
                    <div className="text-white font-semibold text-xs lg:text-sm">
                      {spotlightData.reraArea}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 lg:p-3">
                    <div className="flex items-center space-x-1 mb-1 lg:space-x-2 lg:mb-1">
                      <Link className="h-3 w-3 text-white lg:h-4 lg:w-4" />
                      <span className="text-[0.625rem] text-white/80 lg:text-xs">Maharera Registration no.</span>
                    </div>
                    <div className="text-white font-semibold text-xs lg:text-sm">
                      {spotlightData.reraNumber}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between pt-2 lg:pt-4 space-y-2 sm:space-y-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white text-primary hover:bg-white/90 px-4 py-1 text-sm font-semibold lg:px-6 lg:py-2 lg:text-base"
                  >
                    {spotlightData.ctaText}
                  </Button>
                  <div className="bg-primary-border rounded-full w-16 h-16 flex flex-col items-center justify-center text-white border-2 border-primary-border sm:w-20 sm:h-20">
                    <div className="text-[0.625rem] opacity-90 lg:text-xs">Starting At</div>
                    <div className="text-sm font-bold lg:text-base">{spotlightData.price}</div>
                  </div>
                </div>
              </div>
              {/* Right image panel */}
              <div className="relative h-[200px] lg:h-full w-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[50%] lg:max-w-[350px] mt-4 lg:mt-0">
                <div className="relative h-full min-h-[auto] lg:min-h-[450px]">
                  <img
                    src={spotlightData.image || spotlightBuilding}
                    alt={spotlightData.title}
                    className="w-full h-full object-cover rounded-none lg:rounded-r-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-primary/20 rounded-none lg:rounded-r-xl" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Spotlight Project</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label>Project Image</Label>
              <div className="flex flex-col items-center space-y-4">
                {spotlightData.image ? (
                  <div className="relative">
                    <img
                      src={spotlightData.image}
                      alt="Project preview"
                      className="w-64 h-48 object-cover rounded-lg border"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-64 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-gray-500">No project image</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="spotlight-image-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>{spotlightData.image ? "Change Project Image" : "Upload Project Image"}</span>
                </Button>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="badge">Badge Text</Label>
                  <Input
                    id="badge"
                    value={spotlightData.badge}
                    onChange={(e) => handleInputChange("badge", e.target.value)}
                    placeholder="e.g., Spotlight Project"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={spotlightData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter project title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={spotlightData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={spotlightData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter project description"
                    rows={4}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Input
                    id="projectType"
                    value={spotlightData.projectType}
                    onChange={(e) => handleInputChange("projectType", e.target.value)}
                    placeholder="e.g., Residential"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apartmentTypes">Apartment Types</Label>
                  <Input
                    id="apartmentTypes"
                    value={spotlightData.apartmentTypes}
                    onChange={(e) => handleInputChange("apartmentTypes", e.target.value)}
                    placeholder="e.g., 1,2 BHK Apartments"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reraArea">RERA Carpet Area</Label>
                  <Input
                    id="reraArea"
                    value={spotlightData.reraArea}
                    onChange={(e) => handleInputChange("reraArea", e.target.value)}
                    placeholder="e.g., 379.00sq.ft - 758.00 sq.ft"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reraNumber">RERA Registration Number</Label>
                  <Input
                    id="reraNumber"
                    value={spotlightData.reraNumber}
                    onChange={(e) => handleInputChange("reraNumber", e.target.value)}
                    placeholder="Enter RERA number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Starting Price</Label>
                  <Input
                    id="price"
                    value={spotlightData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="e.g., ₹1.48 Cr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaText">Call-to-Action Text</Label>
                  <Input
                    id="ctaText"
                    value={spotlightData.ctaText}
                    onChange={(e) => handleInputChange("ctaText", e.target.value)}
                    placeholder="e.g., View more"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SpotlightProjectAdmin;