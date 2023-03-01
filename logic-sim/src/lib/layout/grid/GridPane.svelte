<script lang="ts" context="module">
    export const GRID_CONTEXT_KEY = Symbol();
</script>

<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { writable } from "svelte/store";
    import { onInterval } from "../../svelteUtils";

    export let cellWidth: number;

    export let allowOverflow = false;

    export let showGrid = false;
    export let gridColor = "gray";

    export let draggingEnabled = false;
    export let draggingSpeed = 1;
    export let draggingMouseBtn = 0;

    // dragging
    let dragging = false;
    let itemOriginOffsetX = writable(0),
        itemOriginOffsetY = writable(0);

    // background stuff
    let gridDiv: HTMLElement;
    let gridWidth = 0;
    let gridHeight = 0;
    let backgroundCanvas: HTMLCanvasElement;
    let ctx2d: CanvasRenderingContext2D = null;
    let gridOffsetX = 0,
        gridOffsetY = 0; // offset because of dragging

    // setup context for items
    setContext(GRID_CONTEXT_KEY, {
        get cellWidth() {
            return cellWidth;
        },

        get offsetX() {
            return itemOriginOffsetX;
        },

        get offsetY() {
            return itemOriginOffsetY;
        },
    });

    // setup background grid
    onMount(() => {
        ctx2d = backgroundCanvas.getContext("2d");
        drawBackgroundGrid();
    });

    // width and height for background grid
    onInterval(() => {
        if (!gridDiv) {
            return;
        }

        let rect = gridDiv.getBoundingClientRect();

        if (gridWidth != rect.width) {
            gridWidth = rect.width;
        }

        if (gridHeight != rect.height) {
            gridHeight = rect.height;
        }
    }, 50);

    // update canvas/background grid
    $: {
        gridWidth;
        gridHeight;
        showGrid;
        gridColor;
        drawBackgroundGrid();
    }

    function onMouse(e) {
        // handle mouse evnets (drag)
        if (e.target != gridDiv) {
            return;
        }

        if (e.type == "mouseup" || e.type == "mouseleave") {
            dragging = false;
        } else if (draggingEnabled && e.type == "mousedown" && e.button == draggingMouseBtn) {
            dragging = true;
        } else if (dragging && e.type == "mousemove") {
            let xDelta = e.movementX * draggingSpeed;
            let yDelta = e.movementY * draggingSpeed;

            itemOriginOffsetX.update((x) => x + xDelta);
            itemOriginOffsetY.update((y) => y + yDelta);

            gridOffsetX += xDelta;
            gridOffsetY += yDelta;
            gridOffsetX %= cellWidth;
            gridOffsetY %= cellWidth;

            drawBackgroundGrid();
        }
    }

    function drawBackgroundGrid() {
        if (!ctx2d || !showGrid) {
            if (ctx2d) {
                ctx2d.clearRect(0, 0, gridWidth, gridHeight);
            }
            return;
        }
        backgroundCanvas.width = gridWidth;
        backgroundCanvas.height = gridHeight;

        ctx2d.clearRect(0, 0, gridWidth, gridHeight);

        ctx2d.lineWidth = 0.5;
        ctx2d.strokeStyle = gridColor;

        for (let i = gridOffsetX; i <= gridWidth; i += cellWidth) {
            ctx2d.moveTo(i, 0);
            ctx2d.lineTo(i, gridHeight);
        }

        for (let i = gridOffsetY; i <= gridWidth; i += cellWidth) {
            ctx2d.moveTo(0, i);
            ctx2d.lineTo(gridWidth, i);
        }

        ctx2d.stroke();
    }
</script>

<div
    class:noOverflow={!allowOverflow}
    bind:this={gridDiv}
    on:mousedown={onMouse}
    on:mousemove={onMouse}
    on:mouseup={onMouse}
    on:mouseleave={onMouse}
    on:contextmenu|preventDefault={() => {}}
>
    <canvas class="bgCanvas" bind:this={backgroundCanvas} />
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

    .bgCanvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -999;
    }
</style>
