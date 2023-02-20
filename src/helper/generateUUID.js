import { v5 as uuidv5 } from "uuid"

// Define a custom namespace.  Readers, create your own using something like
// https://www.uuidgenerator.net/
const MY_NAMESPACE = process.env.NEXT_PUBLIC_UUID_NAMESPACE;

export const generateUUID = (name) => {
    return uuidv5(name, MY_NAMESPACE);
}