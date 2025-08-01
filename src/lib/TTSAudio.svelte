<script>
  import { onMount } from 'svelte';

  const props = $props();
  let audio = null;


  $effect(() => {
    if (props.text) {
        electronAPI.getTTSUrl(props.text).then((dataUrl) => {
          console.log("Received base64 audio", dataUrl  );
          playAudio(dataUrl);
        });
    }
	});

  function playAudio(dataUrl) {
    audio?.pause();
    audio = new Audio(dataUrl);
    audio.volume = 0.4;
    audio.play().catch(err => {
      console.warn("Autoplay failed:", err);
    });
  }
</script>