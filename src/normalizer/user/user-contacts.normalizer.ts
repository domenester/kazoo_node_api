export const userContactsNormalized = (user: any) => ({
  username: user.username,
  first_name: user.first_name,
  last_name: user.last_name,
  id: user.id,
});
