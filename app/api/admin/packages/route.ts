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
        slug: body.slug,
        description: body.description,
        shortDesc: body.shortDesc,
        duration: body.duration,
        destination: body.destination,
        price: body.price,
        discountPrice: body.discountPrice,
        images: body.images || [],
        inclusions: body.inclusions || [],
        exclusions: body.exclusions || [],
        totalSeats: body.totalSeats,
        isActive: body.isActive ?? true,
        isOnSale: body.isOnSale ?? false,
      },
    });
    
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}