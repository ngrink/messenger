export const groupBy = <T, K extends keyof T>(xs: Array<T>, key: K) => {
  return xs.reduce((rv: { [P in K]?: T[] }, x) => {
    // @ts-ignore
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {} as { [P in K]?: T[] });
};