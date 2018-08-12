import * as React from "react";
import { ComponentProps } from "../../../app/componentProps";
import { Dispatch } from "../../../../node_modules/redux";
import { ModelBase } from "../../../app/modelBase";
import { connect } from "react-redux";
import { Modal, message } from "antd";
import { Spin, Table, Pagination } from "antd";
let styles = require("./listBase.less");

interface ListBaseComponentProps extends ComponentProps {
  listModel: ModelBase;
  editModel: ModelBase;
  onGetDetail: (data: any) => Promise<any>;
  onDelete: (data: any) => Promise<any>;
  onFetch: () => Promise<any>;
  onPaginationChanged: (page: number) => void;
  condition: any;
  dataSource: any;
  dataCount: number;
  isShowLoading: boolean;
  columns: any;
  editDialog: any;
}

export class ListBaseComponent extends React.Component<ListBaseComponentProps, any> {
  constructor(props: ListBaseComponentProps, context: any) {
    super(props, context);
  }

  onConditionChanged = (key: string, value: string) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.props.listModel.getActionType("conditionChanged"), //
        key,
        value
      });
    });
  };

  onShowEditHandle = (data: any) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.props.listModel.getActionType("showLoadding") // 显示列表 loading
      });

      let result = await this.props.onGetDetail(data);
      if (result.success) {
        dispatch({
          type: this.props.listModel.getActionType("showEditDialog") // 初始化编辑弹框
        });

        dispatch({
          type: this.props.editModel.getActionType("hideSaveBtnLoading") // 隐藏保存按钮 loading
        });

        dispatch({
          type: this.props.editModel.getActionType("showEditDialog"), // 显示编辑弹框
          data: result.data
        });

        dispatch({
          type: this.props.listModel.getActionType("hideLoading") // 隐藏列表 loading
        });
      } else {
        dispatch({
          type: this.props.listModel.getActionType("hideLoading") // 隐藏列表 loading
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
          let result = await this.props.onDelete(data);
          if (result.success) {
            dispatch({
              type: this.props.listModel.getActionType("showLoadding") // 显示列表 loading
            });

            let result = await this.props.onFetch();
            if (result.success) {
              dispatch({
                type: this.props.listModel.getActionType("listFetched"), // 列表填充数据
                list: result.data
              });
            } else {
              message.error(result.message || "获取数据失败！");
            }

            dispatch({
              type: this.props.listModel.getActionType("hideLoading") // 隐藏列表 loading
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
        type: this.props.listModel.getActionType("showLoadding") // 显示列表 loading
      });

      let result = await this.props.onFetch();
      if (result.success) {
        dispatch({
          type: this.props.listModel.getActionType("listFetched"), // 列表填充数据
          list: result.data,
          count: result.count
        });

        dispatch({
          type: this.props.listModel.getActionType("hideLoading") // 隐藏列表 loading
        });
      } else {
        dispatch({
          type: this.props.listModel.getActionType("hideLoading") // 隐藏列表 loading
        });
        message.error(result.message || "获取数据失败！");
      }
    });
  };

  componentDidMount() {
    this.onSelectHandle();
  }

  onPaginationChanged = (page: number) => {
    let { onPaginationChanged } = this.props;
    if (onPaginationChanged) {
      onPaginationChanged(page);
    }
  };

  render() {
    let { condition, isShowLoading, dataSource, columns, editDialog, dataCount } = this.props;
    return (
      <div className={styles.listPage}>
        {condition && <div className={styles.condition}>{condition}</div>}

        <div className={styles.lineBelowCondition} />
        <div className={styles.tableList}>
          <Spin spinning={isShowLoading}>
            <Table dataSource={dataSource} columns={columns} size="middle" bordered={true} scroll={{ x: 1600, y: 500 }} pagination={false} />
            <div className={styles.pagination}>
              <Pagination defaultCurrent={1} showTotal={total => `总共 ${total} 条`} total={dataCount} showQuickJumper hideOnSinglePage={true} defaultPageSize={10} onChange={this.onPaginationChanged} />
            </div>
          </Spin>
        </div>
        {editDialog}
      </div>
    );
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
