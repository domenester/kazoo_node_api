import { UserNew as add } from "./user-new.service";
import { UserDeleteService as remove } from "./user-delete.service";
import { UserListService as list } from "./user-list.service";

export const UserService = {
  add,
  list,
  remove
};
