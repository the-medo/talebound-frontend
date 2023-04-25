import {styled} from "@nextui-org/react";
import Link from "next/link";

export const NavigationItem = styled(Link, {
  fontFamily: 'Gudea, sans-serif',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  color: 'rgba(20, 52, 47, 0.8)',
  fontSize: '1.2rem',
  textDecoration: 'none',
});