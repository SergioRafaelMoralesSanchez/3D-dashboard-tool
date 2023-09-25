import { Injectable } from '@angular/core';

import { ENCARGOSDB } from "../data/encargosdb";
import { Undefinable } from '../shared/models/helpers/Undefinable.interface';
import { Encargo } from '../shared/models/interfaces/encargo.interface';
import { appFirebase } from "../../main";
import { Firestore, addDoc, collection, getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})
export class EncargosService {
    db: Firestore;
    constructor() {
        this.db = getFirestore(appFirebase);
    }
    getAll(): Encargo[] {
        return ENCARGOSDB;
    }

    getById(id: number): Undefinable<Encargo> {
        return ENCARGOSDB.find(encargo => encargo.id === id);
    }
    async getRealData() {

        const docRef = doc(this.db, "encargos", "");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    async addDoc() {
        try {
            console.log("🚀 ~ file: encargos.service.ts:40 ~ EncargosService ~ addDoc ~ ENCARGOSDB[0]:", ENCARGOSDB[0]);
            const docRef = await addDoc(collection(this.db, "encargos"), ENCARGOSDB[0]);

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
}
