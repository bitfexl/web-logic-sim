<script lang="ts">
    import GridItem from "../layout/grid/GridItem.svelte";
    import GridPane from "../layout/grid/GridPane.svelte";
    import ZoomablePane from "../layout/ZoomablePane.svelte";
    import { WORKSPACE_DRAG_MOUSE_BTN } from "./keyConfig";

    export let zoom = 1;

    export let items: { x: number; y: number; component: ConstructorOfATypedSvelteComponent }[] = [];

    let gridPane;
</script>

<div class="wrapper">
    <ZoomablePane {zoom}>
        <GridPane
            bind:this={gridPane}
            cellWidth={25}
            showGrid={true}
            gridColor={"lightGray"}
            draggingEnabled={true}
            draggingMouseBtn={WORKSPACE_DRAG_MOUSE_BTN}
            draggingSpeed={1 / zoom}
        >
            {#each items as item (item.component)}
                <GridItem x={item.x} y={item.y} draggable={true}>
                    <svelte:component this={item.component} />
                </GridItem>
            {/each}

            <GridItem x={12} y={0} draggable={true}>
                <p style="user-select: none">I am an item!</p>
            </GridItem>
            <GridItem x={10} y={4} draggable={true}>
                <p style="user-select: none">I am another item!</p>
            </GridItem>
        </GridPane>
    </ZoomablePane>
</div>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
    }
</style>
