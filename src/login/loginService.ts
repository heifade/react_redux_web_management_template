import { wait } from "../module/common/utils";
import { localStorage } from "../module/common/localStorage";

export let loginService = {
  async login(formData: any) {
    if (formData.remember) {
      localStorage.save("loginData", formData);
    } else {
      localStorage.remove("loginData");
    }

    await wait(1000);

    return true;
  }
};
