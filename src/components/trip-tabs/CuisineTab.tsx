import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Coffee, IceCream, Wine } from "lucide-react";

interface CuisineTabProps {
  cuisine: any;
  activities: any[];
}

const CuisineTab = ({ cuisine, activities }: CuisineTabProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Local Cuisine & Activities</h2>
        <p className="text-gray-600">Taste the flavors and experience the culture</p>
      </div>

      {/* Must-Try Dishes */}
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <Utensils className="h-6 w-6 mr-2 text-orange-500" />
          Must-Try Dishes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cuisine?.must_try_dishes?.map((dish: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h4 className="font-bold text-lg mb-2">{dish.name || dish}</h4>
                {dish.description && (
                  <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
                )}
                {dish.where_to_find && (
                  <p className="text-xs text-orange-600">📍 {dish.where_to_find}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Restaurants */}
      {cuisine?.popular_restaurants && (
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <Coffee className="h-6 w-6 mr-2 text-orange-500" />
            Popular Restaurants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cuisine.popular_restaurants.map((restaurant: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h4 className="font-bold mb-1">{restaurant.name || restaurant}</h4>
                  {restaurant.specialty && (
                    <p className="text-sm text-gray-600">{restaurant.specialty}</p>
                  )}
                  {restaurant.price_range && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      {restaurant.price_range}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Street Food */}
      {cuisine?.street_food && (
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <IceCream className="h-6 w-6 mr-2 text-orange-500" />
              Street Food Delights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cuisine.street_food.map((food: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {food}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activities */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Things to Do</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities?.map((activity: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h4 className="font-bold text-lg mb-2">{activity.name || activity}</h4>
                {activity.description && (
                  <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                )}
                {activity.duration && (
                  <Badge variant="outline" className="text-xs">
                    Duration: {activity.duration}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuisineTab;