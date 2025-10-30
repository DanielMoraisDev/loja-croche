import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import * as Minio from "minio";
import configs from "../config.js";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const host = configs.hosts.minio.host;
const port = configs.hosts.minio.port;
const accessKey = configs.hosts.minio.access_key;
const secretKey = configs.hosts.minio.secret_key;
const useSSL = ["1"].includes(configs.hosts.minio.use_ssl?.toLowerCase());

const minioClient = new Minio.Client({
  endPoint: host,
  port: port,
  useSSL: useSSL,
  accessKey: accessKey,
  secretKey: secretKey,
});

const bucketName = configs.hosts.minio.bucket;

const testMinio = async () => {
  try {
    const buckets = await minioClient.listBuckets();
    console.log("[MINIO] Buckets disponíveis:", buckets);
  } catch (error) {
    console.error("[MINIO] Erro ao conectar ao MinIO:", error);
  }
};

export { minioClient, bucketName, testMinio };
