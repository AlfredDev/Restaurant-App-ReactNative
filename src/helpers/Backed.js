import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  updateDocs,
  where,
  ServerValue,
  FieldValue,
  increment,
  updateData,
  data,
  update,
  exists
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

export const updateCampIf = async (tabla,argumento1,argumento2,objeto,idDoc,cat) => {
  const docRef = doc(db, tabla, idDoc);
  const userRef = collection(db, tabla);
  const q = query(
    userRef,
    where(argumento1, "==", argumento2)
    //where("contraseña", "==", password)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      alert(cat+ " ya existente.");
    });
  } else {
    //updateDoc(docRef, { estatus: true })
    setDoc(docRef, objeto);
    alert(cat + " actualizado.");
  }
};
export const changeStatusOrder = async (tabla, cluausula1, cluausula2) => {
  const docRef = query(
    collection(db, tabla),
    where(cluausula1, "==", cluausula2)
  );
  const q = await getDocs(docRef);
  q.forEach((doc) => {
    updateDoc(doc.ref, { estatus: true });
  });
};

export const changeCantidadBebidas = async (tabla, cluausula1, cluausula2,cant) => {
  const docRef = query(
    collection(db, tabla),
    where(cluausula1, "==", cluausula2)
  );
  const q = await getDocs(docRef);
  q.forEach((doc) => {
    updateDoc(doc.ref, { Cantidad: increment(- cant) });
   //updateData(doc.ref, { Cantidad: doc.data['Cantidad'] - cant });
    
  });
};

export const addDocumento = (tabla, objeto) => {
  const dbRef = collection(db, tabla);

  addDoc(dbRef, objeto)
    .then((docRef) => {
      console.log("Documento agregado exitosamente");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addDocIf = async (tabla,argumento1,argumento2,objeto,cat) => {
  const userRef = collection(db, tabla);
  const q = query(
    userRef,
    where(argumento1, "==", argumento2)
    //where("contraseña", "==", password)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      alert(cat+ " ya existente.");
    });
  } else {
    addDoc(userRef, objeto)
    alert(cat + " añadido.");
  }
};



//Elimina por el id decumento

export async function deleteDocument(tabla, id) {
  const docRef = doc(db, tabla, id);

  deleteDoc(docRef)
    .then(() => {
      console.log("Documento elimiando exitosamente");
    })
    .catch((error) => {
      console.log(error);
    });
}

export const deleteDocWhere = async (tabla, cluausula1, cluausula2) => {
  const docRef = query(
    collection(db, tabla),
    where(cluausula1, "==", cluausula2)
  );
  const q = await getDocs(docRef);

  q.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export function generateUUID() {
  var d = new Date().getTime();
  var uuid = "xxxxxx4xxxyxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export const getFecha = () => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate() - 1;
  var year = dateObj.getUTCFullYear();

  return year + "/" + month + "/" + day;
};


export const getDate = () => {
  var date = new Date();
  // var month = dateObj.getUTCMonth() + 1; //months from 1-12
  // var day = dateObj.getUTCDate();
  // var year = dateObj.getUTCFullYear();
  // console.log(new Date(Date.UTC(year, month, day)));
  // return new Date(Date.UTC(year, month, day));
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() , date.getUTCHours() - 1, date.getUTCMinutes(), date.getUTCSeconds()); 
};


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

export function unicoId(prefix) {
  var id = + Math.floor(Math.random() * 1000000 ) + Math.floor(Math.random() * 500);
  return prefix ? prefix + id : id;
};

export function unicosId(prefix) {
  var id = + Math.floor(Math.random() * 1000 );
  return prefix ? prefix + id : id;
};