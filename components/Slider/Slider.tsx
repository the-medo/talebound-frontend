import React from 'react';
import { SliderTrack } from '../../components-radix-ui/Slider/SliderTrack';
import { SliderRange } from '../../components-radix-ui/Slider/SliderRange';
import { SliderThumb } from '../../components-radix-ui/Slider/SliderThumb';
import { SliderRoot } from '../../components-radix-ui/Slider/SliderRoot';

interface SliderProps {}

const Slider: React.FC<SliderProps> = () => {
  return (
    <SliderRoot defaultValue={[50]} max={100} step={1}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb aria-label="Volume" />
    </SliderRoot>
  );
};

export default Slider;
