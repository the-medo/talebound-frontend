import React, { PropsWithChildren, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Menu from '../header/Menu';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import HomepageHeader from '../homepage/HomepageHeader';
import { styled } from '@nextui-org/react';
import { Client } from 'react-hydration-provider';

const PageWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const ContentWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  padding: '$sm',

  variants: {
    vertical: {
      true: {
        flexDirection: 'column',
      },
    },
  },
});

interface LayoutProps extends PropsWithChildren {
  mandatoryLogin?: boolean;
  mandatoryLoggedOut?: boolean;
  vertical?: boolean;
  navbar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  mandatoryLogin,
  mandatoryLoggedOut,
  vertical,
  navbar,
  children,
}) => {
  const { isLoggedIn } = useAuth();

  const unauthorizedMessage = useMemo(() => {
    if (mandatoryLogin && !isLoggedIn) {
      return 'Please log in to view this page.';
    } else if (mandatoryLoggedOut && isLoggedIn) {
      return 'Page not available for logged in users.';
    }
    return undefined;
  }, [mandatoryLogin, mandatoryLoggedOut, isLoggedIn]);

  return (
    <PageWrapper>
      <Client>
        {isLoggedIn && <Header />}
        {!isLoggedIn && <HomepageHeader />}
      </Client>
      <ContentWrapper>
        {navbar && <Client>{navbar}</Client>}
        <Content vertical={vertical}>
          <Client>{unauthorizedMessage ?? children}</Client>
        </Content>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;
