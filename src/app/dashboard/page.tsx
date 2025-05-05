"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user and their URLs
        const userRes = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) {
          router.push("/login");
          return;
        }

        const user = await userRes.json();
        setUserData(user);

        // Fetch events
        const eventRes = await fetch("/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const eventData = await eventRes.json();
        setEvents(eventData);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        <p>{userData ? `Hello, ${userData.email}` : "No user data"}</p>
        <p>Well done! Successfully logged in.</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Your Tracked URLs</h2>
        {userData?.urls?.length > 0 ? (
          <ul className="ml-6 list-disc">
            {userData.urls.map((url: any) => (
              <li key={url.id}>{url.url}</li>
            ))}
          </ul>
        ) : (
          <p>No URLs associated with your account.</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Recent Page Events</h2>
        {events.length === 0 ? (
          <p>No tracking events yet.</p>
        ) : (
          <ul className="space-y-2">
            {events.map((event: any) => (
              <li key={event.id} className="p-2 rounded border shadow-sm">
                <p>
                  <strong>URL:</strong> {event.url}
                </p>
                <p>
                  <strong>Referrer:</strong> {event.referrer || "N/A"}
                </p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
