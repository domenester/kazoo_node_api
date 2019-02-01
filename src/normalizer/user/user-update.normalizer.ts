import { IUserUpdate } from "../../interfaces";

export const userUpdateNormalized = (user: IUserUpdate) => {
  let userToUpdate = { data: {} } as any;
  if (user.name) { userToUpdate.data.first_name = user.name; }
  // Can't update username field because it's used as a Foregin Key
  // if (user.racf) { userToUpdate.data.username = user.racf; }
  if (user.email) { userToUpdate.data.email = user.email; }
  if (user.department) { userToUpdate.data.last_name = user.department; }
  if (user.devices) { userToUpdate.data.devices = user.devices; }
  if (user.callflow) { userToUpdate.data.callflow = user.callflow; }
  if (user.contactList) { userToUpdate.data.contact_list = user.contactList; }
  return userToUpdate;
};
