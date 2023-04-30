import {styled} from "@nextui-org/react";


export const ClickableSpan = styled('span', {
  color: '$primary200 !important',
  textDecoration: 'underline',
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: '$primary300 !important',
  }
});