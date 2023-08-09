import React, { PropsWithChildren } from 'react';
import { CSSProperties } from '@stitches/react';
import { TitleH2 } from '../Typography/Title';
import { styled } from '../../styles/stitches.config';
import Loading from '../Loading/Loading';
import { Text } from '../Typography/Text';

const StyledSection = styled('section', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  boxShadow: '$sm',
  backgroundColor: 'white',
  padding: '$md',
  margin: '$sm',
  gap: '$sm',
  justifyContent: 'flex-start',
});

const LoadingOverlay = styled('section', {
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  boxShadow: '$sm',
  backgroundColor: '$transparent80',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$md',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const StyledSectionContent = styled('div', {
  display: 'flex',
  alignItems: '$$alignItems',
  justifyContent: '$$justifyContent',
  flexBasis: '$$flexBasis',
  flexWrap: '$$flexWrap',
  gap: '$md',

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
    },
  },
});

interface ContentSectionProps extends PropsWithChildren {
  direction?: 'row' | 'column';
  header?: string;
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  flexBasis?: CSSProperties['flexBasis'];
  flexWrap?: CSSProperties['flexWrap'];
  loading?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  direction = 'column',
  header,
  alignItems = 'flex-start',
  justifyContent = 'flex-start',
  children,
  flexBasis,
  flexWrap,
  loading,
}) => {
  return (
    <StyledSection>
      {header && <TitleH2 marginBottom="md">{header}</TitleH2>}
      <StyledSectionContent
        direction={direction}
        css={{
          $$alignItems: alignItems,
          $$justifyContent: justifyContent,
          $$flexBasis: flexBasis,
          $$flexWrap: flexWrap,
        }}
      >
        {children}
      </StyledSectionContent>
      {loading && (
        <LoadingOverlay>
          <Loading size="sm" />
          <Text i>Loading...</Text>
        </LoadingOverlay>
      )}
    </StyledSection>
  );
};

export default ContentSection;
