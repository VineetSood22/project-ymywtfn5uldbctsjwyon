import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trip } from "@/entities";
import { Calendar, MapPin, Users, IndianRupee, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const ViewTrips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const allTrips = await Trip.list("-created_at", 50);
      setTrips(allTrips);
    } catch (error) {
      console.error("Error loading trips:", error);
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    try {
      await Trip.delete(tripId);
      toast.success("Trip deleted successfully");
      loadTrips();
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gradient">
            Your Saved Trips
          </h1>
          <p className="text-xl text-gray-600">
            {trips.length === 0 
              ? "No trips yet. Start planning your first adventure!"
              : `You have ${trips.length} saved trip${trips.length > 1 ? 's' : ''}`
            }
          </p>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <MapPin className="h-24 w-24 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No trips found</h3>
            <p className="text-gray-600 mb-6">Start planning your first trip to India!</p>
            <Button 
              onClick={() => navigate("/plan-trip")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Plan a Trip
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="hover:shadow-xl transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{trip.trip_name}</CardTitle>
                    <Badge className={
                      trip.status === "planned" ? "bg-green-500" :
                      trip.status === "completed" ? "bg-blue-500" :
                      "bg-gray-500"
                    }>
                      {trip.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                    {trip.famous_place}, {trip.state}
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                    {trip.start_date && format(new Date(trip.start_date), "MMM dd")} - {trip.end_date && format(new Date(trip.end_date), "MMM dd, yyyy")}
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2 text-orange-500" />
                    {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <IndianRupee className="h-4 w-4 mr-2 text-orange-500" />
                    ₹{trip.budget?.toLocaleString()}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button 
                      onClick={() => navigate(`/trip/${trip.id}`)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTrip(trip.id);
                      }}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AIAssistant />
    </div>
  );
};

export default ViewTrips;