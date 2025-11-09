import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";

interface PlacesTabProps {
  places: any[];
}

const PlacesTab = ({ places }: PlacesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Places to Visit</h2>
        <p className="text-gray-600">Explore the best attractions and hidden gems</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places?.map((place, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
            <div className="relative h-48 overflow-hidden">
              <img
                src={place.image || `https://images.unsplash.com/photo-${1500000000000 + index}?w=600`}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600";
                }}
              />
              {place.rating && (
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold text-sm">{place.rating}</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{place.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{place.description}</p>
              
              <div className="space-y-2">
                {place.location && (
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {place.location}
                  </div>
                )}
                {place.best_time && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Best time: {place.best_time}
                  </div>
                )}
                {place.category && (
                  <Badge variant="secondary" className="text-xs">
                    {place.category}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlacesTab;