export const imagesFormatsAllowed = [
  "jpg"
];

export const pathToUpload = () => {
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test-prod") {
    return "/var/www/html/frontend/photos";
  } else {
    return `${process.cwd()}/dist/public`
  }
}