import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { styled } from '../styles/stitches.config';

const Section = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '$sm',
  alignItems: 'center',
  justifyContent: 'center',
});

const SectionContent = styled('div', {
  display: 'flex',
  fontSize: '$lg',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  border: '1px dashed $text',
  padding: '$sm',
  borderRadius: '10px',
  backgroundColor: '$transparent40',

  variants: {
    background: {
      true: {
        backgroundColor: '$gray50',
      },
    },
  },

  ['a']: {
    fontSize: '$xs',
    // alignSelf: 'flex-end',
  },
});

interface InfoSectionProps extends PropsWithChildren {
  background?: boolean;
  title?: string;
  linkTitle?: string;
  linkHref?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  background,
  title,
  linkTitle,
  linkHref,
  children,
}) => {
  return (
    <Section>
      {title && <span>{title}</span>}
      <SectionContent background={background}>
        {children}
        <>{linkTitle && linkHref && <Link href={linkHref}>{linkTitle}</Link>}</>
      </SectionContent>
    </Section>
  );
};

export default InfoSection;
