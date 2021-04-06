import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { userAuthWatcher } from '../services/firebase/watchers';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        userAuthWatcher(async (user) => {
            setUser(user);
            if (user !== null) {
                const userRef = await db.collection('users').where('uid', '==', user.uid).get();
                await userRef.forEach(doc => {
                    setUserData({id: doc.id, ...doc.data()})
                })
                setIsLogged(true);
            }
        });
    }, []);

    const signUp = async (email, password, confirmPassword, username) => {
        try {
            if (password === confirmPassword) {
                setIsLoading(true);
                const newUser = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );
                await newUser.user.updateProfile({
                    displayName: username,
                });
                await db.collection('users').add({
                    uid: newUser.user.uid,
                    username,
                    email,
                    myList: []
                })
                setIsLoading(false)
            } else {
                setError(`Passwords don't match`);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const signIn = async (email, password, history) => {
        try {
            setIsLoading(true);
            await auth.signInWithEmailAndPassword(email, password);
            history.push('/');
            setIsLoading(false)
        } catch (error) {
            setError(error.message);
        }
    }

    const signOut = async (history) => {
        try {
            await auth.signOut();
            setIsLogged(false);
            history.push('/')
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <UserContext.Provider value={{ user, isLoading, userData, isLogged, error, setError, signUp, signIn, signOut }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
