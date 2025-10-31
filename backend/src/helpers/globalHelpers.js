import authToken from "./auth-token.js";
import createToken from "./create-token.js";

const globalHelpers = {
  createToken: createToken,
  authToken: authToken,
};

export default globalHelpers;
