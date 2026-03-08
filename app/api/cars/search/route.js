import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      pickupLocation, 
      dropoffLocation, 
      pickupDate, 
      dropoffDate, 
      pickupTime,
      carType 
    } = body;
    
    // Calculate number of days
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
    
    // Mock car rental data
    const mockResults = {
      success: true,
      searchParams: {
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate,
        days
      },
      data: [
        {
          id: "car-001",
          name: "Maruti Suzuki Swift",
          type: "economy",
          seats: 5,
          transmission: "Manual",
          fuelType: "Petrol",
          pricePerDay: 2500,
          totalPrice: 2500 * days,
          image: null,
          features: ["AC", "Power Windows", "Bluetooth", "ABS"],
          provider: "Zoomcar",
          rating: 4.3,
          reviews: 1245,
          location: pickupLocation
        },
        {
          id: "car-002",
          name: "Hyundai i20",
          type: "compact",
          seats: 5,
          transmission: "Manual",
          fuelType: "Petrol",
          pricePerDay: 3200,
          totalPrice: 3200 * days,
          image: null,
          features: ["AC", "Touchscreen", "Reverse Camera", "Keyless Entry"],
          provider: "Avis",
          rating: 4.5,
          reviews: 890,
          location: pickupLocation
        },
        {
          id: "car-003",
          name: "Toyota Innova Crysta",
          type: "suv",
          seats: 7,
          transmission: "Automatic",
          fuelType: "Diesel",
          pricePerDay: 5500,
          totalPrice: 5500 * days,
          image: null,
          features: ["AC", "Captain Seats", "Cruise Control", "Sunroof"],
          provider: "Hertz",
          rating: 4.7,
          reviews: 2340,
          location: pickupLocation
        },
        {
          id: "car-004",
          name: "Honda City",
          type: "midsize",
          seats: 5,
          transmission: "Automatic",
          fuelType: "Petrol",
          pricePerDay: 4000,
          totalPrice: 4000 * days,
          image: null,
          features: ["AC", "Leather Seats", "Sunroof", "Premium Sound System"],
          provider: "Europcar",
          rating: 4.4,
          reviews: 1567,
          location: pickupLocation
        },
        {
          id: "car-005",
          name: "Mahindra Thar",
          type: "suv",
          seats: 4,
          transmission: "Manual",
          fuelType: "Diesel",
          pricePerDay: 6000,
          totalPrice: 6000 * days,
          image: null,
          features: ["4x4", "Convertible Top", "Off-road tires", "Bluetooth"],
          provider: "Zoomcar",
          rating: 4.6,
          reviews: 2100,
          location: pickupLocation
        },
        {
          id: "car-006",
          name: "Mercedes Benz E-Class",
          type: "luxury",
          seats: 5,
          transmission: "Automatic",
          fuelType: "Petrol",
          pricePerDay: 15000,
          totalPrice: 15000 * days,
          image: null,
          features: ["Leather", "Massage Seats", "Premium Audio", "Ambient Lighting"],
          provider: "Avis Luxury",
          rating: 4.9,
          reviews: 543,
          location: pickupLocation
        }
      ].filter(car => carType === "all" || car.type === carType)
    };
    
    // Add some variety based on location
    mockResults.data = mockResults.data.map((car, index) => ({
      ...car,
      pricePerDay: car.pricePerDay + (pickupLocation.length * 50) + (index * 100),
      totalPrice: (car.pricePerDay + (pickupLocation.length * 50) + (index * 100)) * days
    }));
    
    return NextResponse.json(mockResults);
    
  } catch (error) {
    console.error("Car search API error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        message: "Failed to search for cars. Please try again."
      },
      { status: 500 }
    );
  }
}