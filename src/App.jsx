import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  initializeAuthentication();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        setUser({
          displayName,
          photoURL,
          email,
        });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="App">
      {!isLoggedIn && (
        <button onClick={handleGoogleSignIn}>Google SignIn</button>
      )}

      {isLoggedIn && (
        <div className="user-info">
          <img style={{ borderRadius: "50%" }} src={user.photoURL} alt="" />
          <h2>Hi, {user.displayName && user.displayName}</h2>
          <h3>
            You've just logged in with:
            <pre style={{ backgroundColor: "green", color: "white" }}>
              {user.email && user.email}
            </pre>
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
