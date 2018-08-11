import { getModel } from "../../base/list/listBaseModel";
import { AnyAction } from "redux";

export let model = getModel({
  namespace: "user2List",
  statePath: "user2.userList"
});

// model.addReducer("check", (state: any, action: AnyAction) => {
//   return {
//     ...state,
//     isShowLoading: true
//   };
// });
