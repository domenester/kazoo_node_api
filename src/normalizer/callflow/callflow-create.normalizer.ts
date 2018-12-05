export const callflowCreateNormalized = (
  userId: string, username: string, extension: string
) => ({
  data: {
    numbers: [username, extension],
    flow: {
      module: "user",
      data: {
        id: userId
      }
    }
  }
});
