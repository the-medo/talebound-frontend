import { styled } from '@nextui-org/react';
import Link from 'next/link';

export const NavigationItem = styled(Link, {
  fontFamily: '$heading',
  fontWeight: '$bold',
  textTransform: 'uppercase',
  color: '$primary800',
  fontSize: '$xl',
  textDecoration: 'none',
});
