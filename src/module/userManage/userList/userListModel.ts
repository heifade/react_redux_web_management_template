import { AnyAction } from "redux";
import { ModelBase } from "../../../app/modelBase";

export let model = new ModelBase({
  namespace: "userList",
  initState: {
    userList: [],
    isShowLoading: false,
    isShowEditDialog: false
  },
  statePath: "user.userList",
  reducers: {
    showLoadding(state: any, action: AnyAction) {
      return {
        ...state,
        isShowLoading: true
      };
    },

    hideLoading(state: any, action: AnyAction) {
      return {
        ...state,
        isShowLoading: false
      };
    },

    listFetched(state: any, action: AnyAction) {
      return {
        ...state,
        userList: action.userList
      };
    },

    showEditDialog(state: any, action: AnyAction) {
      return {
        ...state,
        isShowEditDialog: true
      };
    },
    disposeEditDialog(state: any, action: AnyAction) {
      return {
        ...state,
        isShowEditDialog: false
      };
    },


  }
});
