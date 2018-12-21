import { UploadProfilePicturePath } from "../components/endpoint/user/endpoints/user-update-picture";

export default {
  token: {
    // 10 minutes
    expiresIn: 60 * 10
  },
  pathsToMulter: {
    avatar: UploadProfilePicturePath
  },
  publicPath: [
    { path: "/login", method: ["POST"] },
    { path: "/password/request", method: ["POST"] }
  ],
  httpsKey: "/etc/letsencrypt/live/epicall.interaxa.com/privkey.pem",
  httpsCert: "/etc/letsencrypt/live/epicall.interaxa.com/cert.pem"
};
