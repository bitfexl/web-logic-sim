<script lang="ts">
    import { getContext } from "svelte";
    import { hasContext } from "svelte";
    import { GRID_CONTEXT_KEY } from "./GridPane.svelte";

    export let x: number;
    export let y: number;

    const gridContext: { cellWidth: number } = getContext(GRID_CONTEXT_KEY);
</script>

{#if hasContext(GRID_CONTEXT_KEY)}
    <div style="top: {y * gridContext.cellWidth}px; left: {x * gridContext.cellWidth}px">
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
