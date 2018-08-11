import { AnyAction } from "redux";
import { ModelBase } from "../../../app/modelBase";
import { Hash } from "../../../app/hash";

export let model = new ModelBase({
  namespace: "userEdit",
  initState: {
    user: null,
    isShowSaveBtnLoading: false,
    isShowEditDialog: true
  },
  statePath: "user.userEdit",
  reducers: {
    showSaveBtnLoadding(state: any, action: AnyAction) {
      return {
        ...state,
        isShowSaveBtnLoading: true
      };
    },

    hideSaveBtnLoading(state: any, action: AnyAction) {
      return {
        ...state,
        isShowSaveBtnLoading: false
      };
    },

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

    editDialogClosing(state: any, action: AnyAction) {
      return {
        ...state,
        isShowEditDialog: false
      };
    }
  }
});
