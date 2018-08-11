import * as React from "react";
import { ListBaseComponent, connectList } from "../../base/list/listBase";
import { ComponentProps } from "../../../app/componentProps";
import { Spin, Table, Divider } from "antd";
import { model as listModel } from "./listModel";
import { model as editModel } from "../edit/editModel";
import { listService } from "./listService";
import EditDialog from "../edit/edit";
let styles = require("./list.less");

class ListComponent extends ListBaseComponent {
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
    const { list, isShowLoading, isShowEditDialog } = this.props.modelData;
    const dataSource = list.map((data: any, index: number) => ({ ...data, key: index }));
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
        title: "年龄",
        dataIndex: "age",
        key: "age"
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
        <Spin spinning={isShowLoading}>
          <Table dataSource={dataSource} columns={columns} />
        </Spin>
        {isShowEditDialog && <EditDialog />}
      </div>
    );
  }
}

export default connectList(ListComponent, listModel);
