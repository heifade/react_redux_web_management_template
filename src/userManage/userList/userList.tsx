import * as React from "react";
import { Spin, Table, Divider } from "antd";
import { connect } from "react-redux";
import { model as listModel } from "./userListModel";
import { model as editModel } from "../userEdit/userEditModel";
import UserEdit from "../userEdit/userEdit";
import { FormComponentProps } from "antd/lib/form";


let styles = require("./userList.less");

interface Props extends FormComponentProps {
  modelData: any;
}

class UserListComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  edit = (user: any) => {
    this.props.dispatch({
      type: editModel.getActionType("show"),
      userData: user
    });
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
            <a href="javascript:;" onClick={() => this.edit(record)}>
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

        <UserEdit />
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


