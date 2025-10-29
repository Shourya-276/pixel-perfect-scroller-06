import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Building, 
  TrendingUp, 
  FileText, 
  Settings,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSectionAdmin from "@/components/admin/HeroSectionAdmin";
import SpotlightProjectAdmin from "@/components/admin/SpotlightProjectAdmin";
import WhyChooseUsAdmin from "@/components/admin/WhyChooseUsAdmin";
import VirtualTourAdmin from "@/components/admin/VirtualTourAdmin";
import BanksAdmin from "@/components/admin/BanksAdmin";
import BlogsAndArticlesAdmin from "@/components/admin/BlogsAndArticlesAdmin";
import HomesInEveryZoneAdmin from "@/components/admin/HomesInEveryZoneAdmin";
import FrequentlyAskedQuestionsAdmin from "@/components/admin/FrequentlyAskedQuestionsAdmin";
import DiscoverNeighborhoodsAdmin from "@/components/admin/DiscoverNeighborhoodsAdmin";
import MumbaiHomesAdmin from "@/components/admin/MumbaiHomesAdmin";
import NewlyLaunchedAdmin from "@/components/admin/NewlyLaunchedAdmin";
import TrendingProjectsAdmin from "@/components/admin/TrendingProjectsAdmin";
import ProjectDetailsAdmin from "@/components/admin/ProjectDetailsAdmin";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hero");

  const sidebarItems = [
    { id: "hero", label: "Hero Section", icon: Home },
    { id: "newly-launched", label: "Newly Launched", icon: Building },
    { id: "spotlight", label: "Spotlight Project", icon: TrendingUp },
    { id: "trending", label: "Trending Projects", icon: TrendingUp },
    { id: "project-details", label: "Project Details", icon: Building },
    { id: "why-choose-us", label: "Why Choose Us", icon: Building },
    { id: "virtual-tour", label: "Virtual Tour", icon: Building },
    { id: "banks", label: "Banks", icon: Building },
    { id: "blogs", label: "Blogs & Articles", icon: FileText },
    { id: "homes-zones", label: "Homes in Zones", icon: Building },
    { id: "faq", label: "FAQ", icon: FileText },
    { id: "discover", label: "Discover Neighborhoods", icon: Building },
    { id: "mumbai-homes", label: "Mumbai Homes", icon: Building },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Site</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">Manage your website content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="hero" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Home className="h-5 w-5" />
                      <span>Hero Section Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <HeroSectionAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="spotlight" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Spotlight Project Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SpotlightProjectAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="why-choose-us" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Why Choose Us Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <WhyChooseUsAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="virtual-tour" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Virtual Tour Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VirtualTourAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="banks" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Banks Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BanksAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blogs" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Blogs & Articles Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BlogsAndArticlesAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="homes-zones" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Homes in Zones Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <HomesInEveryZoneAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>FAQ Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FrequentlyAskedQuestionsAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discover" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Discover Neighborhoods Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DiscoverNeighborhoodsAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mumbai-homes" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Mumbai Homes Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MumbaiHomesAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="newly-launched" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Newly Launched Projects</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <NewlyLaunchedAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trending" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Trending Projects</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TrendingProjectsAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="project-details" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Project Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProjectDetailsAdmin />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Settings panel coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
