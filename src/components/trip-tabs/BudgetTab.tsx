import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, Home, Utensils, Car, Camera, ShoppingBag } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface BudgetTabProps {
  budgetBreakdown: any;
  totalBudget: number;
}

const BudgetTab = ({ budgetBreakdown, totalBudget }: BudgetTabProps) => {
  const categories = [
    { 
      name: "Accommodation", 
      icon: Home, 
      color: "#f97316",
      amount: budgetBreakdown?.accommodation || totalBudget * 0.35
    },
    { 
      name: "Food", 
      icon: Utensils, 
      color: "#22c55e",
      amount: budgetBreakdown?.food || totalBudget * 0.25
    },
    { 
      name: "Transport", 
      icon: Car, 
      color: "#3b82f6",
      amount: budgetBreakdown?.transport || totalBudget * 0.20
    },
    { 
      name: "Activities", 
      icon: Camera, 
      color: "#a855f7",
      amount: budgetBreakdown?.activities || totalBudget * 0.15
    },
    { 
      name: "Shopping & Misc", 
      icon: ShoppingBag, 
      color: "#ec4899",
      amount: budgetBreakdown?.miscellaneous || totalBudget * 0.05
    }
  ];

  const chartData = categories.map(cat => ({
    name: cat.name,
    value: cat.amount
  }));

  const calculatedTotal = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Budget Breakdown</h2>
        <p className="text-gray-600">Detailed expense planning for your trip</p>
      </div>

      {/* Total Budget Card */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardContent className="p-8 text-center">
          <p className="text-lg mb-2">Total Estimated Budget</p>
          <div className="flex items-center justify-center text-5xl font-bold">
            <IndianRupee className="h-10 w-10" />
            {calculatedTotal.toLocaleString()}
          </div>
          <p className="text-orange-100 mt-2">For {budgetBreakdown?.travelers || 1} traveler(s)</p>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categories[index].color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const percentage = (category.amount / calculatedTotal) * 100;
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-3 rounded-full"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: category.color }} />
                    </div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                  <Badge className="text-xs" style={{ backgroundColor: category.color }}>
                    {percentage.toFixed(0)}%
                  </Badge>
                </div>
                
                <div className="flex items-center text-2xl font-bold" style={{ color: category.color }}>
                  <IndianRupee className="h-5 w-5" />
                  {category.amount.toLocaleString()}
                </div>

                {/* Progress Bar */}
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Budget Tips */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h4 className="font-bold mb-3 text-green-900">💰 Budget Saving Tips</h4>
          <ul className="space-y-2">
            <li className="text-sm text-green-800 flex items-start">
              <span className="mr-2">•</span>
              Book accommodations and transport in advance for better deals
            </li>
            <li className="text-sm text-green-800 flex items-start">
              <span className="mr-2">•</span>
              Try local street food for authentic and affordable meals
            </li>
            <li className="text-sm text-green-800 flex items-start">
              <span className="mr-2">•</span>
              Use public transport or shared cabs to reduce travel costs
            </li>
            <li className="text-sm text-green-800 flex items-start">
              <span className="mr-2">•</span>
              Look for combo tickets for multiple attractions
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetTab;