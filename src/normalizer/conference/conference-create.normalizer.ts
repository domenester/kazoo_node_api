export const conferenceCreateNormalized = (
  id: string, endpoint: string
) => ({
  action: "dial",
  data: {
    data: {
        endpoints: [endpoint],
        caller_id_name: "Conferencia",
        caller_id_number: `Conferencia-${id}`,
        play_entry_tone: true,
        play_exit_tone: true
    }
  }
});
