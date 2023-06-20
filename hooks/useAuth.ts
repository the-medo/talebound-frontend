import { PbUser } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { CookieMap } from '../utils/cookies/cookieMap';
import { useEffect, useMemo } from 'react';
import { setUser } from '../utils/auth/userSlice';

export type Auth = {
  user: PbUser | undefined;
  isLoggedIn: boolean;
};

export function useAuth(): Auth {
  const dispatch = useDispatch();
  const [cookies] = useCookies<string, CookieMap>(['access_token_present']);

  console.log('COOKIE: access_token_present', cookies);

  const user = useSelector((state: ReduxState) => state.auth.user);
  const isLoggedIn = cookies.access_token_present === 'true';

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(setUser(undefined));
    }
  }, [isLoggedIn]);

  return useMemo(() => ({ user, isLoggedIn: isLoggedIn }), [user, isLoggedIn]);
}
