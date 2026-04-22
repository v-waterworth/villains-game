// ═══════════════════════════════════════════════════════════════════════
//  CONFIG — fill in these two values after you get the SAS token.
//  See README.md for the 2-minute Portal walkthrough.
// ═══════════════════════════════════════════════════════════════════════

// Your storage account name (e.g. "vgvillainsvw") — no URL, no dots:
export const STORAGE_ACCOUNT = "vgvillainsvw";

// SAS token string — the part AFTER the "?" (starts with "sv=...")
export const SAS_TOKEN = "sv=2025-11-05&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-04-22T20:37:52Z&st=2026-04-22T12:22:52Z&spr=https&sig=fMTqZ9%2F%2BskoJjI62Qguv2uJxZX50A1LrzL7LHFZcoRU%3D";

// Leave these alone unless you know why you're changing them.
export const TABLE_NAME = "villains";
export const SESSION_ID = "teamsocial";
export const POLL_INTERVAL_HOST = 1000;
export const POLL_INTERVAL_VOTER = 1500;
