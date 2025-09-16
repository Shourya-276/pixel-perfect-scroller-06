import { Button } from "@/components/ui/button";

const banks = [
  { name: "HDFC Bank", logo: "🏛️" },
  { name: "SBI Bank", logo: "🏛️" },
  { name: "Bank Of Baroda Bank", logo: "🏛️" },
  { name: "ICIC Bank", logo: "🏛️" },
  { name: "IOB Bank", logo: "🏛️" },
  { name: "Kotak Mahindra Bank", logo: "🏛️" },
  { name: "Axis Bank", logo: "🏛️" },
  { name: "Union Bank", logo: "🏛️" },
  { name: "Bank Of Maharashtra", logo: "🏛️" }
];

const BanksSection = () => {
  return (
    <section className="py-10 bg-primary">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Banks we work with</h2>
          <p className="text-sm text-white/90 max-w-2xl mx-auto mb-3">
            From virtual tours to legal aid, Mumbai Homes delivers end-to-end
            support for a smoother, smarter, stress-free property journey.
          </p>
          <p className="text-sm text-white/90 font-medium">
            Contact Us for more details
          </p>
        </div>

        {/* Banks grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {banks.map((bank, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-3 hover:bg-white/20 transition-colors duration-300"
            >
              <div className="bg-white rounded-lg p-2 flex items-center justify-center">
                <span className="text-lg">{bank.logo}</span>
              </div>
              <div className="text-white font-semibold text-base">
                {bank.name}
              </div>
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-8">
          <Button 
            variant="secondary" 
            size="default"
            className="bg-white text-primary hover:bg-white/90 px-6 py-2 text-base font-semibold"
          >
            Get Loan Assistance
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BanksSection;