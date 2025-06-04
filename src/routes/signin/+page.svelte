<script>
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";
  const session = authClient.useSession();
  let { email, password, errorMessage} = $state("");

  async function handleSignIn(event) {
    event.preventDefault();

    const { data, error } = await authClient.signIn.email({
      email,
      password
    }, {
      onSuccess: (ctx) => {
        goto("/");
      },
      onError: (ctx) => {
        errorMessage = ctx.error.message;
      }
    });
  }
</script>

<div class="container mt-5" style="max-width: 400px;">
  <h2 class="mb-4">Sign in</h2>
  {#if errorMessage}
    <div class="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  {/if}
  <form onsubmit={handleSignIn}>
    <div class="mb-3">
      <label for="emailInput" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="emailInput"
        bind:value={email}
        required
      />
    </div>
    <div class="mb-3">
      <label for="passwordInput" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="passwordInput"
        bind:value={password}
        required
      />
    </div>
    <div class="mb-3 text-end">
      <a aria-current="page" href="/signup">Sign Up</a>
    </div>
    <button type="submit" class="btn w-100">Sign in</button>
  </form>
</div>
