<script>
  import { onMount } from 'svelte';

  const props = $props();
  let audio = null;

  let volume = $state(1.0);

  $effect(() => {
    if (props.text) {
        electronAPI.getTTSUrl(props.text).then((dataUrl) => {
          playAudio(dataUrl);
        });
    }
	});

  function playAudio(dataUrl) {
    audio?.pause();
    audio = new Audio(dataUrl);
    window.electronAPI.getTTSVolume().then((volume) => {
      audio.volume = volume / 100;
    });
    audio.play().catch(err => {
      console.warn("Autoplay failed:", err);
    });
  }
</script>