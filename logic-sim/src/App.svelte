<script lang="ts">
    import svelteLogo from "./assets/svelte.svg";
    import Counter from "./lib/Counter.svelte";
    import ZoomablePane from "./lib/ZoomablePane.svelte";

    let zoom = 1;
</script>

<main>
    <ZoomablePane {zoom}>
        <p>I am zoomable</p>
    </ZoomablePane>
    <input type="range" min="0.5" max="1.5" step="0.1" bind:value={zoom} />
    {zoom}
</main>

<style lang="scss">
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;

        &:hover {
            filter: drop-shadow(0 0 2em #646cffaa);
        }
        &.svelte:hover {
            filter: drop-shadow(0 0 2em #ff3e00aa);
        }
    }
    .read-the-docs {
        color: #888;
    }
</style>
