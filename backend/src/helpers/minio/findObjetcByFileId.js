import { minioClient, bucketName } from "../../db/minio.js";

export const findObjectByFileId = async (fileId) => {
  const stream = minioClient.listObjects(bucketName, "", true);

  return new Promise((resolve, reject) => {
    stream.on("data", (obj) => {
      if (obj.name.includes(fileId)) {
        resolve(obj);
      }
    });

    stream.on("error", reject);
    stream.on("end", () => resolve(null));
  });
};
