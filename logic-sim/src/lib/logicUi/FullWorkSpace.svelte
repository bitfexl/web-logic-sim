<script lang="ts">
    import ComponentList from "./ComponentList.svelte";
    import WorkSpace from "./WorkSpace.svelte";
</script>

<div>
    <ComponentList />
    <WorkSpace />
</div>

<style>
    div {
        display: grid;
        grid-template-columns: 1fr 9fr;
        width: 100%;
        height: 100%;
    }
</style>
