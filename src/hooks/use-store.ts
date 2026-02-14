import { create } from 'zustand'

export interface JsonStore {
  parsedData: Object[];
  isParsed: boolean;
  parseDataFromStringContent: (content: string) => void;
  clear: () => void,
}

export interface SearchStore {
  foundIndex: number | undefined;
  searchValue: string;
  searchOpened: boolean;
  searchError: string | undefined;
  close: () => void;
  open: () => void;
  changeValue: (searchValue: string) => void;
  changeFoundIndex: (foundIndex: number | undefined) => void;
  setError: (searchError: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  foundIndex: undefined,
  searchValue: '',
  searchOpened: false,
  searchError: undefined,
  close: () => set(() => ({ 
    foundIndex: undefined,
    searchValue: '',
    searchOpened: false,
    searchError: undefined,
  })),
  open: () => set(() => ({ 
    searchOpened: true
  })),
  changeValue: (searchValue) => set(() => ({ 
    foundIndex: undefined,
    searchValue,
    searchError: undefined,
  })),
  changeFoundIndex: (foundIndex) => set(() => ({ 
    foundIndex,
    searchError: undefined,
  })),
  setError: (searchError) => set(() => ({ 
    foundIndex: undefined,
    searchError,
  })),
}))

export const useJsonStore = create<JsonStore>((set) => ({
  parsedData: [],
  isParsed: false,
  parseDataFromStringContent: (content: string) => set(() => {
    return { 
      parsedData: JSON.parse(content),
      isParsed: true,
    };
  }),
  clear: () => set({ parsedData: [], isParsed: false }),
}))