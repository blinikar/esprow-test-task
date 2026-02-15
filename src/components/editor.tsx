import type { FC, ReactElement } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useMantineTheme, Accordion, Group, Input, NativeSelect, Checkbox, Text } from '@mantine/core';
import { usePrevious } from '@mantine/hooks';

import { Virtualizer } from './virtualizer';

interface EditorProps {
  parsedData: Record<string, any>[]
  foundIndex: number | undefined;
  changeValue: <T>(index: number, key: string, value: T) => void;
}

const supportedTypes = [
  'string',
  'boolean',
  'number'
]

const FieldForType = <T,>({ 
  value,
  preparedChangeValue, 
  key 
}: {
  value: T, 
  preparedChangeValue: <T>(value: T) => void, 
  key: string
}) => {

  switch(typeof value) {
    case 'string':
      return <Input
        key={key} 
        value={value} 
        onChange={(event) => preparedChangeValue(event.currentTarget.value)} 
      />
    case 'number':
      return <Input
        key={key}  
        value={value.toString()}
        onChange={(event) => preparedChangeValue(event.currentTarget.value)} 
      />
    case 'boolean':
      return <Checkbox
        key={key}  
        checked={value}
        onChange={(event) => preparedChangeValue(event.currentTarget.checked)} 
        label="Value"
      />
    default: 
      return <Text key={key}>Unsupported type: {typeof value}</Text>
  }
}

export const Editor: FC<EditorProps> = ({ parsedData, foundIndex, changeValue }) => {
  const theme = useMantineTheme();

  const [changedElement, setChangedElement] = useState<number | undefined>();
  const previousFoundIndex = usePrevious(foundIndex);

  const renderItem = useCallback((item: Record<string, any>, index: number, additionalOptions: { foundIndex: typeof foundIndex }) => (
    <Accordion.Item key={index} value={index.toString()}>
      <Accordion.Control bg={additionalOptions?.foundIndex === index ? 'blue' : undefined}>{index.toString()}</Accordion.Control>
      <Accordion.Panel>
        {
          Object.keys(item).map((key) => {
            const preparedChangeValue = <T,>(value: T) => {
              changeValue(index, key, value);
              setChangedElement(index);
            }
            
            return (
              <Group>
                <Input readOnly value={key}></Input>
                <NativeSelect value={typeof item[key]} data={supportedTypes}></NativeSelect>
                <FieldForType key={key} value={item[key]} preparedChangeValue={preparedChangeValue} />
              </Group>    
            )
          })
        }
      </Accordion.Panel>
    </Accordion.Item>
  ), []);

  useEffect(() => {
    if (changedElement !== undefined) {
      setChangedElement(undefined);
    }
  }, [changedElement])

  return (
    <Accordion w='fill' chevronPosition="left" defaultValue="Apples">
      <Virtualizer 
        components={parsedData} 
        rowHeight={48} 
        renderItem={renderItem}
        renderItemAdditionalOptions={{ foundIndex }}
        changedElements={[changedElement, foundIndex, previousFoundIndex]} />
    </Accordion>
  )
}