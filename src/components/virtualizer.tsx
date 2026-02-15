import type { ReactNode } from 'react'
import { useMemo, memo, useRef } from 'react'

import { useWindowScroll, useViewportSize, useDebouncedValue } from '@mantine/hooks';

interface VirutalizerProps<T, A extends Object> {
  rowHeight: number;
  components: T[];
  renderItem: (component: T, index: number, additionalOptions: A) => ReactNode;
  renderItemAdditionalOptions: A;
  changedElements: (number|undefined)[];
}

const RenderedComponentsCoefficient = 2;

export const VirtualizerRaw = <T extends object, A extends object>(
  { 
    rowHeight, 
    components, 
    renderItem,
    changedElements,
    renderItemAdditionalOptions,
  }: VirutalizerProps<T, A>
) => {
  const totalHeight = rowHeight * components.length;

  const componentsIndexToVisibleComponentsIndexMap = useRef(new Map<number, number>());

  const { height: windowHeight } = useViewportSize();
  const [rawScroll] = useWindowScroll();

  const [scroll] = useDebouncedValue(rawScroll, 50);

  const yAxisScroll = scroll.y;

  const renderedScreenSize = windowHeight * RenderedComponentsCoefficient;

  const distanceToTop = yAxisScroll - ((renderedScreenSize - windowHeight) / 2);

  const paddingTop = Math.max(distanceToTop, 0);
  const paddingBottom = Math.max(totalHeight - renderedScreenSize - paddingTop, 0);

  const firstVisibleComponent = (distanceToTop / rowHeight);
  const lastVisibleComponent = ((distanceToTop + renderedScreenSize) / rowHeight);

  const visibleComponents: ReactNode[] = useMemo(() => {
    let newVisibleComponents: ReactNode[] = [];

    componentsIndexToVisibleComponentsIndexMap.current.clear();

    for (let i = Math.floor(firstVisibleComponent); i <= Math.ceil(lastVisibleComponent); i++) {
      if (components[i]) {
        console.log('test');
        newVisibleComponents.push(renderItem(components[i], i, renderItemAdditionalOptions))
        componentsIndexToVisibleComponentsIndexMap.current.set(newVisibleComponents.length - 1, i)
      }
    }

    return newVisibleComponents;
  }, [
    firstVisibleComponent,
    lastVisibleComponent,
    components,
    renderItem
  ]);

  changedElements.forEach((changedElement) => {
    if (changedElement !== undefined) {
      const changedElementVisibleComponentIndex = componentsIndexToVisibleComponentsIndexMap.current.get(changedElement);
      if (changedElementVisibleComponentIndex !== undefined) {
        visibleComponents[changedElementVisibleComponentIndex] = renderItem(components[changedElement], changedElement, renderItemAdditionalOptions);
      }
    }
  })

  return (
    <div style={{paddingTop, paddingBottom: paddingBottom + 12}}>
      {visibleComponents}
    </div>
  )
}

type VirtualizerComponent = <T extends object, A extends object>(
  props: VirutalizerProps<T, A>
) => ReactNode;

export const Virtualizer = memo(VirtualizerRaw) as unknown as VirtualizerComponent;
