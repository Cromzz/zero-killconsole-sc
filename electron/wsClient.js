import WebSocket from 'ws';
import config_store from './storage.js';

let ws = null;
let status = false;
let roomCode = config_store.get('groupCode') || null;

const remoteEventCallbacks = new Set();

const DEFAULT_URL = process.env.GROUP_SERVER_URL || 'wss://killconsole-sc-group-production.up.railway.app';

function connect(url = DEFAULT_URL) {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;
  ws = new WebSocket(url);

  ws.on('open', () => {
    console.log('Connected to group server');
    status = true;
    const saved = config_store.get('groupCode');
    if (saved) {
      // attempt to re-join saved room, best-effort
      try { ws.send(JSON.stringify({ type: 'join', code: saved })); roomCode = saved; } catch (e) {}
    }
  });

  ws.on('message', (raw) => {
    try {
      const message = typeof raw === 'string' ? JSON.parse(raw) : JSON.parse(raw.toString());
      for (const cb of remoteEventCallbacks) {
        try { cb(message); } catch (e) { console.error('remoteEvent callback error', e); }
      }

      if (message.type === 'fresh-code') {
        roomCode = message.code;
        config_store.set('groupCode', roomCode);
        console.log('Group created with code:', roomCode);
      } else if (message.type === 'joined') {
        roomCode = message.code;
        config_store.set('groupCode', roomCode);
        console.log('Joined room:', roomCode);
      } else if (message.type === 'error') {
        console.error('Group server error:', message.message);
      }

    } catch (err) {
      console.error('Error processing message from group server:', err);
    }
  });

  ws.on('close', () => {
    status = false;
    console.log('Disconnected from group server');
  });

  ws.on('error', (err) => {
    status = false;
    console.error('WebSocket error:', err);
  });
}

function getCurrentGroupCode() {
  return config_store.get('groupCode') || null;
}

function generateNewCode(timeoutMs = 10000) {
  if (!ws) connect();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timed out waiting for fresh-code response')), timeoutMs);

    function handler(raw) {
      try {
        const data = typeof raw === 'string' ? JSON.parse(raw) : JSON.parse(raw.toString());
        if (data.type === 'fresh-code') {
          clearTimeout(timer);
          ws.removeListener('message', handler);
          config_store.set('groupCode', data.code);
          roomCode = data.code;
          return resolve(data.code);
        }
      } catch (e) {
        // ignore malformed
      }
    }

    ws.on('message', handler);
    try { ws.send(JSON.stringify({ type: 'create' })); } catch (err) { clearTimeout(timer); ws.removeListener('message', handler); return reject(err); }
  });
}

function joinRoom(code) {
  if (!code) return Promise.reject(new Error('Missing room code'));
  if (!ws) connect();
  try {
    ws.send(JSON.stringify({ type: 'join', code }));
    roomCode = code.toUpperCase();
    config_store.set('groupCode', roomCode);
    return Promise.resolve(roomCode);
  } catch (err) {
    return Promise.reject(err);
  }
}

function leaveRoom() {
  if (!ws || !roomCode) return;
  try { ws.send(JSON.stringify({ type: 'leave' })); } catch (e) {}
  roomCode = null;
  config_store.set('groupCode', null);
}

function getGroupServerStatus() {
  return !!status;
}

function toggleStatus(force) {
  if (typeof force === 'boolean') {
    if (force && !status) { connect(); return true; }
    if (!force && status) { try { ws.close(); } catch (e) {} status = false; return false; }
    return status;
  }
  if (status) { try { ws.close(); } catch (e) {} status = false; return false; }
  connect(); status = true; return true;
}

function sendRemoteGroupEvent(eventName, data) {
  if (!status) return false;
  if (!roomCode) return false;
  if (!ws || ws.readyState !== WebSocket.OPEN) return false;
  const payload = { type: 'kill', event: eventName, payload: data, code: roomCode };
  try { ws.send(JSON.stringify(payload)); return true; } catch (e) { console.error('Failed to send remote group event', e); return false; }
}

function onRemoteGroupEvent(callback) {
  if (typeof callback !== 'function') return () => {};
  remoteEventCallbacks.add(callback);
  return () => remoteEventCallbacks.delete(callback);
}

export {
  connect,
  getCurrentGroupCode,
  generateNewCode,
  getGroupServerStatus,
  toggleStatus,
  sendRemoteGroupEvent,
  onRemoteGroupEvent,
  joinRoom,
  leaveRoom,
};
