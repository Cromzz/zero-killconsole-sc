<script>
    import moment from 'moment';
    import { onMount } from 'svelte';

    const props = $props();
    let minsAgo = $state('');
    let interval;
    
    $effect(() => {
        minsAgo = moment(props.minsAgo).fromNow();
    });
    
    onMount(() => {
        // Update relative time every 60 seconds
        interval = setInterval(() => {
          minsAgo = moment(props.minsAgo).fromNow();
        }, 10 * 1000);
      });
</script>
    {minsAgo}