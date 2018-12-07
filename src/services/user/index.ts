import { UserNew as add } from "./user-new.service";
import { UserDeleteService as remove } from "./user-delete.service";
import { UserListService as list } from "./user-list.service";
import { UserUpdatePasswordService as updatePassword } from "./user-update-password.service";

export const UserService = {
  add,
  list,
  remove,
  updatePassword
};
