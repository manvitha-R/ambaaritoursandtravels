import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { destinations, startDate, travelers, budget, interests } = body;
    
    // Calculate trip duration from destinations
    const totalDays = destinations.reduce((sum, dest) => sum + dest.duration, 0);
    
    // Mock curated trip data based on user preferences
    const mockResults = {
      success: true,
      searchParams: {
        destinations: destinations.map(d => d.city),
        totalDays,
        travelers,
        budget,
        interests
      },
      data: []
    };
    
    // Generate recommendations based on budget
    const budgetMultiplier = budget === "budget" ? 1 : budget === "moderate" ? 2 : 3.5;
    
    // Helper to check if destination matches interest
    const matchesInterest = (tripInterests) => {
      if (interests.length === 0) return true;
      return tripInterests.some(interest => interests.includes(interest));
    };
    
    // North India Trips
    const northIndiaTrips = [
      {
        id: "trip-north-001",
        name: "Golden Triangle Tour",
        destinations: ["Delhi", "Agra", "Jaipur"],
        duration: 6,
        description: "Experience the rich cultural heritage of North India with visits to the Taj Mahal, majestic forts, and bustling markets.",
        highlights: ["Taj Mahal at sunrise", "Amber Fort elephant ride", "Old Delhi food tour", "Jaipur city palace"],
        price: 45000 * budgetMultiplier,
        pricePerPerson: 45000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.8,
        reviews: 3240,
        bestSeason: "October-March",
        interests: ["Culture", "History", "Food", "Architecture"],
        suitableFor: ["Culture", "History", "Food"]
      },
      {
        id: "trip-north-002",
        name: "Himalayan Adventure",
        destinations: ["Manali", "Leh", "Shimla"],
        duration: 10,
        description: "Thrilling adventure through the Himalayas with breathtaking landscapes, high mountain passes, and unique cultural experiences.",
        highlights: ["Rohtang Pass", "Pangong Lake", "Khardung La", "Spiti Valley"],
        price: 85000 * budgetMultiplier,
        pricePerPerson: 85000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.9,
        reviews: 1870,
        bestSeason: "June-September",
        interests: ["Adventure", "Nature", "Mountains", "Photography"],
        suitableFor: ["Adventure", "Nature", "Mountains"]
      },
      {
        id: "trip-north-003",
        name: "Spiritual Varanasi",
        destinations: ["Varanasi", "Sarnath", "Allahabad"],
        duration: 4,
        description: "Immersive spiritual journey through India's holiest city with Ganga Aarti, temple visits, and meditation sessions.",
        highlights: ["Ganga Aarti ceremony", "Morning boat ride", "Sarnath Buddhist tour", "Yoga sessions"],
        price: 25000 * budgetMultiplier,
        pricePerPerson: 25000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.7,
        reviews: 2150,
        bestSeason: "October-March",
        interests: ["Spiritual", "Culture", "History", "Yoga"],
        suitableFor: ["Culture", "History", "Spiritual"]
      }
    ];
    
    // South India Trips
    const southIndiaTrips = [
      {
        id: "trip-south-001",
        name: "Kerala Backwaters",
        destinations: ["Kochi", "Alleppey", "Kumarakom"],
        duration: 5,
        description: "Relaxing journey through Kerala's famous backwaters with houseboat stays, Ayurvedic treatments, and lush greenery.",
        highlights: ["Houseboat cruise", "Kathakali performance", "Ayurvedic massage", "Tea plantations"],
        price: 55000 * budgetMultiplier,
        pricePerPerson: 55000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.8,
        reviews: 2890,
        bestSeason: "September-March",
        interests: ["Nature", "Relaxation", "Food", "Wellness"],
        suitableFor: ["Nature", "Beach", "Food"]
      },
      {
        id: "trip-south-002",
        name: "Tamil Nadu Temple Tour",
        destinations: ["Chennai", "Mahabalipuram", "Tanjore", "Madurai"],
        duration: 7,
        description: "Explore the magnificent Dravidian architecture and ancient temples of Tamil Nadu.",
        highlights: ["Shore Temple", "Brihadeeswarar Temple", "Meenakshi Temple", "Rockfort Temple"],
        price: 48000 * budgetMultiplier,
        pricePerPerson: 48000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.6,
        reviews: 1670,
        bestSeason: "November-February",
        interests: ["Culture", "History", "Architecture", "Spiritual"],
        suitableFor: ["Culture", "History", "Spiritual"]
      },
      {
        id: "trip-south-003",
        name: "Karnataka Heritage",
        destinations: ["Bangalore", "Mysore", "Hassan", "Hampi"],
        duration: 6,
        description: "Discover the rich heritage of Karnataka with palace visits, temple architecture, and ruins of Vijayanagara Empire.",
        highlights: ["Mysore Palace", "Belur Halebid temples", "Hampi ruins", "Brindavan Gardens"],
        price: 42000 * budgetMultiplier,
        pricePerPerson: 42000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.5,
        reviews: 1430,
        bestSeason: "October-March",
        interests: ["Culture", "History", "Architecture", "Photography"],
        suitableFor: ["Culture", "History", "Nature"]
      }
    ];
    
    // Beach & Relaxation Trips
    const beachTrips = [
      {
        id: "trip-beach-001",
        name: "Goa Beach Hopping",
        destinations: ["North Goa", "South Goa"],
        duration: 5,
        description: "Perfect beach getaway with vibrant nightlife, Portuguese architecture, and water sports.",
        highlights: ["Calangute Beach", "Dudhsagar Falls", "Fort Aguada", "Sunset cruise"],
        price: 35000 * budgetMultiplier,
        pricePerPerson: 35000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.7,
        reviews: 4120,
        bestSeason: "November-February",
        interests: ["Beach", "Adventure", "Nightlife", "Food"],
        suitableFor: ["Beach", "Adventure", "Food"]
      },
      {
        id: "trip-beach-002",
        name: "Andaman Islands",
        destinations: ["Port Blair", "Havelock", "Neil Island"],
        duration: 7,
        description: "Pristine beaches, coral reefs, and water activities in the tropical Andaman Islands.",
        highlights: ["Radhanagar Beach", "Scuba diving", "Cellular Jail", "Sea walking"],
        price: 75000 * budgetMultiplier,
        pricePerPerson: 75000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.9,
        reviews: 1870,
        bestSeason: "October-May",
        interests: ["Beach", "Adventure", "Nature", "Photography"],
        suitableFor: ["Beach", "Adventure", "Nature"]
      }
    ];
    
    // Wildlife Trips
    const wildlifeTrips = [
      {
        id: "trip-wildlife-001",
        name: "Ranthambore Safari",
        destinations: ["Jaipur", "Ranthambore"],
        duration: 4,
        description: "Thrilling tiger safari in Ranthambore National Park with chances to spot Bengal tigers in the wild.",
        highlights: ["Tiger safari", "Ranthambore Fort", "Bird watching", "Jeep safari"],
        price: 38000 * budgetMultiplier,
        pricePerPerson: 38000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.7,
        reviews: 1560,
        bestSeason: "October-June",
        interests: ["Wildlife", "Adventure", "Nature", "Photography"],
        suitableFor: ["Adventure", "Nature", "Wildlife"]
      },
      {
        id: "trip-wildlife-002",
        name: "Kaziranga Wildlife",
        destinations: ["Guwahati", "Kaziranga"],
        duration: 4,
        description: "Spot the one-horned rhinoceros in its natural habitat at Kaziranga National Park.",
        highlights: ["Elephant safari", "One-horned rhino", "Bird watching", "Tea gardens"],
        price: 42000 * budgetMultiplier,
        pricePerPerson: 42000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.6,
        reviews: 890,
        bestSeason: "November-April",
        interests: ["Wildlife", "Nature", "Photography", "Adventure"],
        suitableFor: ["Adventure", "Nature", "Wildlife"]
      }
    ];
    
    // Himalayan Treks
    const trekkingTrips = [
      {
        id: "trip-trek-001",
        name: "Valley of Flowers Trek",
        destinations: ["Rishikesh", "Joshimath", "Valley of Flowers"],
        duration: 8,
        description: "Trek through the stunning Valley of Flowers, a UNESCO World Heritage site with alpine flowers and meadows.",
        highlights: ["Valley of Flowers", "Hemkund Sahib", "Ghangaria", "Bird watching"],
        price: 58000 * budgetMultiplier,
        pricePerPerson: 58000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.8,
        reviews: 980,
        bestSeason: "July-September",
        interests: ["Adventure", "Nature", "Trekking", "Photography"],
        suitableFor: ["Adventure", "Nature", "Mountains"]
      },
      {
        id: "trip-trek-002",
        name: "Kedarkantha Trek",
        destinations: ["Dehradun", "Sankri", "Kedarkantha"],
        duration: 6,
        description: "One of the most beautiful winter treks in India with snow-covered trails and stunning Himalayan views.",
        highlights: ["Snow trekking", "Summit climb", "Camping", "Stargazing"],
        price: 45000 * budgetMultiplier,
        pricePerPerson: 45000 * budgetMultiplier / travelers,
        images: null,
        rating: 4.7,
        reviews: 760,
        bestSeason: "December-April",
        interests: ["Adventure", "Trekking", "Mountains", "Winter"],
        suitableFor: ["Adventure", "Nature", "Mountains"]
      }
    ];
    
    // Luxury Trips
    const luxuryTrips = [
      {
        id: "trip-luxury-001",
        name: "Palace on Wheels",
        destinations: ["Jaipur", "Jodhpur", "Udaipur", "Jaisalmer"],
        duration: 7,
        description: "Luxurious train journey through Rajasthan's royal cities with palace stays and cultural performances.",
        highlights: ["Luxury train", "Palace stays", "Elephant polo", "Royal banquets"],
        price: 250000 * (budget === "luxury" ? 1 : 0.5),
        pricePerPerson: 250000 * (budget === "luxury" ? 1 : 0.5) / travelers,
        images: null,
        rating: 4.9,
        reviews: 430,
        bestSeason: "October-March",
        interests: ["Luxury", "Culture", "History", "Food"],
        suitableFor: ["Culture", "History", "Luxury"]
      },
      {
        id: "trip-luxury-002",
        name: "Luxury Kerala",
        destinations: ["Kochi", "Munnar", "Alleppey", "Kovalam"],
        duration: 8,
        description: "Ultimate luxury experience in Kerala with premium houseboats, spa resorts, and private tours.",
        highlights: ["Luxury houseboat", "Private chef", "Ayurveda spa", "Tea estate stay"],
        price: 180000 * (budget === "luxury" ? 1 : 0.5),
        pricePerPerson: 180000 * (budget === "luxury" ? 1 : 0.5) / travelers,
        images: null,
        rating: 4.8,
        reviews: 320,
        bestSeason: "September-March",
        interests: ["Luxury", "Relaxation", "Wellness", "Food"],
        suitableFor: ["Nature", "Beach", "Luxury"]
      }
    ];
    
    // Combine all trips
    const allTrips = [
      ...northIndiaTrips,
      ...southIndiaTrips,
      ...beachTrips,
      ...wildlifeTrips,
      ...trekkingTrips,
      ...luxuryTrips
    ];
    
    // Filter trips based on user preferences
    const filteredTrips = allTrips.filter(trip => {
      // Check if any destination matches user's requested destinations
      const destinationMatch = destinations.some(dest => 
        trip.destinations.some(tripDest => 
          tripDest.toLowerCase().includes(dest.city.toLowerCase()) ||
          dest.city.toLowerCase().includes(tripDest.toLowerCase())
        )
      );
      
      // Check if trip matches user interests
      const interestMatch = matchesInterest(trip.interests);
      
      // Budget match (higher budget can see all, lower budget only sees appropriate)
      const budgetMatch = budget === "luxury" || 
                         (budget === "moderate" && trip.price < 100000) ||
                         (budget === "budget" && trip.price < 60000);
      
      // Return trips that match at least some criteria
      return (destinationMatch || interestMatch) && budgetMatch;
    });
    
    // Sort by relevance and limit results
    mockResults.data = filteredTrips
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8)
      .map(trip => ({
        ...trip,
        price: Math.round(trip.price),
        pricePerPerson: Math.round(trip.pricePerPerson),
        // Add booking link
        bookingLink: `/Booking?trip=${trip.id}`
      }));
    
    // If no matches, return popular trips
    if (mockResults.data.length === 0) {
      mockResults.data = allTrips
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6)
        .map(trip => ({
          ...trip,
          price: Math.round(trip.price * 0.9),
          pricePerPerson: Math.round((trip.price * 0.9) / travelers),
          bookingLink: `/Booking?trip=${trip.id}`
        }));
      mockResults.message = "Showing popular trips based on your preferences";
    }
    
    return NextResponse.json(mockResults);
    
  } catch (error) {
    console.error("Trip search API error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        message: "Failed to find trips. Please try again."
      },
      { status: 500 }
    );
  }
}