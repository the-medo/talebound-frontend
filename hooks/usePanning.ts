import React, { useCallback, useEffect, useRef } from 'react';

export interface UsePanningProps {
  ref: React.RefObject<HTMLDivElement>;
  zoomRatio?: number;
  baseWidth: number;
  baseHeight: number;
  width: number;
  height: number;
}

export interface UsePanningResponse {
  isPanning: boolean;
  xClient: number;
  yClient: number;
  xOffset: number;
  yOffset: number;
  xStartOffset: number;
  yStartOffset: number;
  xStart: number;
  yStart: number;
  baseWidth: number;
  baseHeight: number;
  width: number;
  height: number;
  zoomRatio: number;
}

export const usePanning = ({
  ref,
  zoomRatio,
  baseWidth,
  baseHeight,
  width,
  height,
}: UsePanningProps): React.MutableRefObject<UsePanningResponse> => {
  const data = useRef<UsePanningResponse>({
    isPanning: false,
    xClient: 0,
    yClient: 0,
    xOffset: 0,
    yOffset: 0,
    xStartOffset: 0,
    yStartOffset: 0,
    xStart: 0,
    yStart: 0,
    baseWidth,
    baseHeight,
    width,
    height,
    zoomRatio: zoomRatio ?? 1,
  });

  const pannableElement = useRef<HTMLDivElement | null>(null); // Dependent ref

  useEffect(() => {
    if (ref.current) {
      pannableElement.current = ref.current.querySelector('.pannable') as HTMLDivElement;
    }
  }, [ref]);

  useEffect(() => {
    if (!width || !height) return;
    data.current.width = width;
    data.current.height = height;
  }, [width, height]);

  const checkEdges = useCallback(() => {
    if (!ref.current || !data.current) return;
    if (!data.current.baseWidth || !data.current.baseHeight) return;
    const xLimit = -data.current.baseWidth + data.current.width / data.current.zoomRatio;
    const yLimit = -data.current.baseHeight + data.current.height / data.current.zoomRatio;
    if (data.current.xOffset > 0) data.current.xOffset = 0;
    if (data.current.yOffset > 0) data.current.yOffset = 0;
    if (data.current.xOffset < xLimit) data.current.xOffset = xLimit;
    if (data.current.yOffset < yLimit) data.current.yOffset = yLimit;
    console.log('Checked', data.current.xOffset, xLimit, data.current.yOffset, yLimit);
  }, [ref]);

  useEffect(() => {
    if (!ref.current || !data.current) return;
    if (
      !data.current.baseWidth ||
      !data.current.baseHeight ||
      !data.current.width ||
      !data.current.height
    )
      return;
    console.log('==========================');
    console.log('starting data.current.yOffset: ', data.current.yOffset);
    const { left, top } = ref.current.getClientRects()[0];

    const pX = (data.current.xClient - left) / data.current.width;
    const pY = (data.current.yClient - top) / data.current.height;
    const zr = zoomRatio ?? 1;

    const widthDiff = data.current.width / zr - data.current.width / data.current.zoomRatio;
    const heightDiff = data.current.height / zr - data.current.height / data.current.zoomRatio;
    const offsetDiffX = widthDiff * pX;
    const offsetDiffY = heightDiff * pY;

    data.current.xOffset += offsetDiffX;
    data.current.yOffset += offsetDiffY;
    data.current.xStartOffset = data.current.xOffset;
    data.current.yStartOffset = data.current.yOffset;

    data.current.zoomRatio = zr;
    checkEdges();

    if (pannableElement.current) {
      pannableElement.current.style.transform = `translate(${data.current.xOffset}px, ${data.current.yOffset}px)`;
    }
  }, [zoomRatio, checkEdges, ref]);

  useEffect(() => {
    if (!baseWidth || !baseHeight) return;
    data.current.baseWidth = baseWidth;
    data.current.baseHeight = baseHeight;

    checkEdges();
  }, [baseWidth, baseHeight, checkEdges]);

  const handleMouseDown = useCallback((e: PointerEvent) => {
    data.current.isPanning = true;
    data.current.xStart = e.clientX;
    data.current.yStart = e.clientY;
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: PointerEvent) => {
      data.current.xClient = e.clientX;
      data.current.yClient = e.clientY;

      if (!data.current.isPanning) return;
      data.current.xOffset =
        data.current.xStartOffset + (e.clientX - data.current.xStart) / data.current.zoomRatio;
      data.current.yOffset =
        data.current.yStartOffset + (e.clientY - data.current.yStart) / data.current.zoomRatio;

      checkEdges();

      if (pannableElement.current) {
        pannableElement.current.style.transform = `translate(${data.current.xOffset}px, ${data.current.yOffset}px)`;
      }
      e.preventDefault();
    },
    [checkEdges],
  );

  const handleMouseUp = useCallback((e: PointerEvent) => {
    if (!data.current.isPanning) return;
    data.current.isPanning = false;
    data.current.xStartOffset = data.current.xOffset;
    data.current.yStartOffset = data.current.yOffset;
    e.preventDefault();
  }, []);

  useEffect(() => {
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
