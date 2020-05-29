<template>
  <div class="container">
    <div class="login card-panel grey lighten-4 black-text center">
      <h3>register</h3>
      <form action="index.html" v-if="!isGuest">
        <div class="input-field">
          <i class="material-icons prefix">email</i>
          <input type="email" id="email" v-model="email" />
          <label for="email">Email Address</label>
        </div>
        <div class="input-field">
          <i class="material-icons prefix">lock</i>
          <input type="password" id="password" v-model="password" />
          <label for="password">Password</label>
        </div>
        <button
          v-on:click="register"
          class="btn btn-large btn-extended grey lighten-4 black-text"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'register',
    data: function () {
        return {}
    }
}
</script>

<style>
.login {
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.login-buttons {
  max-width: 450px;
  margin-top: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
