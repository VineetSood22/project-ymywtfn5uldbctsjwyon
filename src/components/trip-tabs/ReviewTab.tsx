import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReviewTabProps {
  tripId?: string;
  onSave?: () => void;
}

const ReviewTab = ({ tripId, onSave }: ReviewTabProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const sampleReviews = [
    {
      author: "Priya Sharma",
      rating: 5,
      date: "2 weeks ago",
      text: "Amazing trip! The itinerary was perfect and covered all major attractions. Highly recommend!"
    },
    {
      author: "Rahul Verma",
      rating: 4,
      date: "1 month ago",
      text: "Great experience overall. The hotel recommendations were spot on. Would have loved more local food suggestions."
    },
    {
      author: "Anjali Patel",
      rating: 5,
      date: "3 weeks ago",
      text: "Best vacation ever! Everything was well planned and the budget breakdown helped us save money."
    }
  ];

  const handleSaveTrip = () => {
    if (onSave) {
      onSave();
    }
    toast.success("Trip saved successfully! You can access it from View Trips.");
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!review.trim()) {
      toast.error("Please write a review");
      return;
    }
    toast.success("Thank you for your review!");
    setRating(0);
    setReview("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Reviews & Feedback</h2>
        <p className="text-gray-600">Share your experience and save your trip</p>
      </div>

      {/* Save Trip Card */}
      <Card className="bg-gradient-to-r from-orange-500 to-green-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Love this itinerary?</h3>
          <p className="mb-6 text-white/90">
            Save this trip to access it anytime from your dashboard
          </p>
          <Button 
            onClick={handleSaveTrip}
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100"
          >
            Save This Trip
          </Button>
        </CardContent>
      </Card>

      {/* Write Review */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-orange-500" />
            Write a Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Rate this destination</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredStar || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Share your experience</p>
            <Textarea
              placeholder="Tell us about your trip..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSubmitReview}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            Submit Review
          </Button>
        </CardContent>
      </Card>

      {/* Sample Reviews */}
      <div>
        <h3 className="text-2xl font-bold mb-4">What Others Say</h3>
        <div className="space-y-4">
          {sampleReviews.map((review, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold">{review.author}</h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                  <button className="flex items-center hover:text-orange-500">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful (12)
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewTab;