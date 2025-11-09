import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageData: any;
}

const PaymentModal = ({ open, onOpenChange, packageData }: PaymentModalProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv || !name) {
      toast.error("Please fill all payment details");
      return;
    }
    
    toast.success("Payment successful! Booking confirmed.");
    onOpenChange(false);
    
    // Reset form
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setName("");
  };

  if (!packageData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2 text-green-600" />
            Secure Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Summary */}
          <div className="bg-gradient-to-r from-orange-50 to-green-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">{packageData.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{packageData.duration}</p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-sm">Total Amount:</span>
              <span className="text-2xl font-bold text-orange-600">₹{packageData.price?.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  className="mt-1 pl-10"
                />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <Button 
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white py-6 text-lg"
          >
            <Lock className="mr-2 h-5 w-5" />
            Pay ₹{packageData.price?.toLocaleString()}
          </Button>

          <p className="text-xs text-center text-gray-500">
            🔒 This is a demo payment. No actual charges will be made.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;