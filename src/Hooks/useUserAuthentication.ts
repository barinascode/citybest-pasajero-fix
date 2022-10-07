import firebase from 'firebase';

export const CreateUserAuthentication = (user:any) => {
    let { password } = user.credentials;
    let { email } = user;
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log("auth", userCredential);
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
};


export const SignInUserAuthentication = (user:any) => {
    let { password } = user.credentials;
    let { email } = user;
    firebase

        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log("auth", userCredential);
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        }
        );
}

