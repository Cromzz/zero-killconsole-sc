<script>
import headerImage1 from '../assets/1.png';  
import headerImage2 from '../assets/2.png';
import headerImage3 from '../assets/3.png'; 
import headerImage4 from '../assets/4.png'; //“Desert Stalker”  by ln_nova

let currentImage = $state(headerImage1);

function getCurrentImage() {
    return currentImage;
}

function changeImage(image) {
    currentImage = image;
}

</script>

<div class="absolute sticky top-0 flex justify-left items-center relative">
    <div class="absolute top-0 left-0 p-2 flex space-x-1">
        <div onclick={() => changeImage(headerImage1)} class="w-4 h-4 rounded bg-stone-700/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
        <div onclick={() => changeImage(headerImage2)} class="w-4 h-4 rounded bg-stone-700/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
        <div onclick={() => changeImage(headerImage3)} class="w-4 h-4 rounded bg-stone-700/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
        <div onclick={() => changeImage(headerImage4)} class="w-4 h-4 rounded bg-stone-700/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
    </div>
    <div class="w-full p-1 h-64 bg-center bg-center bg-cover" style="background-image: url({getCurrentImage()})">

    </div>
    <div class="mt-2 text-[6px] text-gray-400 p-2 absolute left-0 bottom-0">
      <span id="file-read-info"></span>
    </div>

</div>

