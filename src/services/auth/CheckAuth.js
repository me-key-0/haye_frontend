import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthRequest } from '../../redux/Slices/authSlice';

export const CheckAuth = () => {
  const dispatch = useDispatch();
  
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuthRequest()); // Dispatch action to check authentication
    }
  }, [isAuthenticated, dispatch]);

  return { isAuthenticated, loading };
};
