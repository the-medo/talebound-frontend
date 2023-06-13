import React, { PropsWithChildren } from 'react';
import { styled } from '@stitches/react';
import { blackA, teal } from '@radix-ui/colors';

export const StyledIconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:focus': { boxShadow: `0 0 0 2px black` },

  variants: {
    size: {
      small: {
        height: 24,
        width: 24,
      },
      normal: {
        height: 36,
        width: 36,
      },
      large: {
        height: 48,
        width: 48,
      },
    },
    color: {
      primary: {
        backgroundColor: teal.teal11,
        color: 'white',
        '&:hover': { backgroundColor: teal.teal8 },
      },
      secondary: {
        backgroundColor: 'white',
        color: teal.teal11,
        '&:hover': { backgroundColor: teal.teal3 },
      },
    },
  },

  defaultVariants: {
    size: 'normal',
    color: 'secondary',
  },
});

interface IconButtonProps extends PropsWithChildren {
  onClick?: () => void;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, onClick, ...props }, forwardedRef) => {
    return (
      <StyledIconButton ref={forwardedRef} {...props}>
        {children}
      </StyledIconButton>
    );
  },
);

export default IconButton;
