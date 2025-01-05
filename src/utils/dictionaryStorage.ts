interface DictionaryItem {
  id: string;
  name: string;
  description: string;
}

const STORAGE_KEY_PREFIX = 'dictionary_';

export const saveDictionaryItems = (dictionaryType: string, items: DictionaryItem[]) => {
  localStorage.setItem(`${STORAGE_KEY_PREFIX}${dictionaryType}`, JSON.stringify(items));
};

export const loadDictionaryItems = (dictionaryType: string): DictionaryItem[] => {
  const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${dictionaryType}`);
  return stored ? JSON.parse(stored) : [];
};