import { storage } from "./storage";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingUsers = await storage.getAllUsers();
    if (existingUsers.length > 0) {
      console.log("Database already seeded");
      return;
    }

    // Create default users
    const users = [
      {
        username: "admin",
        password: "password123",
        email: "admin@martilhaven.com",
        name: "Admin User",
        role: "admin",
        status: "active"
      },
      {
        username: "staff",
        password: "password123",
        email: "staff@martilhaven.com",
        name: "Staff User",
        role: "staff",
        status: "active"
      },
      {
        username: "owner",
        password: "password123",
        email: "owner@martilhaven.com",
        name: "Property Owner",
        role: "owner",
        status: "active"
      },
      {
        username: "user",
        password: "password123",
        email: "user@martilhaven.com",
        name: "Regular User",
        role: "user",
        status: "active"
      }
    ];

    console.log("Creating users...");
    const createdUsers = [];
    for (const userData of users) {
      const user = await storage.createUser(userData);
      createdUsers.push(user);
      console.log(`Created user: ${user.username}`);
    }

    // Create sample properties
    const ownerUser = createdUsers.find(u => u.role === "owner");
    if (ownerUser) {
      const properties = [
        {
          title: "Luxury Beachfront Villa",
          description: "A stunning 4-bedroom villa with panoramic views of the Mediterranean Sea. Features include a private pool, direct beach access, and modern Moroccan décor.",
          price: "250.00",
          priceUnit: "night",
          images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
          ],
          location: "Martil Beach, Morocco",
          bedrooms: 4,
          bathrooms: 3,
          capacity: 8,
          amenities: ["Pool", "WiFi", "Air Conditioning", "Beach Access", "Parking", "Kitchen"],
          featured: true,
          ownerId: ownerUser.id,
          status: "approved"
        },
        {
          title: "Traditional Riad in Medina",
          description: "Authentic Moroccan riad in the heart of Martil's old medina. Beautifully restored with traditional tilework and a peaceful central courtyard.",
          price: "120.00",
          priceUnit: "night",
          images: [
            "https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
          ],
          location: "Martil Medina, Morocco",
          bedrooms: 3,
          bathrooms: 2,
          capacity: 6,
          amenities: ["WiFi", "Air Conditioning", "Traditional Décor", "Courtyard", "Terrace"],
          featured: true,
          ownerId: ownerUser.id,
          status: "approved"
        },
        {
          title: "Modern Coastal Apartment",
          description: "Contemporary 2-bedroom apartment with sea views and modern amenities. Perfect for couples or small families seeking comfort and style.",
          price: "85.00",
          priceUnit: "night",
          images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
          ],
          location: "Martil Marina, Morocco",
          bedrooms: 2,
          bathrooms: 1,
          capacity: 4,
          amenities: ["WiFi", "Air Conditioning", "Sea View", "Balcony", "Modern Kitchen"],
          featured: false,
          ownerId: ownerUser.id,
          status: "approved"
        }
      ];

      console.log("Creating properties...");
      for (const propertyData of properties) {
        const property = await storage.createProperty(propertyData);
        console.log(`Created property: ${property.title}`);
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}