<script>
// @ts-nocheck

    import Button from './Button.svelte'
    import ButtonStatus from './ButtonStatus.svelte'
    import TTSAudio from './TTSAudio.svelte'
    import moment from 'moment';
    import MinsAgo from './MinsAgo.svelte';
    import { v4 as uuidv4 } from 'uuid';

    let killEvents = $state([
    ]);

    let incapEvents = $state([]);
    let ttsStatus = $state(false);

    window.electronAPI.getTTSStatus().then((status) => {
        ttsStatus = status; //assign the value to ttsStatus
    });

    window.electronAPI.onKillEvent((data) => {
        killEvents = [{ ...data, id: uuidv4(), isNew: true }, ...killEvents];
        if (ttsStatus) {
            SpeakTTS(data.killerName + ' killed ' + data.victimName + ' with a ' + data.weaponName);
        }
    })

    window.electronAPI.onIncapEvent((data) => {
        incapEvents = [{ ...data, id: uuidv4(), isNew: true }, ...incapEvents];
        if (ttsStatus) {
            SpeakTTS(data.victimName + ' was incapacitated near you');
        }
    })

let overlayState = $state(false);
let overlayStatus = $state('Overlay');

const handleOverlayToggle = async () => {
    // @ts-ignore
    if (overlayState) {
        window.electronAPI.closeOverlay()
    } else {   
        const isRunning = await window.electronAPI.openOverlay()
        if (!isRunning) {
            overlayState = false;
            overlayStatus = "SC not running"
            setTimeout(() => {
                overlayStatus = "Overlay"
            }, 1000);
            return;
        }
    }
    overlayState = !overlayState;
}


let speakTTS = $state('');

const handleTTSToggle = async () => {
    // @ts-ignore
    if (ttsStatus) {
        ttsStatus = false;
        window.electronAPI.setTTSStatus(false);
        speakTTS = '';
        return;
    } else {   
        ttsStatus = true;
        window.electronAPI.setTTSStatus(true);
        speakTTS = 'Text to Speech is Enabled';
    }
}

const SpeakTTS = (text) => {
    speakTTS = text;
}

let loggingEnabled = $state(false);
window.electronAPI.getLoggingStatus().then((status) => {
    loggingEnabled = status; //assign the value to loggingEnabled
});

const handleLoggingToggle = async () => {
    // @ts-ignore
    if (loggingEnabled) {
        loggingEnabled = false;
        window.electronAPI.setLoggingStatus(false);
        return;
    } else {   
        loggingEnabled = true;
        window.electronAPI.setLoggingStatus(true);
    }
}
let incapPos = $state(0);

const handleIncapPosLeft = () => {
    if (incapPos > 0) {
        incapPos = Math.max(incapPos - 1, 0);
        if (incapPos === 0) {
            document.getElementById('incap-left').classList.add('opacity-20');
        }
        if (incapPos < incapEvents.length - 1) {
            document.getElementById('incap-right').classList.remove('opacity-20');
        }
    }
}

const handleIncapPosRight = () => {
    if (incapPos < incapEvents.length - 1) {
        incapPos = Math.min(incapPos + 1, incapEvents.length - 1);
        if (incapPos === incapEvents.length - 1) {
            document.getElementById('incap-right').classList.add('opacity-20');
        }
        if (incapPos > 0) {
            document.getElementById('incap-left').classList.remove('opacity-20');
        }
    }
}

</script>

<TTSAudio text={speakTTS}/>

<div id="toggle" class="pb-1 flex justify-between items-center space-x-2" >
    <div class="flex space-x-1">
        <Button label="KILLS" class="w-16"/>
        <Button label="INCAPS" class="w-16"/>
        <Button label="NPC" class="w-16"/>
    </div>
    <div class="flex space-x-2">
        <ButtonStatus onclick={handleOverlayToggle} ActiveLabel={overlayStatus} InactiveLabel={overlayStatus} status={overlayState} spinner={false} externalcheck={true} class="w-28 flex justify-center items-center"/>
        <ButtonStatus onclick={handleTTSToggle} ActiveLabel="TTS" InactiveLabel="TTS Off" status={ttsStatus} spinner={true} externalcheck={true} class="w-28 flex justify-between items-center gap-1"/>
        <ButtonStatus onclick={handleLoggingToggle} ActiveLabel="Logging" InactiveLabel="Stopped" status={loggingEnabled} spinner={true} externalcheck={true} class="w-28 flex justify-between items-center gap-1"/>
    </div>
</div>

<div class="event flex h-20 justify-left items-center space-x-1 text-lg rounded relative rounded bg-gradient-to-tr from-indigo-900 to-indigo-800 hover:cursor-pointer">
    <div class="p-1 w-8 h-8 -rotate-[20deg] m-1 ml-2 rounded relative flex justify-around p-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 512 512"><circle cx="256" cy="56" r="56"/><path d="M464 128H48v52h144l-32 325.13 51 6.87 21.65-192h47.02L301 512l51-6.98L320 180h144v-52z"/></svg>
    </div>

    {#if incapEvents[incapPos]}
    <span class="incap text-[1rem]">
        <span class="victim text-emerald-400 font-bold">{incapEvents[incapPos].victimName}</span> 
        <span> was incapacitated near you.
          <span class="absolute top-0 right-0 px-2 text-[0.8rem]"><MinsAgo minsAgo={incapEvents[incapPos].timestamp}/></span>
        </span>
    </span>
    {/if}


    <div class="flex justify-center items-center absolute bottom-0 right-0 p-1 no-select space-x-1">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div onclick={handleIncapPosLeft} id="incap-left" class="bg-black/20 opacity-20 p-0.5 rounded hover:bg-indigo-600 duration-300 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="duration-100 transition-all hover:scale-110 lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div onclick={handleIncapPosRight} id="incap-right" class="bg-black/20 p-0.5 rounded hover:bg-indigo-600 duration-300 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="duration-100 transition-all hover:scale-110 lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
      </div>  
    </div>
</div>    

{#each killEvents as kill}

<div class="event select-none flex h-18 justify-left items-center space-x-1 rounded relative bg-gradient-to-l from-red-900 to-red-800 shadow hover:cursor-pointer">
    <div class="p-1 m-1 w-8 h-8 m-1 ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" fill="white" viewBox="0 0 512 512"><path d="M256 16C141.31 16 48 109.31 48 224v154.83l82 32.81L146.88 496H192v-64h32v64h16v-64h32v64h16v-64h32v64h45.12L382 411.64l82-32.81V224c0-114.69-93.31-208-208-208zm-88 320a56 56 0 1156-56 56.06 56.06 0 01-56 56zm51.51 64L244 320h24l24.49 80zM344 336a56 56 0 1156-56 56.06 56.06 0 01-56 56zm104 32z"/></svg>
    </div>
    <span class="text-[1rem]">
        <span class="killer text-red-300 font-semibold">{kill.killerName}</span> killed <span class="victim text-emerald-300 font-semibold">{kill.victimName}</span> with <span class="weapon text-yellow-300 font-semibold">{kill.weaponName}</span> (type: {kill.damageType})
    <span class="absolute top-0 right-0 px-2 text-[0.8rem]"><MinsAgo minsAgo={kill.timestamp}/></span>
    </span>
</div>

{/each}



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