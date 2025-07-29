<script>
    import Button from './Button.svelte'
    import ButtonStatus from './ButtonStatus.svelte'
// electronAPI.onKillEvent((data) => {
//     speakTTS(data.killerName + ' killed ' + data.victimName + ' with ' + data.weaponName);
//     const container = document.getElementById('kills');
//     const div = document.createElement('div');
//     div.className = 'event';
//     div.innerHTML = `      
//       <div class="flex h-16 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
//         <div class="p-1 m-1 rounded-lg bg-black/20 w-10 h-10 m-1 ml-2">
//           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-skull-icon lucide-skull"><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/></svg>
//         </div>
//         <span class="text-[1rem]">
//           <span class="killer">${data.killerName}</span> killed <span class="victim">${data.victimName}</span> with <span class="weapon">${data.weaponName}</span> (type: ${data.damageType})
//           <span class="absolute top-0 right-0 px-2 text-[0.8rem]">${new Date(data.timestamp).toLocaleString().replace(/,/g, '')}</span>
//         </span>
//       </div>
//     `;
//     container.prepend(div);
// });
    
// electronAPI.onIncapEvent((data) => {
//   speakTTS(data.victimName + ' was incapacitated near you');
//   const container = document.getElementById('incaps');
//   const div = document.createElement('div');
//   div.className = 'event';
//   div.innerHTML = `
//     <div class="flex h-16 justify-left items-center space-x-1 text-lg rounded relative rounded bg-gradient-to-tr from-indigo-900 to-indigo-800 hover:cursor-pointer">
//       <div class="p-1 bg-black/20 w-10 h-10 m-1 ml-2 rounded relative flex justify-around p-1">
//         <span class="text-xl scale-125 translate-y-2">z</span>
//         <span class="text-md scale-105">z</span>
//         <span class="text-xs scale-100">z</span>
//       </div>
//       <span class="text-[1rem]">
//           <span class="victim">${data.victimName}</span> 
//           <span></span>was incapacitated near you.<span>
//             <span class="absolute top-0 right-0 px-2 text-[0.8rem]">${new Date(data.timestamp).toLocaleString().replace(/,/g, '')}</span>
//           </span>
//       </span>
//       <div class="flex justify-center items-center absolute bottom-0 right-0 p-1">
//         <div class="bg-black/20 p-0.5 rounded hover:bg-indigo-600 duration-300 transition-all">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="duration-100 transition-all hover:scale-110 lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
//         </div>
//         <div class="bg-black/20 p-0.5 rounded hover:bg-indigo-600 duration-300 transition-all">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="duration-100 transition-all hover:scale-110 lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
//         </div>  
//       </div>
//     </div>    
//   `;
//   container.replaceWith(div);
// });

</script>

<div id="toggle" class="pb-1 flex justify-between items-center space-x-2" >
    <div class="flex space-x-1">
        <Button label="KILLS" class="w-16"/>
        <Button label="INCAPS" class="w-16"/>
        <Button label="NPC" class="w-16"/>
    </div>
    <div class="flex space-x-2">
        <ButtonStatus ActiveLabel="Overlay" InactiveLabel="Overlay" status={true} class="w-28"/>
        <ButtonStatus ActiveLabel="Logging" InactiveLabel="Stopped" status={true} spinner={true} class="w-28 flex justify-between items-center gap-1"/>
    </div>
</div>

<div class="event flex h-24 justify-left items-center space-x-1 text-lg rounded relative rounded bg-gradient-to-tr from-indigo-900 to-indigo-800 hover:cursor-pointer">
    <div class="p-1 w-8 h-8 -rotate-[20deg] m-1 ml-2 rounded relative flex justify-around p-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 512 512"><circle cx="256" cy="56" r="56"/><path d="M464 128H48v52h144l-32 325.13 51 6.87 21.65-192h47.02L301 512l51-6.98L320 180h144v-52z"/></svg>
    </div>
    <span class="text-[1rem]">
        <span class="victim">victim</span> 
        <span></span>was incapacitated near you.<span>
          <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes ago</span>
        </span>
    </span>
    <div class="flex justify-center items-center absolute bottom-0 right-0 p-1">
      <div class="bg-black/20 p-0.5 rounded hover:bg-indigo-600 duration-300 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="duration-100 transition-all hover:scale-110 lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
      </div>
      <div class="bg-black/20 p-0.5 rounded hover:bg-indigo-600 duration-300 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="duration-100 transition-all hover:scale-110 lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
      </div>  
    </div>
</div>    

<div class="event flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-8 h-8 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>

<div class="event flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-8 h-8 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>

<div class="event flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-8 h-8 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>

<div class="event flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-8 h-8 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>

<div class="event flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-8 h-8 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>

<div class="event flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-8 h-8 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>

<div class="event opacity-75 flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-8 h-8 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>

<div class="event opacity-50  flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-8 h-8 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>

<div class="event opacity-25 flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-10 h-10 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>


<div class="event opacity-10  flex h-12 justify-left items-center space-x-1 text-lg rounded relative bg-gradient-to-tr from-red-900 to-red-800 shadow duration-300 transition-all hover:cursor-pointer">
    <div class="p-1 m-1 w-10 h-10 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
    <span class="killer">killerName</span> killed <span class="victim">victimName</span> with <span class="weapon">weapon</span> (type)
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]">3 minutes</span>
    </span>
</div>




<style>
.event {
    font-family: "Saira", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings:
    "wdth" 100;
}
</style>