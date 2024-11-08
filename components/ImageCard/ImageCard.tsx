import React from 'react';
import { styled } from '../../styles/stitches.config';
import { TitleH2 } from '../Typography/Title';
import { Col, Row } from '../Flex/Flex';
import { Text } from '../Typography/Text';
import TagRow from '../TagRow/TagRow';
import MiniStatistic from '../MiniStatistic/MiniStatistic';
import Link from 'next/link';
import { PbViewTag } from '../../generated/api-types/data-contracts';

const ImageBackground = styled(Col, {
  paddingTop: '$md',
  paddingBottom: '$md',
  paddingLeft: '$sm',
  paddingRight: '$sm',
  border: '1px solid $primary200',
  flexGrow: 1,
  flexBasis: '350px',

  borderRadius: '$lg',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    background: '',
    zIndex: 0,
    borderRadius: '$lg',
  },
});

export interface ImageCardStatSection {
  label: string;
  value: number;
}

interface ImageCardProps {
  imgSrc: string;
  href: string;
  title: string;
  basedOn: string;
  statSections: ImageCardStatSection[];
  availableTags: PbViewTag[];
  tags: number[];
}

const ImageCard: React.FC<ImageCardProps> = ({
  imgSrc,
  href,
  title,
  basedOn,
  statSections,
  availableTags,
  tags,
}) => {
  return (
    <ImageBackground
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
      <Row gap="sm" justifyContent="around">
        {statSections.map((ss) => (
          <MiniStatistic key={ss.label} title={ss.label} value={ss.value} />
        ))}
      </Row>
      <div style={{ height: '0px' }}></div>
      <TagRow availableTags={availableTags} tagIds={tags} width={330} />
    </ImageBackground>
  );
};

export default ImageCard;
