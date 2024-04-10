import React from 'react';
import { styled } from '../../../styles/stitches.config';
import { TitleH4 } from '../../../components/Typography/Title';
import { PbImage } from '../../../generated/api-types/data-contracts';

const BackgroundImage = styled('img', {
  display: 'block',
  width: '100%',
  borderRadius: '$md',
  background:
    "url('https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/0b6dff13-b108-4fb5-886d-2f25f2497c00/original')",
  backgroundSize: 'cover',
  opacity: 0.1,
  transition: '0.3s all',

  variants: {
    selected: {
      true: {
        opacity: 1,
      },
    },
  },
});

const Header = styled('div', {
  display: 'block',
  position: 'absolute',
  transition: '0.3s all',

  top: '50%',
  left: '50%',
  transform: ' translate(-50%, -50%)',
});

const Wrapper = styled('div', {
  display: 'flex',
  position: 'relative',
  borderRadius: '$md',
  border: '1px solid $primary',
  width: '100%',
  minHeight: '75px',
  cursor: 'pointer',

  '&:hover': {
    [`${BackgroundImage}`]: {
      opacity: 0.25,
    },
    [`${Header}`]: {
      opacity: 1,
    },
  },

  variants: {
    selected: {
      true: {
        [`${Header}`]: {
          opacity: 0,
        },
      },
    },
  },
});

interface MapLayerPlaceholderProps {
  image?: PbImage;
  titleSelected?: string;
  titleNotSelected?: string;
  onClick?: () => void;
}

const MapLayerPlaceholder: React.FC<MapLayerPlaceholderProps> = ({
  image,
  titleSelected,
  titleNotSelected,
  onClick,
}) => {
  const selected = !!image;

  return (
    <Wrapper onClick={onClick} selected={selected}>
      <BackgroundImage src={`${image?.baseUrl}/original`} selected={selected} />
      <Header>
        <TitleH4>{selected ? titleSelected : titleNotSelected}</TitleH4>
      </Header>
    </Wrapper>
  );
};

export default MapLayerPlaceholder;
