import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Save, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";
import type { ProjectDetailsData } from "@/contexts/WebsiteDataContext";

interface Amenity { icon: string; name: string }

interface FloorPlanItem {
  type: '1BHK' | '2BHK' | '3BHK' | 'TYPICAL' | 'BROCHURE';
  area: string;
  price: string;               // <-- required by the context
}

interface VirtualTourItem { id: number; image: string; alt: string }
interface SimilarProjectItem { id: number; name: string; type: string; location: string; price: string; image: string }

interface ProjectDetailsAdminProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** When provided, select this project when the dialog opens */
  initialProjectId?: number;
}

const ProjectDetailsAdmin = (props?: ProjectDetailsAdminProps) => {
  const { open: openProp, onOpenChange, initialProjectId } = props || {};
  const { websiteData, updateProjectDetails, addProject, updateProjectById, deleteProjectById } = useWebsiteData();
  // controlled/uncontrolled open
  const [openLocal, setOpenLocal] = useState(false);
  const open = typeof openProp === 'boolean' ? openProp : openLocal;
  const setOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v);
    else setOpenLocal(v);
  };
  const { toast } = useToast();

  const safeProjects = Array.isArray(websiteData.projects) ? websiteData.projects : [];
  const initialSelected = safeProjects[0]?.id ?? websiteData.projectDetails?.id ?? Date.now();
  const [selectedId, setSelectedId] = useState<number>(initialSelected);

  // -------------------------------------------------------------
  // Migrate old floor-plans (strip the old `price` field)
  // -------------------------------------------------------------
  const migrateFloorPlans = (plans: any[]): FloorPlanItem[] => {
    return plans.map(p => ({
      type: (p.type as FloorPlanItem['type']) || '1BHK',
      area: p.area || '000 Sq. Ft.',
      price: p.price ?? ''                     // keep the field (empty string)
    }));
  };

  const currentProject = safeProjects.find(p => p.id === selectedId) || websiteData.projectDetails;
  const [data, setData] = useState<ProjectDetailsData>({
    ...currentProject,
    floorPlans: migrateFloorPlans(currentProject.floorPlans || [])
  });

  // Sync data when websiteData or selectedId changes
  useEffect(() => {
    const proj = safeProjects.find(p => p.id === selectedId) || websiteData.projectDetails;
    setData({
      ...proj,
      heroImages: Array.isArray(proj.heroImages) ? proj.heroImages : [],
      floorPlans: migrateFloorPlans(proj.floorPlans || [])
    });
  }, [websiteData, selectedId]);

  // If opened programmatically with an initialProjectId, select that project
  useEffect(() => {
    if (initialProjectId && open) {
      const proj = safeProjects.find(p => p.id === initialProjectId);
      if (proj) {
        setSelectedId(initialProjectId);
        setData({
          ...proj,
          heroImages: Array.isArray(proj.heroImages) ? proj.heroImages : [],
          floorPlans: migrateFloorPlans(proj.floorPlans || [])
        });
      }
    }
  }, [initialProjectId, open, safeProjects]);

  // Refs
  const heroRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLInputElement>(null);
  const aerialRef = useRef<HTMLInputElement>(null);
  const viewFloorplanInputRef = useRef<HTMLInputElement>(null);
  const brochureInputRef = useRef<HTMLInputElement>(null);
  const oneBhkRef = useRef<HTMLInputElement>(null);
  const twoBhkRef = useRef<HTMLInputElement>(null);
  const threeBhkRef = useRef<HTMLInputElement>(null);
  const typicalRef = useRef<HTMLInputElement>(null);
  const brochureImgRef = useRef<HTMLInputElement>(null);

  const handleBasicChange = (field: keyof ProjectDetailsData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'heroImage' | 'mainImage' | 'aerialImage') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please upload an image file", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      const url = ev.target?.result as string;
      setData(prev => ({ ...prev, [target]: url }));
    };
    reader.readAsDataURL(file);
  };

  // ---------- Amenities ----------
  const addAmenity = () => {
    setData(prev => ({ ...prev, amenities: [...prev.amenities, { icon: "Icon", name: "New Amenity" }] }));
  };
  const updateAmenity = (idx: number, field: keyof Amenity, value: string) => {
    setData(prev => {
      const next = [...prev.amenities];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, amenities: next };
    });
  };
  const removeAmenity = (idx: number) => {
    setData(prev => ({ ...prev, amenities: prev.amenities.filter((_, i) => i !== idx) }));
  };

  // ---------- Floor Plans ----------
  const addFloor = () => {
    setData(prev => ({
      ...prev,
      floorPlans: [...prev.floorPlans, { type: "1BHK", area: "000 Sq. Ft.", price: "" }]
    }));
  };
  const updateFloor = (idx: number, field: keyof FloorPlanItem, value: string) => {
    setData(prev => {
      const next = [...prev.floorPlans];
      next[idx] = { ...next[idx], [field]: value } as FloorPlanItem;
      return { ...prev, floorPlans: next };
    });
  };
  const removeFloor = (idx: number) => {
    setData(prev => ({ ...prev, floorPlans: prev.floorPlans.filter((_, i) => i !== idx) }));
  };

  // ---------- Virtual Tours ----------
  const addTour = () => {
    setData(prev => ({ ...prev, virtualTours: [...prev.virtualTours, { id: Date.now(), image: "", alt: "" }] }));
  };
  const updateTour = (idx: number, field: keyof VirtualTourItem, value: string) => {
    setData(prev => {
      const next = [...prev.virtualTours];
      next[idx] = { ...next[idx], [field]: field === 'id' ? Number(value) : value } as any;
      return { ...prev, virtualTours: next };
    });
  };
  const removeTour = (idx: number) => {
    setData(prev => ({ ...prev, virtualTours: prev.virtualTours.filter((_, i) => i !== idx) }));
  };
  const handleTourFile = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast({ title: "Error", description: "Please upload an image or video", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      const url = ev.target?.result as string;
      updateTour(idx, 'image', url);
    };
    reader.readAsDataURL(file);
  };

  // ---------- Similar Projects ----------
  const addSimilar = () => {
    setData(prev => ({
      ...prev,
      similarProjects: [...prev.similarProjects, { id: Date.now(), name: "Project", type: "", location: "", price: "", image: "" }]
    }));
  };
  const updateSimilar = (idx: number, field: keyof SimilarProjectItem, value: string) => {
    setData(prev => {
      const next = [...prev.similarProjects];
      next[idx] = { ...next[idx], [field]: field === 'id' ? Number(value) : value } as any;
      return { ...prev, similarProjects: next };
    });
  };
  const removeSimilar = (idx: number) => {
    setData(prev => ({ ...prev, similarProjects: prev.similarProjects.filter((_, i) => i !== idx) }));
  };
  const handleSimilarImageFile = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please upload an image file", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      const url = ev.target?.result as string;
      updateSimilar(idx, 'image', url);
    };
    reader.readAsDataURL(file);
  };

  // ---------- View Floorplan Gallery ----------
  const addViewFloorplanFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const readers: Promise<string>[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!f.type.startsWith("image/")) continue;
      readers.push(new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = ev => resolve((ev.target?.result as string) || "");
        reader.readAsDataURL(f);
      }));
    }
    Promise.all(readers).then(urls => {
      setData(prev => ({ ...prev, viewFloorplanImages: [...prev.viewFloorplanImages, ...urls.filter(Boolean)] }));
    });
  };
  const removeViewFloorplanImage = (idx: number) => {
    setData(prev => ({ ...prev, viewFloorplanImages: prev.viewFloorplanImages.filter((_, i) => i !== idx) }));
  };

  // ---------- Category Image Upload ----------
  const handleCategoryImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof NonNullable<ProjectDetailsData['floorPlanCategoryImages']>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: "Error", description: "Please upload an image file", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      const url = ev.target?.result as string;
      setData(prev => ({
        ...prev,
        floorPlanCategoryImages: {
          ...(prev.floorPlanCategoryImages ?? {}),
          [key]: url
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  // ---------- Save & Reset ----------
  const handleSave = () => {
    if (!data.projectName || !data.priceRange || !data.locationText) {
      toast({ title: "Error", description: "Project name, price range and location are required", variant: "destructive" });
      return;
    }
    if (websiteData.projects.some(p => p.id === data.id)) {
      updateProjectById(data.id, data);
    } else {
      updateProjectDetails(data);
    }
    toast({ title: "Saved", description: "Project details updated" });
    setOpen(false);

    [heroRef, mainRef, aerialRef, viewFloorplanInputRef, brochureInputRef,
      oneBhkRef, twoBhkRef, threeBhkRef, typicalRef, brochureImgRef].forEach(r => {
      if (r.current) r.current.value = "";
    });
  };

  const reset = () => {
    const refreshed = websiteData.projects.find(p => p.id === selectedId) || websiteData.projectDetails;
    setData({
      ...refreshed,
      floorPlans: migrateFloorPlans(refreshed.floorPlans || [])
    });
    setOpen(false);
  };

  const handleSelectProject = (id: number) => {
    setSelectedId(id);
    const proj = safeProjects.find(p => p.id === id) || websiteData.projectDetails;
    setData({
      ...proj,
      floorPlans: migrateFloorPlans(proj.floorPlans || [])
    });
  };

  const handleCreateProject = () => {
    const created = addProject();
    setSelectedId(created.id);
    setData({
      ...created,
      floorPlans: migrateFloorPlans(created.floorPlans || [])
    });
    setOpen(true);
    toast({ title: "Project created", description: `${created.projectName}` });
  };

  const handleDeleteProject = (id: number) => {
    deleteProjectById(id);
    toast({ title: "Deleted", description: `Project ${id} removed` });
    const remaining = safeProjects.filter(p => p.id !== id);
    if (remaining.length === 0) {
      setSelectedId(websiteData.projectDetails.id);
      setData(websiteData.projectDetails);
    } else {
      setSelectedId(remaining[0].id);
      setData(remaining[0]);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Details Configuration</h3>
        <Button onClick={() => setOpen(true)} className="flex items-center space-x-2">
          <Edit className="h-4 w-4" />
          <span>Edit Project Details</span>
        </Button>
      </div>
      <Separator />

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <span>Projects</span>
            <Button variant="outline" size="sm" onClick={handleCreateProject}>
              <Plus className="h-4 w-4 mr-1" />New Project
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {websiteData.projects.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-sm text-gray-600 flex items-center justify-between p-3 rounded border border-gray-200">
                <span>No projects found. Create your first project.</span>
                <Button variant="default" size="sm" onClick={handleCreateProject}>
                  <Plus className="h-4 w-4 mr-1" />Create
                </Button>
              </div>
            )}
            {websiteData.projects.map(p => (
              <div
                key={p.id}
                className={`flex items-center justify-between p-3 rounded border ${
                  p.id === selectedId ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="min-w-0">
                  <div className="font-medium truncate">{p.projectName}</div>
                  <div className="text-xs text-gray-600 truncate">{p.locationText}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { handleSelectProject(p.id); setOpen(true); }}
                  >
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDeleteProject(p.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Project Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold">{data.projectName}</h4>
              <div className="flex flex-wrap gap-2">
                {data.statusBadges.map((b, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm">{data.priceRange}</div>
            <div className="text-sm text-gray-600">{data.locationText}</div>
            <div className="text-sm mt-2 line-clamp-3">{data.aboutText}</div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Project Details</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8">

            {/* ----------------- BASIC INFO ----------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" value={data.projectName} onChange={e => handleBasicChange('projectName', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardType">Card Type</Label>
                <Input id="cardType" value={data.cardType || ''} onChange={e => handleBasicChange('cardType', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price Range</Label>
                <Input id="price" value={data.priceRange} onChange={e => handleBasicChange('priceRange', e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="locText">Location Text</Label>
                <Input id="locText" value={data.locationText} onChange={e => handleBasicChange('locationText', e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="about">About Project</Label>
                <Textarea id="about" rows={3} value={data.aboutText} onChange={e => handleBasicChange('aboutText', e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="dev">Developer Name</Label>
                <Input id="dev" value={data.developerName} onChange={e => handleBasicChange('developerName', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="builder">Builder</Label>
                <Input id="builder" value={data.builder || ''} onChange={e => handleBasicChange('builder', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input id="status" value={data.status || ''} onChange={e => handleBasicChange('status', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rera">RERA Approved</Label>
                <select
                  id="rera"
                  className="w-full p-2 border rounded-md"
                  value={String(data.reraApproved ?? true)}
                  onChange={e => handleBasicChange('reraApproved', e.target.value === 'true')}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            {/* Status Badges */}
            <div className="space-y-2">
              <Label>Status Badges</Label>
              <div className="flex flex-wrap gap-2">
                {data.statusBadges.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={b}
                      onChange={e => {
                        const next = [...data.statusBadges];
                        next[i] = e.target.value;
                        handleBasicChange('statusBadges', next);
                      }}
                      className="w-44"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleBasicChange('statusBadges', data.statusBadges.filter((_, idx) => idx !== i))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBasicChange('statusBadges', [...data.statusBadges, "Badge"])}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Badge
                </Button>
              </div>
            </div>

            <Separator />

            {/* Main Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Hero Image', key: 'heroImage', ref: heroRef },
                { label: 'Main Image', key: 'mainImage', ref: mainRef },
                { label: 'About Project image', key: 'aerialImage', ref: aerialRef }
              ].map(cfg => (
                <div key={cfg.key} className="space-y-2">
                  <Label>{cfg.label}</Label>
                  {data[cfg.key as keyof ProjectDetailsData] ? (
                    <div className="relative">
                      <img
                        src={data[cfg.key as keyof ProjectDetailsData] as string}
                        alt={cfg.label}
                        className="w-full h-40 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => handleBasicChange(cfg.key as keyof ProjectDetailsData, "")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full h-40 border-2 border-dashed rounded flex items-center justify-center text-sm text-gray-500">
                      No image
                    </div>
                  )}
                  <input
                    ref={cfg.ref as any}
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageUpload(e, cfg.key as any)}
                    className="hidden"
                    id={`${cfg.key}-upload`}
                  />
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => (cfg.ref as any).current?.click()}
                  >
                    <Upload className="h-4 w-4" /> Upload {cfg.label}
                  </Button>
                </div>
              ))}
            </div>

            <Separator />

            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Project Type</Label>
                <Input
                  value={data.overview.projectType}
                  onChange={e => setData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, projectType: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Units</Label>
                <Input
                  value={data.overview.units}
                  onChange={e => setData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, units: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Area</Label>
                <Input
                  value={data.overview.area}
                  onChange={e => setData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, area: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>RERA No.</Label>
                <Input
                  value={data.overview.reraNumber}
                  onChange={e => setData(prev => ({
                    ...prev,
                    overview: { ...prev.overview, reraNumber: e.target.value }
                  }))}
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Amenities</Label>
                <Button onClick={addAmenity} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" /><span>Add Amenity</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.amenities.map((a, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <Input
                      value={a.icon}
                      onChange={e => updateAmenity(idx, 'icon', e.target.value)}
                      className="w-20"
                    />
                    <Input
                      value={a.name}
                      onChange={e => updateAmenity(idx, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={() => removeAmenity(idx)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* ----------------- FLOOR PLANS (DROPDOWN + AREA) ----------------- */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Floor Plans</Label>
                <Button onClick={addFloor} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" /><span>Add Floor</span>
                </Button>
              </div>
              <div className="space-y-2">
                {data.floorPlans.map((f, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-gray-50 p-2 rounded items-center">
                    {/* Type Dropdown */}
                    <select
                      className="w-full p-2 border rounded-md"
                      value={f.type}
                      onChange={e => updateFloor(idx, 'type', e.target.value as any)}
                    >
                      <option value="1BHK">1 BHK</option>
                      <option value="2BHK">2 BHK</option>
                      <option value="3BHK">3 BHK</option>
                      <option value="TYPICAL">Typical Floor Plan</option>
                      <option value="BROCHURE">Brochure Floor Plan</option>
                    </select>

                    {/* Area Input */}
                    <Input
                      value={f.area}
                      onChange={e => updateFloor(idx, 'area', e.target.value)}
                      placeholder="Area (e.g. 850 Sq. Ft.)"
                    />

                    {/* Delete */}
                    <div className="flex items-center justify-end">
                      <Button variant="outline" size="icon" onClick={() => removeFloor(idx)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View Floorplan Gallery + Category Images + Brochure */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <Label>View Floorplan Gallery</Label>
                  <input
                    ref={viewFloorplanInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={addViewFloorplanFiles}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => viewFloorplanInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" /> Upload Images
                  </Button>
                </div>

                {/* Category Images */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 w-full">
                  {([
                    { key: 'oneBhk' as const, label: '1 BHK Image', ref: oneBhkRef },
                    { key: 'twoBhk' as const, label: '2 BHK Image', ref: twoBhkRef },
                    { key: 'threeBhk' as const, label: '3 BHK Image', ref: threeBhkRef },
                    { key: 'typical' as const, label: 'Typical Image', ref: typicalRef },
                    { key: 'brochure' as const, label: 'Brochure Image', ref: brochureImgRef },
                  ]).map(cfg => (
                    <div key={cfg.key} className="space-y-2">
                      <Label>{cfg.label}</Label>
                      {data.floorPlanCategoryImages?.[cfg.key] ? (
                        <div className="relative">
                          <img
                            src={data.floorPlanCategoryImages[cfg.key] as string}
                            alt={cfg.label}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={() => setData(prev => ({
                              ...prev,
                              floorPlanCategoryImages: { ...prev.floorPlanCategoryImages, [cfg.key]: '' }
                            }))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-full h-24 border-2 border-dashed rounded flex items-center justify-center text-xs text-gray-500">
                          No image
                        </div>
                      )}
                      <input
                        ref={cfg.ref}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={`fpc-${cfg.key}`}
                        onChange={e => handleCategoryImageUpload(e, cfg.key)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => cfg.ref.current?.click()}
                      >
                        Upload
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Brochure PDF */}
                <div className="flex items-center gap-3">
                  <Label>Project Brochure (PDF)</Label>
                  <input
                    ref={brochureInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.type !== 'application/pdf') return;
                      const reader = new FileReader();
                      reader.onload = ev => {
                        const url = ev.target?.result as string;
                        setData(prev => ({ ...prev, brochurePdf: url }));
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => brochureInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" /> Upload Brochure
                  </Button>
                  {data.brochurePdf && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setData(prev => ({ ...prev, brochurePdf: "" }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Gallery Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {data.viewFloorplanImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt={`floorplan-${idx}`}
                      className="w-full h-28 object-cover rounded border"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => removeViewFloorplanImage(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {data.viewFloorplanImages.length === 0 && (
                  <div className="col-span-2 md:col-span-4 text-sm text-gray-500">
                    No images uploaded
                  </div>
                )}
              </div>
            </div>

            {/* Virtual Tours */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Virtual Tours</Label>
                <Button onClick={addTour} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" /><span>Add Tour</span>
                </Button>
              </div>
              <div className="space-y-2">
                {data.virtualTours.map((t, idx) => (
                  <div key={t.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-2">
                      {t.image ? (
                        t.image.startsWith('data:video') ? (
                          <video className="w-24 h-16 rounded border object-cover" src={t.image} />
                        ) : (
                          <img
                            className="w-24 h-16 rounded border object-cover"
                            src={t.image}
                            alt={t.alt || 'tour'}
                          />
                        )
                      ) : (
                        <div className="w-24 h-16 border-2 border-dashed rounded flex items-center justify-center text-xs text-gray-500">
                          No media
                        </div>
                      )}
                      <input
                        id={`tour-file-${idx}`}
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={e => handleTourFile(e, idx)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => document.getElementById(`tour-file-${idx}`)?.click()}
                      >
                        <Upload className="h-4 w-4" /> Upload
                      </Button>
                    </div>
                    <Input
                      value={t.alt}
                      onChange={e => updateTour(idx, 'alt', e.target.value)}
                      placeholder="Alt text"
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateTour(idx, 'image', '')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeTour(idx)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={data.locationInfo.location}
                  onChange={e => setData(prev => ({
                    ...prev,
                    locationInfo: { ...prev.locationInfo, location: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Zone</Label>
                <Input
                  value={data.locationInfo.zone}
                  onChange={e => setData(prev => ({
                    ...prev,
                    locationInfo: { ...prev.locationInfo, zone: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Pincode</Label>
                <Input
                  value={data.locationInfo.pincode}
                  onChange={e => setData(prev => ({
                    ...prev,
                    locationInfo: { ...prev.locationInfo, pincode: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Google Maps Embed URL</Label>
                <Input
                  value={data.locationInfo.mapEmbedUrl}
                  onChange={e => setData(prev => ({
                    ...prev,
                    locationInfo: { ...prev.locationInfo, mapEmbedUrl: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Maps Button Text</Label>
                <Input
                  value={data.locationInfo.mapsCtaText}
                  onChange={e => setData(prev => ({
                    ...prev,
                    locationInfo: { ...prev.locationInfo, mapsCtaText: e.target.value }
                  }))}
                />
              </div>
            </div>

            {/* Similar Projects */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Similar Projects</Label>
                <Button onClick={addSimilar} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" /><span>Add Project</span>
                </Button>
              </div>
              <div className="space-y-2">
                {data.similarProjects.map((sp, idx) => (
                  <div key={sp.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 bg-gray-50 p-2 rounded">
                    <Input value={sp.name} onChange={e => updateSimilar(idx, 'name', e.target.value)} placeholder="Name" />
                    <Input value={sp.type} onChange={e => updateSimilar(idx, 'type', e.target.value)} placeholder="Type" />
                    <Input value={sp.location} onChange={e => updateSimilar(idx, 'location', e.target.value)} placeholder="Location" />
                    <Input value={sp.price} onChange={e => updateSimilar(idx, 'price', e.target.value)} placeholder="Price" />
                    <div className="flex items-center gap-2">
                      {sp.image ? (
                        <img className="w-20 h-14 rounded border object-cover" src={sp.image} alt={sp.name} />
                      ) : (
                        <div className="w-20 h-14 border-2 border-dashed rounded flex items-center justify-center text-xs text-gray-500">
                          No image
                        </div>
                      )}
                      <div>
                        <input
                          id={`sp-file-${idx}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => handleSimilarImageFile(e, idx)}
                        />
                        <Label htmlFor={`sp-file-${idx}`} className="cursor-pointer">
                          <Button type="button" variant="outline" className="flex items-center gap-2">
                            <Upload className="h-4 w-4" /> Upload
                          </Button>
                        </Label>
                      </div>
                      <Button variant="outline" size="icon" onClick={() => updateSimilar(idx, 'image', '')}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => removeSimilar(idx)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save / Cancel */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={reset}>Cancel</Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetailsAdmin;