"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send the sign-up request to the backend API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle the response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
      }

      const data = await response.json();

      // If sign-up is successful, redirect to login page
      alert(data.message); // Show success message
      router.push("/login");
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center py-16 px-4 min-h-screen text-white bg-[#ff6347]">
      <div className="p-8 w-full max-w-md rounded-2xl border shadow-xl backdrop-blur-lg bg-white/10 border-white/20">
        <h2 className="mb-6 text-3xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-center text-red-500">{error}</p>}
          <div>
            <label className="block mb-1 text-sm font-medium text-white/80">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 w-full text-white rounded-lg border focus:ring-2 focus:outline-none bg-white/10 border-white/20 placeholder-white/50 backdrop-blur-sm focus:ring-white/30"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-white/80">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 w-full text-white rounded-lg border focus:ring-2 focus:outline-none bg-white/10 border-white/20 placeholder-white/50 backdrop-blur-sm focus:ring-white/30"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="py-3 px-6 w-full font-semibold text-white rounded-full border transition-all hover:shadow-lg border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:shadow-white/30"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-white/60">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Log In
          </a>
        </p>
      </div>
    </section>
  );
}
