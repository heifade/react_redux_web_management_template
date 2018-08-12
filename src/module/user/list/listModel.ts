import { getModel } from "../../base/list/listBaseModel";
import { AnyAction } from "redux";

export let model = getModel({
  namespace: "userList",
  statePath: "user.userList",
  initState: {
    condition: {
      sex: "",
      pageIndex: 1,
      pageSize: 10,
    }
  }
});

// model.addReducer("check", (state: any, action: AnyAction) => {
//   return {
//     ...state,
//     isShowLoading: true
//   };
// });
