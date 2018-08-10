import * as React from "react";
import { Spin, Table, Divider } from "antd";
import { connect } from "react-redux";
import { model as listModel } from "./userListModel";
import { model as editModel } from "../userEdit/userEditModel";
import UserEdit from "../userEdit/userEdit";
import { ComponentProps } from "../../../app/componentProps";
import { Dispatch } from "../../../../node_modules/redux";
import { wait } from "../../../app/utils";
import { userListService } from "./userListService";

let styles = require("./userList.less");

class UserListComponent extends React.Component<ComponentProps, any> {
  constructor(props: ComponentProps, context: any) {
    super(props, context);
  }

  onShowEdit = (user: any) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: listModel.getActionType("itemFetching")
      });

      let userData = await userListService.getUser(user.id);

      dispatch({
        type: listModel.getActionType("showEditDialog")
      });

      dispatch({
        type: editModel.getActionType("showEditDialog"),
        userData
      });

      dispatch({
        type: listModel.getActionType("itemFetched")
      });
    });
  };
  onDelete = (user: any) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: listModel.getActionType("itemDeleting")
      });

      await userListService.deleteUser(user.id);

      dispatch({
        type: listModel.getActionType("itemDeleted")
      });

      dispatch({
        type: listModel.getActionType("listFetching")
      });

      let userList = await userListService.getUserList();

      dispatch({
        type: listModel.getActionType("listFetched"),
        userList
      });
    });
  };

  componentDidMount() {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: listModel.getActionType("listFetching")
      });

      await userListService.init();
      let userList = await userListService.getUserList();

      dispatch({
        type: listModel.getActionType("listFetched"),
        userList
      });
    });
  }

  render() {
    const dataSource = this.props.modelData.userList.map((data, index) => ({ ...data, key: index }));
    const columns = [
      {
        title: "编号",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "操作",
        key: "action",
        width: 120,
        render: (text: any, record: any) => (
          <span>
            <a href="javascript:;" onClick={() => this.onShowEdit(record)}>
              编辑
            </a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.onDelete(record)}>
              删除
            </a>
          </span>
        )
      }
    ];

    return (
      <div className={styles.userList}>
        <Spin spinning={this.props.modelData.isShowWaiting}>
          <Table dataSource={dataSource} columns={columns} />
        </Spin>

        {this.props.modelData.isShowEditDialog && <UserEdit />}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    modelData: listModel.getState()
  };
};

export default connect(mapStateToProps)(UserListComponent);
