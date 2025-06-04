<script>
  let { data } = $props();
</script>

<div class="container py-4">
  <a href="/products" class="btn mb-3"> Zurück </a>

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
              <li
                class="list-group-item bg-transparent border-secondary text-white"
              >
                {ingredient}
              </li>
            {/each}
          </ul>
          {#if data.user.role === "admin"}
            <form method="POST" action="?/delete">
              <input type="hidden" name="id" value={data.product._id} />
              <button
                class="btn"
                style="background-color:#dc3545;border-color:#dc3545"
              >
                Produkt löschen
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
