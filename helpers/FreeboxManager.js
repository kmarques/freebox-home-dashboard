import StorageManager from "./StorageManager";

let freeboxs = null;

export default new Proxy(
  {
    async all() {
      if (freeboxs === null) {
        freeboxs = await StorageManager.read("./data/freeboxs.json");
      }
      const { default: defVal, ...result } = freeboxs;
      return result;
    },
    async add(freebox) {
      freeboxs[freebox.api_domain] = freebox;
      if (!freeboxs.default) {
        freeboxs.default = freebox.api_domain;
      }
      return StorageManager.save("freeboxs.json", freeboxs);
    },
    async update(freebox) {
      freeboxs[freebox.api_domain] = freebox;
      return StorageManager.save("freeboxs.json", freeboxs);
    },
    async remove(freebox) {
      delete freeboxs[freebox.api_domain];
      return StorageManager.save("freeboxs.json", freeboxs);
    },
    async select(freebox) {
      freeboxs.default = freebox.api_domain;
      return StorageManager.save("freeboxs.json", freeboxs);
    },
  },
  {
    get(target, key, receiver) {
      const method = target[key];
      if (!(typeof method === "function")) return method;
      return async function (...args) {
        if (freeboxs === null) {
          freeboxs = await StorageManager.read("./data/freeboxs.json");
        }
        return method.apply(this, args);
      };
    },
  }
);
