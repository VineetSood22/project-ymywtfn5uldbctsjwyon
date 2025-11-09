import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Coffee, Car, ExternalLink } from "lucide-react";

interface Stay {
  name: string;
  type: string;
  price: number;
  rating: number;
  amenities: string[];
  location: string;
  booking_url?: string;
}

interface StaysTabProps {
  stays: Stay[];
  destination: string;
}

const StaysTab = ({ stays, destination }: StaysTabProps) => {
  const handleBooking = (stay: Stay) => {
    const searchQuery = `${stay.name} ${destination}`;
    const bookingUrl = stay.booking_url || `https://www.booking.com/search.html?ss=${encodeURIComponent(searchQuery)}`;
    window.open(bookingUrl, '_blank');
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('breakfast')) return <Coffee className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('parking')) return <Car className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Recommended Stays</h2>
        <p className="text-gray-600">Handpicked accommodations matching your budget and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stays?.map((stay, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{stay.name}</CardTitle>
                  <Badge variant="outline" className="mb-2">{stay.type}</Badge>
                </div>
                <div className="flex items-center bg-orange-100 px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-orange-500 fill-orange-500 mr-1" />
                  <span className="font-bold text-orange-700">{stay.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                  {stay.location || destination}
                </div>

                <div className="flex flex-wrap gap-2">
                  {stay.amenities?.slice(0, 4).map((amenity, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Per night</p>
                    <p className="text-2xl font-bold text-orange-600">₹{stay.price?.toLocaleString()}</p>
                  </div>
                  <Button 
                    onClick={() => handleBooking(stay)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StaysTab;