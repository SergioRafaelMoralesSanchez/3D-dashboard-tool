import { Injectable } from "@angular/core";
import { DocumentData, QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { BaseService } from "../../../../core/services/base-service.service";
import { Material } from "../../../../shared/models/interfaces/material.interface";

@Injectable()
export class MaterialesService extends BaseService<Material> {
    constructor() {
        super();
        this.collectionName = "materiales";
    }

    // getById(id: number): Undefinable<Encargo> {
    //     return ENCARGOSDB.find(encargo => encargo.id === id);
    // }
    async getAllReal(): Promise<Material[]> {
        const querySnapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(collection(this.db, "materiales"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        const data: Material[] = querySnapshot.docs.map((d) => ({
            ...d.data() as Material
        }));

        return data;
    }

}
