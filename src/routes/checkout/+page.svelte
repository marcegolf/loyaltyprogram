<script>
    import { enhance } from "$app/forms";
    let { data } = $props();
    // TODO: State of total cost does not update after making a checkout
    let { totalCost } = $state(0);

    totalCost = data.cart.reduce((sum, item) => sum + item.price, 0);
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
        <button class="btn btn-primary mt-2">Checkout</button>
    </form>
</div>