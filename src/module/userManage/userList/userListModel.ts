import { AnyAction } from "redux";
import { ModelBase } from "../../../app/modelBase";

export let model = new ModelBase({
  namespace: "userList",
  initState: {
    userList: [],
    isWaiting: false
  },
  statePath: "userManage.userListManage",
  reducers: {
    fetching(state: any, action: AnyAction) {
      return {
        ...state,
        isWaiting: true
      };
    },
    fetched(state: any, action: AnyAction) {
      return {
        ...state,
        userList: action.userList,
        isWaiting: false
      };
    },
    deleting(state: any, action: AnyAction) {
      return {
        ...state,
        isWaiting: true
      };
    },
    deleted(state: any, action: AnyAction) {
      let userList = state.userList;
      let index = userList.findIndex((value, index) => value.id == action.userData.id);
      let list1 = userList.splice(index + 1);
      return {
        userList: userList.splice(0, index).concat(list1),
        isWaiting: false
      };
    },
    saved(state: any, action: AnyAction) {
      let userList = state.userList;
      let newData = action.userData;
      let index = userList.findIndex((value, index) => value.id == newData.id);
      let data = userList[index];
      let list1 = userList.splice(index + 1);

      return {
        ...state,
        userList: userList
          .splice(0, index)
          .concat([newData])
          .concat(list1)
      };
    }
  }
});



