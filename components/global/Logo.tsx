import React from "react";
import {Image} from "@nextui-org/react";
import {CSSProperties} from "@stitches/react";

interface LogoProps {
  size: CSSProperties['width'];
}

const Logo: React.FC<LogoProps> = ({size}) => {
  return (
    <Image width={size} height={size} src="/assets/logo/logo-v1.png" />
  );
}

export default Logo;