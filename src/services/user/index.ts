import { UserNew as add } from "./user-new.service";
import { UserDeleteService as remove } from "./user-delete.service";
import { UserListService as list } from "./user-list.service";
import { UserByEmailService as getByEmail } from "./user-by-email";
import { UserUpdatePasswordService as updatePassword } from "./user-update-password.service";
import { UserUpdateService as update } from "./user-update.service";
import { UserByDepartmentService as getByDepartment } from "./user-by-department";
import { UserByUsernameService as getByUsername } from "./user-by-username";

export const UserService = {
  add,
  update,
  list,
  remove,
  updatePassword,
  getByEmail,
  getByDepartment,
  getByUsername
};
