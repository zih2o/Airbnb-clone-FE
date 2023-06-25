import React, { useEffect } from 'react';
import useUser from '../lib/useUser';
import { useNavigate } from 'react-router-dom';

interface IProtectedPageProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate('/');
      }
    }
  }, [isLoggedIn, userLoading, navigate]);
  return <>{children}</>;
}
