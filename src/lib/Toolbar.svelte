<script>
import { onMount } from 'svelte';
// @ts-ignore
import ButtonToggle from './ButtonToggle.svelte'
import Button from './Button.svelte'
import SettingsModal from './SettingsModal.svelte'

let version = $state('');
let showSettingsModal = $state(false);
let settings = $state({});

onMount(async () => {
    version = await window.electronAPI.getAppVersion();
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

</script>

{#if showSettingsModal}
<SettingsModal onclose={() => showSettingsModal = false} />
{/if}

  <div class="absolute sticky top-0 left-0 right-0 drag-bar flex justify-between items-center bg-stone-900 p-2 z-50">
    <div class="flex justify-start items-center space-x-2">
        <span class="text-white font-semibold">[ZERO] Kill Console</span>
        <span id="version" class="text-white text-xs font-bold bg-emerald-800 rounded-sm px-2 py-1">BETA</span>
        <span id="version" class="text-white text-xs font-bold bg-red-800 rounded-sm px-2 py-1">v{version}</span>
    </div>
    <div class="flex space-x-2 no-drag">
      <ButtonToggle onclick={handleSettingsClick} label="Settings" icon="" />
      <Button onclick={handleWindowControlMin} label="" icon="minimize" />
      <Button onclick={handleWindowControlClose} label="" icon="close" />
    </div>
</div>