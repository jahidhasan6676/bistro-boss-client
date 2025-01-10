import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";


export const AuthContext = createContext(null);


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic()


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

    // google sign in
    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
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

            if(currentUser){
                // get token and store client
                const userInfo = {email: currentUser.email}
                    axiosPublic.post("/jwt", userInfo)
                    .then(res =>{
                        if(res.data.token){
                            localStorage.setItem("access-token", res.data.token)
                        }
                    })
            }
            else{
                // do something
                localStorage.removeItem("access-token")
            }

            setLoading(false)
        })
        return ()=>{
            return unsubscribe();
        }
    }, [axiosPublic])
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        updateUserProfile,
        googleSignIn,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;