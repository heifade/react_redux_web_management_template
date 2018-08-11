import * as React from "react";
import { ComponentProps } from "../../../app/componentProps";
import { Dispatch } from "../../../../node_modules/redux";
import { ModelBase } from "../../../app/modelBase";
import { connect } from "react-redux";
import { Modal, message } from "antd";
import { wait } from "../../../app/utils";

let styles = require("./listBase.less");

export abstract class ListBaseComponent extends React.Component<ComponentProps, any> {
  public listModel: ModelBase;
  public editModel: ModelBase;
  constructor(props: ComponentProps, context: any) {
    super(props, context);
  }

  abstract async onFetch(): Promise<any>;

  abstract async onGetDetail(data: any): Promise<any>;

  abstract async onDelete(data: any): Promise<any>;

  onConditionChanged = (key: string, value: string) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.listModel.getActionType("conditionChanged"), //
        key,
        value
      });
    });
  }

  onShowEditHandle = (data: any) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.listModel.getActionType("showLoadding") // 显示列表 loading
      });

      let result = await this.onGetDetail(data);
      if (result.success) {
        dispatch({
          type: this.listModel.getActionType("showEditDialog") // 初始化编辑弹框
        });

        dispatch({
          type: this.editModel.getActionType("hideSaveBtnLoading") // 隐藏保存按钮 loading
        });

        dispatch({
          type: this.editModel.getActionType("showEditDialog"), // 显示编辑弹框
          data: result.data
        });

        dispatch({
          type: this.listModel.getActionType("hideLoading") // 隐藏列表 loading
        });
      } else {
        dispatch({
          type: this.listModel.getActionType("hideLoading") // 隐藏列表 loading
        });
        message.error(result.message || "获取数据失败！");
      }
    });
  };
  onDeleteHandle = (data: any) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      Modal.confirm({
        title: "是否确认删除？",
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {
          let result = await this.onDelete(data);
          if (result.success) {
            dispatch({
              type: this.listModel.getActionType("showLoadding") // 显示列表 loading
            });

            let result = await this.onFetch();
            if (result.success) {
              dispatch({
                type: this.listModel.getActionType("listFetched"), // 列表填充数据
                list: result.data
              });
            } else {
              message.error(result.message || "获取数据失败！");
            }

            dispatch({
              type: this.listModel.getActionType("hideLoading") // 隐藏列表 loading
            });
          } else {
            message.error(result.message || "操作失败！");
            throw new Error(); // 抛出错，是为了不关掉删除确认框
          }
        }
      });
    });
  };

  onSelectHandle = () => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.listModel.getActionType("showLoadding") // 显示列表 loading
      });

      let result = await this.onFetch();
      if (result.success) {
        dispatch({
          type: this.listModel.getActionType("listFetched"), // 列表填充数据
          list: result.data
        });

        dispatch({
          type: this.listModel.getActionType("hideLoading") // 隐藏列表 loading
        });
      } else {
        dispatch({
          type: this.listModel.getActionType("hideLoading") // 隐藏列表 loading
        });
        message.error(result.message || "获取数据失败！");
      }
    });
  }

  componentDidMount() {
    this.onSelectHandle();
  }
}

function mapStateToProps(listModel: ModelBase) {
  return (state: any, ownProps: any) => {
    return {
      modelData: listModel.getState()
    };
  };
}

export function connectList(component: any, listModel: ModelBase) {
  return connect(mapStateToProps(listModel))(component);
}
