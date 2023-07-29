import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../utils/Firebase";
import { v4 as uuid } from "uuid";
import { Form } from "../domains/Form";

const baseQuery = "/forms";

export const CreateForm = (form: Form) => {
  const id = uuid();
  return new Promise((resolve, reject) => {
    const docRef = doc(db, `${baseQuery}/${id}`);
    setDoc(docRef, form)
      .then(() => {
        resolve(id);
      })
      .catch((err) => reject(err));
  });
};

export const GetForm = (id: string) => {
  return new Promise<Form>((resolve, reject) => {
    const docRef = doc(db, `${baseQuery}/${id}`);
    getDoc(docRef)
      .then((res) => {
        resolve(res.data() as Form);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
