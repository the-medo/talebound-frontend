import React, { useCallback, useEffect, useMemo, useState, WheelEventHandler } from 'react';
import { usePanning } from './usePanning';

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
  baseHeight?: number;
  offset?: AspectRatioOffset;
  zoomable?: boolean;
  movable?: boolean;
}

export interface AspectRatioResizerResponse {
  width: number;
  height: number;
  finalOffset: number;
  zoomRatio: number;
  xOffset: number;
  yOffset: number;
}

/**
 * Resizes an element while maintaining a specific aspect ratio.
 *
 * @param {Object} props - The configuration props.
 * @param {RefObject} props.ref - The reference to the element to be resized.
 * @param {number} [props.baseWidth=1] - The base width of the element.
 * @param {AspectRatioOffset} [props.offset=0] - The offset value for the element width (for example for sidebar).
 * @param {number} [props.baseHeight=1] - The base height of the element.
 *
 * @returns {Object} - The response object.
 * @property {number} width - The current width of the element. It contains offset!
 * @property {number} height - The calculated height based on the element width. Important to note, with offset, the aspect ratio won't be the same.
 * @property {number} finalOffset - The final offset value.
 */
export const useAspectRatioResizer = ({
  ref,
  baseWidth = 1,
  baseHeight = 1,
  offset = 0,
  zoomable = false,
  movable = false,
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

  const minZoomRatio = width / baseWidth;
  const [zoomRatio, setZoomRatio] = useState(minZoomRatio);
  const panningRef = usePanning({ ref, zoomRatio: zoomRatio });

  useEffect(() => {
    setZoomRatio((p) => {
      if (p < minZoomRatio) return minZoomRatio;
      return p;
    });
  }, [minZoomRatio]);

  // RESIZE OBSERVER
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

  // WHEEL ZOOM
  useEffect(() => {
    if (!zoomable) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scaleIncrement = 0.1;
      setZoomRatio((p) => {
        if (e.deltaY < 0) {
          p = Math.min(1, p + scaleIncrement);
        } else {
          p = Math.max(minZoomRatio, p - scaleIncrement); // Don't scale below 1 (initial size)
        }
        return p;
      });
    };

    const layoutElement = ref.current;
    if (layoutElement) {
      layoutElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      if (layoutElement) {
        layoutElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [zoomable, minZoomRatio, ref]);

  return useMemo(
    () => ({
      width,
      height: Math.round(width / aspectRatio),
      finalOffset,
      zoomRatio,
      xOffset: panningRef.current.xOffset,
      yOffset: panningRef.current.yOffset,
    }),
    [
      width,
      aspectRatio,
      finalOffset,
      zoomRatio,
      panningRef.current.xOffset,
      panningRef.current.yOffset,
    ],
  );
};
