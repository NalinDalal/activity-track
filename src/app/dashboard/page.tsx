"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login page
      router.push("/login");
      return;
    }

    // Fetch user data from your API (example: /api/user)
    const fetchData = async () => {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        router.push("/login"); // Redirect if the token is invalid
        return;
      }

      const data = await response.json();
      setUserData(data);
      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <p>{userData ? `Hello, ${userData.email}` : "No data"}</p>
    </div>
  );
}
