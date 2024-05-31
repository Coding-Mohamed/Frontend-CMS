"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";

function ShowMyEvents() {
  const [events, setEvents] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/api/events?id=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setEvents(data);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-2xl font-bold">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Your Booked Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(events) &&
          events.map((event, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105">
              <Link href={`/events/${event._id}`}>
                <div>
                  <Image src={event.image} alt={event.description} width={500} height={300} className="object-cover aspect-video rounded-t-lg" />
                  <div className="p-4">
                    <p className="font-semibold text-lg text-blue-700 mb-2">{event.title}</p>
                    <p className="text-sm md:text-base text-gray-600 mb-4">
                      {new Date(event.date).toLocaleDateString()} - {event.location}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ShowMyEvents;
