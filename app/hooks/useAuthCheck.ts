import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

const useAuthCheck = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setAuthChecked(true);
    }
  }, [isLoaded]);

  // Return true only if Clerk is loaded and the user is signed in
  return authChecked ? isSignedIn : false;
};

export default useAuthCheck;
