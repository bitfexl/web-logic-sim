<script lang="ts">
    import GridItem from "./lib/layout/grid/GridItem.svelte";
    import GridPane from "./lib/layout/grid/GridPane.svelte";
    import SvgTest from "./lib/svg/SVGTest.svelte";
    import ZoomablePane from "./lib/layout/ZoomablePane.svelte";
    import { test as logicTest } from "./lib/logic/logicTest";

    logicTest();

    let zoom = 1;
</script>

<main>
    <div style="width: 600px; height: 600px">
        <ZoomablePane {zoom}>
            <GridPane cellWidth={50}>
                <GridItem x={12} y={0}>
                    <p>I am an item!</p>
                </GridItem>
                <GridItem x={10} y={0}>
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
