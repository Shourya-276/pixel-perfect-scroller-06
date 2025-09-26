import { Button } from "@/components/ui/button";
import mumbaiHomesLogo from "@/assets/mumbai-homes-logo.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const banks = [
  { name: "HDFC Bank", logo: "https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-emblem.png" },
  { name: "SBI Bank", logo: "https://static.vecteezy.com/system/resources/previews/020/975/552/non_2x/sbi-logo-sbi-icon-transparent-free-png.png" },
  { name: "Bank Of Baroda Bank", logo: "https://1000logos.net/wp-content/uploads/2021/06/Bank-of-Baroda-icon.png" },
  { name: "ICICI Bank", logo: "https://i.pinimg.com/736x/ff/d5/31/ffd531a6a78464512a97848e14506738.jpg" },
  { name: "IOB Bank", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUB77Zf9NSBi6pyR-mx-YIgI_CZZjTQQFM7w&s" },
  { name: "Kotak Mahindra Bank", logo: "https://e7.pngegg.com/pngimages/333/464/png-clipart-kotak-mahindra-bank-logo-horizontal-bank-logos-thumbnail.png" },
  { name: "Axis Bank", logo: "https://icon2.cleanpng.com/20180531/jlo/kisspng-axis-bank-loan-bank-account-payment-5b0f85cf2b43f6.6580657115277439511772.jpg" },
  { name: "Union Bank", logo: "https://smest.in/_next/image?url=https%3A%2F%2Fissuer-master-article-logos.s3.ap-south-1.amazonaws.com%2FUNIONBANK.png&w=3840&q=75" },
  { name: "Bank Of Maharashtra", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcoOoZH9lJlcXLgHi9xYJ46UsLM-huNMXkA&s" }
];

const BanksSection = () => {
  return (
    <section className="py-10 bg-primary">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">Banks we work with</h2>
          <p className="text-xs lg:text-sm text-white/90 max-w-2xl mx-auto mb-2 lg:mb-3">
            From virtual tours to legal aid, Mumbai Homes delivers end-to-end
            support for a smoother, smarter, stress-free property journey.
          </p>
          <p className="text-xs lg:text-sm text-white/90 font-medium">
            Contact Us for more details
          </p>
        </div>

        {/* Static grid for large screens */}
        <div className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {banks.map((bank, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 flex-shrink-0">
                <img src={bank.logo} alt={bank.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-white font-semibold text-lg">{bank.name}</h3>
            </div>
          ))}
        </div>

        {/* Carousel for small screens */}
        <div className="lg:hidden">
          <Carousel
            plugins={[
              Autoplay({
                delay: 0,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
              duration: 15000,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {/* Duplicate banks for seamless loop */}
              {[...banks, ...banks].map((bank, index) => (
                <CarouselItem key={index} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4">
                  <div
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center justify-center h-20 w-full hover:bg-white/20 transition-colors duration-300"
                  >
                    <img src={bank.logo} alt={bank.name} className="h-full w-auto object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-6 lg:mt-8">
          <Button 
            variant="secondary" 
            size="default"
            className="bg-white text-primary hover:bg-white/90 px-5 py-2 text-sm font-semibold lg:px-6 lg:py-2 lg:text-base"
          >
            Get Loan Assistance
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BanksSection;