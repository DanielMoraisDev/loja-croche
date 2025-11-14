import authenticateToken from "./authenticate-token.js";
import authenticateTokenWithoutMandatory from "./authenticate-token-without-mandatory.js";
import { imageUpload } from "./image-upload.js";

const globalMiddlewares = {
  imageUpload: imageUpload,
  authToken: authenticateToken,
  authTokenWithoutMandatory: authenticateTokenWithoutMandatory,
};

export default globalMiddlewares;
