<template>
  <footer class="text-center text-lg-start text-white">
    <div class="container p-4 pb-0">
      <div class="row">
        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold text-warning">
            Recipedeck
          </h6>
          <p>
            A platform for freely sharing recipes between people. Let your culinary world expand.
          </p>
        </div>
        
        <!-- navigation links -->
        <nav class="d-flex flex-column col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold text-warning">Navigation</h6>
          <router-link to="/" class="nav-link text-white">Home</router-link>
          <router-link to="/upload" class="nav-link text-white">Upload Recipe</router-link>
          <router-link to="/recipes" class="nav-link text-white">My Recipes</router-link>
          <router-link to="/fav" class="nav-link text-white">Favorite Recipes</router-link>
        </nav>

        <!-- contact information -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 class="text-uppercase mb-4 font-weight-bold text-warning">Contact</h6>
          <p><i class="bi bi-house-fill mr-3"></i> Garches 92380, FR</p>
          <p><i class="bi bi-envelope-fill mr-3"></i> maxnocquet@gmail.com</p>
          <p><i class="bi bi-telephone-fill mr-3"></i> +33 6 82 63 00 67</p>
        </div>
      </div>
      <div class="p-3 d-flex justify-content-center gap-1">
        <span>© 2026</span>
        <a class="text-white" href="/"
            >Recipedeck.com</a
          >
      </div>
    </div>
  </footer>
</template>

<style scoped>

footer {
  background-color: var(--head-bg-color);
}

footer .nav-link {
  text-decoration: none;
}

footer .nav-link:hover, footer .nav-link.router-link-exact-active {
  text-decoration: underline;
}

footer .nav-link:focus-visible {
  outline: 4px solid var(--bs-warning);
  outline-offset: 2px;
}

footer i {
  color: var(--color-gold);
}

</style>