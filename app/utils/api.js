const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchVehicleMakes() {
  const response = await fetch(
    `${API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle makes.');
  }
  const data = await response.json();
  return data.Results;
}

export async function fetchVehicleModels(makeId, year) {
  const response = await fetch(
    `${API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle models.');
  }
  const data = await response.json();
  return data.Results;
}
