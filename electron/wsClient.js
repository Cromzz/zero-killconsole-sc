import WebSocket from 'ws';
import config_store from './storage.js'

let ws;
let status = false;
let roomCode = config_store.get('groupCode');

// Connect to the WebSocket server
function connect() {
  //ws = new WebSocket('ws://localhost:3000');
  ws = new WebSocket('wss://killconsole-sc-group-production.up.railway.app');

  ws.on('open', () => {
    console.log('Connected to server');
    status = true;
  });

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'create') {
        roomCode = message.code;
        config_store.set('groupCode', roomCode); //setting new code to storage for later collection
        console.log(`\n✅ Group created with code: ${roomCode}`);
      } 
      else if (message.type === 'joined') {
        console.log(`\n✅ Successfully joined room: ${message.code}`);
      }
      else if (message.type === 'error') {
        console.error(`\n❌ Error: ${message.message}`);
      }
      else if (message.type === 'kill') {
        console.log(`\n🔫 Kill command received from another client!`);
      }
    
    } catch (err) {
      console.error('Error processing message:', err);
    }
  });

  ws.on('close', () => {
    status = false;
    console.log('\nDisconnected from group server');
  });

  ws.on('error', (error) => {
    status = false;
    console.error('WebSocket error:', error);
  });
}

function getCurrentGroupCode() {
  if (status && roomCode) {
    console.log("group code queried found", config_store.get('groupCode'));
    return config_store.get('groupCode');
  }
}

async function generateNewCode() {
  const timeoutMs = 10000;
  
  if (!status) {
    connect();
  }

  console.log("requesting new code from service");
  ws.send(JSON.stringify({ type: "create" }));

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Timed out waiting for fresh-code response"));
    }, timeoutMs);

    ws.addEventListener("message", function handler(event) {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "fresh-code") {
          clearTimeout(timer);
          ws.removeEventListener("message", handler);

          const roomCode = data.code;
          config_store.set("groupCode", roomCode);
          
          resolve(roomCode);
        }
      } catch (err) {
        // ignore malformed messages, don’t reject the whole promise
        console.error("Error parsing ws message", err);
      }
    });
  });
}


function getGroupServerStatus() {

  return status; //just return the current group server status TODO: make this return the number of people in the group
}

function toggleStatus(force)
{
  if (force) {
    console.log("forced group server status to", force);
    status = force;
  }

  if (status) {
    ws.close();
    status = false;
  }
  else {
    connect();
    status = true;
  }

  return status
}

function sendRemoteGroupEvent(event, data) {
  if (status && roomCode) {
    ws.send(JSON.stringify({ type: "event", event, data, code: roomCode }));
    console.log("sent remote event", event, data);
  }
}

function onRemoteGroupEvent(callback) {
  if (!status) {
    console.error("Cannot listen for remote events when not connected to group server");
    return;
  }
}

export {
  connect,
  getCurrentGroupCode,
  generateNewCode,
  getGroupServerStatus,
  toggleStatus,
  sendRemoteGroupEvent,
  onRemoteGroupEvent
}