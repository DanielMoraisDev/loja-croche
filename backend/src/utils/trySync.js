export const trySync = (fn) => {
  try {
    const result = fn();
    return [null, result];
  } catch (err) {
    return [err, null];
  }
};
