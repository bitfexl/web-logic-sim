<script lang="ts" context="module">
    export const GRID_CONTEXT_KEY = Symbol();
</script>

<script lang="ts">
    import { setContext } from "svelte";

    export let cellWidth: number;
    export let allowOverflow = false;

    setContext(GRID_CONTEXT_KEY, {
        get cellWidth() {
            return cellWidth;
        },
    });
</script>

<div class:noOverflow={!allowOverflow}>
    <slot />
</div>

<style>
    div {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid red;
    }

    .noOverflow {
        overflow: hidden;
    }
</style>
