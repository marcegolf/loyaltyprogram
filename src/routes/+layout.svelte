<script>
  import "./style.css";
    let { children } = $props();
</script>

<nav
  class="navbar navbar-expand-lg"
>
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img src="logo.png" height="40" class="d-inline-block align-top" alt="Few Secs.">
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
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/products"
            >Bestellung</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/auth"
            >Login</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>