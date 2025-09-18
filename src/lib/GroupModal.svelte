
<script lang="ts">
// @ts-nocheck
    import { fly } from "svelte/transition";
    import Button from './Button.svelte';
    import ButtonStatus from './ButtonStatus.svelte';
    import { onMount } from 'svelte';
  
    const { onclose } = $props<{ onclose: () => void }>();
  
    let groupCode = $state("");
    let groupServerStatus = $state(false);
    let groupServerStatusLabel = $state('Verifying...');
    let groupServerStatusStyle = $state('text-yellow-500 font-bold');
    let groupPasteState = $state('paste');
  
    function handleGroupSettings() {
      onclose();
    }
  
    function handleCopyGroupCode() { 
      if (groupCode && groupCode.length === 8) {
        navigator.clipboard.writeText(groupCode).then(() => {
          groupPasteState = "paste-check";
          setTimeout(() => {
            groupPasteState = "paste"; //reset icon after 1 second
          }, 1000);
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
      }
    }

    async function handleGenerateGroupCode() {
      console.log('Generating group code...');
      const code = await window.electronAPI.generateGroupCode();
      console.log('Generated group code:', code);
      groupCode = code;
    }
  
    function handleGroupCodeChange(event: Event) {
      const target = event.target as HTMLInputElement;
      groupCode = target.value.toUpperCase();
      if (groupCode.length === 8) {
        window.electronAPI.setGroupCode(groupCode);
      }
    }
  
    async function handleGroupStatusChange() {
      groupServerStatus = await window.electronAPI.toggleStatus();
    }
  
    onMount(async () => {
      groupServerStatus = await window.electronAPI.getGroupServerStatus();
      updateGroupStatus(groupServerStatus);
  
      groupCode = await window.electronAPI.getGroupCode();
    });
  
    function updateGroupStatus(status: boolean) {
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
  <div
    id="updateModal"
    class="animate__animated animate__fadeIn bg-black/50 backdrop-blur backdrop-grayscale absolute z-50 inset-0 flex justify-center items-center shadow-lg"
  >
    <div class="bg-zinc-900 p-4 rounded-sm max-w-3xl w-4/5 h-4/6 rounded-lg flex flex-col justify-between gap-4 relative ring-4 ring-zinc-800"
    >
      <!-- Banner -->
      <div class="flex flex-col">
        <div
          class="w-full h-32 bg-cover bg-center rounded-sm absolute top-0 left-0 z-0 p-4"
          style="background-image: url('https://i.imgur.com/HPIJK1D.png')"
        ></div>
      </div>
  
      <!-- Body -->
      <div class="h-full mt-[7rem] space-y-4">
        <div>
          <p class="text-white text-3xl">Groups</p>
          <div class="flex justify-between items-center">
            <p class="text-white text-md font-light">
              Create or join groups and get updates from your friends
            </p>
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
          <Button
            class="w-16 h-16 absolute left-2 rounded hover:bg-zinc-600"
            label=""
            icon={groupPasteState}
            onclick={handleCopyGroupCode}
          />
          <div class="flex gap-2 text-4xl uppercase font-mono tracking-[0.1em]">
            {#each [...groupCode.padEnd(8, " ")] as char, i}
              <span class="slot w-10 h-12 flex items-center justify-center overflow-hidden transition-all duration-300">
                {#key char}
                  <span in:fly={{ y: -30, duration: 1000, delay: i * 100 }}
                    class="text-emerald-500 font-bold">
                    {char}
                  </span>
                {/key}
              </span>
            {/each}
          </div>
          <Button
            class="w-16 h-16 absolute right-2 rounded hover:bg-zinc-600"
            label=""
            icon="refresh"
            onclick={handleGenerateGroupCode}
          />
        </div>
  
        <div class="flex justify-around items-center">
          <p class="text-white text-xl">
            Group Status:
            <span class="text-green-500 font-bold">Operational</span>
          </p>
          <p class="text-white text-xl">
            Server Status:
            <span class={groupServerStatusStyle}>{groupServerStatusLabel}</span>
          </p>

        </div>
        <div class="space-y-2">
          <p class="text-white text-md font-light">
            Enter another group's code below to join an existing group.
          </p>
          <input
            type="text"
            maxlength="8"
            placeholder="Enter Group Code"
            class="w-full font-thin uppercase p-2 text-center text-2xl font-mono tracking-[0.2em] bg-zinc-800 text-white rounded-sm focus:outline-none focus:border focus:border-emerald-500"
            oninput={handleGroupCodeChange}
            value=""
          />
        </div>
      </div>
  
      <!-- Footer -->
      <div class="flex justify-between items-center">
        <p class="text-zinc-400 text-xs">
          This feature is experimental and opt in, however this feature may gather information to help improve the
          service in the future and is used to assist the monitoring of fair use.
        </p>
      </div>
      <Button
        class="w-full h-16 text-xl"
        label="Close"
        icon="update"
        onclick={handleGroupSettings}
      />
    </div>
  </div>
  
  <style>
    #updateModal {
      --animate-duration: 0.3s;
    }
  </style>
  