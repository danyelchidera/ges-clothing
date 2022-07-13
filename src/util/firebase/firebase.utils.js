import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwHSgTnXZEF3EKrQBySZ9zuTVzLUOW2W4",
  authDomain: "crwn-clothing-db-e6db2.firebaseapp.com",
  projectId: "crwn-clothing-db-e6db2",
  storageBucket: "crwn-clothing-db-e6db2.appspot.com",
  messagingSenderId: "163249633521",
  appId: "1:163249633521:web:49c7918e3a7167bdad1150",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists())
    {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        }
        catch (error){
            console.log('An error occured', error);
        }
    }

    return userDocRef;
}