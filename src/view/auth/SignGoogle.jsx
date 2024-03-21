import { app } from "../../lib/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SignGoogle({ onGoogleSignInSuccess }) {
  const auth = getAuth(app);

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // Check if the user is signed in with Google
      if (result.user) {
        // Call the callback to indicate successful Google sign-in
        onGoogleSignInSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="cursor-pointer" onClick={handleSignInWithGoogle}>
      <FontAwesomeIcon icon={faGoogle} className="px-[2px] text-black" />
      SignGoogle
    </div>
  );
}

export default SignGoogle;
