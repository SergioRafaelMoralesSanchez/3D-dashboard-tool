import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { environment } from "./environments/environment";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = environment.firebaseConfig;

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
