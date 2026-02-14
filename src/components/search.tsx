import type { FC } from 'react'

import { Button, Stack, Input, Group, ActionIcon } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconSearch } from '@tabler/icons-react';

interface SearchProps {
  searchValue: string;
  searchError: string | undefined;
  handleSearch: (direction: 'up' | 'down') => () => void;
  setSearchValue: (state: string) => void;
}

export const Search: FC<SearchProps> = ({
  searchValue,
  searchError,
  handleSearch,
  setSearchValue
}) => {
  return (
    <Stack justify='start' p='16' h="100%" px="md">
      <Input.Wrapper error={searchError}>
        <Input
          leftSection={<IconSearch size={14} />} 
          value={searchValue} 
          onInput={(event) => setSearchValue(event.currentTarget.value)} />
      </Input.Wrapper>
      <Group wrap='nowrap'>
        <Button 
          fullWidth 
          leftSection={<IconArrowDown size={14} />}
          onClick={handleSearch('down')}
        >
          Find next
        </Button>
        <ActionIcon 
          variant='light'
          size='lg'
          onClick={handleSearch('up')}
        >
          <IconArrowUp size={14} />
        </ActionIcon>
      </Group>
    </Stack>
  )
}