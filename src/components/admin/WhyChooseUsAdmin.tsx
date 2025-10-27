import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Edit, Plus, Trash2, Zap, Users, Shield, ThumbsUp, MapPin } from "lucide-react";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";
import modernBuilding from "@/assets/modern-building.png";
import handshakeImage from "@/assets/handshake.png";

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

const WhyChooseUsAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateWhyChooseUs } = useWebsiteData();
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData>(websiteData.whyChooseUs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<WhyChooseUsFeature | null>(null);
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const buildingImageRef = useRef<HTMLInputElement>(null);
  const handshakeImageRef = useRef<HTMLInputElement>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return Zap;
      case "Users": return Users;
      case "Shield": return Shield;
      case "ThumbsUp": return ThumbsUp;
      case "MapPin": return MapPin;
      default: return Zap;
    }
  };

  const validateData = (data: WhyChooseUsData) => {
    if (!data.title) {
      return "Section title is required.";
    }
    if (data.features.length < 4) {
      return "At least 4 features are required.";
    }
    for (const feature of data.features) {
      if (!feature.title || !feature.description) {
        return "All features must have a title and description.";
      }
    }
    return null;
  };

  const handleInputChange = (field: keyof Omit<WhyChooseUsData, 'features'>, value: string) => {
    const updatedData = { ...whyChooseUsData, [field]: value };
    const error = validateData(updatedData);
    if (error) {
      toast({
        title: "Warning",
        description: error,
        variant: "destructive",
      });
      setWhyChooseUsData(updatedData);
      return;
    }

    setWhyChooseUsData(updatedData);
    updateWhyChooseUs(updatedData);
    toast({
      title: "Success",
      description: `Section ${field} updated successfully!`,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'building' | 'handshake') => {
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
        const updatedData = {
          ...whyChooseUsData,
          [type === 'building' ? 'buildingImage' : 'handshakeImage']: imageDataUrl,
        };
        setWhyChooseUsData(updatedData);
        updateWhyChooseUs(updatedData);
        toast({
          title: "Success",
          description: `${type === 'building' ? 'Building' : 'Handshake'} image updated successfully!`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (type: 'building' | 'handshake') => {
    const updatedData = {
      ...whyChooseUsData,
      [type === 'building' ? 'buildingImage' : 'handshakeImage']: "",
    };
    setWhyChooseUsData(updatedData);
    updateWhyChooseUs(updatedData);
    toast({
      title: "Success",
      description: `${type === 'building' ? 'Building' : 'Handshake'} image removed successfully!`,
    });
    if (type === 'building' && buildingImageRef.current) {
      buildingImageRef.current.value = "";
    } else if (type === 'handshake' && handshakeImageRef.current) {
      handshakeImageRef.current.value = "";
    }
  };

  const handleAddFeature = () => {
    const newFeature: WhyChooseUsFeature = {
      id: Date.now(),
      icon: "Zap",
      title: "",
      description: "",
    };
    setEditingFeature(newFeature);
    setIsAddingFeature(true);
    setIsModalOpen(true);
  };

  const handleEditFeature = (feature: WhyChooseUsFeature) => {
    setEditingFeature({ ...feature });
    setIsAddingFeature(false);
    setIsModalOpen(true);
  };

  const handleSaveFeature = () => {
    if (!editingFeature) return;

    const updatedFeatures = isAddingFeature
      ? [...whyChooseUsData.features, editingFeature]
      : whyChooseUsData.features.map((f) => (f.id === editingFeature.id ? editingFeature : f));

    const updatedData = { ...whyChooseUsData, features: updatedFeatures };
    const error = validateData(updatedData);
    if (error) {
      toast({
        title: "Warning",
        description: error,
        variant: "destructive",
      });
      setWhyChooseUsData(updatedData);
      return;
    }

    setWhyChooseUsData(updatedData);
    updateWhyChooseUs(updatedData);
    toast({
      title: "Success",
      description: isAddingFeature ? "Feature added successfully!" : "Feature updated successfully!",
    });

    setEditingFeature(null);
    setIsAddingFeature(false);
    setIsModalOpen(false);
  };

  const handleDeleteFeature = (featureId: number) => {
    const updatedFeatures = whyChooseUsData.features.filter((f) => f.id !== featureId);
    const updatedData = { ...whyChooseUsData, features: updatedFeatures };
    const error = validateData(updatedData);
    if (error) {
      toast({
        title: "Warning",
        description: error,
        variant: "destructive",
      });
      setWhyChooseUsData(updatedData);
      return;
    }

    setWhyChooseUsData(updatedData);
    updateWhyChooseUs(updatedData);
    toast({
      title: "Success",
      description: "Feature deleted successfully!",
    });
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setWhyChooseUsData(websiteData.whyChooseUs);
    setIsModalOpen(false);
    setEditingFeature(null);
    setIsAddingFeature(false);
    if (buildingImageRef.current) buildingImageRef.current.value = "";
    if (handshakeImageRef.current) handshakeImageRef.current.value = "";
  };

  const iconOptions = ["Zap", "Users", "Shield", "ThumbsUp", "MapPin"];

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Why Choose Us Section</h2>
        <Button onClick={handleEdit} className="flex items-center space-x-2">
          <Edit className="h-4 w-4" />
          <span>Edit Why Choose Us</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="py-6 bg-primary">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-4">
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  {whyChooseUsData.title}
                </h2>
              </div>
              <div className="max-w-3xl mx-auto">
                {/* First Row - 3 columns */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {/* Top Left Card */}
                  <div
                    className="bg-white p-4"
                    style={{
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      borderBottomLeftRadius: "50px",
                      borderBottomRightRadius: "10px",
                      height: "100px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    {whyChooseUsData.features.slice(0, 2).map((feature) => {
                      const IconComponent = getIcon(feature.icon);
                      return (
                        <div key={feature.id} className="flex items-start space-x-2 mb-2">
                          <IconComponent className="h-5 w-5 text-gray-800 flex-shrink-0" />
                          <h3 className="text-xs font-bold text-gray-800 leading-tight">
                            {feature.title} - {feature.description}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                  {/* Top Center - Building Image */}
                  <div className="flex justify-end">
                    <div
                      className="overflow-hidden"
                      style={{
                        borderRadius: "10px",
                        height: "100px",
                        width: "120px",
                      }}
                    >
                      <img
                        src={whyChooseUsData.buildingImage || modernBuilding}
                        alt="Modern building complex"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "right" }}
                      />
                    </div>
                  </div>
                  {/* Top Right Card */}
                  <div
                    className="bg-white p-4 flex items-center"
                    style={{
                      borderRadius: "12px",
                      height: "100px",
                    }}
                  >
                    {whyChooseUsData.features.slice(2, 3).map((feature) => {
                      const IconComponent = getIcon(feature.icon);
                      return (
                        <div key={feature.id} className="flex items-start space-x-2">
                          <IconComponent className="h-5 w-5 text-gray-800 flex-shrink-0" />
                          <h3 className="text-xs font-bold text-gray-800 leading-tight">
                            {feature.title} - {feature.description}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Second Row - Bottom Handshake + Card */}
                <div className="flex gap-2">
                  {/* Bottom Left - Handshake Image */}
                  <div
                    className="overflow-hidden"
                    style={{
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "75px",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                      height: "100px",
                      width: "302px",
                    }}
                  >
                    <img
                      src={whyChooseUsData.handshakeImage || handshakeImage}
                      alt="Professional handshake deal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Bottom Right Card */}
                  <div className="flex-1">
                    <div
                      className="bg-white p-4 flex flex-col justify-center"
                      style={{
                        borderRadius: "12px",
                        height: "100px",
                      }}
                    >
                      {whyChooseUsData.features.slice(3).map((feature) => {
                        const IconComponent = getIcon(feature.icon);
                        return (
                          <div key={feature.id} className="flex items-start space-x-2 mb-2">
                            <IconComponent className="h-5 w-5 text-gray-800 flex-shrink-0" />
                            <h3 className="text-xs font-bold text-gray-800 leading-tight">
                              {feature.title} – {feature.description}
                            </h3>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
              <span>Edit Why Choose Us Section</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Section Title */}
            <div className="space-y-2">
              <Label htmlFor="sectionTitle">Section Title</Label>
              <Input
                id="sectionTitle"
                value={whyChooseUsData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>

            {/* Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Building Image */}
              <div className="space-y-4">
                <Label>Building Image</Label>
                <div className="flex flex-col items-center space-y-4">
                  {whyChooseUsData.buildingImage ? (
                    <div className="relative">
                      <img
                        src={whyChooseUsData.buildingImage}
                        alt="Building preview"
                        className="w-48 h-32 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => handleRemoveImage('building')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-500">No building image</span>
                    </div>
                  )}
                  <input
                    ref={buildingImageRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'building')}
                    className="hidden"
                    id="building-image-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => buildingImageRef.current?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{whyChooseUsData.buildingImage ? 'Change Building Image' : 'Upload Building Image'}</span>
                  </Button>
                </div>
              </div>
              {/* Handshake Image */}
              <div className="space-y-4">
                <Label>Handshake Image</Label>
                <div className="flex flex-col items-center space-y-4">
                  {whyChooseUsData.handshakeImage ? (
                    <div className="relative">
                      <img
                        src={whyChooseUsData.handshakeImage}
                        alt="Handshake preview"
                        className="w-48 h-32 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => handleRemoveImage('handshake')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-500">No handshake image</span>
                    </div>
                  )}
                  <input
                    ref={handshakeImageRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'handshake')}
                    className="hidden"
                    id="handshake-image-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handshakeImageRef.current?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{whyChooseUsData.handshakeImage ? 'Change Handshake Image' : 'Upload Handshake Image'}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Features Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Features</Label>
                <Button onClick={handleAddFeature} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Feature</span>
                </Button>
              </div>
              <div className="space-y-4">
                {whyChooseUsData.features.map((feature) => (
                  <div key={feature.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditFeature(feature)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteFeature(feature.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Edit Section */}
            {editingFeature && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingFeature ? 'Add New Feature' : 'Edit Feature'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="featureIcon">Icon</Label>
                    <select
                      id="featureIcon"
                      value={editingFeature.icon}
                      onChange={(e) => setEditingFeature(prev => prev ? { ...prev, icon: e.target.value } : null)}
                      className="w-full p-2 border rounded-md"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="featureTitle">Title</Label>
                    <Input
                      id="featureTitle"
                      value={editingFeature.title}
                      onChange={(e) => setEditingFeature(prev => prev ? { ...prev, title: e.target.value } : null)}
                      placeholder="Enter feature title"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="featureDescription">Description</Label>
                    <Textarea
                      id="featureDescription"
                      value={editingFeature.description}
                      onChange={(e) => setEditingFeature(prev => prev ? { ...prev, description: e.target.value } : null)}
                      placeholder="Enter feature description"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingFeature(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveFeature}>
                    {isAddingFeature ? 'Add Feature' : 'Save Feature'}
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t">
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

export default WhyChooseUsAdmin;