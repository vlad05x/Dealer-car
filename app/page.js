'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function FilterPage() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    async function fetchMakes() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle makes.');
        }
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error('Error fetching makes:', error);
      }
    }
    fetchMakes();
  }, []);

  useEffect(() => {
    setIsButtonEnabled(selectedMake && selectedYear);
  }, [selectedMake, selectedYear]);

  const currentyear = new Date().getFullYear();
  const years = Array.from(
    { length: currentyear - 2015 + 1 },
    (_, i) => 2015 + i
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6 flex items-start justify-center">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
            Filter Vehicles
          </h1>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Select a Vehicle Make:
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
              >
                <option value="">-- Select Make --</option>
                {makes.map((make) => (
                  <option key={make.MakeId} value={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Select a Model Year:
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">-- Select Year --</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <Link
              href={
                isButtonEnabled
                  ? `/result/${selectedMake}/${selectedYear}`
                  : '#'
              }
              className={`block w-full text-center py-3 px-6 rounded-lg shadow-md font-bold text-lg transition ${
                isButtonEnabled
                  ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
