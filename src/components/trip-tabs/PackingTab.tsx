import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Backpack, Shirt, Pill, Camera, FileText } from "lucide-react";
import { useState } from "react";

interface PackingTabProps {
  packingList: any[];
}

const PackingTab = ({ packingList }: PackingTabProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const defaultCategories = [
    {
      name: "Clothing",
      icon: Shirt,
      color: "text-blue-500",
      items: packingList?.filter((item: any) => item.category === "clothing").map((i: any) => i.item || i) || [
        "Comfortable walking shoes",
        "Light cotton clothes",
        "Jacket/Sweater for evenings",
        "Sunglasses & Hat",
        "Swimwear (if applicable)"
      ]
    },
    {
      name: "Documents",
      icon: FileText,
      color: "text-orange-500",
      items: packingList?.filter((item: any) => item.category === "documents").map((i: any) => i.item || i) || [
        "ID Proof (Aadhar/Passport)",
        "Travel tickets & bookings",
        "Hotel confirmations",
        "Travel insurance",
        "Emergency contacts"
      ]
    },
    {
      name: "Health & Hygiene",
      icon: Pill,
      color: "text-green-500",
      items: packingList?.filter((item: any) => item.category === "health").map((i: any) => i.item || i) || [
        "First aid kit",
        "Prescription medicines",
        "Sunscreen (SPF 50+)",
        "Insect repellent",
        "Hand sanitizer",
        "Personal toiletries"
      ]
    },
    {
      name: "Electronics & Gadgets",
      icon: Camera,
      color: "text-purple-500",
      items: packingList?.filter((item: any) => item.category === "electronics").map((i: any) => i.item || i) || [
        "Phone & charger",
        "Power bank",
        "Camera",
        "Universal adapter",
        "Headphones"
      ]
    },
    {
      name: "Essentials",
      icon: Backpack,
      color: "text-red-500",
      items: packingList?.filter((item: any) => item.category === "essentials").map((i: any) => i.item || i) || [
        "Water bottle",
        "Snacks for travel",
        "Umbrella/Raincoat",
        "Day backpack",
        "Cash & cards",
        "Travel locks"
      ]
    }
  ];

  const toggleItem = (item: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    setCheckedItems(newChecked);
  };

  const totalItems = defaultCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  const packedItems = checkedItems.size;
  const progress = (packedItems / totalItems) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Packing Checklist</h2>
        <p className="text-gray-600">Don't forget these essentials for your trip</p>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">Packing Progress</h3>
            <Badge className="bg-orange-500">
              {packedItems} / {totalItems} items
            </Badge>
          </div>
          <div className="bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-orange-500 to-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {progress === 100 ? "🎉 All packed and ready to go!" : `${(100 - progress).toFixed(0)}% remaining`}
          </p>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="space-y-4">
        {defaultCategories.map((category, catIndex) => {
          const Icon = category.icon;
          const categoryChecked = category.items.filter(item => checkedItems.has(item)).length;
          
          return (
            <Card key={catIndex}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon className={`h-6 w-6 mr-2 ${category.color}`} />
                    {category.name}
                  </div>
                  <Badge variant="outline">
                    {categoryChecked} / {category.items.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleItem(item)}
                    >
                      <Checkbox
                        id={`${catIndex}-${itemIndex}`}
                        checked={checkedItems.has(item)}
                        onCheckedChange={() => toggleItem(item)}
                      />
                      <label
                        htmlFor={`${catIndex}-${itemIndex}`}
                        className={`text-sm cursor-pointer flex-1 ${
                          checkedItems.has(item) ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="font-bold mb-3 text-blue-900">🎒 Packing Tips</h4>
          <ul className="space-y-2">
            <li className="text-sm text-blue-800 flex items-start">
              <span className="mr-2">•</span>
              Pack light - you can always buy essentials at your destination
            </li>
            <li className="text-sm text-blue-800 flex items-start">
              <span className="mr-2">•</span>
              Roll clothes instead of folding to save space
            </li>
            <li className="text-sm text-blue-800 flex items-start">
              <span className="mr-2">•</span>
              Keep important documents and valuables in carry-on
            </li>
            <li className="text-sm text-blue-800 flex items-start">
              <span className="mr-2">•</span>
              Check weather forecast before finalizing your packing
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackingTab;