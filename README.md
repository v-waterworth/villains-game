# The Villains Among Us

A real-time team-social voting game. Hosted on Azure Static Web Apps.
Uses Azure Table Storage directly from the browser — **no Functions, no API, no backend code**.

## Files

- `index.html` — voter page (shared with team)
- `host.html` — host console (display on meeting screen)
- `config.js` — the ONE file you edit
- `storage.js` — talks to Table Storage
- `game-core.js` — villains, questions, icons
- `game.css` — styling

That's it. Six files. No `api/` folder. No `package.json`. No Node version drama.

---

## Setup (honestly 5 minutes)

### 1. Generate a SAS token for your storage account

1. Azure Portal → your storage account (e.g. `vgvillainsvw`)
2. Left sidebar → **Security + networking** → **Shared access signature**
3. Configure like this:
   - **Allowed services:** ☑ Table (uncheck the others)
   - **Allowed resource types:** ☑ Service ☑ Container ☑ Object (check all three)
   - **Allowed permissions:** ☑ Read ☑ Write ☑ Delete ☑ List ☑ Add ☑ Create ☑ Update
   - **Start:** now
   - **Expiry:** pick a date after your team social (a week out is plenty)
   - **Allowed protocols:** HTTPS only
   - Leave other fields default
4. Click **Generate SAS and connection string** at the bottom
5. **Copy the "SAS token" value** (NOT the full URL). It looks like: `sv=2022-11-02&ss=t&srt=sco&sp=rwdlacu&se=...&sig=...`
   - If it starts with `?`, strip that leading `?`.

### 2. Enable CORS on the storage account

The browser needs to be allowed to call Table Storage directly.

1. Same storage account → **Resource sharing (CORS)** in left sidebar
2. Click the **Table service** tab
3. Add a row:
   - **Allowed origins:** `*` (or specifically your SWA URL like `https://yellow-pond-0a3ae0210.7.azurestaticapps.net`)
   - **Allowed methods:** ☑ GET ☑ POST ☑ PUT ☑ DELETE ☑ OPTIONS ☑ MERGE
   - **Allowed headers:** `*`
   - **Exposed headers:** `*`
   - **Max age:** `3600`
4. Click **Save** at the top

### 3. Paste into `config.js`

Open `config.js` in the repo and set:

```js
export const STORAGE_ACCOUNT = "vgvillainsvw";  // your actual account name
export const SAS_TOKEN = "sv=2022-11-02&ss=t&srt=sco&..."; // the SAS string
```

Commit and push.

### 4. Clean up the old files

In your GitHub repo, delete these (they're leftovers from the Functions attempt):
- `api/` folder (and everything in it)
- `staticwebapp.config.json` (not needed anymore)
- Old `README.md` (replace with this one)

Also remove the `STORAGE_CONNECTION` env var from your Static Web App (Portal → Environment variables → delete the row). Not required anymore.

### 5. Done

Static Web App auto-deploys on push.

- Voter URL: `https://<your-swa>.azurestaticapps.net/`
- Host URL: `https://<your-swa>.azurestaticapps.net/host.html`

## How to run the game

1. Display `host.html` on the shared screen. QR code appears.
2. Team scans QR (or types the voter URL). Voter count ticks up.
3. Click **Begin the Games**.
4. Each matchup: team members tap a villain on their phones. Counts update on your screen within ~1 second.
5. Click **Lock In → Next Matchup** when ready.
6. Final round: all 7 villains, one vote each.
7. Click **Crown the Villain**.

The ⟲ reset button clears votes without disconnecting voters.

## Why this works when the Functions version didn't

The Functions version had too many moving parts:
- Extension bundle version compat
- Node runtime version
- Environment variable name restrictions
- Deploy race conditions
- Package.json engine pinning

This version has ONE failure point: the SAS token. If it's wrong, you see an error in the browser's DevTools Network tab immediately. No hidden server logs, no mysterious empty 500s.

## Troubleshooting

**"Not Configured" screen:** `config.js` still has placeholder values. Edit and push.

**"Error" status pill with red dot:** Open DevTools → Network tab. Click the failing request. Response tab shows exact error. Usually it's:
- CORS not enabled (go back to step 2)
- SAS token missing a permission (regenerate with all the checkboxes above)
- SAS expired (regenerate with a later expiry date)
- Typo in `STORAGE_ACCOUNT` name

**No voters connecting:** Same as above — errors on the voter page will show in their DevTools.

## Security notes

The SAS token you paste into `config.js` is visible in your repo. For a one-off team social, that's fine — the SAS expires, the storage account has nothing sensitive, and the URL is obscure. If you want tighter control, set the SAS expiry for just the day of the meeting.

After the meeting, you can either:
- Regenerate the SAS (old one stops working)
- Delete the storage account (zero cost)
- Delete the whole resource group
