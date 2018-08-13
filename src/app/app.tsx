import * as React from "react";
import { Provider } from "react-redux";
import { Layout, LocaleProvider, Icon } from "antd";
import { Route, Router, Switch } from "react-router-dom";
import { store } from "./store";
import { MenuProps, MenuComponent } from "./menu";
import { BreadcrumbComponent } from "./breadcrumb";
import createHistory from "history/createHashHistory";
import { menuList, routeList } from "./route";
import * as zhCN from "antd/lib/locale-provider/zh_CN";
import * as moment from "moment";
import "moment/locale/zh-cn";
import { HeaderComponent } from "./header/header";

moment.locale("zh-cn");

const history = createHistory();
const styles = require("./app.less");

let { Sider, Content } = Layout;

function getLocation() {
  return location.hash.replace(/^#/, "") || "/index";
}

class MainComponent extends React.Component<MenuProps, any> {
  constructor(props: MenuProps, context: any) {
    super(props, context);

    this.state = {
      collapsed: false
    };
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    let path = getLocation();
    let { collapsed } = this.state;
    return (
      <LocaleProvider locale={zhCN}>
        <Layout className={styles.app}>
          <HeaderComponent />
          <Layout className={styles.appBody}>
            <Sider className={styles.menuSider} collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className={styles.menu}>
                <Icon className={styles.btnMenuCollapse} type={collapsed ? "menu-unfold" : "menu-fold"} title={collapsed ? "展开菜单" : "最小化菜单"} onClick={this.onCollapse} />
                <MenuComponent {...this.props} path={path} />
              </div>
            </Sider>
            <Layout className={styles.contentSider} style={{ padding: "10px" }}>
              <BreadcrumbComponent {...this.props} path={path} />
              <Content>
                <Switch>
                  {routeList.map((m, i) => (
                    <Route key={i} path={m.path} component={m.component} />
                  ))}
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }
}

export class Props {}
export class AppComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      path: getLocation(),
      menuList
    };
  }

  onMenuClick = (value: any) => {
    this.setState({
      path: value.key
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MainComponent menuList={this.state.menuList} path={this.state.path} onMenuClick={this.onMenuClick} />
        </Router>
      </Provider>
    );
  }
}
