import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Edit, Save, Plus, Trash2 } from "lucide-react";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

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

const MumbaiHomesAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateMumbaiHomes } = useWebsiteData();
  
  const [mumbaiHomesData, setMumbaiHomesData] = useState<MumbaiHomesData>(websiteData.mumbaiHomes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCompanyLink, setEditingCompanyLink] = useState<CompanyLink | null>(null);
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null);
  const [isAddingCompanyLink, setIsAddingCompanyLink] = useState(false);
  const [isAddingSocialLink, setIsAddingSocialLink] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMumbaiHomesData(websiteData.mumbaiHomes);
  }, [websiteData.mumbaiHomes]);

  const handleInputChange = (field: keyof Omit<MumbaiHomesData, 'companyLinks' | 'socialLinks' | 'logo'>, value: string) => {
    setMumbaiHomesData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setMumbaiHomesData(prev => ({
          ...prev,
          logo: imageDataUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setMumbaiHomesData(prev => ({
      ...prev,
      logo: ""
    }));
  };

  const handleAddCompanyLink = () => {
    const newLink: CompanyLink = {
      id: Date.now(),
      text: "",
      url: ""
    };
    setEditingCompanyLink(newLink);
    setIsAddingCompanyLink(true);
    setIsModalOpen(true);
  };

  const handleEditCompanyLink = (link: CompanyLink) => {
    setEditingCompanyLink({ ...link });
    setIsAddingCompanyLink(false);
    setIsModalOpen(true);
  };

  const handleSaveCompanyLink = () => {
    if (!editingCompanyLink) return;

    if (isAddingCompanyLink) {
      setMumbaiHomesData(prev => ({
        ...prev,
        companyLinks: [...prev.companyLinks, editingCompanyLink]
      }));
    } else {
      setMumbaiHomesData(prev => ({
        ...prev,
        companyLinks: prev.companyLinks.map(l => l.id === editingCompanyLink.id ? editingCompanyLink : l)
      }));
    }

    setEditingCompanyLink(null);
    setIsAddingCompanyLink(false);
    setIsModalOpen(false);
  };

  const handleDeleteCompanyLink = (linkId: number) => {
    setMumbaiHomesData(prev => ({
      ...prev,
      companyLinks: prev.companyLinks.filter(l => l.id !== linkId)
    }));
  };

  const handleAddSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now(),
      platform: "",
      url: "",
      icon: ""
    };
    setEditingSocialLink(newLink);
    setIsAddingSocialLink(true);
    setIsModalOpen(true);
  };

  const handleEditSocialLink = (link: SocialLink) => {
    setEditingSocialLink({ ...link });
    setIsAddingSocialLink(false);
    setIsModalOpen(true);
  };

  const handleSaveSocialLink = () => {
    if (!editingSocialLink) return;

    if (isAddingSocialLink) {
      setMumbaiHomesData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, editingSocialLink]
      }));
    } else {
      setMumbaiHomesData(prev => ({
        ...prev,
        socialLinks: prev.socialLinks.map(l => l.id === editingSocialLink.id ? editingSocialLink : l)
      }));
    }

    setEditingSocialLink(null);
    setIsAddingSocialLink(false);
    setIsModalOpen(false);
  };

  const handleDeleteSocialLink = (linkId: number) => {
    setMumbaiHomesData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(l => l.id !== linkId)
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    updateMumbaiHomes(mumbaiHomesData);
    toast({
      title: "Success",
      description: "Mumbai Homes section data saved successfully!",
    });
    setIsEditing(false);
    setIsModalOpen(false);
    if (logoRef.current) logoRef.current.value = '';
  };

  const handleCancel = () => {
    setMumbaiHomesData(websiteData.mumbaiHomes);
    setIsEditing(false);
    setIsModalOpen(false);
    setEditingCompanyLink(null);
    setEditingSocialLink(null);
    setIsAddingCompanyLink(false);
    setIsAddingSocialLink(false);
    if (logoRef.current) logoRef.current.value = '';
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const socialPlatforms = [
    { value: "Instagram", icon: "Instagram", label: "Instagram" },
    { value: "Facebook", icon: "Facebook", label: "Facebook" },
    { value: "LinkedIn", icon: "Linkedin", label: "LinkedIn" },
    { value: "YouTube", icon: "Youtube", label: "YouTube" },
    { value: "Twitter", icon: "Twitter", label: "Twitter" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Mumbai Homes Configuration</h3>
        <div className="space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button onClick={handleEdit} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Mumbai Homes Section</span>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Current Mumbai Homes Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Mumbai Homes Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-primary p-6 rounded-lg text-white">
            <div className="flex items-center space-x-4 mb-4">
              {mumbaiHomesData.logo && (
                <img src={mumbaiHomesData.logo} alt="Mumbai Homes Logo" className="h-16 w-auto" />
              )}
              <h3 className="text-xl font-bold">{mumbaiHomesData.title}</h3>
            </div>
            <p className="text-white/90 mb-4">{mumbaiHomesData.description}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              {mumbaiHomesData.companyLinks.map((link) => (
                <a key={link.id} href={link.url} className="text-white hover:underline">
                  {link.text}
                </a>
              ))}
            </div>
            <p className="text-xs text-white/80 mb-2">{mumbaiHomesData.disclaimer}</p>
            <div className="flex justify-between items-center">
              <p className="text-xs text-white/80">{mumbaiHomesData.copyright}</p>
              <div className="flex space-x-2">
                {mumbaiHomesData.socialLinks.map((link) => (
                  <a key={link.id} href={link.url} className="text-white hover:text-white/80">
                    <span className="text-sm">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mumbai Homes Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Mumbai Homes Section</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="space-y-4">
              <Label>Company Logo</Label>
              <div className="flex flex-col items-center space-y-4">
                {mumbaiHomesData.logo ? (
                  <div className="relative">
                    <img
                      src={mumbaiHomesData.logo}
                      alt="Logo preview"
                      className="w-32 h-32 object-contain bg-white rounded border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={handleRemoveLogo}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm">No logo</p>
                  </div>
                )}
                
                <div className="flex flex-col items-center space-y-2">
                  <input
                    ref={logoRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => logoRef.current?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{mumbaiHomesData.logo ? 'Change Logo' : 'Upload Logo'}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sectionTitle">Section Title</Label>
                <Input
                  id="sectionTitle"
                  value={mumbaiHomesData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter section title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sectionDescription">Description</Label>
                <Textarea
                  id="sectionDescription"
                  value={mumbaiHomesData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disclaimer">Disclaimer</Label>
                <Textarea
                  id="disclaimer"
                  value={mumbaiHomesData.disclaimer}
                  onChange={(e) => handleInputChange('disclaimer', e.target.value)}
                  placeholder="Enter disclaimer text"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="copyright">Copyright Text</Label>
                <Input
                  id="copyright"
                  value={mumbaiHomesData.copyright}
                  onChange={(e) => handleInputChange('copyright', e.target.value)}
                  placeholder="Enter copyright text"
                />
              </div>
            </div>

            {/* Company Links Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Company Links</Label>
                <Button onClick={handleAddCompanyLink} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Link</span>
                </Button>
              </div>
              
              <div className="space-y-2">
                {mumbaiHomesData.companyLinks.map((link) => (
                  <div key={link.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-sm">{link.text}</span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCompanyLink(link)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCompanyLink(link.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Social Links</Label>
                <Button onClick={handleAddSocialLink} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Social Link</span>
                </Button>
              </div>
              
              <div className="space-y-2">
                {mumbaiHomesData.socialLinks.map((link) => (
                  <div key={link.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-sm">{link.platform}</span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditSocialLink(link)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSocialLink(link.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Link Edit Form */}
            {editingCompanyLink && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingCompanyLink ? 'Add New Company Link' : 'Edit Company Link'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkText">Link Text</Label>
                    <Input
                      id="linkText"
                      value={editingCompanyLink.text}
                      onChange={(e) => setEditingCompanyLink(prev => prev ? {...prev, text: e.target.value} : null)}
                      placeholder="Enter link text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkUrl">Link URL</Label>
                    <Input
                      id="linkUrl"
                      value={editingCompanyLink.url}
                      onChange={(e) => setEditingCompanyLink(prev => prev ? {...prev, url: e.target.value} : null)}
                      placeholder="Enter link URL"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingCompanyLink(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCompanyLink}>
                    {isAddingCompanyLink ? 'Add Link' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {/* Social Link Edit Form */}
            {editingSocialLink && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingSocialLink ? 'Add New Social Link' : 'Edit Social Link'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="socialPlatform">Platform</Label>
                    <select
                      id="socialPlatform"
                      value={editingSocialLink.platform}
                      onChange={(e) => {
                        const selectedPlatform = socialPlatforms.find(p => p.value === e.target.value);
                        setEditingSocialLink(prev => prev ? {
                          ...prev, 
                          platform: e.target.value,
                          icon: selectedPlatform?.icon || e.target.value
                        } : null);
                      }}
                      className="w-full p-2 border rounded-md"
                    >
                      {socialPlatforms.map(platform => (
                        <option key={platform.value} value={platform.value}>{platform.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialUrl">URL</Label>
                    <Input
                      id="socialUrl"
                      value={editingSocialLink.url}
                      onChange={(e) => setEditingSocialLink(prev => prev ? {...prev, url: e.target.value} : null)}
                      placeholder="Enter social media URL"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingSocialLink(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSocialLink}>
                    {isAddingSocialLink ? 'Add Social Link' : 'Save Changes'}
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

export default MumbaiHomesAdmin;
