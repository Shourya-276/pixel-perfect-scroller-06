import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, Plus, Trash2 } from "lucide-react";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

// Define interfaces within the file
interface NeighborhoodItem {
  id: number; // Added id for unique identification
  text: string;
  locality?: string;
  bedrooms?: string;
}

interface Category {
  id: number;
  title: string;
  items: NeighborhoodItem[];
  link: string;
}

interface DiscoverNeighborhoodsData {
  title: string;
  categories: Category[];
}

const DiscoverNeighborhoodsAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateDiscoverNeighborhoods } = useWebsiteData();
  const [discoverData, setDiscoverData] = useState<DiscoverNeighborhoodsData>({
    title: websiteData.discoverNeighborhoods.title || "Discover the city's prime neighbourhoods.",
    categories: Array.isArray(websiteData.discoverNeighborhoods.categories)
      ? websiteData.discoverNeighborhoods.categories.map(category => ({
          ...category,
          title: category.title || '',
          items: Array.isArray(category.items)
            ? category.items.map((item, index) => ({
                id: (item as any).id || Date.now() + index, // Ensure items have IDs
                text: item.text || '',
                locality: item.locality || '',
                bedrooms: item.bedrooms || '',
              }))
            : [],
          link: category.link || 'View All',
        }))
      : [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingItem, setEditingItem] = useState<NeighborhoodItem | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleInputChange = (field: keyof Omit<DiscoverNeighborhoodsData, 'categories'>, value: string) => {
    setDiscoverData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCategory = () => {
    setEditingCategory({
      id: Date.now(),
      title: "",
      items: [],
      link: "View All",
    });
    setIsAddingCategory(true);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory({ ...category });
    setIsAddingCategory(false);
    setIsModalOpen(true);
  };

  const handleSaveCategory = () => {
    if (!editingCategory || !editingCategory.title || !editingCategory.link) {
      toast({
        title: "Error",
        description: "Category requires a title and link text",
        variant: "destructive",
      });
      return;
    }

    if (discoverData.categories.some(c => c.title === editingCategory.title && c.id !== editingCategory.id)) {
      toast({
        title: "Error",
        description: `A category with the title "${editingCategory.title}" already exists`,
        variant: "destructive",
      });
      return;
    }

    setDiscoverData(prev => ({
      ...prev,
      categories: isAddingCategory
        ? [...prev.categories, editingCategory]
        : prev.categories.map(c => (c.id === editingCategory.id ? editingCategory : c)),
    }));
    setEditingCategory(null);
    setIsAddingCategory(false);
    setIsModalOpen(false);
    toast({ title: "Success", description: "Category saved successfully" });
  };

  const handleDeleteCategory = (categoryId: number) => {
    setDiscoverData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== categoryId),
    }));
    toast({ title: "Success", description: "Category deleted successfully" });
  };

  const handleAddItem = (categoryId: number) => {
    setEditingItem({
      id: Date.now(),
      text: "",
      locality: "",
      bedrooms: "",
    });
    setSelectedCategoryId(categoryId);
    setIsAddingItem(true);
  };

  const handleEditItem = (item: NeighborhoodItem, categoryId: number) => {
    setEditingItem({ ...item });
    setSelectedCategoryId(categoryId);
    setIsAddingItem(false);
  };

  const handleSaveItem = () => {
    if (!editingItem || !selectedCategoryId || !editingItem.text) {
      toast({
        title: "Error",
        description: "Item requires text",
        variant: "destructive",
      });
      return;
    }

    const category = discoverData.categories.find(c => c.id === selectedCategoryId);
    if (!category) return;

    if (category.items.some(item => item.text === editingItem.text && item.id !== editingItem.id)) {
      toast({
        title: "Error",
        description: `An item with the text "${editingItem.text}" already exists in this category`,
        variant: "destructive",
      });
      return;
    }

    const updatedItems = isAddingItem
      ? [...category.items, editingItem]
      : category.items.map(item => (item.id === editingItem.id ? editingItem : item));

    setDiscoverData(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === selectedCategoryId ? { ...c, items: updatedItems } : c
      ),
    }));

    setEditingItem(null);
    setSelectedCategoryId(null);
    setIsAddingItem(false);
    toast({ title: "Success", description: "Item saved successfully" });
  };

  const handleDeleteItem = (categoryId: number, itemId: number) => {
    setDiscoverData(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === categoryId ? { ...c, items: c.items.filter(item => item.id !== itemId) } : c
      ),
    }));
    toast({ title: "Success", description: "Item deleted successfully" });
  };

  const handleSaveAll = () => {
    if (!discoverData.title) {
      toast({
        title: "Error",
        description: "Section title is required",
        variant: "destructive",
      });
      return;
    }
    console.log('Saving discoverData:', discoverData);
    updateDiscoverNeighborhoods(discoverData);
    setIsModalOpen(false);
    toast({
      title: "Success",
      description: "Discover Neighborhoods section saved successfully!",
      duration: 2000,
    });
  };

  const handleCancel = () => {
    setDiscoverData({
      title: websiteData.discoverNeighborhoods.title || "Discover the city's prime neighbourhoods.",
      categories: Array.isArray(websiteData.discoverNeighborhoods.categories)
        ? websiteData.discoverNeighborhoods.categories.map(category => ({
            ...category,
            title: category.title || '',
            items: Array.isArray(category.items)
              ? category.items.map((item, index) => ({
                  id: (item as any).id || Date.now() + index,
                  text: item.text || '',
                  locality: item.locality || '',
                  bedrooms: item.bedrooms || '',
                }))
              : [],
            link: category.link || 'View All',
          }))
        : [],
    });
    setEditingCategory(null);
    setEditingItem(null);
    setIsAddingCategory(false);
    setIsAddingItem(false);
    setSelectedCategoryId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Discover Neighborhoods Configuration</h3>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
          <Edit className="h-4 w-4" />
          <span>Edit Section</span>
        </Button>
      </div>

      <Separator />

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Discover Neighborhoods Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center">{discoverData.title}</h3>
            {discoverData.categories.length === 0 ? (
              <p className="text-center text-gray-500">No categories available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {discoverData.categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-3">{category.title}</h4>
                    <ul className="space-y-2">
                      {category.items.slice(0, 3).map((item) => (
                        <li key={item.id} className="text-sm text-gray-700">{item.text}</li>
                      ))}
                      {category.items.length > 3 && (
                        <li className="text-sm text-gray-500">... and {category.items.length - 3} more</li>
                      )}
                    </ul>
                    <Button variant="link" className="text-primary p-0 h-auto text-sm mt-2">
                      {category.link}
                    </Button>
                  </div>
                ))}
              </div>
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
              <span>Edit Discover Neighborhoods Section</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Section Title */}
            <div className="space-y-2">
              <Label htmlFor="sectionTitle">Section Title</Label>
              <Input
                id="sectionTitle"
                value={discoverData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>

            {/* Categories Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Categories</Label>
                <Button onClick={handleAddCategory} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Category</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {discoverData.categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary mb-2">{category.title}</h4>
                        <ul className="space-y-1 mb-3">
                          {category.items.slice(0, 3).map((item) => (
                            <li key={item.id} className="text-sm text-gray-700">{item.text}</li>
                          ))}
                          {category.items.length > 3 && (
                            <li className="text-sm text-gray-500">... and {category.items.length - 3} more</li>
                          )}
                        </ul>
                        <Button variant="link" className="text-primary p-0 h-auto text-sm">
                          {category.link}
                        </Button>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Items Management for this Category */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm">Items</Label>
                        <Button
                          onClick={() => handleAddItem(category.id)}
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add Item</span>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {category.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span className="text-sm">{item.text}</span>
                            <div className="flex space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditItem(item, category.id)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteItem(category.id, item.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Edit Form */}
            {editingCategory && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingCategory ? 'Add New Category' : 'Edit Category'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoryTitle">Category Title</Label>
                    <Input
                      id="categoryTitle"
                      value={editingCategory.title}
                      onChange={(e) => setEditingCategory(prev => prev ? { ...prev, title: e.target.value } : null)}
                      placeholder="Enter category title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryLink">Link Text</Label>
                    <Input
                      id="categoryLink"
                      value={editingCategory.link}
                      onChange={(e) => setEditingCategory(prev => prev ? { ...prev, link: e.target.value } : null)}
                      placeholder="Enter link text"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingCategory(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCategory}>
                    {isAddingCategory ? 'Add Category' : 'Save Category'}
                  </Button>
                </div>
              </div>
            )}

            {/* Item Edit Form */}
            {editingItem && selectedCategoryId && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingItem ? 'Add New Item' : 'Edit Item'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemText">Item Text</Label>
                    <Input
                      id="itemText"
                      value={editingItem.text}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, text: e.target.value } : null)}
                      placeholder="Enter item text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemLocality">Locality (Optional)</Label>
                    <Input
                      id="itemLocality"
                      value={editingItem.locality || ""}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, locality: e.target.value } : null)}
                      placeholder="Enter locality"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemBedrooms">Bedrooms (Optional)</Label>
                    <Input
                      id="itemBedrooms"
                      value={editingItem.bedrooms || ""}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, bedrooms: e.target.value } : null)}
                      placeholder="e.g., 1 BHK, 2 BHK"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingItem(null);
                      setSelectedCategoryId(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveItem}>
                    {isAddingItem ? 'Add Item' : 'Save Item'}
                  </Button>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSaveAll} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save All</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscoverNeighborhoodsAdmin;