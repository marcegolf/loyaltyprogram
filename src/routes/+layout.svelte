<script>
  import "./style.css";
  let { children } = $props();
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";

  const session = authClient.useSession();

  // simple logout handler
  async function handleLogout() {
    await authClient.signOut();
  }
</script>

<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img
        src="/logo.png"
        height="40"
        class="d-inline-block align-top"
        alt="Few Secs."
      />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        {#if $session.data}
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/products"
              >Bestellung</a
            >
          </li>
        {/if}
        <li class="nav-item">
          {#if $session.data}
            <a
              class="nav-link"
              aria-current="page"
              href="/signin"
              onclick={handleLogout}>Logout</a
            >
          {:else}
            <a class="nav-link" aria-current="page" href="/signin">Login</a>
          {/if}
        </li>
        {#if $session.data}
          <li class="nav-item">
            <a class="nav-link" href="/checkout">
              <span class="material-icons">shopping_cart</span>
            </a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>
