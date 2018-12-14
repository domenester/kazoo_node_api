export const endpointResponseNormalizer = (
  data: any, message?: string
) => {
  if (typeof data !== "object" || ( data.length || data.length === 0)) {
    return data;
  } else {
    return { ...data, message }
  }
};
