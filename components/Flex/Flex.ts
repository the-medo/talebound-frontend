import { styled } from '@nextui-org/react';

export const Flex = styled('div', {
  display: 'flex',
  gap: '$$gap',
  justifyContent: '$$justifyContent',
  alignItems: '$$alignItems',
});

export const Column = styled(Flex, {
  flexDirection: 'column',
});

export const Row = styled(Flex, {
  flexDirection: 'row',
});
