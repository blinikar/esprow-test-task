import type { FC } from 'react'

import { Group, ActionIcon } from '@mantine/core';
import { IconDownload, IconSearch, IconTrash } from '@tabler/icons-react';

interface HeaderProps {
  shouldSearchBeOpened: boolean;
  onOpenSearch: () => void;
  onClear: () => void;
  onDownload: () => void;
}

export const Header: FC<HeaderProps> = ({ shouldSearchBeOpened, onOpenSearch, onClear, onDownload }) => {
  return (
    <Group justify='space-between' h="100%" px="md">
      <div>
        Fancy JSON Viewer & Editor (subscribe for $ 19.99/month)
      </div>
    
      <Group justify='end' h="100%" px="md">
        <ActionIcon 
          variant={shouldSearchBeOpened ? 'filled' : 'light'}
          size='lg'
          onClick={onOpenSearch}
        >
          <IconSearch size={14} />
        </ActionIcon>
        <ActionIcon
          variant='light'
          size='lg'
          onClick={onDownload}
        >
          <IconDownload size={14} />
        </ActionIcon>
        <ActionIcon
          variant='light'
          size='lg'
          color='red'
          onClick={onClear}
        >
          <IconTrash size={14} />
        </ActionIcon>
      </Group>
    </Group>
  )
}