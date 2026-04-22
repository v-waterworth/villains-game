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
## How to run the game

1. Display `host.html` on the shared screen. QR code appears.
2. Team scans QR (or types the voter URL). Voter count ticks up.
3. Click **Begin the Games**.
4. Each matchup: team members tap a villain on their phones. Counts update on your screen within ~1 second.
5. Click **Lock In → Next Matchup** when ready.
6. Final round: all 7 villains, one vote each.
7. Click **Crown the Villain**.

The ⟲ reset button clears votes without disconnecting voters.

This version has ONE failure point: the SAS token. If it's wrong, you see an error in the browser's DevTools Network tab immediately. No hidden server logs, no mysterious empty 500s.


