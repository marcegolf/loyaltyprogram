<script>
  let { data } = $props();
</script>

<div class="container py-4">
  <a href="/products" class="btn mb-3">
    Back to products
  </a>

  <div class="card bg-transparent text-white">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src={data.product.poster}
          class="img-fluid rounded-start"
          alt={data.product.name}
        />
      </div>
      <div class="col-md-8">
        <div class="card-body d-flex flex-column">
          <h1 class="card-title">{data.product.name}</h1>

          <!-- <strong>Zutaten:</strong> -->
          <ul class="list-group list-group-flush mb-3">
            {#each data.product.ingredients as ingredient}
              <li class="list-group-item bg-transparent border-secondary text-white">
                {ingredient}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>