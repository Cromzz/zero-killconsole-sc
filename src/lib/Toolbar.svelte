<script>
import { onMount } from 'svelte';
// @ts-ignore
import Button from './Button.svelte'

let version = $state('');

onMount(async () => {
    version = await window.electronAPI.getAppVersion();
});

// @ts-ignore
const handleWindowControlMin = () => {
    // @ts-ignore
    window.electronAPI.windowControl('minimize')
}
const handleWindowControlClose = () => {
    // @ts-ignore
    window.electronAPI.windowControl('close')
}

    
</script>
  <div class="absolute sticky top-0 left-0 right-0 drag-bar flex justify-between items-center bg-stone-900 p-2 z-50">
    <div class="flex justify-start items-center space-x-2">
        <span class="text-white font-semibold">[ZERO] Kill Console</span>
        <span id="version" class="text-white text-xs font-bold bg-emerald-800 rounded-sm px-2 py-1">BETA</span>
        <span id="version" class="text-white text-xs font-bold bg-red-800 rounded-sm px-2 py-1">v{version}</span>
    </div>
    <div class="flex space-x-2 no-drag">
      <Button onclick={handleWindowControlMin} label="" icon="cog" />
      <Button onclick={handleWindowControlMin} label="" icon="minimize" />
      <Button onclick={handleWindowControlMin} label="" icon="close" />
    </div>
</div>