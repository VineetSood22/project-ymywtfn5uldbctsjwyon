import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, IndianRupee, MapPin } from "lucide-react";
import { prebuiltPackages } from "@/lib/indiaData";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

const PrebuiltPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const handleBookNow = (pkg: any) => {
    setSelectedPackage(pkg);
    setPaymentModalOpen(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Popular Tour Packages
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handcrafted itineraries for the best travel experiences across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prebuiltPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-orange-500">
                  Popular
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                    <span className="text-sm">{pkg.destinations.join(" → ")}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-orange-500" />
                    <span className="text-sm">{pkg.duration}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Highlights:</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <div className="flex items-center text-2xl font-bold text-orange-600">
                      <IndianRupee className="h-5 w-5" />
                      {pkg.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  onClick={() => handleBookNow(pkg)}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        packageData={selectedPackage}
      />
    </section>
  );
};

export default PrebuiltPackages;