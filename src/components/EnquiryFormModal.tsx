import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import sujiLogo from "@/assets/mumbai-homes-logo.png"; // Assuming a logo asset for the form
import { X } from "lucide-react";

interface EnquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnquiryFormModal: React.FC<EnquiryFormModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Hello, I am interested in");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the Terms of Use.");
      return;
    }
    // Handle form submission logic here
    console.log({ username, phone, email, message, agreedToTerms });
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-3 right-3 p-2"
        >
          <X className="h-5 w-5 text-gray-600" />
        </Button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Suji Builders and Developers</h2>
          <img src={sujiLogo} alt="Suji Builders Logo" className="mx-auto h-12 w-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-100 border-none"
          />
          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-100 border-none"
          />
          <Input
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 border-none"
          />
          <Textarea
            placeholder="Hello, I am interested in"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="bg-gray-100 border-none resize-none"
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              By submitting this form I agree to <a href="#" className="underline">Terms of Use</a>
            </Label>
          </div>

          <Button type="submit" className="w-full bg-[#0D6ABC] hover:bg-[#0D6ABC]/90">
            Enquire Now
          </Button>
          <Button type="button" className="w-full bg-green-500 hover:bg-green-600">
            Whatsapp
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryFormModal;
