import { useState, useEffect } from "react";
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
  
  const [faqData, setFaqData] = useState<FrequentlyAskedQuestionsData>(websiteData.frequentlyAskedQuestions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  useEffect(() => {
    setFaqData(websiteData.frequentlyAskedQuestions);
  }, [websiteData.frequentlyAskedQuestions]);

  const handleInputChange = (field: keyof Omit<FrequentlyAskedQuestionsData, 'faqs'>, value: string) => {
    setFaqData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddFaq = () => {
    const newFaq: FAQ = {
      id: Date.now(),
      question: "",
      answer: ""
    };
    setEditingFaq(newFaq);
    setIsAddingFaq(true);
    setIsModalOpen(true);
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq({ ...faq });
    setIsAddingFaq(false);
    setIsModalOpen(true);
  };

  const handleSaveFaq = () => {
    if (!editingFaq) return;

    if (isAddingFaq) {
      setFaqData(prev => ({
        ...prev,
        faqs: [...prev.faqs, editingFaq]
      }));
    } else {
      setFaqData(prev => ({
        ...prev,
        faqs: prev.faqs.map(f => f.id === editingFaq.id ? editingFaq : f)
      }));
    }

    setEditingFaq(null);
    setIsAddingFaq(false);
    setIsModalOpen(false);
  };

  const handleDeleteFaq = (faqId: number) => {
    setFaqData(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== faqId)
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    updateFrequentlyAskedQuestions(faqData);
    toast({
      title: "Success",
      description: "FAQ section data saved successfully!",
    });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFaqData(websiteData.frequentlyAskedQuestions);
    setIsEditing(false);
    setIsModalOpen(false);
    setEditingFaq(null);
    setIsAddingFaq(false);
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">FAQ Configuration</h3>
        <div className="space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button onClick={handleEdit} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit FAQ Section</span>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Current FAQ Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current FAQ Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center">{faqData.title}</h3>
            <div className="space-y-3">
              {faqData.faqs.map((faq) => (
                <div key={faq.id} className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Edit Modal */}
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
                  <div key={faq.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{faq.answer}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditFaq(faq)}
                        >
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
                      onChange={(e) => setEditingFaq(prev => prev ? {...prev, question: e.target.value} : null)}
                      placeholder="Enter FAQ question"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="faqAnswer">Answer</Label>
                    <Textarea
                      id="faqAnswer"
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq(prev => prev ? {...prev, answer: e.target.value} : null)}
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
                    {isAddingFaq ? 'Add FAQ' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FrequentlyAskedQuestionsAdmin;
