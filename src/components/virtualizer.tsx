import type { FC, ReactNode } from 'react'
import { useMemo, memo, useState, useEffect } from 'react'

import { Group, ActionIcon } from '@mantine/core';
import { IconDownload, IconSearch, IconTrash } from '@tabler/icons-react';
import { useWindowScroll, useViewportSize, useDebouncedState } from '@mantine/hooks';

interface VirutalizerProps<T> {
  rowHeight: number;
  components: T[];
  renderItem: (component: T, index: number) => ReactNode;
  rerenderSpecific: number;
}

const RenderedComponentsCoefficient = 2;

export const VirtualizerRaw = <T extends object>(
  { 
    rowHeight, 
    components, 
    renderItem,
    rerenderSpecific,
  }: VirutalizerProps<T>
) => {
  const totalHeight = rowHeight * components.length;
  
  const { height: windowHeight } = useViewportSize();
  const [scroll, scrollTo] = useWindowScroll();

  const [visibleComponents, setVisibleComponents] = useState<ReactNode[]>([]);

  // Add debounce
  // Add render specific
  // Add editing

  const yAxisScroll = scroll.y;

  const renderedScreenSize = windowHeight * RenderedComponentsCoefficient;

  const distanceToTop = yAxisScroll - ((renderedScreenSize - windowHeight) / 2);

  const paddingTop = Math.max(distanceToTop, 0);
  const paddingBottom = Math.max(totalHeight - renderedScreenSize - paddingTop, 0);

  const firstVisibleComponent = (distanceToTop / rowHeight);
  const lastVisibleComponent = ((distanceToTop + renderedScreenSize) / rowHeight);

  useEffect(() => {
    let newVisibleComponents: ReactNode[] = [];

    for (let i = Math.floor(firstVisibleComponent); i <= Math.ceil(lastVisibleComponent); i++) {
      if (components[i]) {
        newVisibleComponents.push(renderItem(components[i], i))
      }
    }

    setVisibleComponents(newVisibleComponents);
  }, [
    firstVisibleComponent, 
    lastVisibleComponent,
    components,
    renderItem,
    setVisibleComponents
  ]);

  // useEffect(() => {
  //   let newVisibleComponents = [...visibleComponents];
  // }, [rerenderSpecific]);

  return (
    <div style={{paddingTop, paddingBottom: paddingBottom + 12}}>
      {visibleComponents}
    </div>
  )
}

export const Virtualizer = memo(VirtualizerRaw)