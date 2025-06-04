<script>
    import { enhance } from "$app/forms";
    let { data } = $props();
    let totalCost = $derived(
        data.cart.reduce((sum, item) => sum + item.price, 0),
    );

    // just do alerts as a feedback. nothing fancy
    function alertCheckout() {
        alert(
            `Wir haben deine Bestellung für CHF ${totalCost} erhalten!`,
        );
    }
</script>

<h1>Checkout</h1>
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

<div class="mt-4 text-end">
    <h2>CHF {totalCost}</h2>
    <form method="POST" action="?/makeCheckout" use:enhance>
        <input type="hidden" name="cart" value={JSON.stringify(data.cart)} />
        <button class="btn mt-2" onclick={alertCheckout}>Checkout</button>
    </form>
</div>
