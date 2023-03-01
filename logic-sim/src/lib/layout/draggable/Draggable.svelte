<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let bindToMouse = true;
    export let autoReset = true;

    const dispatch = createEventDispatcher();

    let containerDiv;

    let dragging = false;

    let offsetX = 0,
        offsetY = 0;

    let elementOffsetX = 0,
        elementOffsetY;

    function onMouse(e) {
        if (e.type == "mouseup" || e.type == "mouseleave") {
            dragging = false;

            dispatch("stopdragging", {
                offsetX,
                offsetY,
                setElementOffset,
                resetOffset,
            });

            if (autoReset) {
                resetOffset();
            }
        } else if (e.type == "mousedown" && e.button == 0 && checkTarget(e.target)) {
            dragging = true;
        } else if (dragging && e.type == "mousemove") {
            let xDelta = e.movementX;
            let yDelta = e.movementY;

            offsetX += xDelta;
            offsetY += yDelta;

            if (bindToMouse) {
                setElementOffset(offsetX, offsetY);
            }

            dispatch("dragging", {
                xDelta,
                yDelta,
                offsetX,
                offsetY,
                setElementOffset,
                resetOffset,
            });
        }
    }

    function setElementOffset(x: number, y: number) {
        elementOffsetX = x;
        elementOffsetY = y;
    }

    function resetOffset() {
        setElementOffset(0, 0);
        offsetX = 0;
        offsetY = 0;
    }

    function checkTarget(target) {
        if (target == containerDiv) {
            return true;
        } else if (target.parentNode == null) {
            return false;
        }
        return checkTarget(target.parentNode);
    }
</script>

<svelte:body on:mousedown={onMouse} on:mousemove={onMouse} on:mouseup={onMouse} on:mouseleave={onMouse} />

<div bind:this={containerDiv} style="top: {elementOffsetY}px; left: {elementOffsetX}px">
    <slot />
</div>

<style>
    div {
        display: inline-block;
        position: relative;
        z-index: 1;
    }
</style>
