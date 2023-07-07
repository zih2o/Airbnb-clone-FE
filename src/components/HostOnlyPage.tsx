import React, { useEffect } from 'react';
import useUser from '../lib/useUser';
import { useNavigate } from 'react-router-dom';

interface IHostOnlyPageProps {
  children: React.ReactNode;
}

export default function HostOnlyPage({ children }: IHostOnlyPageProps) {
  const { user, isUserLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoading) {
      if (!user?.is_host) {
        navigate('/');
      }
    }
  }, [user, isUserLoading, navigate]);
  return <>{children}</>;
}
