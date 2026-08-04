// app/api/admin/packages/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all packages
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SALES")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        categories: true,
        availableDates: {
          where: { isActive: true },
          orderBy: { startDate: "asc" }
        }
      },
    });
    
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Create new package
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    
    const newPackage = await prisma.package.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: body.description,
        shortDesc: body.shortDesc,
        duration: body.duration,
        destination: body.destination,
        country: body.country || "Thailand",
        price: body.price,
        discountPrice: body.discountPrice || null,
        bookingAmount: body.bookingAmount || 20000,
        gst: body.gst || 5,
        images: body.images || [],
        inclusions: body.inclusions || [],
        exclusions: body.exclusions || [],
        totalSeats: body.totalSeats || 40,
        minAge: body.minAge || 19,
        accommodation: body.accommodation,
        transportation: body.transportation,
        meals: body.meals,
        isOnSale: body.isOnSale || false,
        itinerary: body.itinerary || [],
        pickUpPoints: body.pickUpPoints || [],
        whatToCarry: body.whatToCarry || [],
        availableDates: {
          create: body.availableDates?.filter((d: any) => d.startDate && d.endDate).map((date: any) => ({
            startDate: new Date(date.startDate),
            endDate: new Date(date.endDate),
            price: date.price || body.price,
          })) || []
        }
      },
    });
    
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}