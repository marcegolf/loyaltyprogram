<script>
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/auth-client";
    const session = authClient.getSession();
    let { name, email, password, errorMessage } = $state("");

    async function handleSignUp(event) {
        event.preventDefault();

        const { data, error } = authClient.signUp.email({
            email,
            password,
            name
        },
        {
            onSuccess: (ctx) => {
                console.log(ctx.data.name);
                goto("/");
            },
            onError: (ctx) => {
                errorMessage = ctx.error.message;
            }
        });
    }
</script>

<div class="container mt-5" style="max-width: 400px;">
  <h2 class="mb-4">Sign up</h2>
  {#if errorMessage}
    <div class="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  {/if}
  <form onsubmit={handleSignUp}>
    <div class="mb-3">
      <label for="emailInput" class="form-label">Full Name</label>
      <input
        type="text"
        class="form-control"
        id="nameInput"
        bind:value={name}
        required
      />
    </div>
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
      <a aria-current="page" href="/signin" style="color: #e9d356">Sign In</a>
    </div>
    <button type="submit" class="btn w-100">Sign up</button>
  </form>
</div>