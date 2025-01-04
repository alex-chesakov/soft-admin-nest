export const usStates = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  // ... Add more states as needed
];

const citiesByState: Record<string, string[]> = {
  'CA': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose'],
  'NY': ['New York City', 'Buffalo', 'Albany', 'Rochester', 'Syracuse'],
  'TX': ['Houston', 'Austin', 'Dallas', 'San Antonio', 'Fort Worth'],
  // ... Add more cities for other states
};

export const getCitiesByState = (stateCode: string): string[] => {
  return citiesByState[stateCode] || [];
};

export const getAllCities = (): string[] => {
  return Object.values(citiesByState).flat();
};