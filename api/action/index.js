const { TableClient } = require("@azure/data-tables");

const TABLE_NAME = "villains";

module.exports = async function (context, req) {
  try {
    const body = req.body || {};
    const sessionId = sanitize(body.s || "team-social");
    const action = String(body.action || "");

    const conn = process.env.AzureWebJobsStorage;
    if (!conn) {
      context.res = { status: 500, body: { error: "AzureWebJobsStorage not configured" } };
      return;
    }

    const client = TableClient.fromConnectionString(conn, TABLE_NAME);
    try { await client.createTable(); } catch (_) { /* already exists */ }

    const upsert = (rowKey, value) => client.upsertEntity({
      partitionKey: sessionId,
      rowKey,
      value: typeof value === "string" ? value : JSON.stringify(value),
    }, "Replace");

    switch (action) {
      case "register": {
        const voterId = sanitize(body.voterId);
        if (!voterId) throw new Error("voterId required");
        await upsert(`voter:${voterId}`, String(Date.now()));
        break;
      }
      case "vote": {
        const voterId = sanitize(body.voterId);
        const matchupKey = sanitize(body.matchupKey);
        const villainId = sanitize(body.villainId);
        if (!voterId || !matchupKey || !villainId) throw new Error("missing fields");
        await upsert(`vote:${matchupKey}:${voterId}`, villainId);
        break;
      }
      case "finalVote": {
        const voterId = sanitize(body.voterId);
        const villainId = sanitize(body.villainId);
        if (!voterId || !villainId) throw new Error("missing fields");
        await upsert(`final:${voterId}`, villainId);
        break;
      }
      case "setState": {
        const state = body.state;
        if (!state || typeof state !== "object") throw new Error("state required");
        await upsert("state", state);
        break;
      }
      case "reset": {
        // Delete only game data; preserve registered voters so they stay connected
        const filter = `PartitionKey eq '${sessionId}'`;
        const toDelete = [];
        for await (const entity of client.listEntities({ queryOptions: { filter } })) {
          const rk = entity.rowKey;
          if (rk === "state" || rk.startsWith("vote:") || rk.startsWith("final:")) {
            toDelete.push(entity);
          }
        }
        for (const e of toDelete) {
          try { await client.deleteEntity(e.partitionKey, e.rowKey); } catch (_) {}
        }
        break;
      }
      default:
        throw new Error(`unknown action: ${action}`);
    }

    context.res = { body: { ok: true } };
  } catch (err) {
    context.log.error("action error:", err);
    context.res = { status: 400, body: { error: String(err.message || err) } };
  }
};

function sanitize(s) {
  return String(s || "").replace(/[^a-zA-Z0-9_-]/g, "").substring(0, 64);
}
