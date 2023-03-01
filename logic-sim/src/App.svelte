<script lang="ts">
    import { test as logicTest } from "./lib/logic/logicTest";
    import FullWorkSpace from "./lib/logicUi/FullWorkSpace.svelte";

    logicTest();

    let gridPane;
    let gridPaneDiv: HTMLElement;
    let item: HTMLElement;

    let zoom = 1;

    function gridDrag(e) {
        e.detail.setElementOffset(e.detail.offsetX - (e.detail.offsetX % 25), e.detail.offsetY - (e.detail.offsetY % 25));
        let rectItem = item.getBoundingClientRect();
        let rectDiv = gridPaneDiv.getBoundingClientRect();
        let cell = gridPane.getCell(rectItem.x - rectDiv.x, rectItem.y - rectDiv.y);
        console.log(cell);
    }
</script>

<main>
    <div style="width: 600px; height: 600px">
        <FullWorkSpace />
    </div>

    <input type="range" min="0.5" max="1.5" step="0.1" bind:value={zoom} />
    {zoom}
</main>

<style lang="scss">
    main {
        display: inline-block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
