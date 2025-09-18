<script lang="ts">
import 'animate.css';
import Button from './Button.svelte';
import { onMount } from 'svelte';


const { onclose } = $props<{ onclose: () => void }>();

let settings = $state({});
let local_gamepath = $state('');
let local_ttsLanguage = $state('');
let local_volume = $state(0);
let local_apiKey = $state('');
let local_overlayPosition = $state('');

onMount(async () => {
    window.electronAPI.getSettings().then((settings_config) => {
            settings = settings_config;
            local_gamepath = settings.gameDirectory;
            local_ttsLanguage = settings.ttsLanguage;
            local_volume = settings.ttsVolume;
            local_apiKey = settings.apiKey;
            local_overlayPosition = settings.overlayPosition;
    })  
})

function handleSettingsClose() {
    //close the modal from parent
    onclose();
}

function handleGamePathChange(event) {
    local_gamepath = event.target.value;
}

function handleTtsLanguageChange(event) {
    local_ttsLanguage = event.target.value;
}

function handleVolumeChange(event) {
    local_volume = event.target.value;
}

function handleApiKeyChange(event) {
    local_apiKey = event.target.value;
}

function handleOverlayPositionChange(event) {
    local_overlayPosition = event.target.value;
}

async function handleSaveSettings() {
    await window.electronAPI.saveSettings({
        gameDirectory: local_gamepath,
        ttsLanguage: local_ttsLanguage,
        ttsVolume: local_volume,
        apiKey: local_apiKey,
        overlayPosition: local_overlayPosition

    }).then(() => {
        console.log('Settings saved successfully');
        handleSettingsClose();
    }).catch((error) => {
        console.error('Failed to save settings:', error);
    });
}
</script>

<div id="settingsModal" class="animate__animated animate__fadeIn bg-black/50 backdrop-blur backdrop-grayscale absolute z-50 inset-0 flex justify-center items-center shadow-lg">
    <div class="bg-zinc-900 p-4 rounded-sm max-w-3xl w-4/5 h-5/6 rounded-lg flex flex-col justify-between gap-4 relative ring-4 ring-zinc-800">
        <div class="flex flex-col">
            <div class="w-full h-32 bg-cover bg-center rounded-sm absolute top-0 left-0 z-0 p-4" style="background-image: url('https://i.imgur.com/O9d0FnA.png')">

            </div>
        </div>
        
        <div class="h-full mt-28">
            <p class="text-white text-3xl">Settings</p>
            <p class="text-white text-md">All the important things</p>
            <div class="mt-4">
                <label for="" class="text-white text-lg">Star Citizen Path</label>
                <input type="text" spellcheck="false" placeholder="" oninput={handleGamePathChange} value={local_gamepath} class="w-full bg-zinc-800 h-12 p-2 text-md font-thin rounded-sm focus:outline-none focus:border-b-2 focus:border-red-600" />
                <p class="text-zinc-400 text-sm">Paste the location of your star citizen LIVE folder</p>
            </div>

            <div class="mt-4">
                <label for="" class="text-white text-lg">TTS Language</label>
                <select type="text" spellcheck="false" placeholder="" oninput={handleTtsLanguageChange} value={local_ttsLanguage} class="w-full bg-zinc-800 h-12 p-2 text-md font-thin rounded-sm focus:outline-none focus:border-b-2 focus:border-red-600">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                </select>
                    <p class="text-zinc-400 text-sm">Translation to be implemented at a later stage</p>
            </div>

            <div class="mt-4">
                <label for="" class="text-white text-lg">TTS Volume ({local_volume}%)</label>
                <input type="range" class="w-full h-12 bg-zinc-800 accent-red-800 p-2 text-md font-thin bg-zinc-800" min="0" max="100" step="1" value={local_volume} oninput={handleVolumeChange} />        
                <p class="text-zinc-400 text-sm">Change the volume of the TTS</p>  
            </div>

            <div class="mt-4">
                <label for="" class="text-white text-lg">Overlay Position</label>
                <select type="text" spellcheck="false" placeholder="" oninput={handleOverlayPositionChange} value={local_overlayPosition} class="w-full bg-zinc-800 h-12 p-2 text-md font-thin rounded-sm focus:outline-none focus:border-b-2 focus:border-red-600">
                    <option value="Bottom Right">Bottom Right</option>
                    <option value="Bottom Left">Bottom Left</option>
                    <option value="Bottom Center">Bottom Center</option>
                    <option value="Top Center">Top Center</option>
                    <option value="Top Right">Top Right</option>
                    <option value="Top Left">Top Left</option>
                </select>
                <p class="text-zinc-400 text-sm">Change the position of the overlay</p>
            </div>

            <div class="mt-4">
                <label for="" class="text-white text-lg">ZERO API Key</label>
                <input type="password" spellcheck="false" placeholder="" value={local_apiKey} disabled class="w-full bg-zinc-800 h-12 p-2 text-md font-thin rounded-sm focus:outline-none focus:border-b-2 focus:border-red-600" oninput={handleApiKeyChange} />
                <p class="text-zinc-400 text-sm">Required for other ZERO services, only for VIPs (currently not used)</p>
            </div>
        </div>
        <Button  class="w-full h-16 text-xl" label="" icon="save" onclick={handleSaveSettings}/>
    </div>
</div>

<style>
    #settingsModal {
        --animate-duration: 0.7s;
    }
</style>