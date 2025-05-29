<script>
    let { data } = $props();
    import ProductCard from "$lib/components/ProductCard.svelte";
</script>

<div class="row">
    {#each data.products as product}
        <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
            <ProductCard {product}></ProductCard>
        </div>
    {/each}
</div>