// app/api/debug-prisma/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const debugInfo = {
    nodeEnv: process.env.NODE_ENV,
    databaseUrlExists: !!process.env.DATABASE_URL,
    databaseUrlPrefix: process.env.DATABASE_URL?.substring(0, 50),
  };
  
  try {
    // Test connection
    await prisma.$connect();
    const result = await prisma.$queryRaw<Array<{ time: Date }>>`SELECT NOW() as time`;
    
    return NextResponse.json({
      success: true,
      debug: debugInfo,
      serverTime: result[0].time,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      debug: debugInfo,
      error: error.message,
    }, { status: 500 });
  }
}