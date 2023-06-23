import { IRoomOwner } from './../type.d';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api';

export default function useUser() {
  const { isLoading, data, isError } = useQuery<IRoomOwner>(['me'], getMe, {
    retry: false,
  });
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
