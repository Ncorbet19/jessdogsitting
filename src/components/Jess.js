import React, { useState, useEffect } from 'react';
import RequestsList from './RequestsList';
import UpcomingSittings from './UpcomingSittings';
import DaysOff from './DaysOff';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import from 'firebase/auth'

import Login from './Login';

const Jess = () => {
  const [user, setUser] = useState(null);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);  // Use signInWithEmailAndPassword from 'firebase/auth'
      setLoginAttempted(true);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      {loginAttempted && user ? (
        <>
          <RequestsList />
          <UpcomingSittings />
          <DaysOff />
        </>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </>
  );
};

export default Jess;