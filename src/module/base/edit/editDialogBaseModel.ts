import { AnyAction } from "redux";
import { ModelBase } from "../../common/modelBase";
import { Hash } from "../../common/hash";

export function getModel({ namespace = "", statePath = "" }) {
  return new ModelBase({
    namespace: namespace,
    initState: {
      data: null,
      isShowSaveBtnLoading: false,
      isShowEditDialog: true
    },
    statePath: statePath,
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
        for (let key in action.data) {
          data[key] = {
            name: key,
            value: action.data[key]
          };
        }
        return {
          ...state,
          isShowEditDialog: true,
          data
        };
      },

      fieldChanged(state: any, action: AnyAction) {
        return {
          ...state,
          data: {
            ...state.data!,
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
}
