
import * as React from "react";
import UserList from "./userList/userListCtrl";
import UserEdit from "./userEdit/userEdit";

export function UserManage() {
  return (
    <div>
      <UserList />
      <UserEdit />
    </div>
  );
};