import { useCallback, useEffect, useRef, useState } from "react";

import { useShallow } from 'zustand/react/shallow'

import { useJsonStore } from "./use-store"
import type { FileWithPath } from "@mantine/dropzone";
import { useSearch } from "./use-search";

export const useLogic = () => {
  const parsedData = useJsonStore(useShallow((state) => state.parsedData));
  const {
    isParsed,
    parseDataFromStringContent,
    clear,
    changeValue,
  } = useJsonStore(useShallow(({ parsedData, ...state }) => state));

  const {
    searchOpened,
    searchValue,
    foundIndex,
    searchError,
    handleOpenSearch,
    handleSearch,
    handleSetSearchValue,
  } = useSearch({ parsedData });

  const readerRef = useRef(new FileReader());

  useEffect(() => {
    readerRef.current.onload = () => {
      const readerResult = readerRef.current.result

      if (!readerResult || typeof readerResult !== 'string') {
        console.error('Error while reading or trying to read as an ArrayBuffer');
        return;
      }

      parseDataFromStringContent(readerResult)
    }

    return () => {
      readerRef.current.onload = null;
    }
  }, [parseDataFromStringContent, readerRef.current])

  const handleAccept = (file: FileWithPath[]) => {
    readerRef.current.readAsText(file[0])
  }

  return { 
    root: {
      shouldSearchBeOpened: searchOpened,
      shouldShowForm: !isParsed,
      
    },
    dropZone: {
      onAccept: handleAccept,
    },
    search: {
      searchValue,
      searchError,
      handleSearch,
      setSearchValue: handleSetSearchValue,
    },
    header: {
      shouldSearchBeOpened: searchOpened,
      onClear: clear,
      onOpenSearch: handleOpenSearch,
      onDownload: () => {},
    },
    editor: {
      parsedData,
      foundIndex,
      changeValue,
    }
  } as const
}