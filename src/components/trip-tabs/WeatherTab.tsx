import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";

interface WeatherTabProps {
  weather: any;
}

const WeatherTab = ({ weather }: WeatherTabProps) => {
  const getWeatherIcon = (condition: string) => {
    const lower = condition?.toLowerCase() || '';
    if (lower.includes('rain')) return <CloudRain className="h-8 w-8 text-blue-500" />;
    if (lower.includes('cloud')) return <Cloud className="h-8 w-8 text-gray-500" />;
    if (lower.includes('sun') || lower.includes('clear')) return <Sun className="h-8 w-8 text-yellow-500" />;
    return <Sun className="h-8 w-8 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Weather Overview</h2>
        <p className="text-gray-600">Plan your activities based on the weather forecast</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              {getWeatherIcon(weather?.general_condition)}
              <span className="ml-3">General Conditions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{weather?.general_condition || "Pleasant weather expected"}</p>
            <p className="text-sm text-gray-600 mt-2">{weather?.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="h-6 w-6 text-orange-500 mr-2" />
              Temperature Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">High:</span>
                <span className="font-bold text-orange-600">{weather?.temperature?.high || "28"}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Low:</span>
                <span className="font-bold text-blue-600">{weather?.temperature?.low || "18"}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average:</span>
                <span className="font-bold">{weather?.temperature?.average || "23"}°C</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplets className="h-6 w-6 text-blue-500 mr-2" />
              Humidity & Rainfall
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Humidity:</span>
                <span className="font-bold">{weather?.humidity || "60"}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rainfall:</span>
                <span className="font-bold">{weather?.rainfall || "Low"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wind className="h-6 w-6 text-gray-500 mr-2" />
              What to Pack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {weather?.clothing_suggestions?.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center">
                  <span className="mr-2">•</span>
                  {item}
                </li>
              )) || (
                <>
                  <li className="flex items-center"><span className="mr-2">•</span>Light cotton clothes</li>
                  <li className="flex items-center"><span className="mr-2">•</span>Sunscreen & sunglasses</li>
                  <li className="flex items-center"><span className="mr-2">•</span>Light jacket for evenings</li>
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      {weather?.best_time_note && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <p className="text-green-800 font-medium">💡 {weather.best_time_note}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherTab;