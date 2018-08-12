import * as React from "react";
import { Cascader } from "antd";
let styles = require("./select.less");

interface SelectProps {
  options: Array<{
    text: string;
    value: string;
  }>;

  value: string;
  placeholder: string;
}

export class Select extends React.Component<SelectProps, any> {
  onChange(value: any) {
    if (this.props.onChange) {
      this.props.onChange(value[0]);
    }
  }

  render() {
    let options = this.props.options.map((item: any, index: number) => {
      return {
        label: item.text,
        value: item.value
      };
    });

    let value = [this.props.value];

    let { placeholder } = this.props;

    return <Cascader options={options} onChange={this.onChange.bind(this)} value={value} placeholder={placeholder} allowClear={false} popupClassName={styles.popup} />;
  }
}
