import React from "react";
import {Image, styled, Text, Link} from "@nextui-org/react";
import {SiDiscord, SiGithub, SiKofi, SiYoutube} from "react-icons/si";


const FooterDiv = styled('div', {
  width: '100%',
  minHeight: '150px',
  backgroundColor: '$black',
  maskImage: 'linear-gradient(200deg, rgba(255, 255, 255, 0) -200%, #ffffff 100%)',
  color: '$white',
  padding: '$md',
  display: 'flex',
  flexDirection: 'column',
});

const FooterContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',

  '@lg': {
    flexDirection: 'row',
  }
});

const LogoWrapper = styled('div', {
  display: 'flex',
  padding: '$sm',
  minWidth: '390px',
  color: "red",
});

const LinkColumnWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xl',
  flexGrow: 1,
  justifyContent: 'space-evenly',

  '@xs': {
    flexDirection: 'row',
  }
});

const LinkColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',
  minWidth: '10rem'
});

const FooterAvatar = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '.5rem',
  padding: '$sm',
  minWidth: '390px',

  '@sm': {
    justifyContent: 'flex-end',
  },

  [`& img`]: {
    borderRadius: '50%',
    width: '$10',
    height: '$10',
  }
});

const FooterIcons = styled('div', {
  display: 'flex',
  gap: '$md',
  fontSize: '$xl',
});

const Footer: React.FC = () => {
  return (
    <FooterDiv>
      <FooterContent>
        <LogoWrapper>
          <Image width="7rem" height="7rem" src="/assets/logo/logo-v1.png" />
        </LogoWrapper>
        <LinkColumnWrapper>
          <LinkColumn>
            <Text h5 color="$primary600" transform="uppercase">Talebound</Text>
            <Link css={{color: "$link2"}} href="/">Home</Link>
            <Link css={{color: "$link2"}} href="/about">About</Link>
          </LinkColumn>
          <LinkColumn>
            <Text h5 color="$primary600" transform="uppercase">Terms</Text>
            <Link css={{color: "$link2"}} href="/terms-of-service">Privacy & ToS</Link>
          </LinkColumn>
          <LinkColumn>
            <Text h5 color="$primary600" transform="uppercase">How to play</Text>
            <Link css={{color: "$link2"}} href="/how-to/basics">Basics</Link>
            <Link css={{color: "$link2"}} href="/how-to/world-differences">World differences</Link>
          </LinkColumn>
        </LinkColumnWrapper>
        <FooterAvatar>
          <FooterIcons>
            <SiDiscord />
            <SiYoutube />
            <SiGithub />
            <SiKofi />
          </FooterIcons>
          <Text color={'white'}>by Medo</Text>
          <img src="https://avatars.githubusercontent.com/u/8963255?s=60&v=4"  />
          <Text color={'white'}>| © {new Date().getFullYear()} Talebound</Text>
        </FooterAvatar>
      </FooterContent>
    </FooterDiv>
  );
}

export default Footer;