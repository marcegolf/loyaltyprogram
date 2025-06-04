<script>
    let { form } = $props();
</script>

<a href="/products" class="btn mb-3"> Zurück </a>
<h1>Neues Produkt erfassen</h1>
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
        placeholder="Gib die Zutaten getrennt durch Kommas ein"
    />
</div>
  <button type="submit" class="btn">Produkt hinzufügen</button>
</form>

{#if form?.success}
  <p>Neues Produkt wurde erfasst!</p>
{/if}