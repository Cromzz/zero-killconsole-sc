import { getFriendlyName } from './keyword.js';

function splitEntriesByTimestamp(logChunk) {
  const entryRegex = /<\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z>/g;
  const matches = [...logChunk.matchAll(entryRegex)];

  const entries = [];

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : logChunk.length;
    const entry = logChunk.slice(start, end).trim();

    entries.push(entry);
  }

  return entries;
}

function parseKillEntry(entry) {
  const timestampMatch = entry.match(/<([^>]+)>/);
  const regex = /'(.+?)' \[(\d+)\].+?killed by '(.+?)' \[(\d+)\] using '(.+?)'.+?with damage type '(.+?)'/;

  const match = entry.match(regex);

  if (match && timestampMatch) {
    const weaponRaw = match[5];
    return {
      timestamp: timestampMatch[1],
      victimName: getFriendlyName(match[1].replace(/_\d+$/, "")),
      victimId: match[2],
      killerName: getFriendlyName(match[3].replace(/_\d+$/, "")),
      killerId: match[4],
      weapon: weaponRaw,
      weaponName: getFriendlyName(weaponRaw.replace(/_\d+$/, "")),
      damageType: match[6],
      raw: entry,
      type: 'kill'
    };
  }

  return null;
}

function parseIncapEntry(entry) {
  const timestampMatch = entry.match(/<([^>]+)>/);
  const regex = /Player\s+'([^']+)'/;

  const match = entry.match(regex);

  if (match && timestampMatch) {

    return {
      timestamp: timestampMatch[1],
      victimName: match[1],
      raw: entry,
      type: 'incap'
    };
  }

  return null;
}

// Export functions
export { 
  splitEntriesByTimestamp,
  parseKillEntry,
  parseIncapEntry 
};


//<Spawn Flow> CSCPlayerPUSpawningComponent::UnregisterFromExternalSystems
//<2025-07-06T14:30:45.884Z> [Notice] <Spawn Flow> CSCPlayerPUSpawningComponent::UnregisterFromExternalSystems: Player 'Der_Hetzer' [202035189859] lost reservation for spawnpoint bed_hospital_2_a-005 [4755889827285] at location 3515131989 [Team_ActorFeatures][Gamerules]
