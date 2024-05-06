import React from 'react';
import { PbPinShape } from '../../../../../generated/api-types/data-contracts';
import { SvgCloud } from './SvgCloud';
import { SvgCircle } from './SvgCircle';
import { SvgSquare } from './SvgSquare';
import { SvgTriangle } from './SvgTriangle';
import { SvgPin } from './SvgPin';
import { SvgHexagon } from './SvgHexagon';
import { SvgOctagon } from './SvgOctagon';
import { SvgStar } from './SvgStar';
import { SvgDiamond } from './SvgDiamond';
import { SvgPentagon } from './SvgPentagon';
import { SvgHeart } from './SvgHeart';

export interface MapPinBackgroundProps {
  shape: PbPinShape;
  width?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

const MapPinBackground: React.FC<MapPinBackgroundProps> = ({ shape, ...props }) => {
  if (!props.borderWidth) props.borderWidth = 2;

  switch (shape) {
    case PbPinShape.SQUARE:
      return <SvgSquare {...props} />;
    case PbPinShape.TRIANGLE:
      return <SvgTriangle {...props} />;
    case PbPinShape.PIN:
      return <SvgPin {...props} />;
    case PbPinShape.HEXAGON:
      return <SvgHexagon {...props} />;
    case PbPinShape.OCTAGON:
      return <SvgOctagon {...props} />;
    case PbPinShape.STAR:
      return <SvgStar {...props} />;
    case PbPinShape.DIAMOND:
      return <SvgDiamond {...props} />;
    case PbPinShape.PENTAGON:
      return <SvgPentagon {...props} />;
    case PbPinShape.HEART:
      return <SvgHeart {...props} />;
    case PbPinShape.CLOUD:
      return <SvgCloud {...props} />;
    case PbPinShape.CIRCLE:
      return <SvgCircle {...props} />;
  }
};

export default MapPinBackground;
