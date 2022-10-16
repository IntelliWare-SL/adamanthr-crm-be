import admin from "firebase-admin";
import CONSTANTS from "../constants/const";

function getStorageBucket() {
  return admin.storage().bucket(CONSTANTS.STORAGE.BUCKET_NAME);
}

export async function isFileExist(path, fileName) {
  const bucket = await getStorageBucket();
  const fileObject = bucket.file(`${path}${fileName}`);
  const isExist = await fileObject.exists();
  if (isExist[0]) {
    return true;
  }
  return undefined;
}

const addFile = async (path, fileName, file) => {
  const bucket = await getStorageBucket();
  const fileObject = await bucket.file(`${path}${fileName}`);
  await fileObject.save(file.buffer, {
    contentType: file.mimetype,
  });
};

const deleteFile = async (path, fileName) => {
  const bucket = await getStorageBucket();
  const fileObject = bucket.file(`${path}${fileName}`);
  if (await isFileExist(path, fileName)) {
    await fileObject.delete();
  } else {
    throw new Error("File not found");
  }
};

const getFile = async (path, fileName) => {
  const bucket = await getStorageBucket();
  const fileObject = await bucket.file(`${path}${fileName}`);
  if (await isFileExist(path, fileName)) {
    return (
      await fileObject.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 604800, // 15 minutes
      })
    )[0];
  }
};

export default { addFile, deleteFile, getFile, isFileExist };
