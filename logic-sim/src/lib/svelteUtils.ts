import { onDestroy } from "svelte";

// https://svelte.dev/tutorial/ondestroy
export function onInterval(callback, milliseconds) {
    const interval = setInterval(callback, milliseconds);

    onDestroy(() => {
        clearInterval(interval);
    });
}
