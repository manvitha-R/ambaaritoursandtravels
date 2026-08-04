// app/api/admin/packages/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SALES")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
      include: { categories: true },
    });
    
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// app/api/admin/packages/route.ts - Updated POST handler
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Prepare data with defaults for required fields
    const packageData = {
      title: body.title,
      slug: body.slug,
      description: body.description || null,
      shortDesc: body.shortDesc || null,
      duration: body.duration,
      destination: body.destination,
      country: body.country || "Thailand",
      price: parseFloat(body.price),
      discountPrice: body.discountPrice ? parseFloat(body.discountPrice) : null,
      bookingAmount: body.bookingAmount ? parseFloat(body.bookingAmount) : 20000,
      gst: body.gst ? parseFloat(body.gst) : 5.0,
      images: Array.isArray(body.images) ? body.images : [],
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : [],
      itinerary: body.itinerary || null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      isActive: body.isActive ?? true,
      isOnSale: body.isOnSale ?? false,
      totalSeats: body.totalSeats ? parseInt(body.totalSeats) : null,
      bookedSeats: 0,
      minAge: body.minAge ? parseInt(body.minAge) : 19,
      accommodation: body.accommodation || null,
      transportation: body.transportation || null,
      meals: body.meals || null,
      pickUpPoints: body.pickUpPoints || null,
     whatToCarry: Array.isArray(body.whatToCarry) ? body.whatToCarry : [],// FIXED: Always provide array, default to []
      additionalInfo: body.additionalInfo || null,
      cancellationPolicy: body.cancellationPolicy || null,
      termsConditions: body.termsConditions || null,
    };
    
    const newPackage = await prisma.package.create({
      data: packageData,
    });
    
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error: any) {
    console.error("Error creating package:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error.message,
        code: error.code 
      }, 
      { status: 500 }
    );
  }
}