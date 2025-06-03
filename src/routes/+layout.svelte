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
  <div class="container mt-3">
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
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ms-auto">
        {#if $session.data}
          <li class="nav-item">
            <a class="nav-link" href="/products">Bestellung</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profil
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="/profile">Meine Daten</a>
              <a class="dropdown-item" href="/checkout">Mein Warenkorb</a>
              <a class="dropdown-item" href="/signin" onclick={handleLogout}
                >Logout</a
              >
            </div>
          </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link" href="/signin">Login</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>
