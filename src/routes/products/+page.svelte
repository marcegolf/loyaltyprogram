<script>
    let { data } = $props();
    import ProductCard from "$lib/components/ProductCard.svelte";
</script>

<div class="row">
    {#if data.user.role === "admin"}
        <div class="my-4">
            <a href="/products/create" class="btn btn-primary">Neues Produkt erfassen</a>
        </div>
    {/if}
    <p><i>Die Rechte an allen Bildern sind vorhanden.</i></p>
    {#each data.products as product}
        <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
            <ProductCard {product}></ProductCard>
        </div>
    {/each}
</div>
