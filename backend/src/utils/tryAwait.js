export const tryAwait = (promise) =>
  promise.then((data) => [null, data]).catch((err) => [err, null]);
