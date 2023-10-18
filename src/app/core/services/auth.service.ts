import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { Nullable } from "../../shared/models/helpers/Nullable.interface";
import { LocalUser } from "../../shared/models/interfaces/auth/local-user.interface";

@Injectable()
export class AuthService {

    user: Nullable<LocalUser>;
    constructor(
        private router: Router
    ) {
        this.user = this.getCurrentUser();
    }

    async googleSignin() {

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    const user = result.user;
                    localStorage.setItem("3d-user", JSON.stringify({
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    }));
                    this.router.navigateByUrl("encargos");
                }
            }).catch((error) => {
                console.log("🚀 ~ file: auth.service.ts:24 ~ AuthService ~ .then ~ error:", error);
            });
    }

    signOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.removeItem("3d-user");
            // Sign-out successful.
        }).catch((error) => {
            console.log("🚀 ~ file: auth.service.ts:48 ~ AuthService ~ signOut ~ error:", error);
            // An error happened.
        });
    }

    getCurrentUser(): Nullable<LocalUser> {
        const user = localStorage.getItem("3d-user");
        if (user) {
            return JSON.parse(user) as LocalUser;
        }
        return null;
    }

    isAuthorited(): boolean {
        return this.getCurrentUser() !== null;
    }

    //   private signInWithEmailAndPassword(email: string, password: string) {
    //     const auth = getAuth();
    //     signInWithEmailAndPassword(auth, email, password)
    //       .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         console.log("🚀 ~ file: auth.service.ts:21 ~ AuthService ~ .then ~ user:", user);
    //         // ...
    //       })
    //       .catch((error) => {
    //         console.log("🚀 ~ file: auth.service.ts:25 ~ AuthService ~ signInWithEmailAndPassword ~ error:", error);
    //         // const errorCode = error.code;
    //         // const errorMessage = error.message;
    //       });

    //   }

}
