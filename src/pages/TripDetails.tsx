import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trip } from "@/entities";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Import all tab components
import StaysTab from "@/components/trip-tabs/StaysTab";
import TransportTab from "@/components/trip-tabs/TransportTab";
import ItineraryTab from "@/components/trip-tabs/ItineraryTab";
import WeatherTab from "@/components/trip-tabs/WeatherTab";
import PlacesTab from "@/components/trip-tabs/PlacesTab";
import CuisineTab from "@/components/trip-tabs/CuisineTab";
import DistanceTab from "@/components/trip-tabs/DistanceTab";
import CrowdTab from "@/components/trip-tabs/CrowdTab";
import BudgetTab from "@/components/trip-tabs/BudgetTab";
import PackingTab from "@/components/trip-tabs/PackingTab";
import ReviewTab from "@/components/trip-tabs/ReviewTab";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrip();
  }, [id]);

  const loadTrip = async () => {
    try {
      if (!id) return;
      const tripData = await Trip.get(id);
      setTrip(tripData);
    } catch (error) {
      console.error("Error loading trip:", error);
      toast.error("Failed to load trip details");
      navigate("/view-trips");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600">Trip not found</p>
        </div>
      </div>
    );
  }

  const tripData = trip.trip_data || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/view-trips")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Trips
        </Button>

        {/* Trip Header */}
        <div className="bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">{trip.trip_name}</h1>
          <p className="text-xl text-orange-100">{trip.famous_place}, {trip.state}</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="stays" className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-11 gap-2 h-auto bg-white p-2 rounded-lg shadow mb-8">
            <TabsTrigger value="stays" className="text-xs md:text-sm">Stays</TabsTrigger>
            <TabsTrigger value="transport" className="text-xs md:text-sm">Transport</TabsTrigger>
            <TabsTrigger value="itinerary" className="text-xs md:text-sm">Itinerary</TabsTrigger>
            <TabsTrigger value="weather" className="text-xs md:text-sm">Weather</TabsTrigger>
            <TabsTrigger value="places" className="text-xs md:text-sm">Places</TabsTrigger>
            <TabsTrigger value="cuisine" className="text-xs md:text-sm">Cuisine</TabsTrigger>
            <TabsTrigger value="distance" className="text-xs md:text-sm">Distance</TabsTrigger>
            <TabsTrigger value="crowd" className="text-xs md:text-sm">Crowd</TabsTrigger>
            <TabsTrigger value="budget" className="text-xs md:text-sm">Budget</TabsTrigger>
            <TabsTrigger value="packing" className="text-xs md:text-sm">Packing</TabsTrigger>
            <TabsTrigger value="review" className="text-xs md:text-sm">Review</TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <TabsContent value="stays">
              <StaysTab stays={tripData.stays} destination={trip.famous_place} />
            </TabsContent>

            <TabsContent value="transport">
              <TransportTab 
                transport={tripData.transport} 
                departureFrom={trip.departure_from}
                destination={trip.famous_place}
              />
            </TabsContent>

            <TabsContent value="itinerary">
              <ItineraryTab itinerary={tripData.itinerary} />
            </TabsContent>

            <TabsContent value="weather">
              <WeatherTab weather={tripData.weather} />
            </TabsContent>

            <TabsContent value="places">
              <PlacesTab places={tripData.places} />
            </TabsContent>

            <TabsContent value="cuisine">
              <CuisineTab cuisine={tripData.cuisine} activities={tripData.activities} />
            </TabsContent>

            <TabsContent value="distance">
              <DistanceTab distance={tripData.distance} />
            </TabsContent>

            <TabsContent value="crowd">
              <CrowdTab crowd={tripData.crowd} />
            </TabsContent>

            <TabsContent value="budget">
              <BudgetTab 
                budgetBreakdown={tripData.budget_breakdown} 
                totalBudget={trip.budget}
              />
            </TabsContent>

            <TabsContent value="packing">
              <PackingTab packingList={tripData.packing_list} />
            </TabsContent>

            <TabsContent value="review">
              <ReviewTab tripId={trip.id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <AIAssistant />
    </div>
  );
};

export default TripDetails;