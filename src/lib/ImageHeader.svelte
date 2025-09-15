<script>

import 'animate.css';
import headerImage1 from '../assets/1.png';  
import headerImage2 from '../assets/2.png';
import headerImage3 from '../assets/3.png'; //by DriftwoodBadger
import headerImage4 from '../assets/4.png'; //“Desert Stalker”  by ln_nova

let currentImage = $state(headerImage1);
let animate = $state('');
let message = $state('');

function getCurrentImage() {
    return currentImage;
}

function changeImage(image) {
    animate = 'animate__animated animate__fadeOut';
    setTimeout(() => {
        animate = 'animate__animated animate__fadeIn';
        currentImage = image;
    }, 50);

}

function sendStatusUpdate(message) {
    message = message;

}

window.electronAPI.onStatusUpdate((data) => {
    message = data.message;
})

</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="absolute sticky top-0 flex justify-left items-center relative">
    <div class="absolute top-0 left-0 p-2 flex space-x-1 z-50">
        <div onclick={() => changeImage(headerImage1)} class="w-4 h-4 rounded-full bg-black/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
        <div onclick={() => changeImage(headerImage2)} class="w-4 h-4 rounded-full bg-black/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
        <div onclick={() => changeImage(headerImage3)} class="w-4 h-4 rounded-full bg-black/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
        <div onclick={() => changeImage(headerImage4)} class="w-4 h-4 rounded-full bg-black/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
    </div>
    <div class="w-full p-1 h-64 bg-black bg-center bg-center bg-cover {animate}" style="background-image: url({getCurrentImage()})">

    </div>
    <div class="mt-2 text-[12px] opacity-40 text-gray-100 p-2 absolute left-0 bottom-0">
      <span id="file-read-info">{message}</span>
    </div>

</div>

