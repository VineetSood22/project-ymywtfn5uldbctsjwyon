import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CrowdTabProps {
  crowd: any;
}

const CrowdTab = ({ crowd }: CrowdTabProps) => {
  const monthlyData = crowd?.monthly_crowd || [
    { month: "Jan", crowd: 30 },
    { month: "Feb", crowd: 40 },
    { month: "Mar", crowd: 60 },
    { month: "Apr", crowd: 50 },
    { month: "May", crowd: 70 },
    { month: "Jun", crowd: 45 },
    { month: "Jul", crowd: 55 },
    { month: "Aug", crowd: 65 },
    { month: "Sep", crowd: 50 },
    { month: "Oct", crowd: 80 },
    { month: "Nov", crowd: 75 },
    { month: "Dec", crowd: 90 }
  ];

  const getCrowdLevel = (level: string) => {
    switch (level?.toLowerCase()) {
      case "low":
        return { color: "bg-green-100 text-green-800", icon: <TrendingDown className="h-4 w-4" /> };
      case "moderate":
        return { color: "bg-yellow-100 text-yellow-800", icon: <Users className="h-4 w-4" /> };
      case "high":
        return { color: "bg-red-100 text-red-800", icon: <TrendingUp className="h-4 w-4" /> };
      default:
        return { color: "bg-gray-100 text-gray-800", icon: <Users className="h-4 w-4" /> };
    }
  };

  const currentCrowd = getCrowdLevel(crowd?.current_level || "moderate");

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Crowd Overview</h2>
        <p className="text-gray-600">Plan your visit to avoid the rush</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-orange-500" />
              Current Crowd Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge className={`${currentCrowd.color} text-lg px-4 py-2`}>
                {currentCrowd.icon}
                <span className="ml-2">{crowd?.current_level || "Moderate"}</span>
              </Badge>
              <p className="text-3xl font-bold text-orange-600">
                {crowd?.occupancy_percentage || "60"}%
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {crowd?.current_description || "Moderate tourist activity expected during your travel dates"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-green-500" />
              Best Time to Visit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Recommended Months</p>
                <div className="flex flex-wrap gap-2">
                  {crowd?.best_months?.map((month: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="bg-green-50">
                      {month}
                    </Badge>
                  )) || (
                    <>
                      <Badge variant="outline" className="bg-green-50">October</Badge>
                      <Badge variant="outline" className="bg-green-50">November</Badge>
                      <Badge variant="outline" className="bg-green-50">February</Badge>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Avoid</p>
                <div className="flex flex-wrap gap-2">
                  {crowd?.avoid_months?.map((month: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="bg-red-50">
                      {month}
                    </Badge>
                  )) || (
                    <>
                      <Badge variant="outline" className="bg-red-50">May</Badge>
                      <Badge variant="outline" className="bg-red-50">June</Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Crowd Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Crowd Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="crowd" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tips */}
      {crowd?.tips && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h4 className="font-bold mb-3 text-blue-900">💡 Crowd Management Tips</h4>
            <ul className="space-y-2">
              {crowd.tips.map((tip: string, idx: number) => (
                <li key={idx} className="text-sm text-blue-800 flex items-start">
                  <span className="mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CrowdTab;