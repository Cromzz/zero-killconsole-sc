<script lang="ts">
    import 'animate.css';
    import Button from './Button.svelte';
   
    
    const { onclose, percent } = $props<{ onclose: () => void }>();
    let updateAvailable = $state(null);

    
    function handleUpdate() {
        //close the modal from parent
        onclose();
    }
    
    </script>
    
    <div id="updateModal" class="animate__animated animate__fadeIn bg-black/50 backdrop-blur backdrop-grayscale absolute z-50 inset-0 flex justify-center items-center shadow-lg">
        <div class="bg-zinc-900 p-4 rounded-sm max-w-3xl w-4/5 h-32 rounded-lg flex flex-col justify-between gap-4 relative ring-4 ring-zinc-800">            
            <div class="h-full">
                <p class="text-white text-3xl">Update Available!</p>
                <p class="text-white text-md">We've got a new update available!</p>
            </div>
            <div><progress class="w-full rounded-full" value={percent} max="100"></progress></div>
        </div>
    </div>
    
    <style>
        #updateModal {
            --animate-duration: 0.3s;
        }
    </style>