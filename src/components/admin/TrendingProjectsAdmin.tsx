import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Upload, X } from "lucide-react";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

interface Project {
  id: number;
  name: string;
  location: string;
  price: string;
  beds: string;
  type: string;
  image: string;
}

interface TrendingProjectsData {
  title: string;
  description: string;
  locations: string[];
  projects: Project[];
}

const TrendingProjectsAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateTrendingProjects } = useWebsiteData();
  
  const [trendingData, setTrendingData] = useState<TrendingProjectsData>(websiteData.trendingProjects);

  useEffect(() => {
    setTrendingData(websiteData.trendingProjects);
  }, [websiteData.trendingProjects]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<{[key: number]: string}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSectionDataChange = (field: keyof Omit<TrendingProjectsData, 'projects' | 'locations'>, value: string) => {
    setTrendingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddLocation = () => {
    if (newLocation.trim()) {
      setTrendingData(prev => ({
        ...prev,
        locations: [...prev.locations, newLocation.trim()]
      }));
      setNewLocation("");
    }
  };

  const handleRemoveLocation = (location: string) => {
    setTrendingData(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l !== location)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        if (editingProject) {
          setEditingProject(prev => prev ? {...prev, image: imageDataUrl} : null);
        }
        if (editingProject?.id) {
          setUploadedImages(prev => ({
            ...prev,
            [editingProject.id]: imageDataUrl
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    if (editingProject) {
      setEditingProject(prev => prev ? {...prev, image: ""} : null);
      if (editingProject.id) {
        setUploadedImages(prev => {
          const newImages = {...prev};
          delete newImages[editingProject.id];
          return newImages;
        });
      }
    }
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now(),
      name: "",
      location: "",
      price: "",
      beds: "",
      type: "",
      image: "",
    };
    setEditingProject(newProject);
    setIsAddingNew(true);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project });
    setIsAddingNew(false);
    setIsModalOpen(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    if (isAddingNew) {
      setTrendingData(prev => ({
        ...prev,
        projects: [...prev.projects, editingProject]
      }));
    } else {
      setTrendingData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === editingProject.id ? editingProject : p)
      }));
    }

    setEditingProject(null);
    setIsAddingNew(false);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setIsAddingNew(false);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteProject = (projectId: number) => {
    setTrendingData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  };

  const handleSave = () => {
    updateTrendingProjects(trendingData);
    toast({
      title: "Success",
      description: "Trending projects section data saved successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Trending Projects Management</h3>
        <div className="space-x-2">
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>

      <Separator />

      {/* Section Header Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Section Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Section Title</Label>
            <Input
              id="sectionTitle"
              value={trendingData.title}
              onChange={(e) => handleSectionDataChange('title', e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sectionDescription">Section Description</Label>
            <Textarea
              id="sectionDescription"
              value={trendingData.description}
              onChange={(e) => handleSectionDataChange('description', e.target.value)}
              placeholder="Enter section description (use \n for line breaks)"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Locations Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Location Tabs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Add new location"
              onKeyPress={(e) => e.key === 'Enter' && handleAddLocation()}
            />
            <Button onClick={handleAddLocation}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingData.locations.map((location, index) => (
              <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
                <span className="text-sm">{location}</span>
                <button
                  onClick={() => handleRemoveLocation(location)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Projects</CardTitle>
            <Button onClick={handleAddProject} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingData.projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.location} • {project.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span> {project.type}
                  </div>
                  <div>
                    <span className="font-medium">Beds:</span> {project.beds}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? 'Add New Project' : 'Edit Project'}
            </DialogTitle>
          </DialogHeader>
          
          {editingProject && (
            <div className="space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <Label>Project Image</Label>
                <div className="flex flex-col items-center space-y-4">
                  {editingProject.image ? (
                    <div className="relative">
                      <img
                        src={editingProject.image}
                        alt="Project preview"
                        className="w-48 h-32 object-cover rounded-lg border"
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
                    <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 text-sm">No image selected</p>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>{editingProject.image ? 'Change Image' : 'Upload Image'}</span>
                    </Button>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Project Details Form */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={editingProject.name}
                    onChange={(e) => setEditingProject(prev => prev ? {...prev, name: e.target.value} : null)}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectLocation">Location</Label>
                  <Input
                    id="projectLocation"
                    value={editingProject.location}
                    onChange={(e) => setEditingProject(prev => prev ? {...prev, location: e.target.value} : null)}
                    placeholder="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectPrice">Price</Label>
                  <Input
                    id="projectPrice"
                    value={editingProject.price}
                    onChange={(e) => setEditingProject(prev => prev ? {...prev, price: e.target.value} : null)}
                    placeholder="e.g., ₹1.48 Cr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectBeds">Beds</Label>
                  <Input
                    id="projectBeds"
                    value={editingProject.beds}
                    onChange={(e) => setEditingProject(prev => prev ? {...prev, beds: e.target.value} : null)}
                    placeholder="e.g., 1 bhk, 2 bhk"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="projectType">Type</Label>
                  <Input
                    id="projectType"
                    value={editingProject.type}
                    onChange={(e) => setEditingProject(prev => prev ? {...prev, type: e.target.value} : null)}
                    placeholder="e.g., Residential"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProject}>
                  {isAddingNew ? 'Add Project' : 'Save Changes'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrendingProjectsAdmin;
