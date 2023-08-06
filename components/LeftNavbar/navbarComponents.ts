import { styled } from '../../styles/stitches.config';
import { default as NextLink } from 'next/link';

export const Navbar = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  width: '250px',
  minWidth: '250px',
  flexGrow: 0,
  backgroundColor: '#2f3738',
  gap: '$sm',
  opacity: 1,
});

export const NavbarItemImg = styled('img', {
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '50%',
  transition: 'all 0.3s ease-in-out',
});

export const NavbarItem = styled(NextLink, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$md',
  padding: '$xs',
  marginLeft: '$sm',
  marginRight: '$sm',
  color: '$primary200',
  borderRadius: '$md',
  transition: 'all 0.3s ease-in-out',
  textDecoration: 'none',
  opacity: 0.7,

  '&:hover': {
    backgroundColor: '#3e4747',
    opacity: 1,
    paddingLeft: '$md',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '#3e4747',
        fontWeight: '$bold',
        opacity: 0.9,
        paddingLeft: '$lg',
        [`& ${NavbarItemImg}`]: {
          border: '2px solid currentColor',
        },
      },
    },
  },
});
