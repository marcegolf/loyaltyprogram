<script>
    import { enhance } from "$app/forms";
    let { data } = $props();
    let totalCost = $derived(
        data.cart.reduce((sum, item) => sum + item.price, 0),
    );

    // just do alerts as a feedback. nothing fancy
    function alertCheckout() {
        alert(`Wir haben deine Bestellung für CHF ${totalCost} erhalten!`);
    }
</script>

<div class="row flex-column">
    {#each data.cart as item}
        <div class="col-12 mb-3">
            <div class="card h-100">
                <div
                    class="card-body d-flex justify-content-between align-items-center"
                >
                    <span>{item.name}</span>
                    <span>CHF {item.price}</span>
                </div>
            </div>
        </div>
    {/each}
</div>

{#if data.cart.length > 0}
    <div class="mt-4 text-end">
        <h2>CHF {totalCost}</h2>
        <form method="POST" action="?/makeCheckout" use:enhance>
            <input
                type="hidden"
                name="cart"
                value={JSON.stringify(data.cart)}
            />
            <button class="btn w-100 mt-2" onclick={alertCheckout}
                >Bestellen</button
            >
        </form>
    </div>
{:else}
    <div
        class="col-12 d-flex justify-content-center align-items-center"
        style="padding-top: 100px;"
    >
        <p>Dein Warenkorb ist leer.</p>
    </div>
{/if}
