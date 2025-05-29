<script>
  let { product } = $props();
</script>

<div class="product-card">
  <div>
    <img class="img-fluid" src={product.poster} alt=""/>
  </div>
  <div class="details">
    <div class="title">
      <a href={"/products/" + product._id}>
        {product.name}
      </a>
    </div>
    <div>
      Preis: {product.price}
    </div>
    <div class="ingredients">
      <strong>Ingredients:</strong>
      <ul>
        {#each product.ingredients as ingredient}
          <li>{ingredient}</li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  .product-card {
    border: 1px solid #555;
    height: 100%;
    background-color: #444;
    color: white;
  }
  .details {
    padding: 0.5em;
  }
  .title {
    font-weight: bold;
  }
  .ingredients ul {
    list-style-type: disc;
    padding-left: 20px;
    margin-top: 0.25em;
  }
</style>
