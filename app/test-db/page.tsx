// app/test-db/page.tsx
import { prisma } from "@/lib/prisma";

export default async function TestDBPage() {
  let result = null;
  let error = null;
  
  try {
    await prisma.$connect();
    const dbResult = await prisma.$queryRaw<Array<{ time: Date }>>`SELECT NOW() as time`;
    result = dbResult[0].time;
  } catch (e: any) {
    error = e.message;
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Test</h1>
      <div className="bg-gray-800 p-4 rounded">
        <p><strong>DATABASE_URL exists:</strong> {process.env.DATABASE_URL ? "✅ Yes" : "❌ No"}</p>
        <p><strong>Connection:</strong> {error ? `❌ ${error}` : `✅ Connected at ${result}`}</p>
      </div>
    </div>
  );
}