import React from 'react';
import Stitches from '@stitches/react';
import { styled } from '../../styles/stitches.config';

const imgs = [
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/b5bca192-5a78-49d3-869d-e259f1b75400/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/69087495-bcd1-4545-69f0-62d828473a00/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/b9edebce-acd8-4ea6-b0ad-89e9e0208300/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/d305d9d3-e872-43ee-2eef-6d64aedb6100/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/6e768a22-f80e-4796-a4f9-19e201abbd00/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/50ca6722-b6a6-49dc-3a85-8ef2e6dbc500/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/30d2be2c-a865-46c2-0ad6-7442c6768900/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/4caa12fb-8133-4480-27ed-f60116185f00/100x100',
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/d626ba63-6040-418d-9c64-9c9548812f00/100x100',
];

const IMG_SIZE = 30;
const SUB_ICON_SIZE = Math.sqrt(2 * IMG_SIZE ** 2);
const MARGIN = 5;
const BIG_IMG_COEF = 1.5;

const MenuMarkerWrapper = styled('div', {
  position: 'absolute',
  width: `${IMG_SIZE}px`,
  height: `${IMG_SIZE}px`,
  transform: 'rotate(45deg)',
  // transform: 'translate(-50%, -50%) rotate(45deg)',
  border: '1px solid $primary500',
  // margin: `${MARGIN}px`,

  overflow: 'hidden',

  left: `calc(50% - ${SUB_ICON_SIZE / 3 + 2}px)`,
  top: `calc(50% - ${SUB_ICON_SIZE / 3 + 2}px)`,

  variants: {
    position: {
      middle: {
        transform: 'translate(-50%, -50%) rotate(45deg)',
        top: '50%',
        left: '50%',
      },
      top: {
        transform: `translateY(calc(-50% - ${SUB_ICON_SIZE / 4}px)) rotate(45deg)`,
      },
      bottom: {
        transform: `translateY(calc(50% + ${SUB_ICON_SIZE / 4}px)) rotate(45deg)`,
      },
      left: {
        transform: `translateX(calc(-50% - ${SUB_ICON_SIZE / 4}px)) rotate(45deg)`,
      },
      right: {
        transform: `translateX(calc(50% + ${SUB_ICON_SIZE / 4}px)) rotate(45deg)`,
      },
    },

    x: {
      left: {},
      right: {},
    },

    y: {
      top: {},
      bottom: {},
    },

    large: {
      true: {
        width: `${IMG_SIZE * BIG_IMG_COEF}px`,
        height: `${IMG_SIZE * BIG_IMG_COEF}px`,
      },
    },
  },

  defaultVariants: {
    position: 'middle',
    x: 'left',
    y: 'top',
    large: false,
  },
});

const MenuMarkerIcon = styled('img', {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: `${SUB_ICON_SIZE}px`,
  height: `${SUB_ICON_SIZE}px`,
  transform: ' translate(-50%, -50%) rotate(-45deg)',
  opacity: 0.9,

  variants: {
    large: {
      true: {
        width: `${SUB_ICON_SIZE * BIG_IMG_COEF}px`,
        height: `${SUB_ICON_SIZE * BIG_IMG_COEF}px`,
      },
    },
  },
});

export type MenuMarkerVariants = Stitches.VariantProps<typeof MenuMarkerWrapper>;

type MenuMarkerX = 'left' | 'right';
type MenuMarkerY = 'top' | 'bottom';

interface MenuMarkerProps {
  imgIdx?: number;
  index: number;
  totalCount: number;
  x: MenuMarkerX;
  y: MenuMarkerY;
}

const getMarkerPosition = (
  index: number,
  totalCount: number,
  x: MenuMarkerX,
  y: MenuMarkerY,
): MenuMarkerVariants['position'] => {
  if (totalCount === 1) return 'middle';

  const obj: Record<
    MenuMarkerY,
    Record<MenuMarkerX, Record<number, MenuMarkerVariants['position']>>
  > = {
    top: {
      left: {
        1: 'right',
        2: 'bottom',
        3: 'left',
        4: 'top',
      },
      right: {
        1: 'left',
        2: 'bottom',
        3: 'right',
        4: 'top',
      },
    },
    bottom: {
      left: {
        1: 'right',
        2: 'top',
        3: 'left',
        4: 'bottom',
      },
      right: {
        1: 'left',
        2: 'top',
        3: 'right',
        4: 'bottom',
      },
    },
  };

  return obj[y][x][index] ?? 'middle';
};

const MenuMarker: React.FC<MenuMarkerProps> = ({ imgIdx = 0, index, totalCount, x, y }) => {
  return (
    <MenuMarkerWrapper
      large={totalCount === 1}
      x={x}
      y={y}
      position={getMarkerPosition(index, totalCount, x, y)}
    >
      <MenuMarkerIcon large={totalCount === 1} src={imgs[imgIdx]} alt={'Marker'} />
    </MenuMarkerWrapper>
  );
};

export default MenuMarker;
