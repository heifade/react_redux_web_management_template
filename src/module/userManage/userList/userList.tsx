import * as React from "react";
import { Spin, Table, Divider } from "antd";
import { connect } from "react-redux";
import { model as listModel } from "./userListModel";
import { model as editModel } from "../userEdit/userEditModel";
import UserEdit from "../userEdit/userEdit";
import { ComponentProps } from "../../../app/componentProps";
import { Dispatch } from "../../../../node_modules/redux";
import { wait } from "../../../app/utils";

let styles = require("./userList.less");

function showEdit(user: any) {
  return async function(dispatch: Dispatch) {
    dispatch({
      type: listModel.getActionType("showEdit")
    });

    await wait(500);

    dispatch({
      type: editModel.getActionType("show"),
      userData: user
    });
  };
}

class UserListComponent extends React.Component<ComponentProps, any> {
  constructor(props: ComponentProps, context: any) {
    super(props, context);
  }

  onEdit = (user: any) => {
    this.props.dispatch(showEdit(user));
  };
  delete = (user: any) => {
    this.props.dispatch({
      type: listModel.getActionType("deleting")
    });
    setTimeout(() => {
      this.props.dispatch({
        type: listModel.getActionType("deleted"),
        userData: user
      });
    }, 1000);
  };

  componentDidMount() {
    this.props.dispatch({
      type: listModel.getActionType("fetching")
    });

    setTimeout(() => {
      let list = new Array<any>();
      for (let i = 0; i < 20; i++) {
        list.push({ id: `${i}`, name: `name${i}` });
      }
      this.props.dispatch({
        type: listModel.getActionType("fetched"),
        userList: list
      });
    }, 1000);
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
            <a href="javascript:;" onClick={() => this.onEdit(record)}>
              编辑
            </a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.delete(record)}>
              删除
            </a>
          </span>
        )
      }
    ];

    return (
      <div className={styles.userList}>
        <Spin spinning={this.props.modelData.isWaiting}>
          <Table dataSource={dataSource} columns={columns} />
        </Spin>

        {this.props.modelData.isEditing && <UserEdit />}
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
