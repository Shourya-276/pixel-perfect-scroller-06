import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface NewlyLaunchedData {
  title: string;
  description: string;
  projects: Project[];
}

const NewlyLaunchedAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateNewlyLaunched } = useWebsiteData();
  const [newlyLaunchedData, setNewlyLaunchedData] = useState<NewlyLaunchedData>(
    websiteData.newlyLaunched
  );
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSectionDataChange = (
    field: keyof Omit<NewlyLaunchedData, "projects">,
    value: string
  ) => {
    const updatedData = { ...newlyLaunchedData, [field]: value };
    setNewlyLaunchedData(updatedData);
    updateNewlyLaunched(updatedData);
    toast({
      title: "Success",
      description: `Section ${field} updated successfully!`,
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
        setEditingProject((prev) => (prev ? { ...prev, image: imageDataUrl } : null));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setEditingProject((prev) => (prev ? { ...prev, image: "" } : null));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddProject = () => {
    setEditingProject({
      id: Date.now(),
      name: "",
      location: "",
      price: "",
      beds: "",
      type: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    if (
      !editingProject.name ||
      !editingProject.location ||
      !editingProject.price ||
      !editingProject.beds ||
      !editingProject.type ||
      !editingProject.image
    ) {
      toast({
        title: "Error",
        description: "All fields are required, including an image.",
        variant: "destructive",
      });
      return;
    }

    const isNewProject = !newlyLaunchedData.projects.some(
      (p) => p.id === editingProject.id
    );
    const updatedProjects = isNewProject
      ? [...newlyLaunchedData.projects, editingProject]
      : newlyLaunchedData.projects.map((p) =>
          p.id === editingProject.id ? editingProject : p
        );

    const updatedData = { ...newlyLaunchedData, projects: updatedProjects };
    setNewlyLaunchedData(updatedData);
    updateNewlyLaunched(updatedData);

    setEditingProject(null);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast({
      title: "Success",
      description: isNewProject ? "Project added successfully!" : "Project updated successfully!",
    });
  };

  const handleDeleteProject = (projectId: number) => {
    const updatedProjects = newlyLaunchedData.projects.filter(
      (p) => p.id !== projectId
    );
    const updatedData = { ...newlyLaunchedData, projects: updatedProjects };
    setNewlyLaunchedData(updatedData);
    updateNewlyLaunched(updatedData);
    toast({
      title: "Success",
      description: "Project deleted successfully!",
    });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">Manage Newly Launched Section</h2>

      <Card>
        <CardHeader>
          <CardTitle>Section Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Title</Label>
            <Input
              id="sectionTitle"
              value={newlyLaunchedData.title}
              onChange={(e) => handleSectionDataChange("title", e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sectionDescription">Description</Label>
            <Textarea
              id="sectionDescription"
              value={newlyLaunchedData.description}
              onChange={(e) => handleSectionDataChange("description", e.target.value)}
              placeholder="Enter section description (use \n for line breaks)"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Projects</CardTitle>
            <Button onClick={handleAddProject} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newlyLaunchedData.projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h4 className="font-semibold">{project.name}</h4>
                  <p className="text-sm text-gray-600">
                    {project.location} • {project.price} • {project.beds} • {project.type}
                  </p>
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
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProject?.id && newlyLaunchedData.projects.some(p => p.id === editingProject.id)
                ? "Edit Project"
                : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          {editingProject && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Project Image</Label>
                <div className="flex flex-col items-center space-y-2">
                  {editingProject.image ? (
                    <div className="relative">
                      <img
                        src={editingProject.image}
                        alt="Project preview"
                        className="w-48 h-32 object-cover rounded-lg border"
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
                    <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-500">No image</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{editingProject.image ? "Change Image" : "Upload Image"}</span>
                  </Button>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Name</Label>
                  <Input
                    id="projectName"
                    value={editingProject.name}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, name: e.target.value })
                    }
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectLocation">Location</Label>
                  <Input
                    id="projectLocation"
                    value={editingProject.location}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, location: e.target.value })
                    }
                    placeholder="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectPrice">Price</Label>
                  <Input
                    id="projectPrice"
                    value={editingProject.price}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, price: e.target.value })
                    }
                    placeholder="e.g., ₹1.5 Cr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectBeds">Beds</Label>
                  <Input
                    id="projectBeds"
                    value={editingProject.beds}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, beds: e.target.value })
                    }
                    placeholder="e.g., 1 BHK, 2 BHK"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="projectType">Type</Label>
                  <Input
                    id="projectType"
                    value={editingProject.type}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, type: e.target.value })
                    }
                    placeholder="e.g., Residential"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProject}>
                  {editingProject.id && newlyLaunchedData.projects.some(p => p.id === editingProject.id)
                    ? "Save Changes"
                    : "Add Project"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewlyLaunchedAdmin;