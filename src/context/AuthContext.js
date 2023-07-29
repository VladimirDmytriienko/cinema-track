import { createContext, useContext, useEffect, useState } from "react";
import {auth, db} from '../firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {setDoc, doc} from  'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({})

    async function signUp(email, password) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          const user = userCredential.user;
          setDoc(doc(db, 'users', user.email), {
            savedShows: []
          });
        } catch (error) {

          console.error("Error during sign up:", error);
          throw error;
        }
      }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    function logOut() {
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
    });   
    return (
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)

}