import { MenuModule } from "./modules";
import { Index } from "../module/index/index";
import userList from "../module/userManage/userList/userList"
import user2List from "../module/user2/list/list"

export let menuList: Array<MenuModule> = [
  { title: "主页", path: "/index", img: "home" },
  { title: "系统设置", path: "/system", img: "setting" },
  { title: "用户管理", path: "/system/user", img: "user" },
  { title: "用户管理2", path: "/system/user2", img: "user" },
  { title: "角色管理", path: "/system/role", img: "solution" }
];

export let routeList: Array<{ path: string; component: any }> = [
  { path: "/index", component: Index }, 
  { path: "/system/user", component: userList },
  { path: "/system/user2", component: user2List}
];
