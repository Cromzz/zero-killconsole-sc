<script>
import { onMount } from 'svelte';
// @ts-ignore
import Button from './Button.svelte'
import ButtonToggle from './ButtonToggle.svelte'

let version = $state('');
let overlayState = $state(false);

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

const handleOverlayToggle = async () => {
    // @ts-ignore
    if (overlayState) {
        console.log("close overlay")
        window.electronAPI.closeOverlay()
    } else {   
        console.log("open overlay")
        const isRunning = await window.electronAPI.openOverlay()
    }
    overlayState = !overlayState;
}


    
</script>
  <div class="absolute sticky top-0 left-0 right-0 drag-bar flex justify-between items-center bg-stone-900 p-2 z-50">
    <div class="flex justify-start items-center space-x-2">
        <span class="text-white font-semibold">[ZERO] Kill Console</span>
        <span id="version" class="text-white text-xs font-bold bg-emerald-800 rounded-sm px-2 py-1">BETA</span>
        <span id="version" class="text-white text-xs font-bold bg-red-800 rounded-sm px-2 py-1">v{version}</span>
    </div>
    <div class="flex space-x-2 no-drag">
      <ButtonToggle onclick={handleOverlayToggle} label="overlay" icon="" state={overlayState}/>
      <Button onclick={handleWindowControlMin} label="" icon="cog" />
      <Button onclick={handleWindowControlMin} label="" icon="minimize" />
      <Button onclick={handleWindowControlMin} label="" icon="close" />
    </div>
</div>