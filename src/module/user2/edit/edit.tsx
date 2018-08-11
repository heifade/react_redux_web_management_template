import * as React from "react";
import { ComponentProps } from "../../../app/componentProps";
import { EditBaseComponent, connectForm, ModalWdith } from "../../base/edit/editBase";
import { Form, Input, Icon, Select } from "antd";
import { model as listModel } from "../list/listModel";
import { model as editModel } from "./editModel";
import { listService } from "../list/listService";
let styles = require("./edit.less");

class EditComponent extends EditBaseComponent {
  constructor(props: ComponentProps, context: any) {
    super(props, context);
    this.listModel = listModel;
    this.editModel = editModel;
  }

  async onSave(data: any) {
    return await listService.saveUser(data);
  }

  async onFetch() {
    return await listService.getUserList();
  }

  render() {
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;

    return this.getJsx(
      {
        title: "用户信息编辑"
      },
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
              <Select defaultValue="男" style={{ width: 120 }}>
                <Select.Option value="男">男</Select.Option>
                <Select.Option value="女">女</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connectForm(EditComponent, editModel);
