import authenticateToken from "./authenticate-token.js";
import { imageUpload } from "./image-upload.js";

const globalMiddlewares = {
  imageUpload: imageUpload,
  authToken: authenticateToken,
};

export default globalMiddlewares;
