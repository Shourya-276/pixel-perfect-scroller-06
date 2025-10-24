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

interface Blog {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
  image: string;
  size: "small" | "large" | "wide";
}

interface BlogsData {
  title: string;
  ctaText: string;
  blogs: Blog[];
}

const BlogsAndArticlesAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateBlogsAndArticles } = useWebsiteData();
  
  const [blogsData, setBlogsData] = useState<BlogsData>(websiteData.blogsAndArticles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const blogImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBlogsData(websiteData.blogsAndArticles);
  }, [websiteData.blogsAndArticles]);

  const handleInputChange = (field: keyof Omit<BlogsData, 'blogs'>, value: string) => {
    setBlogsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlogImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        if (editingBlog) {
          setEditingBlog(prev => prev ? {...prev, image: imageDataUrl} : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBlog = () => {
    const newBlog: Blog = {
      id: Date.now(),
      title: "",
      subtitle: "",
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      image: "",
      size: "small"
    };
    setEditingBlog(newBlog);
    setIsAddingBlog(true);
    setIsModalOpen(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog({ ...blog });
    setIsAddingBlog(false);
    setIsModalOpen(true);
  };

  const handleSaveBlog = () => {
    if (!editingBlog) return;

    if (isAddingBlog) {
      setBlogsData(prev => ({
        ...prev,
        blogs: [...prev.blogs, editingBlog]
      }));
    } else {
      setBlogsData(prev => ({
        ...prev,
        blogs: prev.blogs.map(b => b.id === editingBlog.id ? editingBlog : b)
      }));
    }

    setEditingBlog(null);
    setIsAddingBlog(false);
    setIsModalOpen(false);
    if (blogImageRef.current) blogImageRef.current.value = '';
  };

  const handleDeleteBlog = (blogId: number) => {
    setBlogsData(prev => ({
      ...prev,
      blogs: prev.blogs.filter(b => b.id !== blogId)
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    updateBlogsAndArticles(blogsData);
    toast({
      title: "Success",
      description: "Blogs and Articles section data saved successfully!",
    });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setBlogsData(websiteData.blogsAndArticles);
    setIsEditing(false);
    setIsModalOpen(false);
    setEditingBlog(null);
    setIsAddingBlog(false);
    if (blogImageRef.current) blogImageRef.current.value = '';
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const sizeOptions = [
    { value: "small", label: "Small" },
    { value: "large", label: "Large" },
    { value: "wide", label: "Wide" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Blogs and Articles Configuration</h3>
        <div className="space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button onClick={handleEdit} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Blogs and Articles</span>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Current Blogs Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Blogs and Articles Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">{blogsData.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogsData.blogs.slice(0, 6).map((blog) => (
                <div key={blog.id} className="relative bg-white rounded-lg overflow-hidden shadow-lg h-48">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <div className="text-xs mb-1 opacity-80">{blog.date}</div>
                    <h4 className="text-sm font-bold leading-tight line-clamp-2">{blog.title}</h4>
                    {blog.subtitle && (
                      <p className="text-xs text-gray-200 mb-1 line-clamp-1">{blog.subtitle}</p>
                    )}
                    <div className="text-xs underline">Read more</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {blogsData.ctaText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blogs Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Blogs and Articles Section</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Section Content */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sectionTitle">Section Title</Label>
                <Input
                  id="sectionTitle"
                  value={blogsData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter section title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText">Call-to-Action Text</Label>
                <Input
                  id="ctaText"
                  value={blogsData.ctaText}
                  onChange={(e) => handleInputChange('ctaText', e.target.value)}
                  placeholder="Enter CTA button text"
                />
              </div>
            </div>

            {/* Blogs Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Blog Posts</Label>
                <Button onClick={handleAddBlog} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Blog Post</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogsData.blogs.map((blog) => (
                  <div key={blog.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold">{blog.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{blog.date}</p>
                        <p className="text-xs text-gray-500 mb-2">Size: {blog.size}</p>
                        <img src={blog.image} alt={blog.title} className="w-full h-24 object-cover rounded mt-2" />
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBlog(blog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBlog(blog.id)}
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

            {/* Blog Edit Form */}
            {editingBlog && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingBlog ? 'Add New Blog Post' : 'Edit Blog Post'}
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blogTitle">Blog Title</Label>
                      <Input
                        id="blogTitle"
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog(prev => prev ? {...prev, title: e.target.value} : null)}
                        placeholder="Enter blog title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blogDate">Date</Label>
                      <Input
                        id="blogDate"
                        value={editingBlog.date}
                        onChange={(e) => setEditingBlog(prev => prev ? {...prev, date: e.target.value} : null)}
                        placeholder="Enter date"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blogSubtitle">Subtitle (Optional)</Label>
                    <Input
                      id="blogSubtitle"
                      value={editingBlog.subtitle || ""}
                      onChange={(e) => setEditingBlog(prev => prev ? {...prev, subtitle: e.target.value} : null)}
                      placeholder="Enter subtitle"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="blogSize">Blog Size</Label>
                    <select
                      id="blogSize"
                      value={editingBlog.size}
                      onChange={(e) => setEditingBlog(prev => prev ? {...prev, size: e.target.value as "small" | "large" | "wide"} : null)}
                      className="w-full p-2 border rounded-md"
                    >
                      {sizeOptions.map(size => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Blog Image</Label>
                    <div className="flex flex-col items-center space-y-4">
                      {editingBlog.image ? (
                        <div className="relative">
                          <img
                            src={editingBlog.image}
                            alt="Blog preview"
                            className="w-48 h-32 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => setEditingBlog(prev => prev ? {...prev, image: ""} : null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500 text-sm">No blog image</p>
                        </div>
                      )}
                      
                      <div className="flex flex-col items-center space-y-2">
                        <input
                          ref={blogImageRef}
                          type="file"
                          accept="image/*"
                          onChange={handleBlogImageUpload}
                          className="hidden"
                          id="blog-image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => blogImageRef.current?.click()}
                          className="flex items-center space-x-2"
                        >
                          <Upload className="h-4 w-4" />
                          <span>{editingBlog.image ? 'Change Blog Image' : 'Upload Blog Image'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingBlog(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveBlog}>
                    {isAddingBlog ? 'Add Blog Post' : 'Save Changes'}
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

export default BlogsAndArticlesAdmin;
