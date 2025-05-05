import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url, referrer, timestamp } = await req.json();

  // Optional: Lookup URL in DB if you want to associate it
  const urlRecord = await prismaClient.trackedUrl.findFirst({
    where: { url },
  });

  await prismaClient.event.create({
    data: {
      url,
      referrer,
      timestamp: new Date(timestamp),
      trackedUrlId: urlRecord?.id ?? null, // Link to trackedUrl if it exists
    },
  });

  return NextResponse.json({ success: true });
}
