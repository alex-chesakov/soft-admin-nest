interface DictionaryItem {
  id: string;
  name: string;
}

const STORAGE_KEY_PREFIX = 'dictionary_';

export const saveDictionaryItems = (dictionaryType: string, items: DictionaryItem[]) => {
  localStorage.setItem(`${STORAGE_KEY_PREFIX}${dictionaryType}`, JSON.stringify(items));
};

export const loadDictionaryItems = (dictionaryType: string): DictionaryItem[] => {
  const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${dictionaryType}`);
  return stored ? JSON.parse(stored) : [];
};

export const getNextId = (items: DictionaryItem[]): string => {
  if (items.length === 0) return "1";
  const maxId = Math.max(...items.map(item => parseInt(item.id)));
  return (maxId + 1).toString();
};