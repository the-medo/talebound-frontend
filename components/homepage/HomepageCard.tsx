import React from "react";
import {styled} from "../../stitches.config";

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
    }
  }
});

const CardContent = styled('div', {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '500px',
});

const CardHeader = styled('h2', {
  fontFamily: 'Gudea,sans-serif',
  color: 'rgba(51, 129, 112, 0.8)',
  textDecoration: 'underline rgba(51, 129, 112, 0.8)',
});


const Card = styled('div', {
  display: 'flex',
  gap: '1rem',
  height: '200px',
  flexGrow: '1',
  padding: '0',
  boxSizing: 'border-box',
  transition: 'all 0.4s',
  backgroundColor: 'white',

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


interface HomepageCardProps {
  image: "1" | "2" | "3";
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