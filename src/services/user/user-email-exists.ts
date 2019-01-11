import { UserByEmailService } from "./user-by-email";

export const UserEmailExists = async (email: string, token?: string): Promise<boolean> => {
  const userByEmail = await UserByEmailService(email).catch(err => err);
  if (userByEmail instanceof Error) { return Promise.reject(userByEmail); }
  return userByEmail.data.length > 0;
};
