import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  email: string;
}

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prismaClient.user.findUnique({
      where: { email: decoded.email },
      include: { urls: true },
    });

    if (!user || user.urls.length === 0) {
      return NextResponse.json([]);
    }

    const urls = user.urls.map((u) => u.url);

    const events = await prismaClient.event.findMany({
      where: {
        url: { in: urls },
      },
      orderBy: { timestamp: "desc" },
      take: 20,
    });

    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
