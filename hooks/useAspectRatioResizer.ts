import React, { useCallback, useEffect, useMemo, useState, WheelEventHandler } from 'react';

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
  onWheel: WheelEventHandler<HTMLDivElement>;
  zoomRatio: number;
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
 * @property {function} onWheel - The wheel event handler function.
 */
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
  // const mapWidth = width - finalOffset;

  const minZoomRatio = width / baseWidth;
  const [zoomRatio, setZoomRatio] = useState(minZoomRatio);

  useEffect(() => {
    setZoomRatio((p) => {
      if (p < minZoomRatio) return minZoomRatio;
      return p;
    });
  }, [minZoomRatio]);

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

  const onWheel: WheelEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      console.log(e);
      e.preventDefault();
      const scaleIncrement = 0.1;
      setZoomRatio((p) => {
        if (e.deltaY < 0) {
          // Scrolling up - zoom in
          p = Math.min(1, p + scaleIncrement);
        } else {
          // Scrolling down - zoom out
          p = Math.max(minZoomRatio, p - scaleIncrement); // Don't scale below 1 (initial size)
        }
        console.log('New ratio: ', p, minZoomRatio);
        return p;
      });
    },
    [minZoomRatio],
  );

  return useMemo(
    () => ({
      width,
      height: Math.round(width / aspectRatio),
      finalOffset,
      onWheel,
      zoomRatio,
    }),
    [width, aspectRatio, finalOffset, onWheel, zoomRatio],
  );
};
