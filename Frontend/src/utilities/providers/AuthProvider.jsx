import React, { createContext, useEffect, useState } from 'react';
import { app } from '../../config/firebase.init';
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut, updateProfile, GoogleAuthProvider, signInWithPopup 
} from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  const auth = getAuth(app);

  const signUp = async (email, password) => {
    try {
      setLoader(true);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoader(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const logout = async () => {
    try {
      setLoader(true);
      return await signOut(auth);
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const updateUser = async (name, photo) => {
    try {
      setLoader(true);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
      });
      setUser(auth.currentUser);
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      setLoader(true);
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          const { data } = await axios.post('http://localhost:3000/api/set-token', {
            email: user.email,
            name: user.displayName
          });
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        } catch (error) {
          console.error('Error setting token:', error);
          setError(error.message);
        } finally {
          setLoader(false);
        }
      } else {
        localStorage.removeItem('token');
        setLoader(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const contextValue = {
    user, signUp, login, logout, updateUser, googleLogin, error, setError, loader, setLoader
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
