<script>
    import OverlayEvent from './lib/OverlayEvent.svelte'
    let events = $state([]);

    window.electronAPI.onKillEvent((data) => {
      events.unshift(data);
    })

    window.electronAPI.onIncapEvent((data) => {
      events.unshift(data);
    })
    $inspect(events);
  </script>
  
  <div class="w-screen h-screen flex flex-col justify-end items-center p-2">
    <div class="absolute bottom-[18rem] right-0 space-y-1">
        {#each events as event}
          {event.killerName}
          <OverlayEvent event={event}/>
        {/each}
    </div>
  </div>
  
  <style>
  
  </style>
  