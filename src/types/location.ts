export interface Location {
  id: string;
  name: string;
}

export const defaultLocations: Location[] = [
  { id: '1', name: 'Downtown' },
  { id: '2', name: 'North District' },
  { id: '3', name: 'South District' },
  { id: '4', name: 'East District' },
  { id: '5', name: 'West District' }
];