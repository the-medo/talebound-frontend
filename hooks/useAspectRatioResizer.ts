import React, { useCallback, useEffect, useMemo, useState } from 'react';

export type AspectRatioOffset =
  | number
  | {
      fragment: number;
      min?: number;
      max?: number;
    };

export interface AspectRatioResizerProps {
  ref: React.RefObject<HTMLDivElement>;
  baseWidth?: number;
  offset?: AspectRatioOffset;
  baseHeight?: number;
}

export interface AspectRatioResizerResponse {
  width: number;
  height: number;
  finalOffset: number;
}

export const useAspectRatioResizer = ({
  ref,
  baseWidth = 1,
  offset = 0,
  baseHeight = 1,
}: AspectRatioResizerProps): AspectRatioResizerResponse => {
  const computeOffset = useCallback(
    (width: number): number => {
      if (!offset) return 0;
      if (typeof offset === 'number') {
        return offset;
      }
      const frag = width / offset.fragment;
      if (!offset.max && !offset.min) return frag;
      if (offset.max !== undefined && frag > offset.max) return offset.max;
      if (offset.min !== undefined && frag < offset.min) return offset.min;
      return frag;
    },
    [offset],
  );

  const aspectRatio = baseHeight != 0 ? Math.round((baseWidth / baseHeight) * 1000) / 1000 : 1;
  const [width, setWidth] = useState(ref.current?.offsetWidth ?? 0);
  const [finalOffset, setFinalOffset] = useState(computeOffset(width));

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const fOffset = computeOffset(entry.contentRect.width);
        setWidth(entry.contentRect.width - fOffset);
        setFinalOffset(fOffset);
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
  }, [computeOffset, ref]);

  return useMemo(
    () => ({
      width,
      height: Math.round(width / aspectRatio),
      finalOffset,
    }),
    [aspectRatio, finalOffset, width],
  );
};
