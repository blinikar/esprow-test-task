import type { FC } from 'react'
import { useCallback, useMemo } from 'react'

import { useMantineTheme, Accordion, Group, Input, NativeSelect } from '@mantine/core';

import { Virtualizer } from './virtualizer';

interface EditorProps {
  parsedData: Record<string, any>[]
  foundIndex: number | undefined;
}

const supportedTypes = [
  'string',
  'boolean',
  'number'
]

export const Editor: FC<EditorProps> = ({ parsedData, foundIndex }) => {
  const theme = useMantineTheme();

  const renderItem = useCallback((item: Record<string, any>, index: number) => (
    <Accordion.Item key={index} value={index.toString()}>
      <Accordion.Control bg={foundIndex === index ? 'blue' : undefined}>{index.toString()}</Accordion.Control>
      <Accordion.Panel>
        {
          Object.keys(item).map((key) => (
            <Group>
              <Input disabled value={key}></Input>
              <NativeSelect disabled value={typeof item[key]} data={supportedTypes}></NativeSelect>
              <Input disabled value={item[key].toString()}></Input>
            </Group>    
          ))
        }
      </Accordion.Panel>
    </Accordion.Item>
  ), [foundIndex]);

  return (
    <Accordion w='fill' chevronPosition="left" defaultValue="Apples">
      <Virtualizer components={parsedData} rowHeight={48} renderItem={renderItem} rerenderSpecific={foundIndex} />
    </Accordion>
  )
}