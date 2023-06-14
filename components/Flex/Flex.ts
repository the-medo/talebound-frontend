import { styled } from '../../styles/stitches.config';

export const Flex = styled('div', {
  display: 'flex',
  gap: '$$gap',
  justifyContent: '$$justifyContent',
  alignItems: '$$alignItems',

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
});

export const Column = styled(Flex, {
  flexDirection: 'column',
});

export const Row = styled(Flex, {
  flexDirection: 'row',
});
