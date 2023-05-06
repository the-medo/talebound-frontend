import { PbUser } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { CookieMap } from '../utils/cookies/cookieMap';

export type Auth = {
  user: PbUser | undefined;
  isLoggedIn: boolean;
};

export function useAuth(): Auth {
  const [cookies] = useCookies<string, CookieMap>(['access_token_present']);

  console.log('COOKIE: access_token_present', cookies);

  const user = useSelector((state: ReduxState) => state.auth.user);
  const isLoggedIn = cookies.access_token_present === 'true';

  return { user, isLoggedIn: isLoggedIn };
}
