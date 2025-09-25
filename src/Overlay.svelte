<script>
  import OverlayEvent from './lib/OverlayEvent.svelte'
  import { v4 as uuidv4 } from 'uuid';
  import { onMount, onDestroy } from 'svelte';
  
  let events = $state([]);

  let overlayPositionTranslate = $state(
    {
      'Bottom Right': 'bottom-[18rem] right-0',
      'Bottom Left': 'bottom-[18rem] left-0',
      'Top Right': 'top-[18rem] right-0',
      'Top Left': 'top-[18rem] left-0',
    });

  
  onMount(async () => {
    let settings = await window.electronAPI.getSettings();
    overlayPosition = overlayPositionTranslate[settings.overlayPosition || 'Bottom Right'];
  });

  let overlayPosition = $state(overlayPositionTranslate['Bottom Right']);

  window.electronAPI.onKillEvent((data) => {
    events = [{ ...data, id: uuidv4(), isNew: true }, ...events];
  })

  window.electronAPI.onIncapEvent((data) => {
    events = [{ ...data, id: uuidv4(), isNew: true }, ...events];
  })
  
</script>

<div class="w-screen h-screen flex flex-col justify-end items-center p-2">
  <div class="absolute {overlayPosition} space-y-1">
      {#each events.slice(0, 5) as event (event.id)}
        <OverlayEvent event={event} isNew={event.isNew} />
      {/each}
  </div>
</div>