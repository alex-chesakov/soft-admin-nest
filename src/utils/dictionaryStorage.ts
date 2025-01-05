interface DictionaryItem {
  id: string;
  name: string;
}

const STORAGE_KEY_PREFIX = 'dictionary_';

// Default values for dictionaries
const DEFAULT_DICTIONARIES: Record<string, DictionaryItem[]> = {
  'order-requirements': [
    { id: '1', name: 'Fragile Items' },
    { id: '2', name: 'Heavy Load' },
    { id: '3', name: 'Temperature Controlled' },
    { id: '4', name: 'Express Delivery' },
    { id: '5', name: 'Insurance Required' }
  ],
  'delivery-windows': [
    { id: '1', name: '9:00 AM - 12:00 PM' },
    { id: '2', name: '12:00 PM - 3:00 PM' },
    { id: '3', name: '3:00 PM - 6:00 PM' },
    { id: '4', name: '6:00 PM - 9:00 PM' }
  ],
  'collection-windows': [
    { id: '1', name: '7:00 AM - 9:00 AM' },
    { id: '2', name: '9:00 AM - 11:00 AM' },
    { id: '3', name: '11:00 AM - 1:00 PM' }
  ],
  'order-statuses': [
    { id: '1', name: 'New Order' },
    { id: '2', name: 'In Progress' },
    { id: '3', name: 'Collector Assigned' },
    { id: '4', name: 'In Transit' },
    { id: '5', name: 'Collected' },
    { id: '6', name: 'Cancelled' }
  ],
  'item-statuses': [
    { id: '1', name: 'Not collected' },
    { id: '2', name: 'Collected adjusted' },
    { id: '3', name: 'Collected' },
    { id: '4', name: 'Out of Stock' },
    { id: '5', name: 'Substituted' }
  ]
};

// Initialize dictionary with default values if it doesn't exist
const initializeDictionary = (dictionaryType: string) => {
  const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${dictionaryType}`);
  if (!stored && DEFAULT_DICTIONARIES[dictionaryType]) {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${dictionaryType}`,
      JSON.stringify(DEFAULT_DICTIONARIES[dictionaryType])
    );
    return DEFAULT_DICTIONARIES[dictionaryType];
  }
  return stored ? JSON.parse(stored) : [];
};

export const saveDictionaryItems = (dictionaryType: string, items: DictionaryItem[]) => {
  const existingItems = loadDictionaryItems(dictionaryType);
  // Only allow adding new items, never removing existing ones
  const newItems = items.filter(item => !existingItems.find(existing => existing.id === item.id));
  const updatedItems = [...existingItems, ...newItems];
  
  localStorage.setItem(`${STORAGE_KEY_PREFIX}${dictionaryType}`, JSON.stringify(updatedItems));
};

export const loadDictionaryItems = (dictionaryType: string): DictionaryItem[] => {
  return initializeDictionary(dictionaryType);
};

export const getNextId = (items: DictionaryItem[]): string => {
  if (items.length === 0) return "1";
  const maxId = Math.max(...items.map(item => parseInt(item.id)));
  return (maxId + 1).toString();
};

// Helper function to get the color for an item status
export const getItemStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'not collected':
      return '#888888'; // Gray
    case 'collected adjusted':
    case 'collected':
      return '#22c55e'; // Green
    case 'out of stock':
      return '#ea384c'; // Red
    case 'substituted':
      return '#0EA5E9'; // Blue
    default:
      return '#888888'; // Default gray
  }
};