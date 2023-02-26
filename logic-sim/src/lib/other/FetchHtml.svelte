<script lang="ts">
    export let url: string;

    let request = fetch(url);
</script>

{#await request then response}
    {#await response.text() then html}
        {@html html}
    {/await}
{/await}
