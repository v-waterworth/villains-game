# The Villains Among Us — Azure-Native Edition

A real-time voting game for team socials. Runs entirely on Azure: Static Web Apps hosts the front-end and automatically deploys the API as Azure Functions; Table Storage holds the votes.

No Firebase, no third-party services for data sync. One Storage Account and one app-setting value is all you add on top of your existing Static Web App.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Azure Static Web App (Free tier)                           │
│                                                             │
│  ┌─────────────┐         ┌──────────────────────────────┐   │
│  │ Static HTML │         │ Managed Azure Functions      │   │
│  │ index.html  │────────▶│ GET  /api/session            │   │
│  │ host.html   │         │ POST /api/action             │   │
│  └─────────────┘         └──────────────────────────────┘   │
│         │ polls every 1-2s          │                        │
└─────────┼──────────────────────────┼───────────────────────┘
          │                          │
          │                          ▼
          │          ┌─────────────────────────────────┐
          │          │ Azure Storage Account           │
          │          │ └─ Table: villains              │
          │          │    └─ PartitionKey: sessionId   │
          └─────────▶│       RowKeys:                  │
                     │       • state                   │
                     │       • vote:r0m0:voterId       │
                     │       • final:voterId           │
                     │       • voter:voterId           │
                     └─────────────────────────────────┘
```

- **Hosting**: Your existing Static Web App (GitHub auto-deploys on commit)
- **API**: `/api` folder deploys as Azure Functions automatically (no separate resource)
- **State**: Azure Table Storage (one table, one partition per game session)
- **Sync**: Client polls `/api/session` every 1–2 seconds

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Voter page — URL you share with the team |
| `host.html` | Host console — displayed on the meeting screen |
| `config.js` | Session ID + polling intervals |
| `game-core.js` | Villains, questions, icons, helpers (edit to customize) |
| `game.css` | Styling |
| `staticwebapp.config.json` | SWA routing + cache headers |
| `api/host.json` | Functions runtime config |
| `api/package.json` | API dependencies (`@azure/data-tables`) |
| `api/session/` | GET endpoint — returns current game state |
| `api/action/` | POST endpoint — handles all writes |

---

## Setup (about 5 minutes in the Portal)

### 1. Create a Storage Account

1. Azure Portal → **Create a resource** → **Storage account** → **Create**
2. Same subscription + resource group as your Static Web App (`rg-vg`)
3. Name: anything globally unique (e.g., `vgvillains<yourinitials>`)
4. Region: same as your SWA (`Central US` based on your earlier screenshot)
5. Performance: **Standard**. Redundancy: **LRS** (cheapest; fine for this).
6. Leave everything else at defaults → **Review + Create** → **Create**

This should cost less than $0.10/month at the volume a team social uses.

### 2. Copy the connection string

1. Open the storage account → **Security + networking** → **Access keys**
2. Click **Show** next to `key1` → copy the **Connection string**

### 3. Add the connection string to your Static Web App

1. Open your Static Web App resource (`villains-game`)
2. Left sidebar → **Configuration** → **Application settings** tab
3. Click **+ Add**:
   - **Name**: `AzureWebJobsStorage`
   - **Value**: paste the connection string
4. Click **OK** → **Save** at the top

This tells the managed Azure Functions runtime where to talk to Table Storage. The table itself (`villains`) gets created automatically on first use — you don't need to pre-create it.

### 4. Push the code

Drop all files from this repo into the root of `v-waterworth/villains-game`, commit, push. The GitHub Action Azure set up for you will:
- Deploy static files to the CDN
- Install `@azure/data-tables` and deploy the Functions under `/api`

First deploy takes ~2–3 minutes (npm install on the Functions side). Subsequent deploys are faster.

### 5. Your URLs

- **Voter page (share this):** `https://<your-site>.azurestaticapps.net/`
- **Host console:** `https://<your-site>.azurestaticapps.net/host.html`

---

## Running the game

1. Open `host.html` on the presenting screen. A QR code + voter URL appears.
2. Team scans the QR (or types the URL on their phones). Voter count ticks up as they connect.
3. Click **Begin the Games**.
4. For each matchup, team members tap a villain. Counts update on your screen within ~1 second.
5. Click **Lock In → Next Matchup** when ready.
6. At the end, the **Final Verdict** lets everyone pick from all 7 villains.
7. Click **Crown the Villain** to reveal the winner.

The **⟲ reset game** link (top-right) wipes all votes and returns to the intro. Voters stay connected — their pages auto-refresh to the new state.

---

## Customizing

- **Villains, questions, rounds:** edit `game-core.js` — the `VILLAINS` object and `ROUNDS` array at the top
- **Theme colors:** edit `game.css` — CSS variables at the top (`--gold`, `--blood`, `--red-bright`)
- **Fresh game each meeting:** change `SESSION_ID` in `config.js` — each unique value is an isolated slice of data in the table

---

## Cost estimate

For a 30-minute team social with 30 voters:
- **Storage Account (Table):** ~500 entities × ~100 bytes = trivial. Well under $0.01.
- **Static Web Apps (Free tier):** free.
- **Managed Azure Functions (Free tier on SWA):** ~30,000 requests during the game; free tier includes 500,000/month.

After the meeting, if you want to clean up: delete the Storage Account. The game stops working, but there's no recurring cost.

---

## Troubleshooting

**"AzureWebJobsStorage not configured" in the Functions logs:** The app setting isn't in your SWA. Re-check step 3.

**Connection string looks right but the API returns 500:** Make sure the storage account is in the same subscription as the Static Web App and has public network access enabled (Storage Account → Networking → Public network access: "Enabled from all networks" for this use case).

**First request after a quiet period takes several seconds:** Normal cold-start on the Free Functions runtime. Subsequent requests are fast.

**Voter count never goes up:** The POST `register` action is failing. Open DevTools in the voter browser, look at the Network tab for `/api/action` — the response body will say what's wrong.

**Game state seems stuck:** Click **⟲ reset game** in the top-right of the host page.

**QR code doesn't render:** It's fetched from `api.qrserver.com`. If your corp network blocks it, the voter URL text still works — they can type it or you can click to copy.

---

## Security notes

The API endpoints have `authLevel: anonymous` — anyone with your Static Web App URL can read the state and submit votes. For a one-off team social on an obscure URL, this is fine. If you want tighter control:

- Use SWA's built-in auth (`staticwebapp.config.json` can require auth on `/api/*`), then restrict to users in your AAD tenant
- Or add a simple shared-secret header check in the Functions

For a 30-minute meeting, the open endpoints are typically fine.

---

## What if I want to clean up after the meeting?

Three options:

1. **Keep everything as-is.** Zero cost when idle.
2. **Delete just the storage account.** Static Web App stays (it's free), the game stops working but returns instantly if you recreate the storage.
3. **Delete the resource group.** Removes everything including the Static Web App.
