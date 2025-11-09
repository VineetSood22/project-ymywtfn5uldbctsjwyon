import Navbar from "@/components/Navbar";
import TripPlanningForm from "@/components/TripPlanningForm";
import AIAssistant from "@/components/AIAssistant";

const PlanTrip = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gradient">
            Plan Your Dream Trip
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let our AI create a personalized itinerary just for you. Answer a few questions and get a complete travel plan in minutes!
          </p>
        </div>

        <TripPlanningForm />
      </div>

      <AIAssistant />
    </div>
  );
};

export default PlanTrip;