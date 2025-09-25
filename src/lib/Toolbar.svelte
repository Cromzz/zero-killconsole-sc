<script>
// @ts-nocheck

import { onDestroy, onMount } from 'svelte';
// @ts-ignore
import ButtonToggle from './ButtonToggle.svelte'
import Button from './Button.svelte'
import SettingsModal from './SettingsModal.svelte'
import UpdateModal from './UpdateModal.svelte'
import GroupModal from './GroupModal.svelte'


let version = $state('');
let updateAvailable = $state(null);
let showSettingsModal = $state(false);
let showUpdateModal = $state(false);
let showGroupModal = $state(false);
let settings = $state({});
let updatepercent = $state(0.00);

onMount(async () => {
    version = await window.electronAPI.getAppVersion();
    settings = await window.electronAPI.getSettings();

    window.electronAPI.onUpdateAvailable(() => {
        updateAvailable = true;

    });
    window.electronAPI.onDownloadProgress((progress) => {
        updatepercent = progress.percent.toFixed(2);
    });

    window.electronAPI.onUpdateDownloaded(() => {
        updatepercent = 100;
        setTimeout(() => {
            showUpdateModal = false;
        }, 1000);
    });
});

onDestroy(() => {
    window.electronAPI.removeUpdateAvailableListener();
    window.electronAPI.removeDownloadProgressListener();
    window.electronAPI.removeUpdateDownloadedListener();
});

const handleSettingsClick = () => {
    showSettingsModal = !showSettingsModal;
}
   
const handleWindowControlMin = () => {
    window.electronAPI.windowControl('minimize')
}

const handleWindowControlClose = () => {
    window.electronAPI.windowControl('close')
}

const handleGroupClick = () => {
    showGroupModal = !showGroupModal;
}

</script>

{#if showUpdateModal}
<UpdateModal onclose={() => showUpdateModal = false} />
{/if}

{#if showSettingsModal}
<SettingsModal onclose={() => showSettingsModal = false} />
{/if}

{#if showGroupModal}
<GroupModal onclose={() => showGroupModal = false} />
{/if}

{#if showUpdateModal}
    <UpdateModal percent={updatepercent} onclose={() => showUpdateModal = false} />
{/if}

  <div class="absolute sticky top-0 left-0 right-0 drag-bar flex justify-between items-center bg-stone-900 p-2 z-50">
    <div class="flex justify-start items-center space-x-2">
        <span class="text-white font-semibold">[ZERO] Kill Console</span>
        <span id="version" class="text-white text-xs font-bold bg-emerald-800 rounded-sm px-2 py-1">BETA</span>
        <span id="version" class="text-white text-xs font-bold bg-red-800 rounded-sm px-2 py-1">v{version}</span>
    </div>
    <div class="flex space-x-2 no-drag">
        {#if updateAvailable}
            <ButtonToggle onclick={() => showUpdateModal = true} label="Update Available!" icon="update" />
        {/if}
        <Button onclick={handleGroupClick} label=" " icon="group" />
        <ButtonToggle onclick={handleSettingsClick} label="Settings" icon="" />
        <Button onclick={handleWindowControlMin} label="" icon="minimize" />
        <Button onclick={handleWindowControlClose} label="" icon="close" />
    </div>
</div>

<style>
.drag-bar {
    -webkit-app-region: drag;
}
.no-drag {
    -webkit-app-region: no-drag;
}
</style>