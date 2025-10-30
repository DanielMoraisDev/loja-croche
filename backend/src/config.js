import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

let MINIO_HOST = process.env.MINIO_HOST;
const MINIO_HOST_DOCKER = process.env.MINIO_HOST_DOCKER;
let MINIO_PORT = process.env.MINIO_PORT;
const MINIO_PORT_DOCKER = process.env.MINIO_PORT_DOCKER;
const MINIO_BUCKET = process.env.MINIO_BUCKET;
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;
const MINIO_USE_SSL = process.env.MINIO_USE_SSL;

if (MINIO_HOST != "127.0.0.1") {
  MINIO_HOST = MINIO_HOST_DOCKER;
  MINIO_PORT = MINIO_PORT_DOCKER;
}

let POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_HOST_DOCKER = process.env.POSTGRES_HOST_DOCKER;
let POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_PORT_DOCKER = process.env.POSTGRES_PORT_DOCKER;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_USER = process.env.POSTGRES_USER;

if (POSTGRES_HOST != "127.0.0.1") {
  POSTGRES_HOST = POSTGRES_HOST_DOCKER;
  POSTGRES_PORT = POSTGRES_PORT_DOCKER;
}

const configs = {
  hosts: {
    minio: {
      host: MINIO_HOST,
      port: MINIO_PORT,
      bucket: MINIO_BUCKET,
      access_key: MINIO_ACCESS_KEY,
      secret_key: MINIO_SECRET_KEY,
      use_ssl: MINIO_USE_SSL,
    },
    postgres: {
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      user: POSTGRES_USER,
    },
  },
};

export default configs;
