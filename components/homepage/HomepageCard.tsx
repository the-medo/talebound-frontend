import React from "react";
import {styled} from "@nextui-org/react";

const CardImage = styled('div', {

  variants: {
    image: {
      1: {
        backgroundImage: 'url("../assets/images/dnd.png")',
      },
      2: {
        backgroundImage: 'url("../assets/images/fantasy_world.png")',
      },
      3: {
        backgroundImage: 'url("../assets/images/adventure.png")',
      },
      4: {
        backgroundImage: 'url("../assets/images/sci-fi.png")',
      },
      5: {
        backgroundImage: 'url("../assets/images/world_building.png")',
      },
      6: {
        backgroundImage: 'url("../assets/images/open_source.png")',
      },
    }
  }
});

const CardContent = styled('div', {
  padding: '$lg',
  display: 'flex',
  flexDirection: 'column',
  gap: '$md',
  width: '500px',
});

const CardHeader = styled('h3', {
  fontFamily: '$heading',
  color: '$primary',
  textDecoration: 'underline',
});


const Card = styled('div', {
  display: 'flex',
  gap: '$md',
  height: '200px',
  flexGrow: '1',
  padding: '$0',
  boxSizing: 'border-box',
  transition: 'all 0.4s',
  backgroundColor: '$white100',

  [`& ${CardImage}`]: {
    height: '200px',
    width: '200px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    transition: 'all 0.4s',
    '&:hover': {
    },
  },

  [`&:hover`]: {
    transform: 'scale(1.05)',
  },

  [`&:hover ${CardImage}`]: {
    backgroundSize: '175%',
  },

  variants: {
    cardType: {
      left: {
        maskImage: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 0) 100%)',
        paddingRight: '100px',
      },
      right: {
        maskImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 1) 100%)',
        textAlign: 'right',
        paddingLeft: '100px',
      }
    },
  }
});


export interface HomepageCardProps {
  image: "1" | "2" | "3" | "4" | "5" | "6";
  cardType: 'left' | 'right';
  heading: string;
  text: string;
}

const HomepageCard: React.FC<HomepageCardProps> = ({
  image,
  cardType,
  heading,
  text,
}) => {
  return (
    <Card cardType={cardType}>
      {cardType === "left" && <CardImage image={image} />}
      <CardContent>
        <CardHeader>{heading}</CardHeader>
        {text}
      </CardContent>
      {cardType === "right" && <CardImage image={image} />}
    </Card>
  );
}

export default HomepageCard;