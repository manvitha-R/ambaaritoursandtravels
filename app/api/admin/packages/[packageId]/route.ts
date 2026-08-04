// app/api/admin/packages/[packageId]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Fetch a single package by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SALES")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const packageId = (await params).packageId;
    
    const packageData = await prisma.package.findUnique({
      where: { id: packageId },
      include: {
        categories: true,
        availableDates: true,
      },
    });
    
    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    
    return NextResponse.json(packageData);
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT - Update a package
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const packageId = (await params).packageId;
    const body = await request.json();
    
    // Prepare the update data
    const updateData: any = {
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
      whatToCarry: Array.isArray(body.whatToCarry) ? body.whatToCarry : [], // Fixed: always provide array
      itinerary: body.itinerary || null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      isActive: body.isActive ?? true,
      isOnSale: body.isOnSale ?? false,
      totalSeats: body.totalSeats ? parseInt(body.totalSeats) : null,
      minAge: body.minAge ? parseInt(body.minAge) : 19,
      accommodation: body.accommodation || null,
      transportation: body.transportation || null,
      meals: body.meals || null,
      pickUpPoints: body.pickUpPoints || null,
      additionalInfo: body.additionalInfo || null,
      cancellationPolicy: body.cancellationPolicy || null,
      termsConditions: body.termsConditions || null,
    };
    
    // First, check if package exists
    const existingPackage = await prisma.package.findUnique({
      where: { id: packageId },
    });
    
    if (!existingPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    
    // Update the package
    const updatedPackage = await prisma.package.update({
      where: { id: packageId },
      data: updateData,
    });
    
    return NextResponse.json(updatedPackage);
  } catch (error: any) {
    console.error("Error updating package:", error);
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

// DELETE - Delete a package
export async function DELETE(
  request: Request,
   { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const packageId = (await params).packageId;
    
    // Check if package exists
    const existingPackage = await prisma.package.findUnique({
      where: { id: packageId },
    });
    
    if (!existingPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    
    // Delete the package (cascade will handle related records if configured)
    await prisma.package.delete({
      where: { id: packageId },
    });
    
    return NextResponse.json({ message: "Package deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting package:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}