import { auth, db } from "@/config/firebase-config";
import { UserDocument, UserInterface } from "@/types/user";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<UserInterface | null>(null)
    const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true)

    // Reload authUserData Function
    const reloadAuthUserData = () => {
        if(auth.currentUser){
            auth.currentUser.reload().then(()=>{
                authStateChanged(auth.currentUser)
            })
        }
    }

    const formatAuthUser = (user: UserInterface) => ({ 
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
    })

    const getUserDocument = async (user: UserInterface) => {
        if (auth.currentUser) {
            const compactUser = user;
            onSnapshot(doc(db, "users", auth.currentUser.uid), async (doc) => {
                if (doc.exists()) {
                    user.userDocument = doc.data() as UserDocument;
                }
                setAuthUser((prevAuthUser)=>({
                     ...prevAuthUser,
                     ...compactUser
                }));
                setAuthUserIsLoading(false)
            })
        }
    }

    const authStateChanged = useCallback(async (authState: UserInterface | User | null) => {
        if (!authState) {
            setAuthUser(null);
            setAuthUserIsLoading(false);
            return;
        }
        setAuthUserIsLoading(true);
        const formattedUser = formatAuthUser(authState);
        await getUserDocument(formattedUser)
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe(); // Cleanup function
    }, [authStateChanged]); // Ajouter authStateChanged comme dépendance

    return {
        authUser,
        authUserIsLoading,
        reloadAuthUserData
    }
}
