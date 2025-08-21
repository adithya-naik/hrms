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

  // Auto-fetch user profile if token exists but no user data
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

  // Auto-refresh token if it's about to expire
  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (token && refreshToken) {
        try {
          // Decode token to check expiry (simple check)
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          
          // If token expires in less than 5 minutes, refresh it
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

    const interval = setInterval(checkTokenExpiry, 60000); // Check every minute
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
      return { 
        success: false, 
        error: error?.data?.error || 'Login failed' 
      };
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