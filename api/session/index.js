const { TableClient } = require("@azure/data-tables");

const TABLE_NAME = "villains";

module.exports = async function (context, req) {
  try {
    const sessionId = sanitize(req.query.s || "team-social");
    const conn = process.env.AzureWebJobsStorage;
    if (!conn) {
      context.res = { status: 500, body: { error: "AzureWebJobsStorage not configured" } };
      return;
    }

    const client = TableClient.fromConnectionString(conn, TABLE_NAME);
    try { await client.createTable(); } catch (_) { /* already exists */ }

    let state = { phase: "intro", roundIdx: 0, matchupIdx: 0 };
    const votes = {};
    const final = {};
    const voters = {};

    const filter = `PartitionKey eq '${sessionId}'`;
    for await (const entity of client.listEntities({ queryOptions: { filter } })) {
      const rk = entity.rowKey;
      const v = entity.value;
      if (rk === "state") {
        try { state = JSON.parse(v); } catch (_) {}
      } else if (rk.startsWith("vote:")) {
        const parts = rk.split(":");
        if (parts.length >= 3) {
          const matchupKey = parts[1];
          const voterId = parts.slice(2).join(":");
          if (!votes[matchupKey]) votes[matchupKey] = {};
          votes[matchupKey][voterId] = v;
        }
      } else if (rk.startsWith("final:")) {
        final[rk.substring(6)] = v;
      } else if (rk.startsWith("voter:")) {
        voters[rk.substring(6)] = parseInt(v) || Date.now();
      }
    }

    context.res = {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      },
      body: { state, votes, final, voters, ts: Date.now() }
    };
  } catch (err) {
    context.log.error("session error:", err);
    context.res = { status: 500, body: { error: String(err.message || err) } };
  }
};

function sanitize(s) {
  return String(s).replace(/[^a-zA-Z0-9_-]/g, "").substring(0, 64) || "default";
}
