
// Fallback data when database is not available
export const fallbackProperties = [
  {
    id: 1,
    title: "Villa Azure Vista",
    description: "Luxurious villa with stunning ocean views",
    price: 250,
    location: "Martil Beach",
    city: "Martil",
    bedrooms: 4,
    bathrooms: 3,
    image_url: "/placeholder.svg",
    amenities: ["WiFi", "Pool", "Kitchen", "Parking"],
    status: "approved",
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Coastal Retreat",
    description: "Modern apartment near the beach",
    price: 150,
    location: "Marina District",
    city: "Martil",
    bedrooms: 2,
    bathrooms: 2,
    image_url: "/placeholder.svg",
    amenities: ["WiFi", "Air Conditioning", "Kitchen"],
    status: "approved",
    featured: true,
    created_at: new Date().toISOString()
  }
];

export const fallbackBookings = [];

// In-memory fallback users (only used when database is not connected)
export const fallbackUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@martilhaven.com',
    password: 'admin123',
    name: 'Admin User',
    phone: '+212 5XX XX XX XX',
    role: 'admin',
    status: 'active',
    created_at: new Date().toISOString(),
    last_login: null
  }
];
