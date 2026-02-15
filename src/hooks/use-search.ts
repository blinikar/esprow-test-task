import { useSearchStore } from "./use-store";

export const useSearch = ({ parsedData }: { parsedData: Object[] }) => {
  const {
    foundIndex,
    searchError,
    searchOpened,
    searchValue,
    changeFoundIndex,
    changeValue,
    close,
    open,
    setError,
  } = useSearchStore();

  const handleSetSearchValue = (newValue: string) => {
    changeValue(newValue);
  };

  const handleOpenSearch = () => {
    if (searchOpened) {
      close();
      return;
    }

    open();
  }

  const handleSearch = (direction: 'up' | 'down') => () => {
    changeFoundIndex(undefined);

    if ((foundIndex === 0 || foundIndex === undefined) && direction === 'up') {
      setError("You've reached the start of the data");
      return;
    }

    if (foundIndex === parsedData.length - 1 && direction === 'down' ) {
      setError("You've reached the end of the data");
      return;
    }

    let startIndex = foundIndex ?? 0
    if (foundIndex !== undefined) {
      if (direction === 'up') {
        startIndex = foundIndex - 1;
      } else if (direction === 'down') {
        startIndex = foundIndex + 1;
      }
    }

    let newFoundIndex;
    for (let i = startIndex; i < parsedData.length && i > -1; direction === 'down' ? i += 1 : i -= 1) {
      const item = parsedData[i];

      if (!item) {
        continue;
      }

      const keys = Object.keys(item);

      if (keys.some((key) => key.includes(searchValue))) {
        newFoundIndex = i;
        break;
      }
      
    }

    if (newFoundIndex === undefined) {
      setError("Nothing found");
    }

    changeFoundIndex(newFoundIndex);
  };

  return {
    searchError,
    searchOpened,
    searchValue,
    foundIndex,
    handleOpenSearch,
    handleSearch,
    handleSetSearchValue,
  } as const;
};