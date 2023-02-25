import useAuth from './useAuth'
import useFunctions from './useFunctions'
import useStorage from './useStorage'
import useFirestore from './useFirestore'

const service = {
  auth: useAuth(),
  functions: useFunctions(),
  storage: useStorage(),
  firestore: useFirestore(),
}

export default function (): typeof service {
  return service
}
