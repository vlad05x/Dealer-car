import { Suspense } from 'react';
import Loader from '../../../components/Loader';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => 2015 + i
  );

  const response = await fetch(
    `${API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle makes.');
  }
  const data = await response.json();
  const makes = data.Results;

  const params = [];
  makes.forEach((make) => {
    years.forEach((year) => {
      params.push({ makeId: make.MakeId.toString(), year: year.toString() });
    });
  });

  return params;
}

async function VehicleModels({ makeId, year }) {
  const res = await fetch(
    `${API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch vehicle models.');
  }

  const data = await res.json();

  // Убираем дубликаты моделей
  return data.Results.filter(
    (model, index, self) =>
      index === self.findIndex((m) => m.Model_ID === model.Model_ID)
  );
}

async function VehicleContent({ makeId, year }) {
  const models = await VehicleModels({ makeId, year });

  if (!models.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-red-500 text-2xl">
          No vehicle models found for this selection.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Vehicle Models for Make: {makeId} and Year: {year}
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <li
            key={model.Model_ID}
            className="p-6 border-2 border-gray-200 rounded-lg shadow-lg bg-white transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-300">
              {model.Model_Name}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <Suspense fallback={<Loader />}>
      <VehicleContent makeId={makeId} year={year} />
    </Suspense>
  );
}
