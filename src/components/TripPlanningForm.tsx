import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Loader2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { indianStates, famousPlacesByState, travelInterests } from "@/lib/indiaData";
import { invokeLLM } from "@/integrations/core";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Trip } from "@/entities";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TripFormData {
    tripName: string;
    destination: string;
    departureFrom: string;
    state: string;
    famousPlace: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    budget: number;
    customBudget: boolean;
    travelers: number;
    interests: string[];
}

const TripPlanningForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [formData, setFormData] = useState<TripFormData>({
        tripName: "",
        destination: "",
        departureFrom: "",
        state: "",
        famousPlace: "",
        startDate: undefined,
        endDate: undefined,
        budget: 20000,
        customBudget: false,
        travelers: 1,
        interests: []
    });

    const totalSteps = 8;

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const generateTrip = async () => {
        setIsGenerating(true);
        setGenerationError(null);
        
        try {
            const days = formData.startDate && formData.endDate 
                ? Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24))
                : 5;

            console.log("Generating trip with data:", formData);

            // Simplified prompt for better reliability
            const prompt = `Create a detailed ${days}-day travel itinerary for ${formData.famousPlace}, ${formData.state}, India.

Trip Details:
- Travelers: ${formData.travelers} people
- Budget: ₹${formData.budget} total
- Interests: ${formData.interests.join(", ")}
- Departure from: ${formData.departureFrom}

Provide a complete JSON response with these sections:
1. stays: Array of 5-7 accommodation options with name, type, price per night, rating, amenities array, location
2. transport: Object with flight, train, bus options including duration, cost, recommendation
3. itinerary: Array of ${days} day objects with day number, title, activities array (each with name, time, description, location)
4. weather: Object with condition, description, temperature object (high, low, average), humidity, rainfall, clothing_suggestions array
5. places: Array of 8-10 tourist spots with name, description, rating, category, location, best_time
6. cuisine: Object with must_try_dishes array, popular_restaurants array, street_food array
7. activities: Array of 5-8 activities with name, description, duration
8. distance: Object with total_distance, travel_time, estimated_cost, by_mode array, route_info
9. crowd: Object with current_level, occupancy_percentage, current_description, best_months array, avoid_months array, tips array
10. budget_breakdown: Object with accommodation, food, transport, activities, miscellaneous (all numbers)
11. packing_list: Array of 10-15 essential items

Make it realistic and budget-appropriate.`;

            let tripData;
            let retryCount = 0;
            const maxRetries = 2;

            while (retryCount <= maxRetries) {
                try {
                    console.log(`Attempt ${retryCount + 1} to generate trip...`);
                    
                    tripData = await invokeLLM({
                        prompt: prompt,
                        response_json_schema: {
                            type: "object",
                            properties: {
                                stays: { 
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            name: { type: "string" },
                                            type: { type: "string" },
                                            price: { type: "number" },
                                            rating: { type: "number" },
                                            amenities: { type: "array", items: { type: "string" } },
                                            location: { type: "string" }
                                        }
                                    }
                                },
                                transport: { 
                                    type: "object",
                                    additionalProperties: true
                                },
                                itinerary: { 
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            day: { type: "number" },
                                            title: { type: "string" },
                                            activities: { 
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        name: { type: "string" },
                                                        time: { type: "string" },
                                                        description: { type: "string" },
                                                        location: { type: "string" }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                weather: { 
                                    type: "object",
                                    additionalProperties: true
                                },
                                places: { 
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            name: { type: "string" },
                                            description: { type: "string" },
                                            rating: { type: "number" },
                                            category: { type: "string" },
                                            location: { type: "string" },
                                            best_time: { type: "string" }
                                        }
                                    }
                                },
                                cuisine: { 
                                    type: "object",
                                    additionalProperties: true
                                },
                                activities: { 
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            name: { type: "string" },
                                            description: { type: "string" },
                                            duration: { type: "string" }
                                        }
                                    }
                                },
                                distance: { 
                                    type: "object",
                                    additionalProperties: true
                                },
                                crowd: { 
                                    type: "object",
                                    additionalProperties: true
                                },
                                budget_breakdown: { 
                                    type: "object",
                                    properties: {
                                        accommodation: { type: "number" },
                                        food: { type: "number" },
                                        transport: { type: "number" },
                                        activities: { type: "number" },
                                        miscellaneous: { type: "number" }
                                    }
                                },
                                packing_list: { 
                                    type: "array",
                                    items: { type: "string" }
                                }
                            }
                        }
                    });

                    console.log("Trip data generated successfully:", tripData);
                    break; // Success, exit retry loop
                    
                } catch (error) {
                    console.error(`Attempt ${retryCount + 1} failed:`, error);
                    retryCount++;
                    
                    if (retryCount > maxRetries) {
                        throw error; // All retries exhausted
                    }
                    
                    // Wait before retrying (exponential backoff)
                    await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                }
            }

            if (!tripData) {
                throw new Error("Failed to generate trip data after multiple attempts");
            }

            console.log("Saving trip to database...");

            const savedTrip = await Trip.create({
                trip_name: formData.tripName,
                destination: formData.destination,
                departure_from: formData.departureFrom,
                state: formData.state,
                famous_place: formData.famousPlace,
                start_date: formData.startDate?.toISOString() || "",
                end_date: formData.endDate?.toISOString() || "",
                budget: formData.budget,
                travelers: formData.travelers,
                interests: formData.interests,
                trip_data: tripData,
                status: "planned"
            });

            console.log("Trip saved successfully:", savedTrip);

            toast.success("Your trip has been generated successfully!");
            navigate(`/trip/${savedTrip.id}`);
            
        } catch (error: any) {
            console.error("Error generating trip:", error);
            
            let errorMessage = "We're having trouble generating your trip right now. ";
            
            if (error.message?.includes("fetch")) {
                errorMessage += "This might be a temporary connection issue. Please try again in a moment.";
            } else if (error.message?.includes("timeout")) {
                errorMessage += "The request took too long. Please try again.";
            } else {
                errorMessage += "Please check your internet connection and try again.";
            }
            
            setGenerationError(errorMessage);
            toast.error("Failed to generate trip", {
                description: errorMessage
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="tripName">What would you like to name this trip?</Label>
                            <Input
                                id="tripName"
                                placeholder="e.g., Summer Vacation 2024"
                                value={formData.tripName}
                                onChange={(e) => updateFormData("tripName", e.target.value)}
                                className="mt-2"
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="destination">Where do you want to go?</Label>
                            <Input
                                id="destination"
                                placeholder="Enter destination"
                                value={formData.destination}
                                onChange={(e) => updateFormData("destination", e.target.value)}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="departureFrom">Departing from?</Label>
                            <Input
                                id="departureFrom"
                                placeholder="Your city"
                                value={formData.departureFrom}
                                onChange={(e) => updateFormData("departureFrom", e.target.value)}
                                className="mt-2"
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Select State</Label>
                            <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Choose a state" />
                                </SelectTrigger>
                                <SelectContent>
                                    {indianStates.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Select Famous Place</Label>
                            <Select 
                                value={formData.famousPlace} 
                                onValueChange={(value) => updateFormData("famousPlace", value)}
                                disabled={!formData.state}
                            >
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder={formData.state ? "Choose a place" : "Select state first"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {formData.state && famousPlacesByState[formData.state]?.map((place) => (
                                        <SelectItem key={place} value={place}>
                                            {place}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Select Travel Dates</Label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="justify-start text-left font-normal">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.startDate ? format(formData.startDate, "PPP") : "Start date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                                        <Calendar
                                            mode="single"
                                            selected={formData.startDate}
                                            onSelect={(date) => updateFormData("startDate", date)}
                                            initialFocus
                                            className="pointer-events-auto"
                                        />
                                    </PopoverContent>
                                </Popover>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="justify-start text-left font-normal">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.endDate ? format(formData.endDate, "PPP") : "End date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                                        <Calendar
                                            mode="single"
                                            selected={formData.endDate}
                                            onSelect={(date) => updateFormData("endDate", date)}
                                            initialFocus
                                            disabled={(date) => formData.startDate ? date < formData.startDate : false}
                                            className="pointer-events-auto"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="budget">What's your budget? (₹)</Label>
                            <div className="mt-2 space-y-4">
                                {!formData.customBudget && (
                                    <Select 
                                        value={formData.budget.toString()} 
                                        onValueChange={(value) => updateFormData("budget", parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10000">₹10,000 - Budget</SelectItem>
                                            <SelectItem value="25000">₹25,000 - Moderate</SelectItem>
                                            <SelectItem value="50000">₹50,000 - Comfortable</SelectItem>
                                            <SelectItem value="100000">₹1,00,000 - Luxury</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                                
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="customBudget"
                                        checked={formData.customBudget}
                                        onCheckedChange={(checked) => updateFormData("customBudget", checked)}
                                    />
                                    <Label htmlFor="customBudget">Enter custom budget</Label>
                                </div>

                                {formData.customBudget && (
                                    <Input
                                        type="number"
                                        placeholder="Enter amount"
                                        value={formData.budget}
                                        onChange={(e) => updateFormData("budget", parseInt(e.target.value) || 0)}
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="travelers">Number of travelers</Label>
                            <Input
                                id="travelers"
                                type="number"
                                min="1"
                                value={formData.travelers}
                                onChange={(e) => updateFormData("travelers", parseInt(e.target.value) || 1)}
                                className="mt-2"
                            />
                        </div>
                    </div>
                );

            case 7:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>What are your interests?</Label>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {travelInterests.map((interest) => (
                                    <div key={interest} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={interest}
                                            checked={formData.interests.includes(interest)}
                                            onCheckedChange={() => toggleInterest(interest)}
                                        />
                                        <Label htmlFor={interest} className="cursor-pointer">
                                            {interest}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 8:
                return (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-orange-50 to-green-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">Trip Summary</h3>
                            <div className="space-y-2 text-sm">
                                <p><strong>Trip Name:</strong> {formData.tripName}</p>
                                <p><strong>Destination:</strong> {formData.famousPlace}, {formData.state}</p>
                                <p><strong>Dates:</strong> {formData.startDate && format(formData.startDate, "PPP")} to {formData.endDate && format(formData.endDate, "PPP")}</p>
                                <p><strong>Budget:</strong> ₹{formData.budget.toLocaleString()}</p>
                                <p><strong>Travelers:</strong> {formData.travelers}</p>
                                <p><strong>Interests:</strong> {formData.interests.join(", ")}</p>
                            </div>
                        </div>

                        {generationError && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{generationError}</AlertDescription>
                            </Alert>
                        )}
                        
                        <Button
                            onClick={generateTrip}
                            disabled={isGenerating}
                            className="w-full bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white py-6 text-lg"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Generating Your Perfect Trip...
                                </>
                            ) : (
                                "Generate Trip"
                            )}
                        </Button>

                        {generationError && (
                            <p className="text-sm text-center text-muted-foreground">
                                Having trouble? Try refreshing the page or check your internet connection.
                            </p>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    const canProceed = () => {
        switch (step) {
            case 1: return formData.tripName.trim() !== "";
            case 2: return formData.destination.trim() !== "" && formData.departureFrom.trim() !== "";
            case 3: return formData.state !== "";
            case 4: return formData.famousPlace !== "";
            case 5: return formData.startDate && formData.endDate;
            case 6: return formData.budget > 0 && formData.travelers > 0;
            case 7: return formData.interests.length > 0;
            default: return true;
        }
    };

    return (
        <Card className="max-w-2xl mx-auto shadow-xl">
            <CardHeader>
                <CardTitle className="text-center">
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
                            <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-orange-500 to-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(step / totalSteps) * 100}%` }}
                            />
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {renderStep()}
                
                <div className="flex justify-between mt-8">
                    <Button
                        onClick={handleBack}
                        disabled={step === 1 || isGenerating}
                        variant="outline"
                    >
                        Back
                    </Button>
                    
                    {step < totalSteps && (
                        <Button
                            onClick={handleNext}
                            disabled={!canProceed() || isGenerating}
                            className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
                        >
                            Next
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TripPlanningForm;