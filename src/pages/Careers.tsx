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
      <section className="py-16 px-6" style={{ backgroundColor: '#0D6ABC' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Career with Mumbai Homes
              </h1>
              <div className="space-y-4 text-lg leading-relaxed">
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
            
            <div className="relative">
              <div className="relative">
                {/* Background Image */}
                <div className="relative z-10">
                  <img 
                    src={careerImage3} 
                    alt="Team meeting" 
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                
                {/* Overlapping Image */}
                <div className="absolute -left-8 -bottom-8 z-20 w-64 h-48">
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
      <section className="py-12" style={{ backgroundColor: '#0D6ABC' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-white text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold">25+</div>
              <div className="text-sm opacity-90">Years of Experience</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold">1.5</div>
              <div className="text-sm opacity-90">Million sq. ft. developed</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold">1500+</div>
              <div className="text-sm opacity-90">Happy Families</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold">6.5</div>
              <div className="text-sm opacity-90">Lakh sq. ft. ongoing</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold">22</div>
              <div className="text-sm opacity-90">Projects are completed</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold">7</div>
              <div className="text-sm opacity-90">Projects which are ongoing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E2EFFC' }}>
                <Lightbulb className="w-10 h-10" style={{ color: '#0D6ABC' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovative Projects</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Join us in building exciting and meaningful initiatives that push boundaries. Your work will create lasting impact and spark innovation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E2EFFC' }}>
                <Users className="w-10 h-10" style={{ color: '#0D6ABC' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inclusive Culture</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Be part of a workplace that values diversity, collaborative environment celebrates differences and supports each team member's unique voice.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E2EFFC' }}>
                <Clock className="w-10 h-10" style={{ color: '#0D6ABC' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Work</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We value balance. Whether hybrid or remote, flexible work options empower you to do your best work—where and when you feel most productive.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E2EFFC' }}>
                <TrendingUp className="w-10 h-10" style={{ color: '#0D6ABC' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your growth matters. We're committed to helping you develop skills through mentorship, continuous learning and clear career progression pathways tailored to your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Form Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#E2EFFC' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Career Detail Form</h2>
            <p className="text-gray-600">Please fill your details below</p>
          </div>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="First Name" 
                  className="mt-1 bg-white border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Last Name" 
                  className="mt-1 bg-white border-gray-200"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contact" className="text-gray-700">Contact Number</Label>
                <Input 
                  id="contact" 
                  placeholder="Contact Number" 
                  className="mt-1 bg-white border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">Email ID</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Email ID" 
                  className="mt-1 bg-white border-gray-200"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="message" className="text-gray-700">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Message" 
                rows={4}
                className="mt-1 bg-white border-gray-200"
              />
            </div>
            
            <div>
              <Label htmlFor="document" className="text-gray-700">Upload Document</Label>
              <div className="mt-1 p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white text-center">
                <p className="text-gray-500">Upload Document</p>
                <input type="file" className="hidden" id="document" />
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                type="submit" 
                className="px-8 py-3 text-white font-semibold rounded-lg"
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