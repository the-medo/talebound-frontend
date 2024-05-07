import { styled } from '@stitches/react';
import * as Slider from '@radix-ui/react-slider';

export const SliderRoot = styled(Slider.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: 200,
  height: 20,
});
