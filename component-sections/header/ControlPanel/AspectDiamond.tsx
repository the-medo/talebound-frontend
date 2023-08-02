import React from 'react';
import { AspectDiamondWrapper } from './AspectDiamondWrapper';
import { AspectDiamondIcon } from './AspectDiamondIcon';
import {
  ASPECT_DIAMOND_TEMP_IMAGES,
  AspectDiamondX,
  AspectDiamondY,
  getAspectDiamondPosition,
} from './utilsAspectDiamond';
import { AspectDiamondText } from './AspectDiamondText';

interface AspectDiamondProps {
  imgIdx?: number;
  index: number;
  totalCount: number;
  x: AspectDiamondX;
  y: AspectDiamondY;
}

const AspectDiamond: React.FC<AspectDiamondProps> = ({ imgIdx = 0, index, totalCount, x, y }) => {
  return (
    <AspectDiamondWrapper
      large={totalCount === 1}
      x={x}
      y={y}
      position={getAspectDiamondPosition(index, totalCount, x, y)}
      text={true}
    >
      {/*<AspectDiamondIcon
        large={totalCount === 1}
        src={ASPECT_DIAMOND_TEMP_IMAGES[imgIdx]}
        alt={'Marker'}
      />*/}
      <AspectDiamondText large={totalCount === 1}>Test</AspectDiamondText>
    </AspectDiamondWrapper>
  );
};

export default AspectDiamond;
