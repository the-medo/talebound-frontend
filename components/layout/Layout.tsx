import React, { PropsWithChildren, useMemo } from 'react';
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
  flexDirection: 'row',
  flexGrow: 1,

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
}

const Layout: React.FC<LayoutProps> = ({
  mandatoryLogin,
  mandatoryLoggedOut,
  vertical,
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
        {isLoggedIn && (
          <>
            <Menu />
            <Header />
          </>
        )}
        {!isLoggedIn && <HomepageHeader />}
      </Client>

      <Content vertical={vertical}>
        <Client>{unauthorizedMessage ?? children}</Client>
      </Content>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;
