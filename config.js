// Session ID — votes live under this key in Table Storage.
// Change (or append a date) to start a fresh game with a clean slate.
export const SESSION_ID = "team-social";

// How often the client checks for updates (milliseconds).
// Host polls faster since it needs to see incoming votes.
export const POLL_INTERVAL_HOST = 1000;
export const POLL_INTERVAL_VOTER = 1500;
