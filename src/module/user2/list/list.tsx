import * as React from "react";
import { ListBaseComponent, connectList } from "../../base/list/listBase";
import { ComponentProps } from "../../../app/componentProps";
import { Dispatch } from "redux";
import { Spin, Table, Divider, Row, Col, Input, Button, Select, message, Pagination } from "antd";
import { model as listModel } from "./listModel";
import { model as editModel } from "../edit/editModel";
import { listService } from "./listService";
import EditDialog from "../edit/edit";
let styles = require("./list.less");
import { ListPageComponent } from "../../components/listPage/listPageComponent";

class ListComponent extends ListBaseComponent {
  constructor(props: ComponentProps, context: any) {
    super(props, context);

    this.listModel = listModel;
    this.editModel = editModel;
  }

  async onFetch() {
    console.log(11, this.props.modelData.condition);
    return await listService.getUserList(this.props.modelData.condition);
  }

  async onGetDetail(data: any) {
    return await listService.getUser(data.id);
  }

  async onDelete(data: any) {
    return await listService.deleteUser(data.id);
  }

  onCheckHandle = (data: any) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.listModel.getActionType("showLoadding") // 显示列表 loading
      });
      let result = await listService.checkUser(data);
      if (result.success) {
        let result = await this.onFetch();
        if (result.success) {
          dispatch({
            type: this.listModel.getActionType("listFetched"), // 列表填充数据
            list: result.data
          });
        } else {
          message.error(result.message || "获取数据失败！");
        }
      } else {
        message.error(result.message || "操作失败！");
      }
      dispatch({
        type: this.listModel.getActionType("hideLoading") // 隐藏列表 loading
      });
    });
  };

  onSearchHandle = () => {
    this.onSelectHandle();
  };

  onPaginationChanged = (page: number) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.listModel.getActionType("conditionChanged"),
        key: "pageIndex",
        value: page
      });

      setTimeout(() => {
        this.onSelectHandle();
      }, 0);
    });
  };

  render() {
    const { list, isShowLoading, isShowEditDialog, condition, count } = this.props.modelData;
    const dataSource = list.map((data: any, index: number) => ({ ...data, key: index, checkState: data.checked ? "已审核" : "未审核" }));

    const columns = [
      {
        title: "编号",
        dataIndex: "id",
        key: "id",
        width: 100,
        fixed: "left"
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: 100,
        fixed: "left"
      },
      {
        title: "性别",
        dataIndex: "sex",
        key: "sex",
        width: 100
      },
      {
        title: "审核状态",
        dataIndex: "checkState",
        key: "checkState",
        width: 100
      },
      {
        title: "地址1",
        dataIndex: "address",
        key: "address1",
        width: 300
      },
      {
        title: "地址2",
        dataIndex: "address",
        key: "address2",
        width: 300
      },
      {
        title: "地址3",
        dataIndex: "address",
        key: "address3"
      },
      {
        title: "操作",
        key: "action",
        width: 150,
        fixed: "right",
        render: (text: any, record: any) => (
          <span>
            <a href="javascript:;" onClick={() => this.onShowEditHandle(record)}>
              编辑
            </a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.onDeleteHandle(record)}>
              删除
            </a>
            {!record.checked && (
              <React.Fragment>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={() => this.onCheckHandle(record)}>
                  审核
                </a>
              </React.Fragment>
            )}
          </span>
        )
      }
    ];

    let conditionSpan = {
      xs: 22,
      sm: 11,
      md: 11,
      lg: 7,
      xl: 5
    };

    return (
      <ListPageComponent
        condition={
          <Row gutter={16}>
            <Col {...conditionSpan}>
              <Input addonBefore="编号" placeholder="请输入编号" onChange={e => this.onConditionChanged("id", e.target.value)} value={condition.id} />
            </Col>
            <Col {...conditionSpan}>
              <Input addonBefore="姓名" placeholder="请输入姓名" onChange={e => this.onConditionChanged("name", e.target.value)} value={condition.name} />
            </Col>
            <Col {...conditionSpan}>
              <Select style={{ width: 120 }} onChange={e => this.onConditionChanged("sex", e)} value={condition.sex}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="男">男</Select.Option>
                <Select.Option value="女">女</Select.Option>
              </Select>
            </Col>
            <Col xl={2}>
              <Button type="primary" icon="search" onClick={this.onSearchHandle}>
                查询
              </Button>
            </Col>
          </Row>
        }
        dataSource={dataSource}
        dataCount={count}
        onPaginationChanged={this.onPaginationChanged}
        isShowLoading={isShowLoading}
        columns={columns}
        editDialog={isShowEditDialog && <EditDialog />}
      />
    );
  }
}

export default connectList(ListComponent, listModel);
