<script>

    const props = $props();  
    let toggledState = $state(false || props.state);
    const icons = {
        "close" : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',  
        "minimize" : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus translate-y-2"><path d="M18 12H6"/></svg>',
        "cog" : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>'
    };
    
    function handleClick(event) {
        toggledState = !toggledState;
        
        if (typeof props.onclick === 'function') {
            props.onclick(event);
        }
    }

    </script>
      
    <button onclick={handleClick} class="{toggledState ? ' bg-green-700 hover:bg-green-800' : ' bg-stone-700 hover:bg-red-800'} text-sm text-white py-1 px-2 flex items-center rounded-sm duration-100 transition-colors">
        
        {#if props.label}
            {props.label}
        {/if}
        
        {#if props.icon}
            <span class="">
                {@html icons[props.icon]}
            </span> 
        {/if}
    </button>
      