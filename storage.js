// ═══════════════════════════════════════════════════════════════════════
//  STORAGE CLIENT
//  Direct Azure Table Storage REST calls from the browser.
//  No SDK, no Functions, no build step.
// ═══════════════════════════════════════════════════════════════════════
import { STORAGE_ACCOUNT, SAS_TOKEN, TABLE_NAME, SESSION_ID } from './config.js';

const BASE = `https://${STORAGE_ACCOUNT}.table.core.windows.net`;

function headers() {
  return {
    'Accept': 'application/json;odata=nometadata',
    'Content-Type': 'application/json',
    'DataServiceVersion': '3.0;NetFx',
    'MaxDataServiceVersion': '3.0;NetFx',
  };
}

// Create the table if it doesn't already exist. Safe to call many times.
export async function ensureTable() {
  try {
    await fetch(`${BASE}/Tables?${SAS_TOKEN}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ TableName: TABLE_NAME }),
    });
  } catch (_) { /* probably exists */ }
}

// Upsert one row. `rowKey` is unique within the session. `value` can be any JSON-serializable thing.
export async function upsert(rowKey, value) {
  const url = `${BASE}/${TABLE_NAME}(PartitionKey='${encodeURIComponent(SESSION_ID)}',RowKey='${encodeURIComponent(rowKey)}')?${SAS_TOKEN}`;
  const body = {
    PartitionKey: SESSION_ID,
    RowKey: rowKey,
    Value: typeof value === 'string' ? value : JSON.stringify(value),
  };
  const res = await fetch(url, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`upsert ${rowKey}: ${res.status} ${await res.text()}`);
  }
}

// Delete one row. Silent on 404.
export async function remove(rowKey) {
  const url = `${BASE}/${TABLE_NAME}(PartitionKey='${encodeURIComponent(SESSION_ID)}',RowKey='${encodeURIComponent(rowKey)}')?${SAS_TOKEN}`;
  await fetch(url, {
    method: 'DELETE',
    headers: { ...headers(), 'If-Match': '*' },
  });
}

// Fetch all rows for this session. Returns an array of { RowKey, Value }.
export async function list() {
  const filter = encodeURIComponent(`PartitionKey eq '${SESSION_ID}'`);
  let url = `${BASE}/${TABLE_NAME}()?${SAS_TOKEN}&$filter=${filter}&$select=RowKey,Value`;
  const out = [];
  // Loop through continuation tokens in case there are many rows
  for (let i = 0; i < 20; i++) {
    const res = await fetch(url, { headers: headers() });
    if (!res.ok) {
      throw new Error(`list: ${res.status} ${await res.text()}`);
    }
    const json = await res.json();
    if (json.value) out.push(...json.value);
    const nextPk = res.headers.get('x-ms-continuation-NextPartitionKey');
    const nextRk = res.headers.get('x-ms-continuation-NextRowKey');
    if (!nextPk && !nextRk) break;
    const params = new URLSearchParams();
    if (nextPk) params.set('NextPartitionKey', nextPk);
    if (nextRk) params.set('NextRowKey', nextRk);
    url = `${BASE}/${TABLE_NAME}()?${SAS_TOKEN}&$filter=${filter}&$select=RowKey,Value&${params.toString()}`;
  }
  return out;
}

// Transform raw table rows into the shape the game UI expects.
export function groupRows(rows) {
  let state = { phase: 'intro', roundIdx: 0, matchupIdx: 0 };
  const votes = {};
  const final = {};
  const voters = {};
  for (const row of rows) {
    const rk = row.RowKey;
    const v = row.Value;
    if (rk === 'state') {
      try { state = JSON.parse(v); } catch (_) {}
    } else if (rk.startsWith('vote:')) {
      const parts = rk.split(':');
      if (parts.length >= 3) {
        const matchupKey = parts[1];
        const voterId = parts.slice(2).join(':');
        if (!votes[matchupKey]) votes[matchupKey] = {};
        votes[matchupKey][voterId] = v;
      }
    } else if (rk.startsWith('final:')) {
      final[rk.substring(6)] = v;
    } else if (rk.startsWith('voter:')) {
      voters[rk.substring(6)] = parseInt(v) || Date.now();
    }
  }
  return { state, votes, final, voters };
}
