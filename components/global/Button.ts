import {styled} from "@nextui-org/react";

export const Button = styled('button', {
  fontFamily: '$heading',
  padding: '5px 25px',
  border: '$warningBorder',
  borderRadius: '$md',
  background: '$primary700',
  color: '$white',
  fontSize: '$md',
  fontWeight: 'bold',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: '$primary900',
    color: '$white300',
  },
  '&:focus': {
    outline: 'none',
    background: 'rgba(20, 52, 47, 0.9)',
    color: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), inset 0 0 1px rgba(255, 255, 255, 0.6)',
  }
});