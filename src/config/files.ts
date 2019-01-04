import { PROTOCOL, NODE_URL } from "./env";

export const pathToUploadFiles = () => {
  return `${process.cwd()}/../images`;
}

export const pathToUploadFilesPublic = () => {
  return `${process.cwd()}/dist/public/images`;
}

export const pathMulterTempFile = () => {
  return `${process.cwd()}/tmp`;
}

export const pathPublicImages = () => {
  return `${PROTOCOL()}${NODE_URL()}/public/images`;
}