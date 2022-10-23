import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../database/firebase";

export const actualizarCampo = (objeto, tabla, idDoc) => {
  const docRef = doc(db, tabla, idDoc);

  setDoc(docRef, objeto)
    .then((docRef) => {
      console.log("Entire Document has been updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addDocumento = (tabla, objeto) => {
  const dbRef = collection(db, tabla);
  addDoc(dbRef, objeto)
    .then((docRef) => {
      console.log("Document has been added successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
