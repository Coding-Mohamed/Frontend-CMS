/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";

function ShowEvent() {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(null);

  const fetchEvent = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/events/${id}`);
    const data = await response.json();
    setEvent(data);
    setLoading(false);
  };

  const checkBooking = async () => {
    if (!user) {
      return;
    }

    const userId = user.id;
    const response = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/events/${id}?id=${userId}`);
    const data = await response.json();
    setBookingStatus(data.booked);
    setLoading(false);
  };

  const handleButtonClick = async () => {
    const userId = user.id;
    const response = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/events/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    await checkBooking();
    await fetchEvent();
  };

  useEffect(() => {
    fetchEvent();
    if (user) {
      checkBooking();
    }
  }, [id, user?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const buttonText = bookingStatus ? "Cancel Booking" : "Book Event";

  return (
    <div className="container mx-auto px-10 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">{event.title}</h1>

      <div className="relative mb-8 rounded-lg overflow-hidden test">
        <div style={{ maxHeight: "600px" }}>
          <Image src={event.image} alt={event.description} layout="responsive" width={1200} height={500} />
        </div>
        <button className={`absolute bottom-0 left-0 w-full bg-yellow-500 text-gray-800 py-4 text-lg font-semibold ${bookingStatus ? "bg-red-600" : "bg-green-600"} ${bookingStatus ? "hover:bg-red-700" : "hover:bg-green-700"}`} onClick={handleButtonClick}>
          {buttonText}
        </button>
        {bookingStatus && <p className="absolute top-0 right-0 rounded-lg bg-green-600 text-white px-4 py-2 font-semibold">Booked</p>}
      </div>

      <p className="text-gray-700 mb-6">{event.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <strong className="block mb-1">Price:</strong>
          <span>${event.price}</span>
        </div>
        <div>
          <strong className="block mb-1">Date:</strong>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div>
          <strong className="block mb-1">Attendees:</strong>
          <span>{event.bookings}</span>
        </div>
        <div>
          <strong className="block mb-1">Available Seats:</strong>
          <span>{event.seats}</span>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/events">
          <span className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">Back to Events</span>
        </Link>
      </div>
    </div>
  );
}

export default ShowEvent;
