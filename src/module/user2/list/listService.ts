import { wait } from "../../../app/utils";

export let listService = {
  async init() {
    let list = new Array<any>();
    for (let i = 0; i < 1000; i++) {
      list.push({ id: `${i + 1}`, name: `name${i + 1}`, sex: i % 2 ? "男" : "女", checked: i % 2 === 1, address: "浙江省杭州市西湖区南山路000号" });
    }

    window.localStorage.setItem("userList", JSON.stringify(list));
  },

  async getUserList(condition: any) {
    let list1 = await this.getUserListData();
    let list = [];
    if (condition) {
      list = list1
        .filter((item: any, index: number) => {
          return (!condition.id || item.id.indexOf(condition.id) > -1) && (!condition.name || item.name.indexOf(condition.name) > -1) && (!condition.sex || item.sex == condition.sex);
        })
        .filter((item: any, index: number) => {
          return index >= condition.pageSize * (condition.pageIndex - 1) && index < condition.pageSize * condition.pageIndex;
        });
    }

    return {
      success: true,
      data: list,
      count: list1.length,
      message: ""
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
    user.sex = userData.sex;
    window.localStorage.setItem("userList", JSON.stringify(userList));

    return {
      success: true,
      message: "由于某某原因，保存失败!"
    };
  },

  async checkUser(userData: any) {
    let userList = await this.getUserListData();
    let user = userList.find((item: any) => item.id === userData.id);
    user.checked = true;
    window.localStorage.setItem("userList", JSON.stringify(userList));

    return {
      success: true,
      message: "由于某某原因，审核失败!"
    };
  }
};

listService.init();
