import { PROTOCOL, NODE_URL } from "./env";

export const pathToUploadFiles = () => {
  return `${process.cwd()}/../images`;
}

export const pathToUploadFilesPublic = () => {
  return `${process.cwd()}/dist/public/images`;
}

export const pathMulterTempFile = () => {
  switch(process.env.NODE_ENV) {
    case "production":
      return "/var/www/html/frontend/photos";
    case "test-prod":
      return "/var/www/html/frontend/photos";
    default: return `${process.cwd()}/tmp`;
  }
}

export const pathPublicImages = () => {
  return `${PROTOCOL()}${NODE_URL()}/public/images`;
}