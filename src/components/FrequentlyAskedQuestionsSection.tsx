import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: 1,
    question: "What makes Swastik Group a trusted name in real estate in Vikhroli?",
    answer: "Swastik Group has been a trusted name in real estate for over 2 decades, delivering quality projects with timely completion and excellent customer service. We focus on creating sustainable communities with modern amenities and infrastructure."
  },
  {
    id: 2,
    question: "What types of residential projects does Swastik Group offer in Vikhroli?",
    answer: "We offer a wide range of residential projects including affordable housing, premium apartments, luxury penthouses, and integrated townships with all modern amenities and facilities."
  },
  {
    id: 3,
    question: "Why should I invest in Swastik Group's new projects in Vikhroli?",
    answer: "Vikhroli is a rapidly developing area with excellent connectivity, infrastructure development, and appreciation potential. Our projects offer premium amenities, strategic locations, and competitive pricing with flexible payment plans."
  },
  {
    id: 4,
    question: "How does Swastik Group ensure quality and sustainability in its real estate projects?",
    answer: "We follow strict quality control measures, use premium materials, employ experienced contractors, and incorporate sustainable building practices. All our projects are developed with environmental consciousness and energy efficiency in mind."
  },
  {
    id: 5,
    question: "How can I learn more about upcoming residential projects by Swastik Group in Vikhroli?",
    answer: "You can visit our website, contact our sales team, visit our experience centers, or schedule a site visit. We provide detailed project information, floor plans, pricing, and assistance with site visits and documentation."
  }
];

const FrequentlyAskedQuestionsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="rounded-lg shadow-sm border border-gray-200"
                style={{ backgroundColor: '#DAEFFF' }}
              >
                <AccordionTrigger className="px-6 py-4 text-left text-gray-800 hover:no-underline [&[data-state=open]>svg]:rotate-45">
                  <span className="text-lg font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestionsSection;