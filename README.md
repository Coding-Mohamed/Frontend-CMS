# Frontend CMS Project

## Overview

This project is a frontend CMS built using Next.js, Clerk for authentication, and Convex as the database. It allows users to explore, book, and manage events.

## Technologies Used

- **Next.js**: A React framework for building fast, server-side rendered web applications.
- **Clerk**: Provides authentication and user management solutions.
- **Convex**: Real-time data storage and querying service.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env.local` file and add the following:

   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
   NEXT_PUBLIC_CLERK_API_KEY=<your-clerk-api-key>
   NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
   NEXT_PUBLIC_BACKEND_URL=<your-backend-url>
   ```

4. **Run the Development Server**

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the project.

## Features

- **Browse Events**: View a list of upcoming events with filter options.
- **Event Details**: See detailed information about each event and book or cancel bookings.
- **User Authentication**: Sign up, log in, and manage user accounts with Clerk.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## License

This project is licensed under the MIT License.
