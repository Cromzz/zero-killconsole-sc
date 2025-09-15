<script lang="ts">
    import 'animate.css';
    import Button from './Button.svelte';
    import { onMount } from 'svelte';
    
    
    const { onclose } = $props<{ onclose: () => void }>();
    let updateAvailable = $state(null);
    
    onMount(async () => {
        updateAvailable = await window.electronAPI.onUpdateAvailable();
        console.log(updateAvailable);
    })
    
    function handleUpdate() {
        //close the modal from parent
        onclose();
    }
    
    </script>
    
    <div id="updateModal" class="animate__animated animate__fadeIn bg-black/50 backdrop-blur backdrop-grayscale absolute z-50 inset-0 flex justify-center items-center shadow-lg">
        <div class="bg-zinc-900 p-4 rounded-sm max-w-3xl w-4/5 h-4/6 rounded-lg flex flex-col justify-between gap-4 relative ring-4 ring-zinc-800">
            <div class="flex flex-col">
                <div class="w-full h-32 bg-cover bg-center rounded-sm absolute top-0 left-0 z-0 p-4" style="background-image: url('https://i.imgur.com/JZojAjx.png')">

                </div>
            </div>
            
            <div class="h-full mt-[7rem]">
                <p class="text-white text-3xl">Update Available</p>
                <p class="text-white text-md">a new update for the application is available</p>
            </div>
            <Button  class="w-full h-16 text-xl" label="" icon="update" onclick={handleUpdate}/>
        </div>
    </div>
    
    <style>
        #updateModal {
            --animate-duration: 0.3s;
        }
    </style>