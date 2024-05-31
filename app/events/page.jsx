"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";

function ShowEvents() {
  const [events, setEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/events")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => {
          if (a.location < b.location) return -1;
          if (a.location > b.location) return 1;
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        });
        setEvents(data);
      });
  }, []);

  const locations = [...new Set(events.filter((event) => new Date(event.date) >= new Date()).map((event) => event.location))];

  const filteredEvents = events.filter((event) => {
    if (selectedLocation && event.location !== selectedLocation) return false;
    if (startDate && new Date(event.date) < new Date(startDate)) return false;
    if (endDate && new Date(event.date) > new Date(endDate)) return false;
    if (new Date(event.date) < new Date()) return false;
    return true;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Explore Upcoming Events</h1>
        <p className="text-lg text-gray-600 mt-2">Find and book events that match your interests.</p>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center items-center md:space-x-4 mb-8">
        <div className="flex flex-col mb-4 md:mb-0">
          <label htmlFor="start-date" className="text-gray-800 font-semibold mb-1">
            Start Date:
          </label>
          <input type="date" id="start-date" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="flex flex-col mb-4 md:mb-0">
          <label htmlFor="end-date" className="text-gray-800 font-semibold mb-1">
            End Date:
          </label>
          <input type="date" id="end-date" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex justify-center w-full md:w-auto p-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mt-7">{selectedLocation ? selectedLocation : "Select Location"}</Menu.Button>
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={() => setSelectedLocation(null)} className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-gray-700`}>
                    All Cities
                  </button>
                )}
              </Menu.Item>
              {locations.map((location, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button onClick={() => setSelectedLocation(location)} className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-gray-700`}>
                      {location}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event, index) => (
          <div key={index} className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-500 hover:shadow-xl  duration-300 transition-transform-shadow  hover:scale-105">
            {" "}
            <Link href={`/events/${event._id}`}>
              <span className="cursor-pointer">
                <Image src={event.image} alt={event.description} width={500} height={300} className="object-cover w-full h-48 rounded-t-lg" />
                <div className="mt-4">
                  <p className="font-bold text-xl mb-2 text-yellow-500">{event.title}</p>
                  <p className="text-gray-200">
                    {new Date(event.date).toLocaleDateString()} - {event.location}
                  </p>
                </div>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowEvents;
