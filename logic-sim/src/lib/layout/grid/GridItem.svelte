<script lang="ts">
    import { getContext } from "svelte";
    import { hasContext } from "svelte";
    import type { Writable } from "svelte/store";
    import Draggable from "../draggable/Draggable.svelte";
    import { GRID_CONTEXT_KEY } from "./GridPane.svelte";

    export let x: number;
    export let y: number;
    export let draggable = false;

    const gridContext: { cellWidth: number; offsetX: Writable<number>; offsetY: Writable<number> } = getContext(GRID_CONTEXT_KEY);

    let offsetX = 0;
    let offsetY = 0;

    gridContext.offsetX.subscribe((x) => (offsetX = x));
    gridContext.offsetY.subscribe((y) => (offsetY = y));

    function handleDrag(e) {
        // todo: dragging speed (zoomed), scoll pane on drag
        e.detail.setElementOffset(
            e.detail.offsetX - (e.detail.offsetX % gridContext.cellWidth),
            e.detail.offsetY - (e.detail.offsetY % gridContext.cellWidth)
        );
    }

    function handleDragEnd(e) {
        x = x + Math.floor(e.detail.offsetX / gridContext.cellWidth) + (e.detail.offsetX <= 0 ? 1 : 0);
        y = y + Math.floor(e.detail.offsetY / gridContext.cellWidth) + (e.detail.offsetY <= 0 ? 1 : 0);
    }
</script>

{#if hasContext(GRID_CONTEXT_KEY)}
    <div style="top: {y * gridContext.cellWidth + offsetY}px; left: {x * gridContext.cellWidth + offsetX}px">
        {#if draggable}
            <Draggable on:dragging={handleDrag} on:stopdragging={handleDragEnd}>
                <slot />
            </Draggable>
        {:else}
            <slot />
        {/if}
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
