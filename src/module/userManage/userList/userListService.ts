import { wait } from "../../../app/utils";

export let userListService = {
  async init() {
    await wait(300);
    let list = new Array<any>();
    for (let i = 0; i < 1000; i++) {
      list.push({ id: `${i}`, name: `name${i}` });
    }

    window.localStorage.setItem("userList", JSON.stringify(list));
  },

  async getUserList() {
    await wait(300);
    return JSON.parse(window.localStorage.getItem("userList"));
  },

  async getUser(id: number) {
    let userList = await this.getUserList();
    return userList.find((item: any) => item.id == id);
  },

  async deleteUser(id: number) {
    let userList = await this.getUserList();
    let userList2 = userList.filter((item: any, index: number) => item.id !== id);
    window.localStorage.setItem("userList", JSON.stringify(userList2));
  },

  async saveUser(userData: any) {
    let userList = await this.getUserList();
    let user = userList.find((item: any) => item.id === userData.id);
    user.name = userData.name;
    window.localStorage.setItem("userList", JSON.stringify(userList));
  }
};
