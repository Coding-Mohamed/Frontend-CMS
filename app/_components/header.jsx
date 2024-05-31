import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="bg-blue-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <span className="text-2xl md:text-3xl font-bold transition duration-300 ease-in-out hover:text-yellow-500">Eventopia</span>
          </Link>
        </div>

        <ul className="flex gap-4 md:gap-6 text-lg md:text-xl">
          <li>
            <Link href="/events">
              <span className="cursor-pointer transition duration-300 ease-in-out hover:text-yellow-500">Discover Events</span>
            </Link>
          </li>
          <li>
            <Link href="/bookings">
              <span className="cursor-pointer transition duration-300 ease-in-out hover:text-yellow-500">My Adventures</span>
            </Link>
          </li>
        </ul>

        <div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
