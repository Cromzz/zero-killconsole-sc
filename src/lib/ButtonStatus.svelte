<script>

    const props = $props();  

    let toggledState = $state(false || props.status);
    let toggleSpinner = $state(false || props.spinner);
    let externalcheck = $state(false || props.externalcheck);
    
    function handleClick(event) {
        if (!externalcheck) {
            toggledState = !toggledState;
        }
        
        if (typeof props.onclick === 'function') {
            props.onclick(event);
            console.log(event);
        }
    }

    $effect(() => {
        if (props.status) {
            toggledState = true;
        } else {
            toggledState = false;
        }
    });
    
    </script>
      
    <button onclick={handleClick} class="{props.class} {toggledState ? 'ring-2 ring-emerald-400 bg-emerald-800' : 'bg-stone-700'} hover:bg-stone-600 text-sm text-white py-1 px-2 rounded-sm duration-300 transition-all">
        
        {#if toggleSpinner}
            <div class="flex space-x-1 items-center">
                <span class="w-1 h-3 rounded-sm {toggledState ? 'switch-light bg-emerald-400' : 'bg-stone-900/40 shadow-inner'}"></span>
                <span class="w-1 h-4 rounded-sm {toggledState ? 'switch-light bg-emerald-400' : 'bg-stone-900/40 shadow-inner'}"></span>
                <span class="w-1 h-3 rounded-sm {toggledState ? 'switch-light bg-emerald-400' : 'bg-stone-900/40 shadow-inner'}"></span>          
            </div>
        {/if}

        {#if toggledState}
            {props.ActiveLabel}
        {/if}
        
        {#if !toggledState}
            {props.InactiveLabel}
        {/if}
        
    </button>
    
    <style>
        .switch-light {
            animation: pulse-light 0.2s infinite ease-in;
        }
        
        @keyframes pulse-light {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.2;
            }
            100% {
                opacity: 1;
            }
        }
    </style>