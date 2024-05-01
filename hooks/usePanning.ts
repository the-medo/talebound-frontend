import React, { useCallback, useEffect, useRef } from 'react';

export interface UsePanningProps {
  ref: React.RefObject<HTMLDivElement>;
  zoomRatio?: number;
}

export interface UsePanningResponse {
  isPanning: boolean;
  xOffset: number;
  yOffset: number;
  xStartOffset: number;
  yStartOffset: number;
  xStart: number;
  yStart: number;
  zoomRatio: number;
}

export const usePanning = ({
  ref,
  zoomRatio,
}: UsePanningProps): React.MutableRefObject<UsePanningResponse> => {
  const data = useRef<UsePanningResponse>({
    isPanning: false,
    xOffset: 0,
    yOffset: 0,
    xStartOffset: 0,
    yStartOffset: 0,
    xStart: 0,
    yStart: 0,
    zoomRatio: zoomRatio ?? 1,
  });

  const pannableElement = useRef<HTMLDivElement | null>(null); // Dependent ref
  const mouseInfoElement = useRef<HTMLDivElement | null>(null); // Dependent ref

  useEffect(() => {
    if (ref.current) {
      pannableElement.current = ref.current.querySelector('.pannable') as HTMLDivElement;
    }
    mouseInfoElement.current = document.querySelector('#mouse-info') as HTMLDivElement;
  }, [ref]);

  useEffect(() => {
    data.current.zoomRatio = zoomRatio ?? 1;
  }, [zoomRatio]);

  const handleMouseDown = useCallback(
    (e) => {
      // console.log('handleMouseDown', e);
      if (ref.current) {
        const { left, top } = ref.current.getClientRects()[0];
        console.log(ref.current.getClientRects(), 'bond', ref.current.getBoundingClientRect());
        data.current.isPanning = true;
        data.current.xStart = e.clientX;
        data.current.yStart = e.clientY;
        e.preventDefault();
      }
    },
    [ref],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (mouseInfoElement.current) {
        mouseInfoElement.current.innerHTML = `xStartOffset: ${
          data.current.xStartOffset
        } yStartOffset: ${data.current.yStartOffset} <br/>xStart: ${data.current.xStart} yStart: ${
          data.current.yStart
        } <br/>xOffset: ${data.current.xOffset} yOffset: ${data.current.yOffset} <br/>clientX: ${
          e.clientX
        } clientY: ${e.clientY} <br/> zoomRatio: ${data.current.zoomRatio}<br/> ${JSON.stringify(
          ref.current.getClientRects()[0],
        )}`;
      }
      const { left, top } = ref.current.getClientRects()[0];
      if (!data.current.isPanning) return;
      data.current.xOffset =
        data.current.xStartOffset + (e.clientX - data.current.xStart) / data.current.zoomRatio;
      data.current.yOffset =
        data.current.yStartOffset + (e.clientY - data.current.yStart) / data.current.zoomRatio;

      if (ref.current && pannableElement.current) {
        pannableElement.current.style.transform = `translate(${data.current.xOffset}px, ${data.current.yOffset}px)`;
      }
      e.preventDefault();
    },
    [ref, pannableElement],
  );

  const handleMouseUp = useCallback((e) => {
    // if (!isPanning.current) return;
    console.log('handleMouseUp', e);
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
