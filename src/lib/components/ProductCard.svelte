<script>
  // TODO: Check enhance
  import { enhance } from "$app/forms";
  let { product } = $props();
</script>

<div class="d-flex justify-content-center">
  <!-- <div class="card h-100 bg-transparent text-white" style="max-width: 18rem;"> -->
   <div class="card h-100 bg-transparent text-white">
    <img src={product.poster} class="card-img-top" alt={product.name} />

    <div class="card-body d-flex flex-column align-items-center text-center">
      <h5 class="card-title">
      <a
        href={"/products/" + product._id}
        class="text-white text-decoration-none"
      >
        {product.name}
      </a>
      </h5>

      <p class="card-text mb-2">CHF {product.price}</p>

      <form method="POST" action="?/addToCart" use:enhance>
      <input
        type="hidden"
        name="product"
        value={JSON.stringify(product)}
      />
      <button class="btn mt-auto">
        In den Warenkorb
      </button>
      </form>
    </div>
  </div>
</div>