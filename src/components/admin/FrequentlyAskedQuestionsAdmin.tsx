import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, Plus, Trash2 } from "lucide-react";
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

const FrequentlyAskedQuestionsAdmin = () => {
  const { toast } = useToast();
  const { websiteData, updateFrequentlyAskedQuestions } = useWebsiteData();
  const [faqData, setFaqData] = useState<FrequentlyAskedQuestionsData>({
    title: websiteData.frequentlyAskedQuestions.title || "Frequently Asked Questions",
    faqs: Array.isArray(websiteData.frequentlyAskedQuestions.faqs)
      ? websiteData.frequentlyAskedQuestions.faqs.map(faq => ({
          ...faq,
          question: faq.question || '',
          answer: faq.answer || '',
        }))
      : [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  const handleInputChange = (field: keyof Omit<FrequentlyAskedQuestionsData, 'faqs'>, value: string) => {
    setFaqData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddFaq = () => {
    setEditingFaq({
      id: Date.now(),
      question: "",
      answer: "",
    });
    setIsAddingFaq(true);
    setIsModalOpen(true);
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq({ ...faq });
    setIsAddingFaq(false);
    setIsModalOpen(true);
  };

  const handleSaveFaq = () => {
    if (!editingFaq || !editingFaq.question || !editingFaq.answer) {
      toast({
        title: "Error",
        description: "FAQ requires a question and answer",
        variant: "destructive",
      });
      return;
    }

    if (faqData.faqs.some(f => f.question === editingFaq.question && f.id !== editingFaq.id)) {
      toast({
        title: "Error",
        description: `An FAQ with the question "${editingFaq.question}" already exists`,
        variant: "destructive",
      });
      return;
    }

    setFaqData(prev => ({
      ...prev,
      faqs: isAddingFaq
        ? [...prev.faqs, editingFaq]
        : prev.faqs.map(f => (f.id === editingFaq.id ? editingFaq : f)),
    }));
    setEditingFaq(null);
    setIsAddingFaq(false);
    setIsModalOpen(false);
    toast({ title: "Success", description: "FAQ saved successfully" });
  };

  const handleDeleteFaq = (faqId: number) => {
    setFaqData(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== faqId),
    }));
    toast({ title: "Success", description: "FAQ deleted successfully" });
  };

  const handleSaveAll = () => {
    if (!faqData.title) {
      toast({
        title: "Error",
        description: "Section title is required",
        variant: "destructive",
      });
      return;
    }
    console.log('Saving faqData:', faqData);
    updateFrequentlyAskedQuestions(faqData);
    setIsModalOpen(false);
    toast({
      title: "Success",
      description: "FAQ section saved successfully!",
      duration: 2000,
    });
  };

  const handleCancel = () => {
    setFaqData({
      title: websiteData.frequentlyAskedQuestions.title || "Frequently Asked Questions",
      faqs: Array.isArray(websiteData.frequentlyAskedQuestions.faqs)
        ? websiteData.frequentlyAskedQuestions.faqs.map(faq => ({
            ...faq,
            question: faq.question || '',
            answer: faq.answer || '',
          }))
        : [],
    });
    setEditingFaq(null);
    setIsAddingFaq(false);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">FAQ Configuration</h3>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
          <Edit className="h-4 w-4" />
          <span>Edit FAQ Section</span>
        </Button>
      </div>

      <Separator />

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current FAQ Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">{faqData.title}</h3>
            <div className="space-y-3">
              {faqData.faqs.length === 0 ? (
                <p className="text-center text-gray-500">No FAQs available.</p>
              ) : (
                faqData.faqs.map((faq) => (
                  <div key={faq.id} className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit FAQ Section</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Section Title */}
            <div className="space-y-2">
              <Label htmlFor="sectionTitle">Section Title</Label>
              <Input
                id="sectionTitle"
                value={faqData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>

            {/* FAQ Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Frequently Asked Questions</Label>
                <Button onClick={handleAddFaq} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add FAQ</span>
                </Button>
              </div>
              <div className="space-y-4">
                {faqData.faqs.map((faq) => (
                  <div key={faq.id} className="border rounded-lg p-4 flex items-start space-x-4">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{faq.answer}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditFaq(faq)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Edit Form */}
            {editingFaq && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">
                  {isAddingFaq ? 'Add New FAQ' : 'Edit FAQ'}
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="faqQuestion">Question</Label>
                    <Input
                      id="faqQuestion"
                      value={editingFaq.question}
                      onChange={(e) => setEditingFaq(prev => prev ? { ...prev, question: e.target.value } : null)}
                      placeholder="Enter FAQ question"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faqAnswer">Answer</Label>
                    <Textarea
                      id="faqAnswer"
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq(prev => prev ? { ...prev, answer: e.target.value } : null)}
                      placeholder="Enter FAQ answer"
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditingFaq(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveFaq}>
                    {isAddingFaq ? 'Add FAQ' : 'Save FAQ'}
                  </Button>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSaveAll} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save All</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FrequentlyAskedQuestionsAdmin;