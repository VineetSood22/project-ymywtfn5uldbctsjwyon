import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Train, Car, Bus, Ship, ExternalLink } from "lucide-react";

interface TransportTabProps {
  transport: any;
  departureFrom: string;
  destination: string;
}

const TransportTab = ({ transport, departureFrom, destination }: TransportTabProps) => {
  const transportModes = [
    { 
      name: "Flight", 
      icon: Plane, 
      color: "text-blue-500",
      url: `https://www.makemytrip.com/flight/search?from=${departureFrom}&to=${destination}`,
      ...transport?.flight
    },
    { 
      name: "Train", 
      icon: Train, 
      color: "text-green-500",
      url: `https://www.irctc.co.in/`,
      ...transport?.train
    },
    { 
      name: "Bus", 
      icon: Bus, 
      color: "text-orange-500",
      url: `https://www.redbus.in/`,
      ...transport?.bus
    },
    { 
      name: "Cab", 
      icon: Car, 
      color: "text-purple-500",
      url: `https://www.uber.com/`,
      ...transport?.cab
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Transport Options</h2>
        <p className="text-gray-600">Choose your preferred mode of travel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {transportModes.map((mode, index) => {
          const Icon = mode.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full bg-gray-100 ${mode.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{mode.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mode.duration && (
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">{mode.duration}</p>
                  </div>
                )}
                
                {mode.estimated_cost && (
                  <div>
                    <p className="text-sm text-gray-500">Estimated Cost</p>
                    <p className="text-2xl font-bold text-orange-600">₹{mode.estimated_cost?.toLocaleString()}</p>
                  </div>
                )}

                {mode.recommendation && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">{mode.recommendation}</p>
                  </div>
                )}

                <Button 
                  onClick={() => window.open(mode.url, '_blank')}
                  className="w-full"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Book {mode.name}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {transport?.local_transport && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Local Transportation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{transport.local_transport}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TransportTab;