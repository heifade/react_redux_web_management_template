export function promisify(fun: any) {
  return function(...pars: any[]) {
    let args = Array.prototype.slice.call(pars);
    return new Promise((resolve, reject) => {
      args.push((err: any, result: any) => {
        if (err) reject(err);
        else resolve(result);
      });
      fun.apply(null, args);
    });
  };
}

export let wait = (millisecond: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, millisecond);
  });

  return promisify(setTimeout)(millisecond);
};
