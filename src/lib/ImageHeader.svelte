<script>
import headerImage1 from '../assets/1.png';  
import headerImage2 from '../assets/2.png';
</script>

<div class="absolute sticky top-0 flex justify-left items-center relative">
    <div class="absolute top-0 left-0 p-2 flex space-x-1">
        <div class="w-4 h-4 rounded bg-stone-700/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
        <div class="w-4 h-4 rounded bg-stone-700/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
        <div class="w-4 h-4 rounded bg-stone-700/50 hover:bg-zinc-300 cursor-pointer transition-all duration-300"></div>
    </div>
    <img class="w-full" src={headerImage2} alt="Zero logo">
    <div class="mt-2 text-[6px] text-gray-400 p-2 absolute left-0 bottom-0">
      <span id="file-read-info"></span>
    </div>

</div>

