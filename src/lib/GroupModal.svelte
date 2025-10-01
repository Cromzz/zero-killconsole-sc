<script>
// @ts-nocheck
import 'animate.css';
import { fly } from 'svelte/transition';
import Button from './Button.svelte';
import ButtonStatus from './ButtonStatus.svelte';
import { onMount } from 'svelte';

export let onclose = () => {};

let groupCode = '';
let groupServerStatus = false;
let groupServerStatusLabel = 'Verifying...';
let groupServerStatusStyle = 'text-yellow-500 font-bold';
let groupPasteState = 'paste';

// Terminal messages
let messages = [];
let terminalRef = null;

function pushMessage(text, level = 'info') {
  const now = new Date();
  const ts = now.toLocaleTimeString();
  messages = [...messages, { ts, text, level }].slice(-300);
  requestAnimationFrame(() => {
    if (terminalRef) terminalRef.scrollTop = terminalRef.scrollHeight;
  });
}

function handleGroupSettings() {
  onclose();
}

async function handleCopyGroupCode() {
  if (groupCode && groupCode.length === 8) {
    try {
      await navigator.clipboard.writeText(groupCode);
      groupPasteState = 'paste-check';
      setTimeout(() => (groupPasteState = 'paste'), 1000);
      pushMessage('Copied group code to clipboard');
    } catch (err) {
      console.error('Could not copy text: ', err);
      pushMessage('Failed to copy code: ' + (err?.message || err), 'error');
    }
  }
}

async function handleGenerateGroupCode() {
  try {
    pushMessage('Requesting new group code...');
    const code = await window.electronAPI.generateGroupCode();
    if (code) {
      pushMessage('Generated group code: ' + code);
      groupCode = code;
    } else {
      pushMessage('Failed to generate group code', 'error');
    }
  } catch (err) {
    console.error('Error generating group code', err);
    pushMessage('Error generating group code: ' + (err?.message || err), 'error');
  }
}

async function handleGroupCodeChange(event) {
  const target = event.target;
  groupCode = (target.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  if (groupCode.length === 8) {
    try {
      pushMessage('Attempting to join ' + groupCode + '...');
      const res = await window.electronAPI.setGroupCode(groupCode);
      if (res) pushMessage('Joined group ' + groupCode);
      else pushMessage('Invalid group code: ' + groupCode, 'error');
    } catch (err) {
      console.error('Join failed', err);
      pushMessage('Join failed: ' + (err?.message || err), 'error');
    }
  }
}

async function handleGroupStatusChange() {
  try {
    const newStatus = await window.electronAPI.toggleStatus();
    groupServerStatus = newStatus;
    updateGroupStatus(groupServerStatus);
    pushMessage('Group server ' + (groupServerStatus ? 'started' : 'stopped'));
  } catch (err) {
    console.error('Failed to toggle group status', err);
    pushMessage('Failed to toggle group status: ' + (err?.message || err), 'error');
  }
}

onMount(async () => {
  try {
    groupServerStatus = await window.electronAPI.getGroupServerStatus();
    updateGroupStatus(groupServerStatus);
  } catch (e) {
    console.warn('Could not read group server status', e);
  }
  try {
    const saved = await window.electronAPI.getGroupCode();
    if (saved) {
      groupCode = saved;
      pushMessage('Restored saved group code: ' + saved);
    }
  } catch (e) {
    console.warn('Could not read saved group code', e);
  }
  try {
    window.electronAPI.onRemoteGroupEvent((data) => {
      const text = data && data.type ? `${data.type.toUpperCase()} ${data.timestamp || ''} ${data.killerName || ''} -> ${data.victimName || ''}` : JSON.stringify(data);
      pushMessage('Remote: ' + text);
    });
  } catch (e) {
    console.warn('Could not register remote group listener', e);
  }
});

function updateGroupStatus(status) {
  if (status) {
    groupServerStatusStyle = 'text-green-500 font-bold';
    groupServerStatusLabel = 'Operational';
  } else {
    groupServerStatusStyle = 'text-red-500 font-bold';
    groupServerStatusLabel = 'Offline';
  }
}
</script>

<!-- Modal -->
<div id="groupModal" class="animate__animated animate__fadeIn bg-black/50 backdrop-blur backdrop-grayscale absolute z-50 inset-0 flex justify-center items-center shadow-lg">
  <div class="bg-zinc-900 p-4 rounded-sm max-w-3xl w-4/5 h-4/6 rounded-lg flex flex-col justify-between gap-4 relative ring-4 ring-zinc-800">

    <!-- Banner -->
    <div class="flex flex-col">
      <div class="w-full h-32 bg-cover bg-center rounded-sm absolute top-0 left-0 z-0 p-4" style="background-image: url('https://i.imgur.com/HPIJK1D.png')"></div>
    </div>

    <!-- Body -->
    <div class="h-full mt-[7rem] space-y-4">
      <div>
        <p class="text-white text-3xl">Groups</p>
        <div class="flex justify-between items-center">
          <p class="text-white text-md font-light">Create or join groups and get updates from your friends</p>
          <ButtonStatus
            onclick={handleGroupStatusChange}
            ActiveLabel="Running"
            InactiveLabel="Stopped"
            status={groupServerStatus}
            spinner={false}
            externalcheck={true}
            class="w-24"
          />
        </div>
      </div>

      <div class="flex justify-center items-center bg-zinc-800 shadow-inner p-2 rounded-sm relative h-20">
        <Button class="w-16 h-16 absolute left-2 rounded hover:bg-zinc-600" label="" icon={groupPasteState} onclick={handleCopyGroupCode} />
        <div class="flex gap-2 text-4xl uppercase font-mono tracking-[0.1em]">
          {#each [...groupCode.padEnd(8, ' ')] as char, i}
            <span class="slot w-10 h-12 flex items-center justify-center overflow-hidden transition-all duration-300">
              {#key char}
                <span in:fly={{ y: -30, duration: 1000, delay: i * 100 }} class="text-emerald-500 font-bold">{char}</span>
              {/key}
            </span>
          {/each}
        </div>
        <Button class="w-16 h-16 absolute right-2 rounded hover:bg-zinc-600" label="" icon="refresh" onclick={handleGenerateGroupCode} />
      </div>

      <div class="flex justify-around items-center">
        <p class="text-white text-xl">Group Status: <span class="text-green-500 font-bold">Operational</span></p>
        <p class="text-white text-xl">Server Status: <span class={groupServerStatusStyle}>{groupServerStatusLabel}</span></p>
      </div>

      <div class="space-y-2">
        <p class="text-white text-md font-light">Enter another group's code below to join an existing group.</p>
        <input
          type="text"
          maxlength="8"
          placeholder="Enter Group Code"
          class="w-full font-thin uppercase p-2 text-center text-2xl font-mono tracking-[0.2em] bg-zinc-800 text-white rounded-sm focus:outline-none focus:border focus:border-emerald-500"
          on:input={handleGroupCodeChange}
          bind:value={groupCode}
        />
      </div>

      <div class="mt-4 bg-zinc-900 rounded-sm p-2 flex flex-col">
        <div class="text-zinc-400 text-sm mb-2">Activity</div>
        <div bind:this={terminalRef} class="overflow-y-auto bg-black/20 p-2 rounded text-xs font-mono h-48">
          {#if messages.length === 0}
            <div class="text-zinc-500">No events yet</div>
          {:else}
            {#each messages as m}
              <div class="mb-1">
                <span class="text-zinc-500">[{m.ts}]</span>
                <span class="ml-2 {m.level === 'error' ? 'text-red-400' : 'text-zinc-200'}">{m.text}</span>
              </div>
            {/each}
          {/if}
        </div>
      </div>
      <Button  class="w-full h-16 text-xl" label="Close" icon="" onclick={handleGroupSettings}/>
    </div>

  </div>

</div>


