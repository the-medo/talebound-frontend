import React, { useEffect, useMemo, useState } from 'react';

export interface AspectRatioResizerProps {
  ref: React.RefObject<HTMLDivElement>;
  baseWidth?: number;
  baseHeight?: number;
}

export interface AspectRatioResizerResponse {
  width: number;
  height: number;
}

export const useAspectRatioResizer = ({
  ref,
  baseWidth = 1,
  baseHeight = 1,
}: AspectRatioResizerProps): AspectRatioResizerResponse => {
  const aspectRatio = baseHeight != 0 ? Math.round((baseWidth / baseHeight) * 1000) / 1000 : 1;
  const [width, setWidth] = useState(ref.current?.offsetWidth ?? 0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    const observedElement = ref.current;

    if (observedElement) {
      resizeObserver.observe(observedElement);
    }

    // Cleanup
    return () => {
      if (observedElement) {
        resizeObserver.unobserve(observedElement);
      }
    };
  }, [ref]);

  return useMemo(
    () => ({
      width,
      height: Math.round(width / aspectRatio),
    }),
    [aspectRatio, width],
  );
};
