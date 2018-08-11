import { AnyAction } from "../../node_modules/redux";
import { store } from "./store";

interface ModelBaseInit {
  namespace: string;
  reducers: {
    [key: string]: (state: any, action: AnyAction) => any;
  };
  // 初始化值
  initState: any;
  // 在store中的位置
  statePath: string;
}

export class ModelBase {
  public namespace: string;

  public reducers: {
    [key: string]: (state: any, action: AnyAction) => any;
  };
  // 初始化值
  public initState: any;
  // 在store中的位置
  public statePath: string;

  constructor(props: ModelBaseInit) {
    this.namespace = props.namespace;
    this.reducers = props.reducers;
    this.initState = props.initState;
    this.statePath = props.statePath;
  }

  // 获取action type 全名
  public getActionType(type: string): string {
    return `${this.namespace}_${type}`;
  }

  // 获取 分支 state
  public getState() {
    let state = store.getState() as any;

    this.statePath.split(".").map((item, index) => {
      if (state) {
        state = state[item];
      }
    });

    return state;
  }

  public addReducer(key: string, reducer: any) {
    this.reducers[key] = reducer;
  }
}
