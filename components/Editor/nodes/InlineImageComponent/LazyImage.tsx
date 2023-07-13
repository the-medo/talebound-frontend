import { Position } from '../InlineImageNode/InlineImageNode';
import { useSuspenseImage } from './inlineImageComponentLib';
import * as React from 'react';
import { styled } from '../../../../styles/stitches.config';
import Stitches from '@stitches/react';

/*

  cursor: 'default',
  display: 'inline-block',
  position: 'relative',
  zIndex: 1,
 */

const StyledLazyImage = styled('img', {
  maxWidth: '100%',
  cursor: 'default',
  display: 'block',

  variants: {
    position: {
      left: {
        // float: 'left',
      },
      right: {
        // float: 'right',
      },
      full: {},
    },

    focused: {
      true: {
        outline: '2px solid rgb(60,132,244)',
      },
    },

    grabbable: {
      true: {
        cursor: 'grab',
      },
    },
  },
});
export type LazyImageVariants = Stitches.VariantProps<typeof StyledLazyImage>;

interface LazyImageProps extends LazyImageVariants {
  altText: string;
  height: 'inherit' | number;
  imageRef: { current: null | HTMLImageElement };
  src: string;
  width: 'inherit' | number;
  position: Position;
}

export function LazyImage({
  altText,
  imageRef,
  src,
  width,
  height,
  position,
  ...variants
}: LazyImageProps): JSX.Element {
  useSuspenseImage(src);

  return (
    <StyledLazyImage
      src={src}
      alt={altText}
      ref={imageRef}
      data-position={position}
      position={position}
      style={{
        height,
        width,
      }}
      draggable="false"
      {...variants}
    />
  );
}
