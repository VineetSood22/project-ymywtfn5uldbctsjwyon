import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import PrebuiltPackages from "@/components/PrebuiltPackages";
import AIAssistant from "@/components/AIAssistant";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, HeartHandshake, Sparkles, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturedDestinations />
      
      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-lg">Your trusted partner for unforgettable Indian adventures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">AI-Powered Planning</h3>
                <p className="text-sm text-gray-600">Smart recommendations tailored to your preferences</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Trusted & Secure</h3>
                <p className="text-sm text-gray-600">Safe bookings with verified partners</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">Always here to help you</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Instant Planning</h3>
                <p className="text-sm text-gray-600">Get your itinerary in minutes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PrebuiltPackages />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gradient">Incredible India Tours</h3>
              <p className="text-gray-400 text-sm">
                Your AI-powered travel companion for exploring the beauty of India
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/" className="hover:text-orange-400">Home</a></li>
                <li><a href="/plan-trip" className="hover:text-orange-400">Plan a Trip</a></li>
                <li><a href="/view-trips" className="hover:text-orange-400">View Trips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Popular Destinations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Rajasthan</li>
                <li>Kerala</li>
                <li>Goa</li>
                <li>Himachal Pradesh</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@incredibleindiatours.com</li>
                <li>Phone: +91 1800-123-4567</li>
                <li>Support: 24/7 Available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Incredible India Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default Index;