export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh"
];

export const famousPlacesByState: Record<string, string[]> = {
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Pushkar", "Mount Abu", "Bikaner", "Ajmer"],
  "Kerala": ["Munnar", "Alleppey", "Kochi", "Wayanad", "Thekkady", "Kovalam", "Varkala", "Kumarakom"],
  "Goa": ["North Goa", "South Goa", "Panjim", "Old Goa", "Anjuna", "Calangute", "Palolem", "Arambol"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kasol", "Spiti Valley", "Dalhousie", "Kullu", "McLeod Ganj"],
  "Uttarakhand": ["Nainital", "Mussoorie", "Rishikesh", "Haridwar", "Auli", "Jim Corbett", "Dehradun", "Kedarnath"],
  "Maharashtra": ["Mumbai", "Pune", "Lonavala", "Mahabaleshwar", "Nashik", "Aurangabad", "Alibaug", "Matheran"],
  "Karnataka": ["Bangalore", "Mysore", "Coorg", "Hampi", "Gokarna", "Chikmagalur", "Udupi", "Badami"],
  "Tamil Nadu": ["Chennai", "Ooty", "Kodaikanal", "Madurai", "Rameswaram", "Kanyakumari", "Pondicherry", "Mahabalipuram"],
  "Uttar Pradesh": ["Agra", "Varanasi", "Lucknow", "Mathura", "Vrindavan", "Ayodhya", "Allahabad", "Nainital"],
  "West Bengal": ["Kolkata", "Darjeeling", "Kalimpong", "Sundarbans", "Digha", "Mandarmani", "Shantiniketan", "Dooars"],
  "Delhi": ["Red Fort", "India Gate", "Qutub Minar", "Lotus Temple", "Akshardham", "Humayun's Tomb", "Chandni Chowk", "Connaught Place"],
  "Jammu and Kashmir": ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg", "Jammu", "Patnitop", "Vaishno Devi"],
  "Ladakh": ["Leh", "Nubra Valley", "Pangong Lake", "Tso Moriri", "Khardung La", "Magnetic Hill", "Zanskar Valley"],
  "Gujarat": ["Ahmedabad", "Dwarka", "Somnath", "Gir National Park", "Rann of Kutch", "Statue of Unity", "Saputara"],
  "Andhra Pradesh": ["Tirupati", "Visakhapatnam", "Araku Valley", "Vijayawada", "Amaravati", "Srisailam"],
  "Telangana": ["Hyderabad", "Warangal", "Ramoji Film City", "Nagarjuna Sagar"],
  "Odisha": ["Puri", "Konark", "Bhubaneswar", "Chilika Lake", "Gopalpur"],
  "Assam": ["Guwahati", "Kaziranga", "Majuli", "Tezpur", "Sivasagar"],
  "Sikkim": ["Gangtok", "Pelling", "Lachung", "Nathula Pass", "Tsomgo Lake"],
  "Meghalaya": ["Shillong", "Cherrapunji", "Mawlynnong", "Dawki"],
  "Arunachal Pradesh": ["Tawang", "Ziro", "Bomdila", "Itanagar"],
  "Punjab": ["Amritsar", "Chandigarh", "Ludhiana", "Patiala"],
  "Haryana": ["Gurgaon", "Faridabad", "Kurukshetra", "Panchkula"],
  "Bihar": ["Bodh Gaya", "Nalanda", "Rajgir", "Patna"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Netarhat", "Deoghar"],
  "Chhattisgarh": ["Raipur", "Chitrakote Falls", "Bastar", "Sirpur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Khajuraho", "Ujjain", "Pachmarhi", "Gwalior", "Sanchi"],
  "Mizoram": ["Aizawl", "Champhai", "Lunglei"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
  "Manipur": ["Imphal", "Loktak Lake", "Kangla Fort"],
  "Tripura": ["Agartala", "Ujjayanta Palace", "Neermahal"]
};

export const travelInterests = [
  "Adventure", "Beach", "Mountains", "Heritage", "Wildlife",
  "Spiritual", "Food & Cuisine", "Photography", "Trekking",
  "Water Sports", "Shopping", "Nightlife", "Relaxation"
];

export const prebuiltPackages = [
  {
    id: 1,
    name: "Golden Triangle Tour",
    destinations: ["Delhi", "Agra", "Jaipur"],
    duration: "6 Days / 5 Nights",
    price: 25000,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    highlights: ["Taj Mahal", "Red Fort", "Amber Fort", "Hawa Mahal"]
  },
  {
    id: 2,
    name: "Kerala Backwaters",
    destinations: ["Kochi", "Alleppey", "Munnar"],
    duration: "5 Days / 4 Nights",
    price: 30000,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    highlights: ["Houseboat Stay", "Tea Gardens", "Kathakali Dance", "Ayurvedic Spa"]
  },
  {
    id: 3,
    name: "Rajasthan Royal Experience",
    destinations: ["Jaipur", "Udaipur", "Jodhpur"],
    duration: "7 Days / 6 Nights",
    price: 35000,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    highlights: ["Palace Hotels", "Desert Safari", "Lake Pichola", "Mehrangarh Fort"]
  },
  {
    id: 4,
    name: "Himalayan Adventure",
    destinations: ["Manali", "Shimla", "Dharamshala"],
    duration: "6 Days / 5 Nights",
    price: 28000,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    highlights: ["Rohtang Pass", "Paragliding", "Monasteries", "Mountain Trekking"]
  },
  {
    id: 5,
    name: "Goa Beach Paradise",
    destinations: ["North Goa", "South Goa"],
    duration: "4 Days / 3 Nights",
    price: 20000,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    highlights: ["Beach Parties", "Water Sports", "Portuguese Heritage", "Seafood"]
  },
  {
    id: 6,
    name: "Spiritual India",
    destinations: ["Varanasi", "Rishikesh", "Haridwar"],
    duration: "5 Days / 4 Nights",
    price: 22000,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
    highlights: ["Ganga Aarti", "Yoga Retreat", "Temple Tours", "River Rafting"]
  }
];