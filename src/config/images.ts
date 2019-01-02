export const imagesFormatsAllowed = [
  "jpg"
];

export const pathToUpload = () => {
  switch(process.env.NODE_ENV) {
    case "production":
      return "/var/www/html/frontend/photos";
    case "test-prod":
      return "/var/www/html/frontend/photos";
    case "test":
      return `${process.cwd()}/tmp`;
    default: return `${process.cwd()}/dist/public`;
  }
}