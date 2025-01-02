import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";


export const AuthContext = createContext(null);


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // create User
    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // sign in User
    const signInUser = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // signOut user
    const signOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }

    // update user profile
    const updateUserProfile = (name,photo) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName:name, photoURL:photo
        })
    }

    // observer
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            console.log('current User', currentUser);
            setLoading(false)
        })
        return ()=>{
            return unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;