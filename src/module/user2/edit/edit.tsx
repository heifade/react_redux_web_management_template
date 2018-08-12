import * as React from "react";
import { ComponentProps } from "../../../app/componentProps";
import { EditDialogBaseComponent, connectForm } from "../../base/edit/editDialogBase";
import { Form, Input, Icon, Select } from "antd";
import { model as listModel } from "../list/listModel";
import { model as editModel } from "./editModel";
import { listService } from "../list/listService";
import { FormComponentProps } from "antd/lib/form";
let styles = require("./edit.less");

class EditComponentProps extends FormComponentProps {

}

class EditComponent extends React.Component<EditComponentProps, any> {
  constructor(props: EditComponentProps, context: any) {
    super(props, context);
  }

  onSave = async (data: any) => {
    return await listService.saveUser(data);
  };

  onFetch = async () => {
    let condition = listModel.getState().condition;
    return await listService.getUserList(condition);
  };

  render() {
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;

    return (
      <EditDialogBaseComponent {...this.props} title={"用户信息编辑"} listModel={listModel} editModel={editModel} onSave={this.onSave} onFetch={this.onFetch}>
        <div className={styles.userEdit}>
          <Form layout="inline">
            <Form.Item>
              {getFieldDecorator("id", {
                rules: [{ required: true, message: "请输入编号" }]
              })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="编号" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入姓名" }]
              })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="姓名" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("sex", {
                rules: [{ required: true, message: "请输入性别" }]
              })(
                <Select style={{ width: 120 }}>
                  <Select.Option value="男">男</Select.Option>
                  <Select.Option value="女">女</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Form>
        </div>
      </EditDialogBaseComponent>
    );
  }
}

export default connectForm(EditComponent, editModel);
