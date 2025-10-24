import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Edit, Save, Plus, Trash2 } from "lucide-react";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

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

const HomesInEveryZoneAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateHomesInEveryZone } = useWebsiteData();
  
  const [homesInEveryZoneData, setHomesInEveryZoneData] = useState<HomesInEveryZoneData>(websiteData.homesInEveryZone);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [isAddingZone, setIsAddingZone] = useState(false);
  const zoneImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHomesInEveryZoneData(websiteData.homesInEveryZone);
  }, [websiteData.homesInEveryZone]);

  const handleInputChange = (field: keyof Omit<HomesInEveryZoneData, 'zones'>, value: string) => {
    setHomesInEveryZoneData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleZoneImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        if (editingZone) {
          setEditingZone(prev => prev ? {...prev, image: imageDataUrl} : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddZone = () => {
    const newZone: Zone = {
      id: Date.now(),
      name: "",
      projects: "",
      image: ""
    };
    setEditingZone(newZone);
    setIsAddingZone(true);
    setIsModalOpen(true);
  };

  const handleEditZone = (zone: Zone) => {
    setEditingZone({ ...zone });
    setIsAddingZone(false);
    setIsModalOpen(true);
  };

  const handleSaveZone = () => {
    if (!editingZone) return;

    if (isAddingZone) {
      setHomesInEveryZoneData(prev => ({
        ...prev,
        zones: [...prev.zones, editingZone]
      }));
    } else {
      setHomesInEveryZoneData(prev => ({
        ...prev,
        zones: prev.zones.map(z => z.id === editingZone.id ? editingZone : z)
      }));
    }

    setEditingZone(null);
    setIsAddingZone(false);
    setIsModalOpen(false);
    if (zoneImageRef.current) zoneImageRef.current.value = '';
  };

  const handleDeleteZone = (zoneId: number) => {
    setHomesInEveryZoneData(prev => ({
      ...prev,
      zones: prev.zones.filter(z => z.id !== zoneId)
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    updateHomesInEveryZone(homesInEveryZoneData);
    toast({
      title: "Success",
      description: "Homes in Every Zone section data saved successfully!",
    });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setHomesInEveryZoneData(websiteData.homesInEveryZone);
    setIsEditing(false);
    setIsModalOpen(false);
    setEditingZone(null);
    setIsAddingZone(false);
    if (zoneImageRef.current) zoneImageRef.current.value = '';
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Homes in Every Zone Configuration</h3>
        <div className="space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button onClick={handleEdit} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Homes in Every Zone</span>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Current Zones Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Homes in Every Zone Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">{homesInEveryZoneData.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {homesInEveryZoneData.zones.map((zone) => (
                <div key={zone.id} className="relative bg-white overflow-hidden group cursor-pointer h-48 rounded-lg">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                    <h4 className="text-xl font-bold mb-2">{zone.name}</h4>
                    <p className="text-sm">{zone.projects}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zones Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Homes in Every Zone Section</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Section Title */}
            <div className="space-y-2">
              <Label htmlFor="sectionTitle">Section Title</Label>
              <Input
                id="sectionTitle"
                value={homesInEveryZoneData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>

            {/* Zones Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Zones</Label>
                <Button onClick={handleAddZone} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Zone</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {homesInEveryZoneData.zones.map((zone) => (
                  <div key={zone.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold">{zone.name}</h4>
                        <p className="text-sm text-gray-600">{zone.projects}</p>
                        <img src={zone.image} alt={zone.name} className="w-full h-24 object-cover rounded mt-2" />
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditZone(zone)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteZone(zone.id)}
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

            {/* Zone Edit Form */}
            {editingZone && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingZone ? 'Add New Zone' : 'Edit Zone'}
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zoneName">Zone Name</Label>
                      <Input
                        id="zoneName"
                        value={editingZone.name}
                        onChange={(e) => setEditingZone(prev => prev ? {...prev, name: e.target.value} : null)}
                        placeholder="Enter zone name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zoneProjects">Projects Count</Label>
                      <Input
                        id="zoneProjects"
                        value={editingZone.projects}
                        onChange={(e) => setEditingZone(prev => prev ? {...prev, projects: e.target.value} : null)}
                        placeholder="e.g., 700 Projects"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Zone Image</Label>
                    <div className="flex flex-col items-center space-y-4">
                      {editingZone.image ? (
                        <div className="relative">
                          <img
                            src={editingZone.image}
                            alt="Zone preview"
                            className="w-48 h-32 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => setEditingZone(prev => prev ? {...prev, image: ""} : null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500 text-sm">No zone image</p>
                        </div>
                      )}
                      
                      <div className="flex flex-col items-center space-y-2">
                        <input
                          ref={zoneImageRef}
                          type="file"
                          accept="image/*"
                          onChange={handleZoneImageUpload}
                          className="hidden"
                          id="zone-image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => zoneImageRef.current?.click()}
                          className="flex items-center space-x-2"
                        >
                          <Upload className="h-4 w-4" />
                          <span>{editingZone.image ? 'Change Zone Image' : 'Upload Zone Image'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingZone(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveZone}>
                    {isAddingZone ? 'Add Zone' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

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

export default HomesInEveryZoneAdmin;
