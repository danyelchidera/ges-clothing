import { useState } from "react";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../util/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import Button from "../button/button.component";

const defualtFormFields = {
  email: "",
  password: ""
};

export default function SignIn() {
  const [formFields, setFormfields] = useState(defualtFormFields);
  const { email, password } = formFields;

  function resetForm() {
    setFormfields(defualtFormFields);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormfields({ ...formFields, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      resetForm();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password");
          break;
        case "auth/user-not-found":
          alert("incorrect email");
          break;
        default:
          console.log(error);
      }
    }
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    const userDocRef = createUserDocumentFromAuth(user);
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign ip with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
