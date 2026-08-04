// app/api/admin/stats/route.ts
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
    
    const [totalLeads, totalBookings, totalPackages, pendingBookings, totalRevenue] = await Promise.all([
      prisma.lead.count(),
      prisma.booking.count(),
      prisma.package.count(),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.booking.aggregate({ _sum: { totalAmount: true } }),
    ]);
    
    return NextResponse.json({
      totalLeads,
      totalBookings,
      totalPackages,
      pendingBookings,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      conversionRate: totalLeads > 0 ? ((totalBookings / totalLeads) * 100).toFixed(1) : 0,
      todayRevenue: 0,
      activeUsers: 1,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}