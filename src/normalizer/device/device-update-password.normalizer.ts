export const deviceUpdatePasswordNormalized = (
  password: string
) => ({
  data: {
    sip: { password }
  }
});
