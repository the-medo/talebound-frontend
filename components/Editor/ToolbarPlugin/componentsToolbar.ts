import { styled } from '../../../styles/stitches.config';

export const ToolbarItemButton = styled('button', {
  border: '0',
  display: 'flex',
  borderRadius: '10px',
  padding: '8px',
  cursor: 'pointer',
  verticalAlign: 'middle',
  fontSize: '18px',
  gap: '0.25rem',
  backgroundColor: '#fff',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.2,
  },

  '&:hover:not(:disabled)': {
    backgroundColor: '#eee',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$primary200',
      },
    },
  },
});

export const Divider = styled('div', {
  width: '1px',
  backgroundColor: '#eee',
  display: 'inline-block',
});

export const Toolbar = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '1px',
  background: '#fff',
  padding: '4px',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottom: '1px solid #ccc',
  verticalAlign: 'middle',
  gap: '2px',
});

export const ToolbarSelect = styled('select', {
  border: '0',
  display: 'flex',
  background: 'none',
  borderRadius: '10px',
  padding: '8px',
  verticalAlign: 'middle',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  width: '70px',
  fontSize: '14px',
  color: '#777',
  textOverflow: 'ellipsis',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#eee',
  },

  '&:focus': {
    outline: 'none',
  },
});
