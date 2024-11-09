import * as Tooltip from '@radix-ui/react-tooltip';
import React from 'react';
import { TooltipRoot } from './TooltipRoot';
import { TooltipArrow } from './TooltipArrow';
import { TooltipContent } from './TooltipContent';

/** https://www.radix-ui.com/primitives/docs/components/tooltip */
const TooltipDemo = () => (
  <Tooltip.Provider>
    <TooltipRoot>
      <Tooltip.Trigger>
        <button>Button with tooltip</button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <TooltipContent>
          Tooltip content
          <TooltipArrow />
        </TooltipContent>
      </Tooltip.Portal>
    </TooltipRoot>
  </Tooltip.Provider>
);

export default TooltipDemo;
