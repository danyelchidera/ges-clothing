import React from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../util/firebase/firebase.utils';

export default function SignIn() {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    
    const userDocRef = createUserDocumentFromAuth(user)

  }
    return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogleUser}>sign in with google</button>
    </div>
  )
}
