# Car Dealer Application

This is a car dealer application built using Next.js, allowing users to filter and view car models based on type and year.

## Features

- Filter vehicles by make and year.
- View a list of models for the selected criteria.
- Fully styled with Tailwind CSS.
- Loading states implemented with React Suspense.
- Error handling for data fetching issues.
- Responsive and accessible design.

## Tech Stack

- **Next.js**: Framework for React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **VPIC API**: For fetching vehicle data.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd Dealer-car

   ```

2. Create a file ".env.local":

   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://vpic.nhtsa.dot.gov/api
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
