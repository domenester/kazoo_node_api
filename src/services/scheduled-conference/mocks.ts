import * as moment from "moment";

export const bodyCreate = {
  moderator: "moderatorId",
  date: moment().toISOString(),
  subject: "subject",
  body: "body",
  participants: [
    { participant: "participant1Id", email: "participant1@mock.mock"},
    { participant: "participant2Id", email: "participant2@mock.mock"}
  ]
}