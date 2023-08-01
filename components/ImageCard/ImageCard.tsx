import React from 'react';
import { styled } from '../../styles/stitches.config';
import { TitleH2 } from '../Typography/Title';
import { Col, Row } from '../Flex/Flex';
import { Text } from '../Typography/Text';
import { Button } from '../Button/Button';

const CardWrapper = styled(Col, {
  padding: '$md',
  paddingTop: '$md',
  boxShadow: '$md',
  borderRadius: '$lg',
  border: '1px solid $primary200',
});

const ImageBackground = styled(Col, {
  // backgroundPosition: 'center center',
  // backgroundSize: 'cover',
  // backgroundRepeat: 'no-repeat',
  padding: '$md',
  border: '1px solid $primary200',

  borderRadius: '$lg',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // height: '350px',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    background: '',
    zIndex: -1,
    borderRadius: '$lg',
  },

  variants: {
    size: {
      large: {
        width: '24.5rem',
      },
    },
  },
});

const CardDescription = styled('div', {
  padding: '$sm',
  paddingLeft: 0,
  paddingRight: 0,
  // height: '90px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-line-clamp': '4',
  '-webkit-box-orient': 'vertical',
});

const RatingWrapper = styled(Col, {
  padding: '$sm',
  backgroundColor: '$transparent60',
  borderRadius: '$md',
  fontSize: '$md',

  width: '100px',
  alignItems: 'center',
  justifyContent: 'center',
});

const Rating = styled(Col, {
  padding: '$sm',
  fontSize: '$2xl',
  backgroundColor: '$transparent60',
  width: '60px',
  height: '60px',
  alignItems: 'center',
  justifyContent: 'center',
});

interface ImageCardProps {
  src: string;
  title: string;
  basedOn: string;
  playModeCount: number;
  questCount: number;
  activityCount: number;
  tags: string[];
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  title,
  basedOn,
  playModeCount,
  questCount,
  activityCount,
  tags,
}) => {
  return (
    <ImageBackground
      // justifyContent="end"
      size="large"
      gap="sm"
      css={{
        '&::before': {
          backgroundImage: `linear-gradient(
            rgba(255, 255, 255, 1) 0px, 
            rgba(255, 255, 255, 0.7) 50px,
            rgba(255, 255, 255, 0) 170px,
            rgba(255, 255, 255, 0) 350px,
            rgba(255, 255, 255, 1) 351px 
            ), url(${src})`,
        },
      }}
    >
      <Col gap="xs" alignItems="center">
        <TitleH2>{title}</TitleH2>
        <Text size="sm" i>
          (based on {basedOn})
        </Text>
      </Col>
      <div style={{ height: '100px' }}></div>
      <Row justifyContent="around">
        <RatingWrapper gap="sm">
          <Text>Play modes</Text>
          <Rating circle>{playModeCount}</Rating>
        </RatingWrapper>
        <RatingWrapper gap="sm">
          <Text>Quests</Text>
          <Rating circle>{questCount}</Rating>
        </RatingWrapper>
        <RatingWrapper gap="sm">
          <Text>Activity</Text>
          <Rating circle>{activityCount}</Rating>
        </RatingWrapper>
      </Row>
      <div style={{ height: '0px' }}></div>
      <Row justifyContent="center" gap="xs">
        {tags.map((tag) => (
          <Button key={tag} size="sm" color="semiGhost">
            {tag}
          </Button>
        ))}
      </Row>
      {/*<CardDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in massa tempor.
        Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Morbi enim nunc
        faucibus a pellentesque sit amet. Pulvinar mattis nunc sed blandit libero volutpat sed cras
        ornare. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Egestas erat
        imperdiet sed euismod nisi porta lorem mollis aliquam. Amet tellus cras adipiscing enim. Dis
        parturient montes nascetur ridiculus mus. Faucibus turpis in eu mi bibendum neque egestas.
        Aliquet eget sit amet tellus cras adipiscing enim eu. Sagittis id consectetur purus ut
        faucibus pulvinar elementum integer enim. Lorem ipsum dolor sit amet consectetur adipiscing.
      </CardDescription>*/}
    </ImageBackground>
  );
};

export default ImageCard;
