import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background border-b border-gray-200 py-4 px-6">
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
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Post Project
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary/90">
            Contact Us
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary/90">
            Login/Signup
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;