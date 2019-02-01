import { userIdDefault } from "../../mocks";
import { NODE_URL, PROTOCOL } from "../../config/env";

export default () => {
  const url = `${PROTOCOL()}${NODE_URL()}`;

  return [
    {
      id: "audio1",
      participants: [
        {
          id: userIdDefault,
          name: "Daniel"
        }
      ],
      type: "audio",
      duration: "00:05:13",
      ext: "123",
      // Fri Sep 28 2018 23:06:39 GMT-0300 (Brasilia Standard Time)
      // 2018-09-29T02:06:39.518Z
      date: new Date(1538186799518),
      url: `${url}/public/audios/sample.mp3`
    },
    {
      id: "video1",
      participants: [
        {
          id: userIdDefault,
          name: "Daniel"
        }
      ],
      type: "video",
      duration: "00:05:13",
      ext: "123",
      // Fri Sep 28 2018 23:06:39 GMT-0300 (Brasilia Standard Time)
      // 2018-09-29T02:06:39.518Z
      date: new Date(1538186799518),
      url: `${url}/public/audios/sample.mp4`
    }
  ];
};
