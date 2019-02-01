export const usersWithExtension = (users: Array<any>, callflows: Array<any>) => {
  let callflowsToHandle = [ ...callflows ];
  return users.map( user => {
    for (let i = 0; i < callflowsToHandle.length; i++) {
      if (callflowsToHandle[i]["numbers"][0] === user.username) {
        user["extension"] = callflowsToHandle[i]["numbers"][1];
        callflowsToHandle.splice(i, 1);
        break;
      }
    }
    return user;
  });
}