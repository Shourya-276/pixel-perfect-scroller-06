/*  src/components/PostProjectModal.tsx  */
import { useState, useRef, useEffect } from "react";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Upload,
  X,
  Trash2,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import type { ProjectDetailsData } from "@/contexts/WebsiteDataContext";

/* ------------------------------------------------------------------ */
/* Helper types                                                       */
/* ------------------------------------------------------------------ */
interface Amenity { icon: string; name: string }
interface FloorPlanItem {
  type: "1BHK" | "2BHK" | "3BHK" | "TYPICAL" | "BROCHURE";
  area: string;
  price: string;
}
interface VirtualTourItem { id: number; image: string; alt: string }
interface SimilarProjectItem {
  id: number;
  name: string;
  type: string;
  location: string;
  price: string;
  image: string;
}

/* ------------------------------------------------------------------ */
/* Props                                                              */
/* ------------------------------------------------------------------ */
interface PostProjectModalProps {
  trigger?: React.ReactNode;
  projectId?: number;
  container?: HTMLElement;
}

/* ------------------------------------------------------------------ */
/* Main Component                                                     */
/* ------------------------------------------------------------------ */
const PostProjectModal = ({ trigger, projectId: initialId, container }: PostProjectModalProps) => {
  const { toast } = useToast();
  const { addProject, updateProjectById, websiteData } = useWebsiteData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState<number | null>(initialId ?? null);
  const [data, setData] = useState<ProjectDetailsData | null>(null);

  // keep refs at top to avoid conditional hooks when component returns early
  const heroRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLInputElement>(null);
  const aerialRef = useRef<HTMLInputElement>(null);
  const viewFloorRef = useRef<HTMLInputElement>(null);
  const brochureRef = useRef<HTMLInputElement>(null);

  /* --------------------------------------------------------------- */
  /* Single effect: create, edit, reset                              */
  /* --------------------------------------------------------------- */
  // Create/load project when dialog opens. We purposely avoid re-running
  // this effect when websiteData.projects changes to prevent overwriting
  // the local `data` state while the user is editing the form.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!open) {
      if (!initialId) {
        setProjectId(null);
        setData(null);
      }
      return;
    }

    if (initialId) {
      const proj = websiteData.projects.find(p => p.id === initialId);
      if (proj) {
        setProjectId(initialId);
        setData(proj);
      } else {
        toast({ title: "Error", description: "Project not found", variant: "destructive" });
        setOpen(false);
      }
      return;
    }

    // No initialId: create project only once per dialog open (when projectId is null).
    if (projectId == null) {
      const created = addProject();
      setProjectId(created.id);
      setData(created);
    } else {
      // If we already have a projectId (e.g. reopened dialog), populate data from websiteData if needed
      const proj = websiteData.projects.find(p => p.id === projectId);
      if (proj && !data) setData(proj);
    }
  }, [open, initialId, projectId, data]);

  /* --------------------------------------------------------------- */
  /* Default Trigger                                                 */
  /* --------------------------------------------------------------- */
  const DefaultTrigger = () => (
    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
      Post Project
    </Button>
  );

  /* --------------------------------------------------------------- */
  /* Loading State                                                   */
  /* --------------------------------------------------------------- */
  if (!data) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger ?? <DefaultTrigger />}</DialogTrigger>
        <DialogContent container={container}>
          <div className="py-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-sm text-gray-600">Loading project...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  /* --------------------------------------------------------------- */
  /* Generic Change Handler                                          */
  /* --------------------------------------------------------------- */
  const change = <K extends keyof ProjectDetailsData>(
    field: K,
    value: ProjectDetailsData[K]
  ) => {
    setData(prev => (prev ? { ...prev, [field]: value } : null));
  };

  /* --------------------------------------------------------------- */
  /* Image Compression (Hero)                                        */
  /* --------------------------------------------------------------- */
  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;
          const TARGET = 1920, MIN = 800;
          let w = img.width, h = img.height;
          const ratio = w / h;

          if (w < MIN || h < MIN) {
            if (ratio > 1) { w = MIN; h = MIN / ratio; }
            else { h = MIN; w = MIN * ratio; }
          }
          if (w > TARGET || h > TARGET) {
            if (ratio > 1) { w = TARGET; h = TARGET / ratio; }
            else { h = TARGET; w = TARGET * ratio; }
          }
          canvas.width = w; canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const addHeroImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const current = (data.heroImages ?? []).length;
    if (current + files.length > 5) {
      toast({ title: "Too many", description: "Max 5 hero images", variant: "destructive" });
      return;
    }

    const compressed: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!f.type.startsWith("image/")) continue;
      compressed.push(await compressImage(f));
    }
    if (!compressed.length) return;

    setData(prev => {
      const next = [...(prev?.heroImages ?? []), ...compressed];
      const primary = prev?.heroImage ?? next[0];
      return prev ? { ...prev, heroImages: next, heroImage: primary } : null;
    });
    toast({ title: "Uploaded", description: `${compressed.length} image(s) added` });
  };

  const removeHero = (idx: number) => {
    setData(prev => {
      const next = (prev?.heroImages ?? []).filter((_, i) => i !== idx);
      const primary = prev?.heroImage && next.includes(prev.heroImage) ? prev.heroImage : next[0] ?? "";
      return prev ? { ...prev, heroImages: next, heroImage: primary } : null;
    });
  };

  /* --------------------------------------------------------------- */
  /* Single Image Upload (main/aerial)                               */
  /* --------------------------------------------------------------- */
  const uploadSingle = (e: React.ChangeEvent<HTMLInputElement>, field: "mainImage" | "aerialImage") => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = ev => change(field, ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  /* --------------------------------------------------------------- */
  /* Amenities                                                       */
  /* --------------------------------------------------------------- */
  const addAmenity = () => change("amenities", [...(data.amenities ?? []), { icon: "Icon", name: "New Amenity" }]);
  const updateAmenity = (i: number, f: keyof Amenity, v: string) => {
    const next = [...(data.amenities ?? [])];
    next[i] = { ...next[i], [f]: v };
    change("amenities", next);
  };
  const deleteAmenity = (i: number) => change("amenities", (data.amenities ?? []).filter((_, idx) => idx !== i));

  /* --------------------------------------------------------------- */
  /* Floor Plans                                                     */
  /* --------------------------------------------------------------- */
  const addFloor = () => change("floorPlans", [...(data.floorPlans ?? []), { type: "1BHK", area: "", price: "" }]);
  const updateFloor = (i: number, f: keyof FloorPlanItem, v: string) => {
    const next = [...(data.floorPlans ?? [])];
    next[i] = { ...next[i], [f]: v } as FloorPlanItem;
    change("floorPlans", next);
  };
  const deleteFloor = (i: number) => change("floorPlans", (data.floorPlans ?? []).filter((_, idx) => idx !== i));

  /* --------------------------------------------------------------- */
  /* Virtual Tours                                                   */
  /* --------------------------------------------------------------- */
  const addTour = () => change("virtualTours", [...(data.virtualTours ?? []), { id: Date.now(), image: "", alt: "" }]);
  const updateTour = (i: number, f: keyof VirtualTourItem, v: string) => {
    const next = [...(data.virtualTours ?? [])];
    next[i] = { ...next[i], [f]: f === "id" ? Number(v) : v } as any;
    change("virtualTours", next);
  };
  const deleteTour = (i: number) => change("virtualTours", (data.virtualTours ?? []).filter((_, idx) => idx !== i));
  const uploadTour = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => updateTour(i, "image", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  /* --------------------------------------------------------------- */
  /* Similar Projects                                                */
  /* --------------------------------------------------------------- */
  const addSimilar = () => change("similarProjects", [...(data.similarProjects ?? []), { id: Date.now(), name: "", type: "", location: "", price: "", image: "" }]);
  const updateSimilar = (i: number, f: keyof SimilarProjectItem, v: string) => {
    const next = [...(data.similarProjects ?? [])];
    next[i] = { ...next[i], [f]: f === "id" ? Number(v) : v } as any;
    change("similarProjects", next);
  };
  const deleteSimilar = (i: number) => change("similarProjects", (data.similarProjects ?? []).filter((_, idx) => idx !== i));
  const uploadSimilar = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = ev => updateSimilar(i, "image", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  /* --------------------------------------------------------------- */
  /* View Floorplan Gallery                                          */
  /* --------------------------------------------------------------- */
  const addViewFloor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const promises = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .map(f => new Promise<string>(res => {
        const r = new FileReader();
        r.onload = ev => res(ev.target?.result as string);
        r.readAsDataURL(f);
      }));
    Promise.all(promises).then(urls => change("viewFloorplanImages", [...(data.viewFloorplanImages ?? []), ...urls]));
  };
  const deleteViewFloor = (i: number) => change("viewFloorplanImages", (data.viewFloorplanImages ?? []).filter((_, idx) => idx !== i));

  /* --------------------------------------------------------------- */
  /* Category Images (1BHK, 2BHK, etc.)                              */
  /* --------------------------------------------------------------- */
  const uploadCategory = (e: React.ChangeEvent<HTMLInputElement>, key: keyof NonNullable<ProjectDetailsData["floorPlanCategoryImages"]>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = ev => change("floorPlanCategoryImages", {
      ...(data.floorPlanCategoryImages ?? {}),
      [key]: ev.target?.result as string
    });
    reader.readAsDataURL(file);
  };

  /* --------------------------------------------------------------- */
  /* Brochure PDF                                                    */
  /* --------------------------------------------------------------- */
  const uploadBrochure = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.includes("pdf")) return;
    const reader = new FileReader();
    reader.onload = ev => change("brochurePdf", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  /* --------------------------------------------------------------- */
  /* Save                                                            */
  /* --------------------------------------------------------------- */
  const save = () => {
    if (!data?.projectName || !data?.priceRange || !data?.locationText) {
      toast({ title: "Missing fields", description: "Name, price range and location are required", variant: "destructive" });
      return;
    }
    try {
      // derive numeric price bounds (in crores) from free-text priceRange where possible
      const parsePriceToCrores = (text: string) => {
        if (!text) return { min: 0, max: 0 };
        // normalize
        const t = text.replace(/,/g, '').replace(/₹/g, '').trim();
        // find all numbers with optional decimal
        const nums = Array.from(t.matchAll(/(\d+(?:\.\d+)?)(?:\s*(Cr|cr|CR|crore|Crore|Lakhs|Lakh|Lakh?s|L|l|K))?/g)).map(m => ({ n: parseFloat(m[1]), u: m[2] }));
        if (nums.length === 0) {
          return { min: 0, max: 0 };
        }
        // helper to convert to crores
        const toCr = (numObj: any) => {
          const u = (numObj.u || '').toLowerCase();
          if (u.startsWith('cr') || u.includes('crore')) return numObj.n;
          if (u.startsWith('l') || u.includes('lakh') || u.includes('lakhs')) return numObj.n / 100; // 100 lakhs = 1 crore
          if (u === 'k') return numObj.n / 100000; // thousands -> crore
          // if no unit, try heuristic: numbers > 100 are likely in sq.ft or rupees; treat <100 as lakhs? fallback: if >100 assume rupees -> convert to crores
          if (!u) {
            if (numObj.n >= 100) return numObj.n / 10000000; // rupees raw -> crores
            return numObj.n / 100; // assume lakhs -> crores
          }
          return numObj.n;
        };
        const crores = nums.map(n => toCr(n));
        if (crores.length === 1) return { min: crores[0], max: crores[0] };
        return { min: Math.min(...crores), max: Math.max(...crores) };
      };

      const priceBounds = parsePriceToCrores(data.priceRange || "");
      const safe = { ...data, heroImages: Array.isArray(data.heroImages) ? data.heroImages : [], priceMinCrore: priceBounds.min, priceMaxCrore: priceBounds.max };
      updateProjectById(projectId!, safe as ProjectDetailsData);
      toast({ title: "Saved", description: "Project saved successfully" });
      setOpen(false);
      // After saving, navigate to All Projects so the user can see the saved project
      navigate('/all-projects');
    } catch (error) {
      console.error('Failed to save project:', error);
      toast({ 
        title: "Save failed", 
        description: "Please try again or use smaller images.",
        variant: "destructive" 
      });
    }
  };

  /* --------------------------------------------------------------- */
  /* Render                                                          */
  /* --------------------------------------------------------------- */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <DefaultTrigger />}
      </DialogTrigger>

      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto" container={container}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{projectId ? "Edit Project" : "Post New Project"}</span>
            <Button onClick={save}>
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">

          {/* ---------- BASIC INFO ---------- */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Name *</Label>
              <Input value={data.projectName} onChange={e => change("projectName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Price Range *</Label>
              <Input value={data.priceRange} onChange={e => change("priceRange", e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Location Text *</Label>
              <Input value={data.locationText} onChange={e => change("locationText", e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>About Project</Label>
              <Textarea rows={3} value={data.aboutText} onChange={e => change("aboutText", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Developer Name</Label>
              <Input value={data.developerName} onChange={e => change("developerName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Builder</Label>
              <Input value={data.builder ?? ""} onChange={e => change("builder", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>RERA Approved</Label>
              <Select value={String(data.reraApproved ?? true)} onValueChange={v => change("reraApproved", v === "true")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <Separator />

          {/* ---------- STATUS BADGES ---------- */}
          <section className="space-y-2">
            <Label>Status Badges</Label>
            <div className="flex flex-wrap gap-2">
              {data.statusBadges.map((b, i) => (
                <div key={i} className="flex items-center gap-1">
                  <Select value={b} onValueChange={v => {
                    const next = [...data.statusBadges];
                    next[i] = v;
                    change("statusBadges", next);
                  }}>
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ongoing">Ongoing</SelectItem>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => change("statusBadges", data.statusBadges.filter((_, idx) => idx !== i))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => change("statusBadges", [...data.statusBadges, "Ongoing"])}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </section>

          <Separator />

          {/* ---------- HERO CAROUSEL ---------- */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Hero Images (max 5)</Label>
              <input ref={heroRef} type="file" accept="image/*" multiple className="hidden" onChange={addHeroImages} />
              <Button variant="outline" onClick={() => heroRef.current?.click()}>
                <Upload className="h-4 w-4 mr-1" /> Upload
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(data.heroImages ?? []).map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} alt={`hero-${i}`} className="w-full h-28 object-cover rounded border" />
                  {i === 0 && <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded">Primary</div>}
                  <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => removeHero(i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* ---------- SINGLE IMAGES (main / aerial) ---------- */}
          <section className="grid md:grid-cols-2 gap-6">
            {[
                { label: "Main Image", field: "mainImage" as const, ref: mainRef },
                { label: "Aerial Image", field: "aerialImage" as const, ref: aerialRef },
            ].map(({ label, field, ref }) => (
              <div key={field} className="space-y-2">
                <Label>{label}</Label>
                {data[field] ? (
                  <div className="relative">
                    <img src={data[field] as string} alt={label} className="w-full h-40 object-cover rounded border" />
                    <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => change(field, "")}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="h-40 border-2 border-dashed rounded flex items-center justify-center text-sm text-gray-500">No image</div>
                )}
                <input ref={ref} type="file" accept="image/*" className="hidden"
                  onChange={e => uploadSingle(e, field)} />
                <Button variant="outline" onClick={() => ref.current?.click()}>
                  <Upload className="h-4 w-4 mr-1" /> Upload
                </Button>
              </div>
            ))}
          </section>

          <Separator />

          {/* ---------- OVERVIEW ---------- */}
          <section className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Project Type</Label>
                <Select value={data.overview?.projectType ?? ""} onValueChange={v => setData(prev => prev ? ({ ...prev, overview: { ...prev.overview, projectType: v } }) : null)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential Apartment">Residential Apartment</SelectItem>
                    <SelectItem value="Independent House/Villa">Independent House/Villa</SelectItem>
                    <SelectItem value="Independent/Builder Floor">Independent/Builder Floor</SelectItem>
                    <SelectItem value="1RK/Studio Apartment">1RK/Studio Apartment</SelectItem>
                    <SelectItem value="Residential Land">Residential Land</SelectItem>
                    <SelectItem value="Farm House">Farm House</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Units (e.g. 1BHK, 2BHK)</Label>
                <Input value={data.overview?.units ?? ""} onChange={e => setData(prev => prev ? ({ ...prev, overview: { ...prev.overview, units: e.target.value } }) : null)} />
              </div>
              <div className="space-y-2">
                <Label>Area (sq.ft.)</Label>
                <Input value={data.overview?.area ?? ""} onChange={e => setData(prev => prev ? ({ ...prev, overview: { ...prev.overview, area: e.target.value } }) : null)} />
              </div>
              <div className="space-y-2">
                <Label>RERA Number</Label>
                <Input value={data.overview?.reraNumber ?? ""} onChange={e => setData(prev => prev ? ({ ...prev, overview: { ...prev.overview, reraNumber: e.target.value } }) : null)} />
              </div>
          </section>

          <Separator />

          {/* ---------- AMENITIES ---------- */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Amenities</Label>
              <Button variant="outline" size="sm" onClick={addAmenity}><Plus className="h-4 w-4 mr-1" /> Add</Button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {(data.amenities ?? []).map((a, i) => (
                <div key={i} className="flex gap-2 bg-gray-50 p-2 rounded">
                  <Input className="w-20" value={a.icon} onChange={e => updateAmenity(i, "icon", e.target.value)} />
                  <Input className="flex-1" value={a.name} onChange={e => updateAmenity(i, "name", e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => deleteAmenity(i)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* ---------- FLOOR PLANS ---------- */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Floor Plans</Label>
              <Button variant="outline" size="sm" onClick={addFloor}><Plus className="h-4 w-4 mr-1" /> Add</Button>
            </div>
            {(data.floorPlans ?? []).map((f, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-2 bg-gray-50 p-2 rounded items-center">
                <Select value={f.type} onValueChange={v => updateFloor(i, "type", v as any)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1BHK">1 BHK</SelectItem>
                    <SelectItem value="2BHK">2 BHK</SelectItem>
                    <SelectItem value="3BHK">3 BHK</SelectItem>
                    <SelectItem value="TYPICAL">Typical</SelectItem>
                    <SelectItem value="BROCHURE">Brochure</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Area" value={f.area} onChange={e => updateFloor(i, "area", e.target.value)} />
                <Input placeholder="Price" value={f.price} onChange={e => updateFloor(i, "price", e.target.value)} />
                <Button variant="ghost" size="icon" onClick={() => deleteFloor(i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </section>

          <Separator />

          {/* ---------- VIEW FLOORPLAN + CATEGORY + BROCHURE ---------- */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>View Floorplan Gallery</Label>
              <input ref={viewFloorRef} type="file" accept="image/*" multiple className="hidden" onChange={addViewFloor} />
              <Button variant="outline" onClick={() => viewFloorRef.current?.click()}><Upload className="h-4 w-4 mr-1" /> Upload</Button>
            </div>

            <div className="grid md:grid-cols-5 gap-3">
              {(["oneBhk", "twoBhk", "threeBhk", "typical", "brochure"] as const).map(k => (
                <div key={k} className="space-y-2">
                  <Label>{k.replace(/([A-Z])/g, " $1")} Image</Label>
                  {data.floorPlanCategoryImages?.[k] ? (
                    <div className="relative">
                      <img src={data.floorPlanCategoryImages[k] as string} alt={k} className="w-full h-24 object-cover rounded border" />
                      <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => change("floorPlanCategoryImages", { ...data.floorPlanCategoryImages, [k]: "" })}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="h-24 border-2 border-dashed rounded flex items-center justify-center text-xs text-gray-500">No image</div>
                  )}
                  <input type="file" accept="image/*" className="hidden"
                    onChange={e => uploadCategory(e, k)} />
                  <Button variant="outline" className="w-full"
                    onClick={() => (document.querySelector(`input[onChange*="${k}"]`) as HTMLElement)?.click()}>
                    Upload
                  </Button>
                </div>
              ))}
            </div>

            {/* Brochure PDF */}
            <div className="flex items-center gap-3">
              <Label>Project Brochure (PDF)</Label>
              <input ref={brochureRef} type="file" accept="application/pdf" className="hidden" onChange={uploadBrochure} />
              <Button variant="outline" onClick={() => brochureRef.current?.click()}><Upload className="h-4 w-4 mr-1" /> Upload</Button>
              {data.brochurePdf && (
                <Button variant="outline" size="icon" onClick={() => change("brochurePdf", "")}><X className="h-4 w-4" /></Button>
              )}
            </div>

            {/* Gallery Preview */}
            <div className="grid md:grid-cols-4 gap-3">
              {(data.viewFloorplanImages ?? []).map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} alt={`floor-${i}`} className="w-full h-28 object-cover rounded border" />
                  <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => deleteViewFloor(i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* ---------- VIRTUAL TOURS ---------- */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Virtual Tours</Label>
              <Button variant="outline" size="sm" onClick={addTour}><Plus className="h-4 w-4 mr-1" /> Add</Button>
            </div>
            {(data.virtualTours ?? []).map((t, i) => (
              <div key={t.id} className="grid md:grid-cols-4 gap-2 bg-gray-50 p-2 rounded">
                <div className="flex items-center gap-2">
                  {t.image ? (
                    t.image.startsWith("data:video") ? (
                      <video className="w-24 h-16 rounded border object-cover" src={t.image} />
                    ) : (
                      <img className="w-24 h-16 rounded border object-cover" src={t.image} alt={t.alt} />
                    )
                  ) : (
                    <div className="w-24 h-16 border-2 border-dashed rounded flex items-center justify-center text-xs text-gray-500">No media</div>
                  )}
                  <input type="file" accept="image/*,video/*" className="hidden"
                    onChange={e => uploadTour(e, i)} />
                  <Button variant="outline" size="sm"
                    onClick={() => (document.querySelector(`input[onChange*="${i}"]`) as HTMLElement)?.click()}>
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <Input placeholder="Alt text" value={t.alt} onChange={e => updateTour(i, "alt", e.target.value)} />
                <Button variant="ghost" size="icon" onClick={() => updateTour(i, "image", "")}><X className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteTour(i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </section>

          <Separator />

          {/* ---------- LOCATION INFO ---------- */}
          <section className="grid md:grid-cols-3 gap-3">
            {["location", "zone", "pincode"].map((k) => (
              <div key={k} className="space-y-2">
                <Label>{k.charAt(0).toUpperCase() + k.slice(1)}</Label>
                <Input
                  value={data.locationInfo?.[k as keyof typeof data.locationInfo] ?? ""}
                  onChange={e => setData(prev => prev ? {
                    ...prev,
                    locationInfo: { ...prev.locationInfo, [k]: e.target.value }
                  } : null)}
                />
              </div>
            ))}
            <div className="space-y-2 md:col-span-2">
              <Label>Maps Embed URL</Label>
              <Input
                value={data.locationInfo?.mapEmbedUrl ?? ""}
                onChange={e => setData(prev => prev ? {
                  ...prev,
                  locationInfo: { ...prev.locationInfo, mapEmbedUrl: e.target.value }
                } : null)}
              />
            </div>
            <div className="space-y-2">
              <Label>Maps CTA Text</Label>
              <Input
                value={data.locationInfo?.mapsCtaText ?? ""}
                onChange={e => setData(prev => prev ? {
                  ...prev,
                  locationInfo: { ...prev.locationInfo, mapsCtaText: e.target.value }
                } : null)}
              />
            </div>
          </section>

          <Separator />

          {/* ---------- SIMILAR PROJECTS ---------- */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Similar Projects</Label>
              <Button variant="outline" size="sm" onClick={addSimilar}><Plus className="h-4 w-4 mr-1" /> Add</Button>
            </div>
            {(data.similarProjects ?? []).map((sp, i) => (
              <div key={sp.id} className="grid md:grid-cols-6 gap-2 bg-gray-50 p-2 rounded">
                <Input placeholder="Name" value={sp.name} onChange={e => updateSimilar(i, "name", e.target.value)} />
                <Input placeholder="Type" value={sp.type} onChange={e => updateSimilar(i, "type", e.target.value)} />
                <Input placeholder="Location" value={sp.location} onChange={e => updateSimilar(i, "location", e.target.value)} />
                <Input placeholder="Price" value={sp.price} onChange={e => updateSimilar(i, "price", e.target.value)} />
                <div className="flex items-center gap-2">
                  {sp.image ? <img src={sp.image} alt={sp.name} className="w-20 h-14 rounded border object-cover" /> :
                    <div className="w-20 h-14 border-2 border-dashed rounded flex items-center justify-center text-xs text-gray-500">No image</div>}
                  <input type="file" accept="image/*" className="hidden"
                    onChange={e => uploadSimilar(e, i)} />
                  <Button variant="outline" size="sm"
                    onClick={() => (document.querySelector(`input[onChange*="${i}"]`) as HTMLInputElement)?.click()}>
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => updateSimilar(i, "image", "")}><X className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteSimilar(i)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </section>

          <Separator />

          {/* ---------- SAVE / CANCEL ---------- */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}><Save className="h-4 w-4 mr-2" /> Save Project</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostProjectModal;