"use client"
import React from 'react';
import useAuthCheck from '../hooks/useAuthCheck';
import { useRouter } from 'next/navigation';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAuthCheck();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in'); // Redirect to sign-in page if not authenticated
    }
  }, [isAuthenticated, router]);

  // Render nothing or a loading spinner while checking authentication
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
