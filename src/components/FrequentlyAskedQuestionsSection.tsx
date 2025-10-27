import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";

// Define interfaces within the file
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FrequentlyAskedQuestionsData {
  title: string;
  faqs: FAQ[];
}

const FrequentlyAskedQuestionsSection = () => {
  const { websiteData } = useWebsiteData();
  const { title, faqs } = websiteData.frequentlyAskedQuestions as FrequentlyAskedQuestionsData;

  console.log('FrequentlyAskedQuestionsSection data:', { title, faqIds: faqs.map(f => f.id) });

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-4xl font-bold text-gray-800 mb-4">
            {title || "Frequently Asked Questions"}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {faqs.length === 0 ? (
            <p className="text-center text-gray-500">No FAQs available.</p>
          ) : (
            <Accordion type="single" collapsible className="space-y-3 lg:space-y-4">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="rounded-lg shadow-sm border border-gray-200"
                  style={{ backgroundColor: "#DAEFFF" }}
                >
                  <AccordionTrigger className="px-4 py-3 text-left text-gray-800 hover:no-underline [&[data-state=open]>svg]:rotate-45 lg:px-6 lg:py-4">
                    <span className="text-base font-medium lg:text-lg">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 text-gray-600 lg:px-6 lg:pb-4 text-sm lg:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestionsSection;