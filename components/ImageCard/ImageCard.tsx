import React from 'react';
import { styled } from '../../styles/stitches.config';
import { TitleH2 } from '../Typography/Title';
import { Col, Row } from '../Flex/Flex';
import { Text } from '../Typography/Text';
import { Button } from '../Button/Button';
import TagRow from '../TagRow/TagRow';

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
  paddingTop: '$md',
  paddingBottom: '$md',
  paddingLeft: '$sm',
  paddingRight: '$sm',
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
    zIndex: 0,
    borderRadius: '$lg',
  },

  variants: {
    size: {
      large: {
        width: '400px',
      },
    },
  },
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
        <TitleH2>{title === '' || !title ? ' * empty * ' : title}</TitleH2>
        <Text size="sm" i>
          {basedOn.length > 0 ? `(based on ${basedOn})` : 'original'}
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
      <TagRow tags={tags} width={370} />
    </ImageBackground>
  );
};

export default ImageCard;
