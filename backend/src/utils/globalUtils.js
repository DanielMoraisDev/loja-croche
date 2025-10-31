import { tryAwait } from "./tryAwait.js";
import { trySync } from "./trySync.js";

const globalUtils = {
  trySync: trySync,
  tryAwait: tryAwait,
};

export default globalUtils;
