<script lang="ts">
    import { onMount } from "svelte";
    import { createSVG, addPath, smoothCurve } from "./rendersvg";

    let div: HTMLElement;

    onMount(() => {
        let svg = createSVG(200, 200);

        svg.style.filter = "drop-shadow(0 0 2px gray)";

        let style = {
            color: "red",
            width: 4,
        };

        addPath(svg, "M 2 2 " + smoothCurve(40, 100), style);
        addPath(svg, "M 40 100 " + smoothCurve(91, 30), style);
        addPath(svg, "M 50 50 " + smoothCurve(50, 0), style);
        addPath(svg, "M 100 50 " + smoothCurve(0, 40), style);

        div.appendChild(svg);
    });
</script>

<div bind:this={div} />
