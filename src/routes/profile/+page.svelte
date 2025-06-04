<script>
    import { enhance } from "$app/forms";
    let { data } = $props();
</script>

<h1>Profil bearbeiten</h1>
<form method="POST" action="?/updateProfile">
  <div class="mb-3">
    <label for="" class="form-label">Name</label>
    <input name="name" class="form-control" type="text" bind:value={data.user.name} />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Email</label>
    <input name="email" class="form-control" type="text" bind:value={data.user.email} />
  </div>
  <button type="submit" class="btn w-100"> Aktualisieren </button>
</form>