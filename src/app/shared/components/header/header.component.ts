import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { Nullable } from "../../models/helpers/Nullable.interface";
import { LocalUser } from "../../models/interfaces/auth/local-user.interface";
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    user: Nullable<LocalUser> = null;
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        // this.user = this.authService.getCurrentUser();
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                this.user = {
                    uid: user.uid,
                    displayName: user.displayName ?? "",
                    photoURL: user.photoURL ?? "",
                };
            }
        });
    }

    signOut() {
        this.authService.signOut();
        this.user = null;
        this.router.navigateByUrl("home");
    }

}
