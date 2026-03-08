import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { destination, checkIn, checkOut, guests, rooms } = body;
    
    // Mock hotel data
    const mockResults = {
      success: true,
      data: [
        {
          name: "Grand Hyatt",
          rating: 5,
          reviews: 1250,
          address: `${destination}, City Center`,
          price: 8500 + Math.floor(Math.random() * 3000),
          amenities: [
            { icon: "wifi", label: "Free WiFi" },
            { icon: "coffee", label: "Breakfast" },
            { icon: "parking", label: "Free Parking" }
          ]
        },
        {
          name: "Taj Hotel",
          rating: 5,
          reviews: 2100,
          address: `${destination}, Downtown`,
          price: 12000 + Math.floor(Math.random() * 5000),
          amenities: [
            { icon: "wifi", label: "Free WiFi" },
            { icon: "coffee", label: "Breakfast" },
            { icon: "parking", label: "Valet Parking" },
            { icon: "pool", label: "Swimming Pool" }
          ]
        },
        {
          name: "Holiday Inn",
          rating: 4,
          reviews: 850,
          address: `${destination}, Business District`,
          price: 5500 + Math.floor(Math.random() * 2000),
          amenities: [
            { icon: "wifi", label: "Free WiFi" },
            { icon: "coffee", label: "Breakfast" },
            { icon: "parking", label: "Free Parking" }
          ]
        }
      ]
    };
    
    return NextResponse.json(mockResults);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}