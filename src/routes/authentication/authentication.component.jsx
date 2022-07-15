import React from 'react';
import SignIn from '../../components/sign-in-form/sign-in-form.component';
import SignUp from '../../components/sign-up-form/sign-up-form.component';
import "./authentication.styles.scss";

export default function Authentication() {
  
    return (
      <div className="authentication-container">
        <SignIn />
        <SignUp />
      </div>
    );
}
