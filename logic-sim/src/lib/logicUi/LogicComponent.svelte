<script lang="ts">
    import type { LogicComponent } from "../logic/logic";

    export let component: LogicComponent;

    let inputs = component.getInputs(); // todo: subscribe to changes or something
    let outputs = component.getOutputs();
</script>

<div class="component">
    <div class="inputs">
        {#each inputs as input}
            <div class="connector input">
                <span class="name label">{input.name}</span>
            </div>
        {/each}
    </div>

    <p class="label">{component.name}</p>

    <div class="outputs">
        {#each outputs as output}
            <div class="connector output">
                <span class="name label">{output.name}</span>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .component {
        display: inline-block;
        position: relative;
        background-color: lightslategray;
        border: 1px solid gray;
        display: grid;
        grid-template-columns: min-content max-content min-content;
        gap: 0;
        user-select: none;

        &::before {
            /* direction indicator */
            content: "\1F846";
            position: absolute;
            left: 15px;
        }
    }

    .connector {
        width: 20px;
        height: 20px;
        background-color: lightcoral;
        border-radius: 999px;
        margin: 5px;

        &:hover {
            background-color: red;
        }

        .name {
            visibility: hidden;
            display: inline-block;
        }

        &:hover .name {
            visibility: visible;
        }

        &.input {
            transform: translate(-15px, 0);

            .name {
                transform: translate(calc(-100% - 5px), 0);
            }
        }

        &.output {
            transform: translate(15px, 0);

            .name {
                transform: translate(calc(100% - 10px /* connector width / 2 */ + 8px /* looks good enough */), 0);
            }
        }
    }

    .label {
        font-family: monospace;
        font-size: larger;
    }
</style>
