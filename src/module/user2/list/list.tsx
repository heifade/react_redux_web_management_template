import * as React from "react";
import { ListBaseComponent, connectList } from "../../base/list/listBase";
import { ComponentProps } from "../../../app/componentProps";
import { Spin, Table, Divider } from "antd";
import { model as listModel } from "./listModel";
import { model as editModel } from "../edit/editModel";
import { listService } from "./listService";
import { wait } from "../../../app/utils";
import UserEdit from "../edit/edit";
let styles = require("./list.less");

class User2List extends ListBaseComponent {
  constructor(props: ComponentProps, context: any) {
    super(props, context);

    this.listModel = listModel;
    this.editModel = editModel;
  }

  async onFetch() {
    return await listService.getUserList();
  }

  async onGetDetail(data: any) {
    return await listService.getUser(data.id);
  }

  async onDelete(data: any) {
    return await listService.deleteUser(data.id);
  }

  render() {
    const dataSource = this.props.modelData.list.map((data: any, index: number) => ({ ...data, key: index }));
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
            <a href="javascript:;" onClick={() => this.onShowEditHandle(record)}>
              编辑
            </a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.onDeleteHandle(record)}>
              删除
            </a>
          </span>
        )
      }
    ];

    return (
      <div className={styles.userList}>
        <Spin spinning={this.props.modelData.isShowLoading}>
          <Table dataSource={dataSource} columns={columns} />
        </Spin>

        {this.props.modelData.isShowEditDialog && <UserEdit />}
      </div>
    );
  }
}

export default connectList(User2List, listModel);
