import React, { useEffect } from 'react';
import useUser from '../lib/useUser';
import { useNavigate } from 'react-router-dom';

interface IProtectedPageProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
  const { isLoggedIn, isUserLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoading) {
      if (!isLoggedIn) {
        navigate('/');
      }
    }
  }, [isLoggedIn, isUserLoading, navigate]);
  return <>{children}</>;
}
