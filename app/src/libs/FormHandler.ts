import { doc, setDoc } from "@firebase/firestore"
import { db } from "../utils/Firebase"
import { v4 as uuid } from 'uuid'

const baseQuery = '/forms'

export const CreateForm = (form: any) => {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, `${baseQuery}/${uuid()}`)
    setDoc(docRef, form).then(() => {
      resolve(form)
    }).catch((err) => reject(err))
  })
}