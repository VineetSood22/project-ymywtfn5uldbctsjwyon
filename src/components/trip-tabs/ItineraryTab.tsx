import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Utensils, Camera } from "lucide-react";

interface ItineraryTabProps {
  itinerary: any[];
}

const ItineraryTab = ({ itinerary }: ItineraryTabProps) => {
  const getActivityIcon = (activity: string) => {
    const lower = activity.toLowerCase();
    if (lower.includes('food') || lower.includes('lunch') || lower.includes('dinner')) {
      return <Utensils className="h-4 w-4" />;
    }
    if (lower.includes('photo') || lower.includes('view')) {
      return <Camera className="h-4 w-4" />;
    }
    return <MapPin className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Itinerary</h2>
        <p className="text-gray-600">Day-by-day plan for your perfect trip</p>
      </div>

      <div className="space-y-6">
        {itinerary?.map((day, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
              <h3 className="text-xl font-bold">Day {day.day || index + 1}</h3>
              <p className="text-orange-100">{day.title || day.theme}</p>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                {day.activities?.map((activity: any, actIdx: number) => (
                  <div key={actIdx} className="flex space-x-4 pb-4 border-b last:border-b-0">
                    <div className="flex-shrink-0">
                      <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                        {getActivityIcon(activity.name || activity)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{activity.name || activity}</h4>
                        {activity.time && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.time}
                          </Badge>
                        )}
                      </div>
                      {activity.description && (
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      )}
                      {activity.location && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {activity.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ItineraryTab;