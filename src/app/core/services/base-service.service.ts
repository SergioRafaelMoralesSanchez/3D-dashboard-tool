import { Injectable } from "@angular/core";
import { DocumentData, DocumentReference, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { appFirebase } from "../../../main";
import { Undefinable } from "../../shared/models/helpers/Undefinable.interface";

@Injectable()
export class BaseService<T> {
    db: Firestore;
    collectionName = "";
    constructor() {
        this.db = getFirestore(appFirebase);
    }
    async getAll(): Promise<T[]> {
        const querySnapshot = await getDocs(collection(this.db, this.collectionName));
        const data: T[] = querySnapshot.docs.map((d) => ({
            ...d.data() as T,
            id: d.id
        }));
        return data;
    }
    async getAllMapped(): Promise<Map<string, T>> {
        const querySnapshot = await getDocs(collection(this.db, this.collectionName));
        const data = new Map<string, T>();
        querySnapshot.docs.forEach((d) => { data.set(d.id, d.data() as T); });
        return data;
    }

    async getById(id: string): Promise<Undefinable<T>> {

        const docRef = doc(this.db, this.collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                ...docSnap.data() as T,
                id: docSnap.id
            };
        } else {
            return undefined;
        }
    }

    async addDoc(encargo: T):Promise<DocumentReference<DocumentData, DocumentData> | undefined> {
        try {
            const docRef = await addDoc(collection(this.db, this.collectionName), encargo as DocumentData);

            console.log("Document written with ID: ", docRef.id);
            return docRef;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return undefined;
    }

    async updateDoc(documentId: string, document: T) {
        try {
            const ref = doc(this.db, this.collectionName, documentId);

            if (ref) {
                await updateDoc(ref, document as DocumentData);
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    async deleteDoc(documentId: string) {
        try {
            const ref = doc(this.db, this.collectionName, documentId);

            if (ref) {
                await deleteDoc(ref);
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
} 
