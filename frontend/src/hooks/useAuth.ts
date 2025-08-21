import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCredentials, logout, setLoading } from '@/store/slices/authSlice';
import { useLoginMutation, useRefreshTokenMutation, useGetProfileQuery } from '@/store/api/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, refreshToken, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const [loginMutation] = useLoginMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();

  // Auto-fetch profile if we have token but not user object
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery(undefined, {
    skip: !token || !!user,
  });

  useEffect(() => {
    if (profileData?.user && !user) {
      dispatch(setCredentials({
        user: profileData.user,
        token: token!,
      }));
    }
  }, [profileData, user, token, dispatch]);

  // Auto-refresh JWT ~5min before expiry
  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (token && refreshToken) {
        try {
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          if (tokenPayload.exp - currentTime < 300) {
            const result = await refreshTokenMutation(refreshToken).unwrap();
            dispatch(setCredentials({
              user: result.user,
              token: result.token,
            }));
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          dispatch(logout());
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 60_000);
    return () => clearInterval(interval);
  }, [token, refreshToken, refreshTokenMutation, dispatch]);

  const login = async (username: string, password: string) => {
    try {
      dispatch(setLoading(true));
      const result = await loginMutation({ username, password }).unwrap();
      dispatch(setCredentials({
        user: result.user,
        token: result.token,
        refreshToken: result.refreshToken,
      }));
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.data?.error || 'Login failed' };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || profileLoading,
    login,
    logout: handleLogout,
  };
};
