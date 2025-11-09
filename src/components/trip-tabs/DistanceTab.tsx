import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation, Fuel, IndianRupee } from "lucide-react";

interface DistanceTabProps {
  distance: any;
}

const DistanceTab = ({ distance }: DistanceTabProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Distance & Travel Costs</h2>
        <p className="text-gray-600">Plan your journey with accurate distance and expense estimates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Navigation className="h-5 w-5 mr-2 text-blue-600" />
              Total Distance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">
              {distance?.total_distance || "450"} km
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Fuel className="h-5 w-5 mr-2 text-green-600" />
              Travel Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">
              {distance?.travel_time || "8"} hrs
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <IndianRupee className="h-5 w-5 mr-2 text-orange-600" />
              Transport Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-orange-600">
              ₹{distance?.estimated_cost?.toLocaleString() || "3,500"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transport Mode Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost by Transport Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {distance?.by_mode?.map((mode: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">{mode.mode}</h4>
                  <p className="text-sm text-gray-600">{mode.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">₹{mode.cost?.toLocaleString()}</p>
                  <Badge variant="outline" className="mt-1">{mode.recommendation}</Badge>
                </div>
              </div>
            )) || (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">By Flight</h4>
                    <p className="text-sm text-gray-600">1.5 hours</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">₹5,500</p>
                    <Badge variant="outline" className="mt-1">Fastest</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">By Train</h4>
                    <p className="text-sm text-gray-600">8 hours</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">₹1,200</p>
                    <Badge variant="outline" className="mt-1">Most Economical</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">By Car</h4>
                    <p className="text-sm text-gray-600">7 hours</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">₹3,500</p>
                    <Badge variant="outline" className="mt-1">Most Flexible</Badge>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Route Information */}
      {distance?.route_info && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <p className="text-blue-800">
              <strong>Route:</strong> {distance.route_info}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DistanceTab;