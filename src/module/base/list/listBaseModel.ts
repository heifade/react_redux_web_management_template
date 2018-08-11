import { AnyAction } from "redux";
import { ModelBase } from "../../../app/modelBase";

export function getModel({ namespace, statePath }) {
  return new ModelBase({
    namespace: namespace,
    initState: {
      condition: {},
      list: [],
      isShowLoading: false,
      isShowEditDialog: false
    },
    statePath: statePath,
    reducers: {
      conditionChanged(state: any, action: AnyAction) {
        let { condition } = state;
        return {
          ...state,
          condition: {
            ...condition,
            [action.key]: action.value
          }
        };
      },
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
          list: action.list
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
      }
    }
  });
}
