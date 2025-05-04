// app/api/track/route.ts
import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url, referrer, timestamp } = await req.json();

  await prismaClient.event.create({
    data: {
      url,
      referrer,
      timestamp: new Date(timestamp),
    },
  });

  return NextResponse.json({ success: true });
}
