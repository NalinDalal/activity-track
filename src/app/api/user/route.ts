import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prismaClient } from "@/lib/prisma";

interface JwtPayload {
  email: string;
}

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prismaClient.user.findUnique({
      where: { email: decoded.email },
      include: { urls: true }, // 👈 Include related URLs
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      urls: user.urls,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
