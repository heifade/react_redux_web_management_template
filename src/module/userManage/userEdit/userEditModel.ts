import { AnyAction } from "redux";
import { ModelBase } from "../../../app/modelBase";
import { Hash } from "../../../app/hash";

export let model = new ModelBase({
  namespace: "userEdit",
  initState: {
    user: null,
    isShowWaiting: false,
    isShowEditDialog: true
  },
  statePath: "user.userEdit",
  reducers: {
    showEditDialog(state: any, action: AnyAction) {
      let data = new Hash();
      for (let key in action.userData) {
        data[key] = {
          name: key,
          value: action.userData[key]
        };
      }
      return {
        ...state,
        isShowEditDialog: true,
        user: data
      };
    },
    fieldChanged(state: any, action: AnyAction) {
      return {
        ...state,
        user: {
          ...state.user!,
          ...action.data
        }
      };
    },
    itemSaving(state: any, action: AnyAction) {
      return {
        ...state,
        isShowWaiting: true
      };
    },
    itemSaved(state: any, action: AnyAction) {
      return {
        ...state,
        isShowWaiting: false
      };
    },
    editDialogClosing(state: any, action: AnyAction) {
      return {
        ...state,
        isShowEditDialog: false
      };
    }
  }
});
