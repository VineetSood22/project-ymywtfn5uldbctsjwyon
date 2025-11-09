import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-4 animate-fade-in">
            <Sparkles className="h-6 w-6 text-orange-400" />
            <span className="text-orange-400 font-semibold">AI-Powered Travel Planning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover the Magic of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-green-400">
              Incredible India
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in">
            Plan your perfect journey across India with our intelligent AI assistant. 
            From the Himalayas to the beaches of Goa, create unforgettable memories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Link to="/plan-trip">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Plan Your Trip Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg">
              <MapPin className="mr-2 h-5 w-5" />
              Explore Destinations
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold text-orange-400">500+</div>
              <div className="text-sm text-gray-300">Destinations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">10K+</div>
              <div className="text-sm text-gray-300">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">4.9★</div>
              <div className="text-sm text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;