import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
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

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


export function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


// export async function getAllById({ id, tabla }) {
//   const objRef = collection(db, tabla);
//   const q = query(objRef, where("fk_mesa_id", "==", id));

//   const querySnapshot = await getDocs(q);

//   // if (!querySnapshot.empty) {
//     //   const obj = [];
//     //   querySnapshot.forEach((doc) => {});
//     // }
//     return querySnapshot;
//   // }
// }
