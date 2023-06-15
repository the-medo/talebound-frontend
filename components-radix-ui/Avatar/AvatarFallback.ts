import { styled } from '../../styles/stitches.config';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { teal } from '@radix-ui/colors';

export const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: teal.teal11,
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
});
