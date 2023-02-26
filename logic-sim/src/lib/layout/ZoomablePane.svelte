<script lang="ts">
    export let zoom: number = 1;
</script>

<div style="zoom: {zoom}">
    <slot />
</div>

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>
