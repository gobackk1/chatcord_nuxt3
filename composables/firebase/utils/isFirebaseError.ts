import type { ErrorCodes } from './errorCodes'

export type FirebaseError = {
  code: ErrorCodes
} & Error

export const isFirebaseError = (error: Error): error is FirebaseError => {
  return 'code' in error
}
