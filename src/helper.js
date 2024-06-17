import { db } from "./firestoreConfig";
import { collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const notesStr = "notes";
const notesCollectionRef = collection(db, notesStr);

class Helper {
    getNotes = async () => {
        const { docs } = await getDocs(notesCollectionRef);
        return docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
    }
    addNotes = async (notes) => {
        return addDoc(notesCollectionRef, notes);
    }
    editNotes = async (id, notes) => {
        const notesDoc = doc(db, notesStr, id);
        return updateDoc(notesDoc, notes);
    }
    deleteNotes = async (id) => {
        const notesDoc = doc(db, notesStr, id);
        return deleteDoc(notesDoc);
    }
}

export default Helper;
