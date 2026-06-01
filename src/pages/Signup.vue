<template>
  <div class="card">
    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Register</h3>
    <form>

      <div data-mdb-input-init class="form-outline mb-4">
        <input type="text" id="form3Example1cg" class="form-control form-control-lg" />
        <label class="form-label" for="form3Example1cg">Your Name</label>
      </div>

      <div data-mdb-input-init class="form-outline mb-4">
        <input type="email" id="form3Example3cg" class="form-control form-control-lg" />
        <label class="form-label" for="form3Example3cg">Your Email</label>
      </div>

      <div data-mdb-input-init class="form-outline mb-4">
        <input type="password" id="form3Example4cg" class="form-control form-control-lg" />
        <label class="form-label" for="form3Example4cg">Password</label>
      </div>

      <div data-mdb-input-init class="form-outline mb-4">
        <input type="password" id="form3Example4cdg" class="form-control form-control-lg" />
        <label class="form-label" for="form3Example4cdg">Repeat your password</label>
      </div>

      <div class="d-flex justify-content-center">
        <button  type="button" data-mdb-button-init
          data-mdb-ripple-init class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
      </div>

      <p class="text-center text-muted mt-5 mb-0">Have already an account? <router-link to="/login">Login here</router-link></p>

    </form>
  </div>
</template>