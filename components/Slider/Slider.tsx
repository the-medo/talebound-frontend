import React from 'react';
import { SliderTrack } from '../../components-radix-ui/Slider/SliderTrack';
import { SliderRange } from '../../components-radix-ui/Slider/SliderRange';
import { SliderThumb } from '../../components-radix-ui/Slider/SliderThumb';
import { SliderRoot } from '../../components-radix-ui/Slider/SliderRoot';
import { SliderProps } from '@radix-ui/react-slider';

interface SliderComponentProps extends SliderProps {}

const Slider: React.FC<SliderComponentProps> = ({ ...sliderRootProps }) => {
  return (
    <SliderRoot {...sliderRootProps}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb aria-label="Volume" />
    </SliderRoot>
  );
};

export default Slider;
