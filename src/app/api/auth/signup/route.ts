import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Simulate a database for storing users (replace with an actual database in production)
let users: { email: string; password: string }[] = [];

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user (replace this with a database call)
  users.push({ email, password: hashedPassword });

  // Return success response
  return NextResponse.json({ message: "User created successfully" });
}
