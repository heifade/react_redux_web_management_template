import * as React from "react";
import { Avatar, Layout, Menu, Dropdown } from "antd";

const styles = require("./header.less");

interface HeaderComponentProps {
  onLogout: () => void;
}

export class HeaderComponent extends React.Component<HeaderComponentProps, any> {
  onMenuHandle = (e: any) => {
    switch (e.key) {
      case "logout":
        if (this.props.onLogout) {
          this.props.onLogout();
        }
        break;
    }
  };

  render() {
    let userDrop = (
      <Menu onClick={this.onMenuHandle}>
        <Menu.Item key="logout">注销登录</Menu.Item>
      </Menu>
    );

    return (
      <Layout.Header className={styles.appHeader}>
        <div className={styles.logo} />
        <div className={styles.user}>
          <Avatar size={38} icon="user" className={styles.avatar} />
          <div className={styles.split} />
          <Dropdown overlay={userDrop}>
            <div className={styles.userName}>用户名</div>
          </Dropdown>
        </div>
      </Layout.Header>
    );
  }
}
