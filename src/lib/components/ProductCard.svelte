<script>
  // TODO: Check enhance
  import { enhance } from "$app/forms";
  let { product } = $props();
</script>

<div class="card h-100 bg-dark text-white">
  <img src={product.poster} class="card-img-top" alt={product.name} />

  <div class="card-body d-flex flex-column">
    <h5 class="card-title">
      <a
        href={"/products/" + product._id}
        class="text-white text-decoration-none"
      >
        {product.name}
      </a>
    </h5>

    <p class="card-text mb-2">Preis: {product.price}</p>

    <!-- <strong>Ingredients:</strong>
    <ul class="list-group list-group-flush mb-3">
      {#each product.ingredients as ingredient}
        <li class="list-group-item bg-dark border-dark text-white">
          {ingredient}
        </li>
      {/each}
    </ul> -->

    <form method="POST" action="?/addToCart" use:enhance>
      <input
        type="hidden"
        name="product"
        value={JSON.stringify(product)}
      />
      <button class="btn btn-primary mt-auto">
        In den Warenkorb
      </button>
    </form>
  </div>
</div>