export const deviceCreateNormalized = (userId: string, username: string) => ({
  data: {
    sip: {
      username: username,
      password: "123456"
    },
    name: username,
    media: {},
    owner_id: userId,
    device_type: 'softphone'
  }
});
