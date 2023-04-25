import {styled} from "@nextui-org/react";

export const InputTransparent = styled('input', {
  fontFamily: 'Gudea, sans-serif',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  background: 'rgba(255, 255, 255, 0.4)',
  color: 'rgba(20, 52, 47, 0.8)',
  fontSize: '1rem',
  fontWeight: 'bold',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  width: '100%',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.5)',
  },

  '&:focus': {
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), inset 0 0 1px rgba(255, 255, 255, 0.6)',
  }
});