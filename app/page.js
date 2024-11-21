"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FilterPage() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    async function fetchMakes() {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle makes.");
        }
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error("Error fetching makes:", error);
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
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Filter Vehicles</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select a Vehicle Make:
            </label>
            <select
              className="w-full p-2 border rounded"
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
            <label className="block text-gray-700 font-medium mb-2">
              Select a Model Year:
            </label>
            <select
              className="w-full p-2 border rounded"
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
              isButtonEnabled ? `/result/${selectedMake}/${selectedYear}` : "#"
            }
            className={`block w-full text-center py-2 px-4 rounded ${
              isButtonEnabled
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </>
  );
}
