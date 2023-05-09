import React, { PropsWithChildren } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Menu from '../global/Menu';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import HomepageHeader from '../header/HomepageHeader';
import { styled } from '@nextui-org/react';
import { Client } from 'react-hydration-provider';

const PageWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

interface LayoutProps extends PropsWithChildren {
  mandatoryLogin?: boolean;
  mandatoryLoggedOut?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ mandatoryLogin, mandatoryLoggedOut, children }) => {
  const { isLoggedIn } = useAuth();

  if (mandatoryLogin && !isLoggedIn) {
    return (
      <PageWrapper>
        <HomepageHeader />
        <Content>Please log in to view this page.</Content>
        <Footer />
      </PageWrapper>
    );
  }

  if (mandatoryLoggedOut && isLoggedIn) {
    return (
      <PageWrapper>
        <Menu />
        <Header />
        <Content>Page not available for logged in users.</Content>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Client>
        {isLoggedIn && (
          <>
            <Menu />
            <Header />
          </>
        )}
        {!isLoggedIn && (
          <>
            <HomepageHeader />
          </>
        )}
      </Client>
      <Content>{children}</Content>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;
