<script>

const props = $props();  

function handleClick(event) {
    if (typeof props.onclick === 'function') {
        props.onclick(event);
    }
}

const display = "https://cdn.imgchest.com/files/b23dd30d54e1.png"

</script>

<button onclick={handleClick} style="background-image: url({display});" class="rounded-sm filter hover:brightness-125 duration-300 w-10 h-7 bg-center bg-cover bg-contain hover:bg-gray-700"></button>


  