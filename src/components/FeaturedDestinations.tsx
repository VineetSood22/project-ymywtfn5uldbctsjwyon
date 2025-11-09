import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const destinations = [
  {
    name: "Taj Mahal, Agra",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600",
    description: "Symbol of eternal love"
  },
  {
    name: "Kerala Backwaters",
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600",
    description: "Serene houseboat experience"
  },
  {
    name: "Jaipur Pink City",
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600",
    description: "Royal palaces and forts"
  },
  {
    name: "Goa Beaches",
    state: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
    description: "Sun, sand, and sea"
  },
  {
    name: "Manali Hills",
    state: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600",
    description: "Himalayan paradise"
  },
  {
    name: "Varanasi Ghats",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600",
    description: "Spiritual capital of India"
  }
];

const FeaturedDestinations = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Explore Incredible India
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From ancient monuments to pristine beaches, discover the diverse beauty of India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                  <div className="flex items-center text-sm text-gray-200">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.state}
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600">{destination.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;