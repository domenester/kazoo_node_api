
export const NODE_HOST = () => {
  switch(process.env.NODE_ENV) {
    case "production":
      return process.env.NODE_HOST;
    case "test-prod":
      return process.env.NODE_HOST;
    default:
      return process.env.NODE_HOST_LOCAL;
  }
};

export const NODE_URL = () => {
  switch(process.env.NODE_ENV) {
    case "production":
      return process.env.NODE_URL;
    case "test-prod":
      return process.env.NODE_URL_TEST;
    default:
      return process.env.NODE_URL_LOCAL;
  }
};

export const PROTOCOL = () => {
  switch(process.env.NODE_ENV) {
    case "production":
      return "https://";
    case "test-prod":
      return "https://";
    default:
      return "http://";
  }
};

export const NODE_PORT = () => {
  switch(process.env.NODE_ENV) {
    case "production":
      return +process.env.NODE_PORT;
    case "test-prod":
      return +process.env.NODE_PORT_TEST;
    default:
      return +process.env.NODE_PORT;
  }
}

export const FRONTEND_BACKOFFICE_URL = () => {
  switch(process.env.NODE_ENV) {
    case "production":
      return process.env.FRONTEND_BACKOFFICE_URL;
    case "test-prod":
      return process.env.FRONTEND_BACKOFFICE_URL;
    default:
      return process.env.FRONTEND_BACKOFFICE_URL_LOCAL;
  }
}