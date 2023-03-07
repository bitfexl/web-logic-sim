<script lang="ts">
    import ComponentList from "./ComponentList.svelte";
    import Gate from "./LogicComponent.svelte";
    import WorkSpace from "./WorkSpace.svelte";

    let x = 1;

    let items = [
        {
            x: 1,
            y: 1,
            component: Gate,
            key: Symbol(),
        },
    ];

    function addComponenet() {
        console.log("adding...");

        items = [
            ...items,
            {
                x: x + 1,
                y: x,
                component: Gate,
                key: Symbol(),
            },
        ];

        x = x + 1;
    }
</script>

<div>
    <ComponentList />
    <WorkSpace {items} />
</div>

<button on:click={addComponenet}>Add component</button>

<style>
    div {
        display: grid;
        grid-template-columns: 1fr 9fr;
        width: 100%;
        height: 100%;
    }
</style>
