<script>
    let props = $props();
    let event = props.event;
    let animation = $state("animate__animated animate__fadeInRight")

</script>

{#if event.type === 'kill'}
    <div class="pr-6 event {animation} h-8 text-sm gap-1 flex justify-left items-center text-md relative bg-gradient-to-l from-red-700/50 to-red-800/0 shadow duration-300 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon absolute -translate-x-5 translate-y-2 inset-0 w-4 h-4" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
        <span class="killer text-red-300 font-semibold">{event.killerName}</span> killed 
        <span class="victim text-emerald-300 font-semibold">{event.victimName}</span> with a <span class="weapon text-yellow-300 font-semibold">{event.weaponName} {props.order}</span>
    </div>
{/if}

{#if event.type === 'incap'}
    <div class="pr-6 event {animation} h-8 text-sm gap-1 flex justify-left items-center text-md relative bg-gradient-to-l from-purple-700/50 to-red-800/0 shadow duration-300 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon absolute -translate-x-5 translate-y-2 inset-0 w-4 h-4 -rotate-[30deg]" fill="white" viewBox="0 0 512 512"><circle cx="256" cy="56" r="56"/><path d="M464 128H48v52h144l-32 325.13 51 6.87 21.65-192h47.02L301 512l51-6.98L320 180h144v-52z"/></svg>
        <span class="killer text-emerald-300 font-semibold">{event.victimName}</span> is incapacitated near you
    </div>
{/if}
