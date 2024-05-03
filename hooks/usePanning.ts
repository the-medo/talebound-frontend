import React, { useCallback, useEffect, useRef } from 'react';
import { base } from 'next/dist/build/webpack/config/blocks/base';

export interface UsePanningProps {
  ref: React.RefObject<HTMLDivElement>;
  zoomRatio?: number;
  baseWidth: number;
  baseHeight: number;
}

export interface UsePanningResponse {
  isPanning: boolean;
  xOffset: number;
  yOffset: number;
  xStartOffset: number;
  yStartOffset: number;
  xStart: number;
  yStart: number;
  baseWidth: number;
  baseHeight: number;
  zoomRatio: number;
}

export const usePanning = ({
  ref,
  zoomRatio,
  baseWidth,
  baseHeight,
}: UsePanningProps): React.MutableRefObject<UsePanningResponse> => {
  const data = useRef<UsePanningResponse>({
    isPanning: false,
    xOffset: 0,
    yOffset: 0,
    xStartOffset: 0,
    yStartOffset: 0,
    xStart: 0,
    yStart: 0,
    baseWidth,
    baseHeight,
    zoomRatio: zoomRatio ?? 1,
  });

  const pannableElement = useRef<HTMLDivElement | null>(null); // Dependent ref

  useEffect(() => {
    if (ref.current) {
      pannableElement.current = ref.current.querySelector('.pannable') as HTMLDivElement;
    }
  }, [ref]);

  useEffect(() => {
    data.current.zoomRatio = zoomRatio ?? 1;
    data.current.baseWidth = baseWidth;
    data.current.baseHeight = baseHeight;
  }, [zoomRatio, baseWidth, baseHeight]);

  const handleMouseDown = useCallback((e: PointerEvent) => {
    data.current.isPanning = true;
    data.current.xStart = e.clientX;
    data.current.yStart = e.clientY;
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: PointerEvent) => {
      if (!ref.current || !data.current.isPanning) return;
      const { width, height } = ref.current.getClientRects()[0];
      data.current.xOffset =
        data.current.xStartOffset + (e.clientX - data.current.xStart) / data.current.zoomRatio;
      data.current.yOffset =
        data.current.yStartOffset + (e.clientY - data.current.yStart) / data.current.zoomRatio;

      const xLimit = -data.current.baseWidth + width / data.current.zoomRatio;
      const yLimit = -data.current.baseHeight + height / data.current.zoomRatio;
      if (data.current.xOffset > 0) data.current.xOffset = 0;
      if (data.current.yOffset > 0) data.current.yOffset = 0;
      if (data.current.xOffset < xLimit) data.current.xOffset = xLimit;
      if (data.current.yOffset < yLimit) data.current.yOffset = yLimit;

      if (ref.current && pannableElement.current) {
        pannableElement.current.style.transform = `translate(${data.current.xOffset}px, ${data.current.yOffset}px)`;
      }
      e.preventDefault();
    },
    [ref],
  );

  const handleMouseUp = useCallback((e: PointerEvent) => {
    if (!data.current.isPanning) return;
    data.current.isPanning = false;
    data.current.xStartOffset = data.current.xOffset;
    data.current.yStartOffset = data.current.yOffset;
    e.preventDefault();
  }, []);

  useEffect(() => {
    console.log('UseEffect RUN');
    const layoutElement = ref.current;

    // Attach event listeners
    if (layoutElement) {
      layoutElement.addEventListener('pointerdown', handleMouseDown);
      window.addEventListener('pointermove', handleMouseMove);
      window.addEventListener('pointerup', handleMouseUp);
    }

    // Cleanup function
    return () => {
      if (layoutElement) {
        layoutElement.removeEventListener('pointerdown', handleMouseDown);
      }
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('pointerup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, ref]);

  return data;
};
