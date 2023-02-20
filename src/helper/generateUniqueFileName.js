import { generateUUID } from "./generateUUID";
const generateUniqueFileName = (filename) => {
    const extension = filename.split(".").pop();
    const newFileName = `${generateUUID(filename)}.${extension}`
    return newFileName;
}

export default generateUniqueFileName