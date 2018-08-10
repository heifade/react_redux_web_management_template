
import * as React from "react";
import UserList from "./userList/userList";
import UserEdit from "./userEdit/userEdit";

export function UserManage() {
  return (
    <div>
      <UserList />
      <UserEdit />
    </div>
  );
};