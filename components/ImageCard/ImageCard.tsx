import React from 'react';
import { styled } from '../../styles/stitches.config';
import { TitleH2 } from '../Typography/Title';
import { Col, Row } from '../Flex/Flex';
import { Text } from '../Typography/Text';
import TagRow from '../TagRow/TagRow';
import MiniStatistic from '../MiniStatistic/MiniStatistic';
import Link from 'next/link';

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

interface ImageCardProps {
  imgSrc: string;
  href: string;
  title: string;
  basedOn: string;
  playModeCount: number;
  questCount: number;
  activityCount: number;
  tags: string[];
}

const ImageCard: React.FC<ImageCardProps> = ({
  imgSrc,
  href,
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
            ), url(${imgSrc})`,
        },
      }}
    >
      <Col gap="xs" alignItems="center">
        <Link href={href}>
          <TitleH2>{title === '' || !title ? ' * empty * ' : title}</TitleH2>
        </Link>
        <Text size="sm" i>
          {basedOn.length > 0 ? `(based on ${basedOn})` : 'original'}
        </Text>
      </Col>
      <div style={{ height: '100px' }}></div>
      <Row justifyContent="around">
        <MiniStatistic title="Play modes" value={playModeCount} />
        <MiniStatistic title="Quests" value={questCount} />
        <MiniStatistic title="Activity" value={activityCount} />
      </Row>
      <div style={{ height: '0px' }}></div>
      <TagRow tags={tags} width={370} />
    </ImageBackground>
  );
};

export default ImageCard;
