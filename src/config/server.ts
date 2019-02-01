import { UploadProfilePicturePath } from "../components/endpoint/user/endpoints/user-update-picture";
import { UploadFilePath } from "../components/endpoint/files/endpoints/files-upload";

export default {
  token: {
    // 6 * 10 = 10 minutes
    expiresIn: (origin: string) => {
      const env = process.env;
      switch(origin) {
        case env.FRONTEND_EPICALL_URL: return (((((60 * 10) * 6 ) * 24 ) * 7) );
        default: return 60 * 10;
      }
    }
  },
  pathsToMulter: {
    avatar: UploadProfilePicturePath,
    file: UploadFilePath
  },
  publicPath: [
    { path: "/login", method: ["POST"] },
    { path: "/password/request", method: ["POST"] }
  ],
  httpsKey: "/etc/letsencrypt/live/epicall.interaxa.com/privkey.pem",
  httpsCert: "/etc/letsencrypt/live/epicall.interaxa.com/cert.pem"
};
