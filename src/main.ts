import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { FirebaseApp, initializeApp } from "firebase/app";
import { AppModule } from "./app/app.module";
export let appFirebase: FirebaseApp = {} as FirebaseApp;
fetch("/assets/firebase-config.json")
  .then((res) => res.json())
  .then((firebaseConfig) => {
    appFirebase = initializeApp(firebaseConfig);
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  })
  .catch((err) => {
    console.error("No se pudo cargar la configuración de Firebase:", err);
  });
