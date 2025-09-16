import { Button } from "@/components/ui/button";
import mumbaiHomesLogo from "@/assets/mumbai-homes-logo.png";

const MumbaiHomesSection = () => {
  return (
    <section 
      className="py-12 text-white"
      style={{ backgroundColor: '#0D6ABC' }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Logo and About */}
          <div>
            <div className="mb-8">
              <img 
                src={mumbaiHomesLogo} 
                alt="Mumbai Homes Logo" 
                className="h-16 w-auto mb-2"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">About Mumbai Homes</h3>
              <p className="text-sm leading-relaxed opacity-90">
                Welcome to <strong>Mumbai Homes by The Avenew</strong> – your gateway to luxury living. We 
                specialise in premium properties across the city, offering a curated selection of high-end residences that blend elegance, comfort, and exclusivity.
              </p>
            </div>
          </div>

          {/* Right Column - Company Info and Disclaimer */}
          <div className="grid grid-cols-1 gap-8">
            {/* Our Company */}
            <div>
              <h3 className="text-xl font-bold mb-4">Our Company</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <a href="#" className="hover:underline">Projects</a>
                <a href="#" className="hover:underline">Contact Us</a>
                <a href="#" className="hover:underline">Blogs</a>
                <a href="#" className="hover:underline">Careers</a>
              </div>
            </div>

            {/* Disclaimer */}
            <div>
              <h3 className="text-xl font-bold mb-4">Disclaimer</h3>
              <p className="text-sm leading-relaxed opacity-90">
                <strong>Mumbai Homes Services Limited</strong> acts solely as an intermediary, providing a platform 
                for sellers to showcase properties to buyers. We are not involved in or responsible for 
                any transactions between the two parties.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/20 text-sm">
          <div className="mb-4 md:mb-0">
            <p>Copyright 2025 | All Rights Reserved By Swastik Group | Developed by <a href="#" className="underline">Signature Advertising</a></p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="underline">Privacy Policy</a>
            <div className="flex space-x-3 ml-4">
              <Button variant="ghost" size="sm" className="p-2 text-white hover:bg-white/10">
                <span className="sr-only">Instagram</span>
                📷
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-white hover:bg-white/10">
                <span className="sr-only">Facebook</span>
                📘
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-white hover:bg-white/10">
                <span className="sr-only">LinkedIn</span>
                💼
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-white hover:bg-white/10">
                <span className="sr-only">YouTube</span>
                📺
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MumbaiHomesSection;