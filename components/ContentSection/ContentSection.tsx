import { styled } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';
import { CSSProperties } from '@stitches/react';

const StyledSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  padding: '$md',
  margin: '$sm',
  gap: '$sm',
  justifyContent: 'flex-start',
});

const StyledSectionHeader = styled('h4', {
  color: '$primary800',
  textDecoration: 'underline',
});

const StyledSectionContent = styled('div', {
  display: 'flex',
  alignItems: '$$alignItems',
  justifyContent: '$$justifyContent',
  gap: '$sm',

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
}

const ContentSection: React.FC<ContentSectionProps> = ({
  direction = 'column',
  header,
  alignItems = 'flex-start',
  justifyContent = 'flex-start',
  children,
}) => {
  return (
    <StyledSection>
      {header && <StyledSectionHeader>{header}</StyledSectionHeader>}
      <StyledSectionContent
        direction={direction}
        css={{ $$alignItems: alignItems, $$justifyContent: justifyContent }}
      >
        {children}
      </StyledSectionContent>
    </StyledSection>
  );
};

export default ContentSection;
