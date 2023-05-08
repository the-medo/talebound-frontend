import React, { PropsWithChildren } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Menu from '../global/Menu';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import HomepageHeader from '../header/HomepageHeader';
import HomepageContent from '../homepage/HomepageContent';
import Register from '../homepage/Register';
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

interface LayoutProps extends PropsWithChildren {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

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
