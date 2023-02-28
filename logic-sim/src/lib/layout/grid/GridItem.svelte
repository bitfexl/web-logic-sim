<script lang="ts">
    import { getContext } from "svelte";
    import { hasContext } from "svelte";
    import type { Writable } from "svelte/store";
    import { GRID_CONTEXT_KEY } from "./GridPane.svelte";

    export let x: number;
    export let y: number;

    const gridContext: { cellWidth: number; offsetX: Writable<number>; offsetY: Writable<number> } = getContext(GRID_CONTEXT_KEY);

    let offsetX = 0;
    let offsetY = 0;

    gridContext.offsetX.subscribe((x) => (offsetX = x));
    gridContext.offsetY.subscribe((y) => (offsetY = y));
</script>

{#if hasContext(GRID_CONTEXT_KEY)}
    <div style="top: {y * gridContext.cellWidth + offsetY}px; left: {x * gridContext.cellWidth + offsetX}px">
        <slot />
    </div>
{:else}
    <slot />
{/if}

<style>
    div {
        display: inline-block;
        position: absolute;
        border: 1px solid green;
    }
</style>
