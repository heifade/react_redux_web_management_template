import { AnyAction } from "redux";
import { ModelBase } from "../../../app/modelBase";

export let model = new ModelBase({
  namespace: "userList",
  initState: {
    userList: [],
    isShowWaiting: false,
    isShowEditDialog: false
  },
  statePath: "user.userList",
  reducers: {
    listFetching(state: any, action: AnyAction) {
      return {
        ...state,
        isShowWaiting: true
      };
    },
    listFetched(state: any, action: AnyAction) {
      return {
        ...state,
        userList: action.userList,
        isShowWaiting: false
      };
    },
    itemFetching(state: any, action: AnyAction) {
      return {
        ...state,
        isShowWaiting: true
      }
    },
    itemFetched(state: any, action: AnyAction) {
      return {
        ...state,
        isShowWaiting: false
      }
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
    itemDeleting(state: any, action: AnyAction) {
      return {
        ...state,
        isShowWaiting: true
      };
    },
    itemDeleted(state: any, action: AnyAction) {
      return {
        ...state,
        isShowWaiting: false
      };
    },
    itemSaved(state: any, action: AnyAction) {
      return {
        ...state,
        isShowWaiting: false
      };
    }
  }
});
