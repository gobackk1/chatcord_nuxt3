const service = {
  auth: useAuth(),
  functions: useFunctions(),
  storage: useStorage(),
  firestore: useFirestore(),
}

export default function (): typeof service {
  return service
}
