import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Edit, Plus, Trash2 } from "lucide-react";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

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

// Utility to check if a string is a base64 image
const isBase64Image = (str: string) => str && typeof str === 'string' && str.startsWith('data:image/');

const VirtualTourAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateVirtualTour } = useWebsiteData();

  const [virtualTourData, setVirtualTourData] = useState<VirtualTourData>({
    ...websiteData.virtualTour,
    companyLogos: Array.isArray(websiteData.virtualTour.companyLogos)
      ? [...new Set(websiteData.virtualTour.companyLogos.map(logo => JSON.stringify(logo)))].map(str => JSON.parse(str))
      : [],
  });
  const [logoImages, setLogoImages] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<VirtualTour | null>(null);
  const [editingLogo, setEditingLogo] = useState<CompanyLogo & { image?: string } | null>(null);
  const [isAddingTour, setIsAddingTour] = useState(false);
  const [isAddingLogo, setIsAddingLogo] = useState(false);
  const tourImageRef = useRef<HTMLInputElement>(null);
  const logoImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('Saving virtualTourData:', virtualTourData);
    updateVirtualTour(virtualTourData);
    toast({
      title: "Success",
      description: "Changes saved automatically!",
      duration: 2000,
    });
  }, [virtualTourData, updateVirtualTour, toast]);

  const handleInputChange = (field: keyof Omit<VirtualTourData, 'tours' | 'companyLogos'>, value: string) => {
    setVirtualTourData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTourImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        if (editingTour) {
          setEditingTour(prev => prev ? { ...prev, image: imageDataUrl } : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        if (editingLogo && isBase64Image(imageDataUrl)) {
          setEditingLogo(prev => prev ? { ...prev, image: imageDataUrl, initials: imageDataUrl } : null);
          setLogoImages(prev => ({ ...prev, [editingLogo.id]: imageDataUrl }));
          console.log('Uploaded logo image for ID:', editingLogo.id, 'Image:', imageDataUrl.substring(0, 50) + '...');
        } else {
          toast({
            title: "Error",
            description: "Invalid image file",
            variant: "destructive",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTour = () => {
    const newTour: VirtualTour = {
      id: Date.now(),
      image: "",
      alt: "",
    };
    setEditingTour(newTour);
    setIsAddingTour(true);
    setIsModalOpen(true);
  };

  const handleEditTour = (tour: VirtualTour) => {
    setEditingTour({ ...tour });
    setIsAddingTour(false);
    setIsModalOpen(true);
  };

  const handleSaveTour = () => {
    if (!editingTour || !editingTour.image || !editingTour.alt) {
      toast({
        title: "Error",
        description: "Tour requires an image and alt text",
        variant: "destructive",
      });
      return;
    }

    if (isAddingTour) {
      setVirtualTourData(prev => ({
        ...prev,
        tours: [...prev.tours, editingTour],
      }));
    } else {
      setVirtualTourData(prev => ({
        ...prev,
        tours: prev.tours.map(t => t.id === editingTour.id ? editingTour : t),
      }));
    }

    setEditingTour(null);
    setIsAddingTour(false);
    setIsModalOpen(false);
    if (tourImageRef.current) tourImageRef.current.value = '';
  };

  const handleDeleteTour = (tourId: number) => {
    setVirtualTourData(prev => ({
      ...prev,
      tours: prev.tours.filter(t => t.id !== tourId),
    }));
  };

  const handleAddLogo = () => {
    const newLogo: CompanyLogo & { image?: string } = {
      id: Date.now(),
      initials: "",
      name: "",
      color: "bg-blue-600 text-white",
      textColor: "text-blue-600",
      description: "",
    };
    setEditingLogo(newLogo);
    setIsAddingLogo(true);
    setIsModalOpen(true);
  };

  const handleEditLogo = (logo: CompanyLogo) => {
    setEditingLogo({ ...logo, image: logoImages[logo.id] || logo.initials });
    setIsAddingLogo(false);
    setIsModalOpen(true);
  };

  const handleSaveLogo = () => {
    if (!editingLogo || !editingLogo.name || (!editingLogo.initials && !editingLogo.image)) {
      toast({
        title: "Error",
        description: "Logo requires a name and either an image or initials",
        variant: "destructive",
      });
      return;
    }

    const logoToSave: CompanyLogo = {
      id: editingLogo.id,
      initials: editingLogo.image && isBase64Image(editingLogo.image) ? editingLogo.image : editingLogo.initials,
      name: editingLogo.name,
      color: editingLogo.color,
      textColor: editingLogo.textColor,
      description: editingLogo.description,
      subDescription: editingLogo.subDescription,
    };

    if (isAddingLogo) {
      setVirtualTourData(prev => {
        // Prevent duplicates by checking if logo with same ID exists
        if (prev.companyLogos.some(l => l.id === logoToSave.id)) {
          console.warn('Duplicate logo ID detected:', logoToSave.id);
          return prev;
        }
        const newLogos = [...prev.companyLogos, logoToSave];
        console.log('Adding logo:', logoToSave, 'New companyLogos:', newLogos);
        return {
          ...prev,
          companyLogos: newLogos,
        };
      });
    } else {
      setVirtualTourData(prev => {
        const newLogos = prev.companyLogos.map(l => l.id === logoToSave.id ? logoToSave : l);
        console.log('Updating logo:', logoToSave, 'New companyLogos:', newLogos);
        return {
          ...prev,
          companyLogos: newLogos,
        };
      });
    }

    if (editingLogo.image && isBase64Image(editingLogo.image)) {
      setLogoImages(prev => ({ ...prev, [editingLogo.id]: editingLogo.image }));
    } else {
      setLogoImages(prev => {
        const newImages = { ...prev };
        delete newImages[editingLogo.id];
        return newImages;
      });
    }

    setEditingLogo(null);
    setIsAddingLogo(false);
    setIsModalOpen(false);
    if (logoImageRef.current) logoImageRef.current.value = '';
  };

  const handleDeleteLogo = (logoId: number) => {
    setVirtualTourData(prev => {
      const newLogos = prev.companyLogos.filter(l => l.id !== logoId);
      console.log('Deleting logo ID:', logoId, 'New companyLogos:', newLogos);
      return {
        ...prev,
        companyLogos: newLogos,
      };
    });
    setLogoImages(prev => {
      const newImages = { ...prev };
      delete newImages[logoId];
      return newImages;
    });
  };

  const colorOptions = [
    { value: "bg-blue-600 text-white", label: "Blue" },
    { value: "bg-red-600 text-white", label: "Red" },
    { value: "bg-green-600 text-white", label: "Green" },
    { value: "bg-yellow-500 text-white", label: "Yellow" },
    { value: "bg-purple-600 text-white", label: "Purple" },
    { value: "bg-indigo-600 text-white", label: "Indigo" },
    { value: "bg-pink-600 text-white", label: "Pink" },
    { value: "bg-gray-600 text-white", label: "Gray" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Virtual Tour Configuration</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Section</span>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Current Virtual Tour and Logos Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Virtual Tour Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-xl font-bold">{virtualTourData.title}</h3>
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Virtual Tours</h4>
            {virtualTourData.tours.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {virtualTourData.tours.slice(0, 4).map((tour) => (
                  <div key={tour.id} className="relative h-32 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-2">
                        <div className="w-6 h-6 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No virtual tours available.</p>
            )}
          </div>
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Company Logos</h4>
            {virtualTourData.companyLogos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {virtualTourData.companyLogos.map((logo) => (
                  <div key={logo.id} className="flex flex-col items-center space-y-1">
                    {isBase64Image(logo.initials) || (logoImages[logo.id] && isBase64Image(logoImages[logo.id])) ? (
                      <img
                        src={isBase64Image(logo.initials) ? logo.initials : logoImages[logo.id]}
                        alt={logo.name}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                    ) : (
                      <div
                        className={`${logo.color} p-3 rounded-lg w-16 h-16 flex items-center justify-center text-xl font-bold`}
                      >
                        {logo.initials || 'N/A'}
                      </div>
                    )}
                    <div className="text-center">
                      <div className={`${logo.textColor} font-bold text-sm`}>{logo.name}</div>
                      {logo.description && <div className="text-xs text-gray-600">{logo.description}</div>}
                      {logo.subDescription && <div className="text-xs text-gray-600">{logo.subDescription}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No company logos available.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Virtual Tour Section</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sectionTitle">Section Title</Label>
              <Input
                id="sectionTitle"
                value={virtualTourData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Virtual Tours</Label>
                <Button onClick={handleAddTour} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Tour</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {virtualTourData.tours.map((tour) => (
                  <div key={tour.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold">{tour.alt}</h4>
                        <img src={tour.image} alt={tour.alt} className="w-full h-32 object-cover rounded mt-2" />
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditTour(tour)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Tour</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteTour(tour.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Tour</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Company Logos</Label>
                <Button onClick={handleAddLogo} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Logo</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {virtualTourData.companyLogos.map((logo) => (
                  <div key={logo.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        {isBase64Image(logo.initials) || (logoImages[logo.id] && isBase64Image(logoImages[logo.id])) ? (
                          <img
                            src={isBase64Image(logo.initials) ? logo.initials : logoImages[logo.id]}
                            alt={logo.name}
                            className="w-16 h-16 object-contain rounded-lg mb-2"
                          />
                        ) : (
                          <div
                            className={`${logo.color} p-3 rounded-lg w-16 h-16 flex items-center justify-center text-xl font-bold mb-2`}
                          >
                            {logo.initials || 'N/A'}
                          </div>
                        )}
                        <h4 className="font-semibold">{logo.name}</h4>
                        {logo.description && <p className="text-sm text-gray-600">{logo.description}</p>}
                        {logo.subDescription && <p className="text-sm text-gray-600">{logo.subDescription}</p>}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditLogo(logo)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Logo</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteLogo(logo.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Logo</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {editingTour && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingTour ? 'Add New Tour' : 'Edit Tour'}
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tour Image</Label>
                    <div className="flex flex-col items-center space-y-4">
                      {editingTour.image ? (
                        <div className="relative">
                          <img
                            src={editingTour.image}
                            alt="Tour preview"
                            className="w-48 h-32 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => setEditingTour(prev => prev ? { ...prev, image: "" } : null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500 text-sm">No tour image</p>
                        </div>
                      )}
                      <div className="flex flex-col items-center space-y-2">
                        <input
                          ref={tourImageRef}
                          type="file"
                          accept="image/*"
                          onChange={handleTourImageUpload}
                          className="hidden"
                          id="tour-image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => tourImageRef.current?.click()}
                          className="flex items-center space-x-2"
                        >
                          <Upload className="h-4 w-4" />
                          <span>{editingTour.image ? 'Change Tour Image' : 'Upload Tour Image'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tourAlt">Tour Alt Text</Label>
                    <Input
                      id="tourAlt"
                      value={editingTour.alt}
                      onChange={(e) => setEditingTour(prev => prev ? { ...prev, alt: e.target.value } : null)}
                      placeholder="Enter tour alt text"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingTour(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTour}>
                    {isAddingTour ? 'Add Tour' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {editingLogo && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingLogo ? 'Add New Logo' : 'Edit Logo'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Logo Image</Label>
                    <div className="flex flex-col items-center space-y-4">
                      {editingLogo.image ? (
                        <div className="relative">
                          <img
                            src={editingLogo.image}
                            alt="Logo preview"
                            className="w-16 h-16 object-contain rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => setEditingLogo(prev => prev ? { ...prev, image: "", initials: "" } : null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500 text-xs">No logo image</p>
                        </div>
                      )}
                      <div className="flex flex-col items-center space-y-2">
                        <input
                          ref={logoImageRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoImageUpload}
                          className="hidden"
                          id="logo-image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => logoImageRef.current?.click()}
                          className="flex items-center space-x-2"
                        >
                          <Upload className="h-4 w-4" />
                          <span>{editingLogo.image ? 'Change Logo Image' : 'Upload Logo Image'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoInitials">Initials (Fallback if no image)</Label>
                    <Input
                      id="logoInitials"
                      value={editingLogo.initials && !isBase64Image(editingLogo.initials) ? editingLogo.initials : ""}
                      onChange={(e) => setEditingLogo(prev => prev ? { ...prev, initials: e.target.value, image: isBase64Image(prev?.initials) ? "" : prev?.image } : null)}
                      placeholder="e.g., YP"
                      disabled={isBase64Image(editingLogo.initials)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoName">Company Name</Label>
                    <Input
                      id="logoName"
                      value={editingLogo.name}
                      onChange={(e) => setEditingLogo(prev => prev ? { ...prev, name: e.target.value } : null)}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoColor">Color Theme (For initials if no image)</Label>
                    <select
                      id="logoColor"
                      value={editingLogo.color}
                      onChange={(e) => {
                        const selectedColor = e.target.value;
                        setEditingLogo(prev => prev ? {
                          ...prev,
                          color: selectedColor,
                          textColor: selectedColor.replace('bg-', 'text-').replace(' text-white', ''),
                        } : null);
                      }}
                      className="w-full p-2 border rounded-md"
                    >
                      {colorOptions.map(color => (
                        <option key={color.value} value={color.value}>{color.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoDescription">Description</Label>
                    <Input
                      id="logoDescription"
                      value={editingLogo.description}
                      onChange={(e) => setEditingLogo(prev => prev ? { ...prev, description: e.target.value } : null)}
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="logoSubDescription">Sub Description</Label>
                    <Input
                      id="logoSubDescription"
                      value={editingLogo.subDescription || ""}
                      onChange={(e) => setEditingLogo(prev => prev ? { ...prev, subDescription: e.target.value } : null)}
                      placeholder="Enter sub description (optional)"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingLogo(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveLogo}>
                    {isAddingLogo ? 'Add Logo' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VirtualTourAdmin;