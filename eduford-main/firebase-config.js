const firebaseConfig = {
  apiKey: "AIzaSyDb3qdJ3rzhVQ1GuIItqWQuvIb_mBvqxt8",
  authDomain: "finalproject-3d57f.firebaseapp.com",
  projectId: "finalproject-3d57f",
  storageBucket: "finalproject-3d57f.appspot.com",
  messagingSenderId: "297540113438",
  appId: "1:297540113438:web:ee8c4d914320e052284a0f"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Handle user registration
document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Registration successful
      const user = userCredential.user;

      // Update user profile with the provided username
      user.updateProfile({
        displayName: username
      })
        .then(() => {
          // Redirect to the main page or perform other actions
          window.location.href = "index.html";
        })
        .catch((error) => {
          // Handle errors in updating profile
          console.log(error);
          alert("Error updating profile: " + error.message);
        });
    })
    .catch((error) => {
      // Handle registration errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert("Registration failed: " + errorMessage);
    });
});

// Handle user login
document.getElementById("authForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login successful
      const user = userCredential.user;

      // Redirect to the main page or perform other actions
      window.location.href = "index.html";
    })
    .catch((error) => {
      // Handle login errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      
      // Show error message based on the error code
      if (errorCode === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (errorCode === "auth/user-not-found") {
        alert("User not found. Please check your email.");
      } else {
        alert("Login failed: " + errorMessage);
      }
    });
});