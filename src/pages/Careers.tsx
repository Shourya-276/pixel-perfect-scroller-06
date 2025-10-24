import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import MumbaiHomesSection from "@/components/MumbaiHomesSection";
import careerImage1 from "@/assets/career-image-1.jpg";
import careerImage3 from "@/assets/career-image-3.jpg";
import { Lightbulb, Users, Clock, TrendingUp } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-4 lg:px-6" style={{ backgroundColor: '#0D6ABC' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white text-center lg:text-left">
              <h1 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6">
                Career with Mumbai Homes
              </h1>
              <div className="space-y-3 lg:space-y-4 text-sm lg:text-lg leading-relaxed">
                <p>
                  Build the future of real estate with us!
                </p>
                <p>
                  We seek energetic heads of people who are willing to break the property market. Be it technology, sales, content or customer experience, at Mumbai Homes you can find plenty to grow, innovate and change lives. Come and be part of our team and make real estate smarter, smoother and more human.
                </p>
                <p className="font-semibold">
                  Explore openings and redefine real estate with us.
                </p>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="relative w-full max-w-md mx-auto lg:max-w-none">
                {/* Background Image */}
                <div className="relative z-10">
                  <img 
                    src={careerImage3} 
                    alt="Team meeting" 
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                
                {/* Overlapping Image */}
                <div className="absolute -left-4 -bottom-4 z-20 w-48 h-36 sm:w-64 sm:h-48 lg:-left-8 lg:-bottom-8">
                  <img 
                    src={careerImage1} 
                    alt="Working with laptops" 
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 lg:py-12" style={{ backgroundColor: '#0D6ABC' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 text-white text-center">
            <div>
              <div className="text-2xl lg:text-4xl font-bold">25+</div>
              <div className="text-xs lg:text-sm opacity-90">Years of Experience</div>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl font-bold">1.5</div>
              <div className="text-xs lg:text-sm opacity-90">Million sq. ft. developed</div>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl font-bold">1500+</div>
              <div className="text-xs lg:text-sm opacity-90">Happy Families</div>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl font-bold">6.5</div>
              <div className="text-xs lg:text-sm opacity-90">Lakh sq. ft. ongoing</div>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl font-bold">22</div>
              <div className="text-xs lg:text-sm opacity-90">Projects are completed</div>
            </div>
            <div>
              <div className="text-2xl lg:text-4xl font-bold">7</div>
              <div className="text-xs lg:text-sm opacity-90">Projects which are ongoing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 lg:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center lg:w-24 lg:h-24 lg:mb-6" style={{ backgroundColor: '#E2EFFC' }}>
                <Lightbulb className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: '#0D6ABC' }} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3">Innovative Projects</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Join us in building exciting and meaningful initiatives that push boundaries. Your work will create lasting impact and spark innovation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center lg:w-24 lg:h-24 lg:mb-6" style={{ backgroundColor: '#E2EFFC' }}>
                <Users className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: '#0D6ABC' }} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3">Inclusive Culture</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Be part of a workplace that values diversity, collaborative environment celebrates differences and supports each team member's unique voice.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center lg:w-24 lg:h-24 lg:mb-6" style={{ backgroundColor: '#E2EFFC' }}>
                <Clock className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: '#0D6ABC' }} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3">Flexible Work</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We value balance. Whether hybrid or remote, flexible work options empower you to do your best work—where and when you feel most productive.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center lg:w-24 lg:h-24 lg:mb-6" style={{ backgroundColor: '#E2EFFC' }}>
                <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: '#0D6ABC' }} />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3">Growth Opportunities</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your growth matters. We're committed to helping you develop skills through mentorship, continuous learning and clear career progression pathways tailored to your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Form Section */}
      <section className="py-12 px-4 lg:px-6" style={{ backgroundColor: '#E2EFFC' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Career Detail Form</h2>
            <p className="text-gray-600 text-sm lg:text-base">Please fill your details below</p>
          </div>
          
          <form className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <Label htmlFor="firstName" className="text-gray-700 text-sm lg:text-base">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="First Name" 
                  className="mt-1 bg-white border-gray-200 text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-3 h-auto"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700 text-sm lg:text-base">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Last Name" 
                  className="mt-1 bg-white border-gray-200 text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-3 h-auto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <Label htmlFor="contact" className="text-gray-700 text-sm lg:text-base">Contact Number</Label>
                <Input 
                  id="contact" 
                  placeholder="Contact Number" 
                  className="mt-1 bg-white border-gray-200 text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-3 h-auto"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 text-sm lg:text-base">Email ID</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Email ID" 
                  className="mt-1 bg-white border-gray-200 text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-3 h-auto"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="message" className="text-gray-700 text-sm lg:text-base">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Message" 
                rows={4}
                className="mt-1 bg-white border-gray-200 text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-3 h-auto"
              />
            </div>
            
            <div>
              <Label htmlFor="document" className="text-gray-700 text-sm lg:text-base">Upload Document</Label>
              <div className="mt-1 p-6 lg:p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white text-center">
                <p className="text-gray-500 text-sm lg:text-base">Upload Document</p>
                <input type="file" className="hidden" id="document" />
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                type="submit" 
                className="px-6 py-2 text-white font-semibold rounded-lg text-base lg:px-8 lg:py-3 lg:text-lg"
                style={{ backgroundColor: '#0D6ABC' }}
              >
                Enquiry Now
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Mumbai Homes Section */}
      <MumbaiHomesSection />
    </div>
  );
};

export default Careers;