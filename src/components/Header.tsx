import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, Home, Building, FileText, Briefcase, PlusCircle, Phone, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-background border-b border-gray-200 py-4 px-4 sm:px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">MUMBAI</div>
          <div className="text-2xl font-bold text-gray-600">HOMES</div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-600 hover:text-primary transition-colors">Home</a>
          <a href="/all-projects" className="text-gray-600 hover:text-primary transition-colors">All Projects</a>
          <a href="/blogs" className="text-gray-600 hover:text-primary transition-colors">Blogs</a>
          <a href="/careers" className="text-gray-600 hover:text-primary transition-colors">Careers</a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => navigate("/admin")}
          >
            Post Project
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary/90">
            Contact Us
          </Button>
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/signup")}
          >
            Login/Signup
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-6 sm:mr-0 text-gray-700 bg-white/90 border border-gray-200 rounded-full shadow-sm h-10 w-10">
                <Menu className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-2/3 sm:w-1/2 bg-[#0D6ABC] text-white flex flex-col pt-10">
              <nav className="flex flex-col space-y-4 text-lg font-medium">
                <a 
                  href="/signup" 
                  className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <User className="h-5 w-5" />
                  <span>Login/Signup</span>
                </a>
                <a 
                  href="/" 
                  className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </a>
                <a 
                  href="/all-projects" 
                  className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <Building className="h-5 w-5" />
                  <span>All Projects</span>
                </a>
                <a 
                  href="/blogs" 
                  className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <FileText className="h-5 w-5" />
                  <span>Blogs</span>
                </a>
                <a 
                  href="/careers" 
                  className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Careers</span>
                </a>
                <button 
                  onClick={() => navigate("/admin")}
                  className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 w-full text-left"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Post Project</span>
                </button>
              </nav>
              <div className="mt-auto p-4">
                <Button className="w-full bg-white text-[#0D6ABC] hover:bg-gray-100 flex items-center space-x-2 py-3">
                  <Phone className="h-5 w-5" />
                  <span>Contact Us</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;