// app/api/packages/search/route.ts
// Public, read-only endpoint that feeds the site-wide navbar search. Returns a
// lightweight list of active packages — just enough fields to filter and link
// to the detail page, no pricing negotiation / internal data.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PUBLISHED_PACKAGE_SLUGS } from "./publishedSlugs";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true, slug: { in: PUBLISHED_PACKAGE_SLUGS } },
      select: {
        id: true,
        slug: true,
        title: true,
        shortDesc: true,
        description: true,
        destination: true,
        country: true,
        duration: true,
        price: true,
        images: true,
      },
      orderBy: { title: "asc" },
    });

    return NextResponse.json({ packages });
  } catch (error) {
    console.error("Error fetching packages for search:", error);
    return NextResponse.json({ packages: [] }, { status: 500 });
  }
}
