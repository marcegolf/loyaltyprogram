<script>
    let { form } = $props();
</script>

<a href="/products" class="back-link">Back</a>
<h1>Add a product</h1>
<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="" class="form-label">Name</label>
    <input name="name" class="form-control" type="text" required />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Price</label>
    <input name="price" class="form-control" type="text" required />
  </div>
<div class="mb-3">
    <label for="ingredients" class="form-label">Ingredients</label>
    <input
        name="ingredients"
        id="ingredients"
        class="form-control"
        type="text"
        placeholder="Enter ingredients separated by commas"
    />
</div>
  <button type="submit" class="btn"> Add products </button>
</form>

{#if form?.success}
  <p>Added new product to catalog</p>
{/if}

<style>
  .back-link {
      text-decoration: none;
      color: #999;
      font-size: 14px;
    }
</style>