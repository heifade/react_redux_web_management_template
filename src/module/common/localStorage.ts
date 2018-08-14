export let localStorage = {
  save<T>(key: string, data: T): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
  get<T>(key: string): T {
    return JSON.parse(window.localStorage.getItem(key)) as T;
  },
  remove(key: string) {
    window.localStorage.removeItem(key);
  }
};
