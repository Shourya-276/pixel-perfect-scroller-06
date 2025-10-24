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

interface Bank {
  id: number;
  name: string;
  logo: string;
}

interface BanksData {
  title: string;
  description: string;
  contactText: string;
  ctaText: string;
  banks: Bank[];
}

const BanksAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateBanks } = useWebsiteData();
  
  const [banksData, setBanksData] = useState<BanksData>(websiteData.banks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const bankLogoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBanksData(websiteData.banks);
  }, [websiteData.banks]);

  const handleInputChange = (field: keyof Omit<BanksData, 'banks'>, value: string) => {
    setBanksData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBankLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        if (editingBank) {
          setEditingBank(prev => prev ? {...prev, logo: imageDataUrl} : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBank = () => {
    const newBank: Bank = {
      id: Date.now(),
      name: "",
      logo: ""
    };
    setEditingBank(newBank);
    setIsAddingBank(true);
    setIsModalOpen(true);
  };

  const handleEditBank = (bank: Bank) => {
    setEditingBank({ ...bank });
    setIsAddingBank(false);
    setIsModalOpen(true);
  };

  const handleSaveBank = () => {
    if (!editingBank) return;

    if (isAddingBank) {
      setBanksData(prev => ({
        ...prev,
        banks: [...prev.banks, editingBank]
      }));
    } else {
      setBanksData(prev => ({
        ...prev,
        banks: prev.banks.map(b => b.id === editingBank.id ? editingBank : b)
      }));
    }

    setEditingBank(null);
    setIsAddingBank(false);
    setIsModalOpen(false);
    if (bankLogoRef.current) bankLogoRef.current.value = '';
  };

  const handleDeleteBank = (bankId: number) => {
    setBanksData(prev => ({
      ...prev,
      banks: prev.banks.filter(b => b.id !== bankId)
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    updateBanks(banksData);
    toast({
      title: "Success",
      description: "Banks section data saved successfully!",
    });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setBanksData(websiteData.banks);
    setIsEditing(false);
    setIsModalOpen(false);
    setEditingBank(null);
    setIsAddingBank(false);
    if (bankLogoRef.current) bankLogoRef.current.value = '';
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Banks Section Configuration</h3>
        <div className="space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button onClick={handleEdit} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Banks Section</span>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Current Banks Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Banks Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-primary p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4 text-center">{banksData.title}</h3>
            <p className="text-sm text-white/90 mb-2 text-center">{banksData.description}</p>
            <p className="text-sm text-white/90 font-medium text-center mb-4">{banksData.contactText}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {banksData.banks.slice(0, 6).map((bank) => (
                <div key={bank.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                    <img src={bank.logo} alt={bank.name} className="w-8 h-8 object-contain" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">{bank.name}</h4>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
                {banksData.ctaText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banks Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Banks Section</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Section Content */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sectionTitle">Section Title</Label>
                <Input
                  id="sectionTitle"
                  value={banksData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter section title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sectionDescription">Description</Label>
                <Input
                  id="sectionDescription"
                  value={banksData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactText">Contact Text</Label>
                <Input
                  id="contactText"
                  value={banksData.contactText}
                  onChange={(e) => handleInputChange('contactText', e.target.value)}
                  placeholder="Enter contact text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText">Call-to-Action Text</Label>
                <Input
                  id="ctaText"
                  value={banksData.ctaText}
                  onChange={(e) => handleInputChange('ctaText', e.target.value)}
                  placeholder="Enter CTA button text"
                />
              </div>
            </div>

            {/* Banks Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Banks</Label>
                <Button onClick={handleAddBank} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Bank</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {banksData.banks.map((bank) => (
                  <div key={bank.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold">{bank.name}</h4>
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mt-2">
                          <img src={bank.logo} alt={bank.name} className="w-12 h-12 object-contain" />
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBank(bank)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBank(bank.id)}
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

            {/* Bank Edit Form */}
            {editingBank && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingBank ? 'Add New Bank' : 'Edit Bank'}
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={editingBank.name}
                      onChange={(e) => setEditingBank(prev => prev ? {...prev, name: e.target.value} : null)}
                      placeholder="Enter bank name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Bank Logo</Label>
                    <div className="flex flex-col items-center space-y-4">
                      {editingBank.logo ? (
                        <div className="relative">
                          <img
                            src={editingBank.logo}
                            alt="Bank logo preview"
                            className="w-24 h-24 object-contain bg-white rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => setEditingBank(prev => prev ? {...prev, logo: ""} : null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500 text-xs">No logo</p>
                        </div>
                      )}
                      
                      <div className="flex flex-col items-center space-y-2">
                        <input
                          ref={bankLogoRef}
                          type="file"
                          accept="image/*"
                          onChange={handleBankLogoUpload}
                          className="hidden"
                          id="bank-logo-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => bankLogoRef.current?.click()}
                          className="flex items-center space-x-2"
                        >
                          <Upload className="h-4 w-4" />
                          <span>{editingBank.logo ? 'Change Logo' : 'Upload Logo'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingBank(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveBank}>
                    {isAddingBank ? 'Add Bank' : 'Save Changes'}
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

export default BanksAdmin;
