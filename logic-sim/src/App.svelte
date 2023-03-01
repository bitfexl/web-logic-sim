<script lang="ts">
    import GridItem from "./lib/layout/grid/GridItem.svelte";
    import GridPane from "./lib/layout/grid/GridPane.svelte";
    import SvgTest from "./lib/svg/SVGTest.svelte";
    import ZoomablePane from "./lib/layout/ZoomablePane.svelte";
    import { test as logicTest } from "./lib/logic/logicTest";
    import Draggable from "./lib/layout/draggable/Draggable.svelte";

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
    <Draggable on:dragging={gridDrag}>
        <p bind:this={item}>I am draggable!</p>
    </Draggable>

    <div bind:this={gridPaneDiv} style="width: 600px; height: 600px">
        <ZoomablePane {zoom}>
            <GridPane
                bind:this={gridPane}
                cellWidth={25}
                showGrid={true}
                gridColor={"lightGray"}
                draggingEnabled={true}
                draggingMouseBtn={2}
                draggingSpeed={1 / zoom}
            >
                <GridItem x={12} y={0} draggable={true}>
                    <p style="user-select: none">I am an item!</p>
                </GridItem>
                <GridItem x={10} y={0} draggable={true}>
                    <SvgTest />
                </GridItem>
            </GridPane>
        </ZoomablePane>
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
