import * as admin from 'firebase-admin'
import { CODE } from '../const'

export type Response = {
  code: string
  payload?: any
  error?: any
}
export type Friend = {
  ref: FirebaseFirestore.DocumentReference
  dmId: string
  uid: string
}
export type DocRef<T> = FirebaseFirestore.DocumentReference<T>
export type Code =  keyof typeof CODE
export type UserRecord = admin.auth.UserRecord