import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCredentials, logout, setLoading } from '@/store/slices/authSlice';
import { useLoginMutation } from '@/store/api/authApi';

export const useAuth = () => {
  const { user, getAccessTokenSilently, isAuthenticated, isLoading: auth0Loading, loginWithRedirect, logout: auth0Logout } = useAuth0();
  const dispatch = useDispatch();
  const { user: appUser, isAuthenticated: isAppAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const [loginMutation] = useLoginMutation();

  useEffect(() => {
    const handleAuth = async () => {
      if (isAuthenticated && user) {
        try {
          dispatch(setLoading(true));
          const token = await getAccessTokenSilently();
          
          // Login/register user in our backend
          const result = await loginMutation({
            auth0Id: user.sub,
            email: user.email,
          }).unwrap();

          dispatch(setCredentials({
            user: result.user,
            token,
          }));
        } catch (error) {
          console.error('Auth error:', error);
          // If user doesn't exist in backend, redirect to registration
          if (error.status === 404) {
            // Handle registration flow
            console.log('User needs to be registered');
          }
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    handleAuth();
  }, [isAuthenticated, user, getAccessTokenSilently, dispatch, loginMutation]);

  const login = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    dispatch(logout());
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return {
    user: appUser,
    isAuthenticated: isAppAuthenticated,
    isLoading: isLoading || auth0Loading,
    login,
    logout: handleLogout,
  };
};