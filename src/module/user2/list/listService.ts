import { wait } from "../../../app/utils";

export let listService = {
  async init() {
    let list = new Array<any>();
    for (let i = 0; i < 1000; i++) {
      list.push({ id: `${i}`, name: `name${i}`, age: i + 20 });
    }

    window.localStorage.setItem("userList", JSON.stringify(list));
  },

  async getUserList() {
    return {
      success: true,
      data: await this.getUserListData()
    };
  },

  async getUserListData() {
    await wait(300);
    return JSON.parse(window.localStorage.getItem("userList"));
  },

  async getUser(id: number) {
    let list = await this.getUserListData();
    return {
      success: true,
      data: list.find((item: any) => item.id == id),
      message: "由于某某原因，获取数据失败!"
    };
  },

  async deleteUser(id: number) {
    let userList = await this.getUserListData();
    let userList2 = userList.filter((item: any, index: number) => item.id !== id);
    window.localStorage.setItem("userList", JSON.stringify(userList2));

    return {
      success: true,
      message: "由于某某原因，删除失败!"
    };
  },

  async saveUser(userData: any) {
    let userList = await this.getUserListData();
    let user = userList.find((item: any) => item.id === userData.id);
    user.name = userData.name;
    user.age = userData.age;
    window.localStorage.setItem("userList", JSON.stringify(userList));

    return {
      success: true,
      message: "由于某某原因，保存失败!"
    };
  }
};

listService.init();
