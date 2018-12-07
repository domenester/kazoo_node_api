export const usersWithExtension = (users: Array<any>, callflows: Array<any>) => {
  return users.map( user => {
    for (var i = 0; i < callflows.length; i++) {
      if (callflows[i]["numbers"].indexOf(user.username) > -1) {
        user["extension"] = callflows[i]["numbers"][1];
        break;
      }
    }
    return user;
  });
}