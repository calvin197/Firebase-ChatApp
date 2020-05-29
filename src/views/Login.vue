<template>
  <div class="container">
    <div class="card login card-panel green white-text center">
      <h3>Login</h3>
      <form action="index.html" v-if="!isGuest">
        <div class="input-field">
          <i class="material-icons prefix">email</i>
          <input type="email" id="email" v-model="email" />
          <label class="white-text" for="email">Email Address</label>
        </div>
        <div class="input-field">
          <i class="material-icons prefix">lock</i>
          <input type="password" id="password" v-model="password" />
          <label class="white-text" for="password">Password</label>
        </div>
        <button
          v-on:click="login"
          class="button btn btn-large btn-extended grey lighten-4 black-text"
        >
          Login
        </button>
        <router-link
          to="/register"
          tag="button"
          class="button btn btn-large btn-extended grey lighten-4 black-text"
          >Register</router-link
        >
      </form>
      <form v-if="isGuest" @submit.prevent="login" class="text-center">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Please enter your name..."
            name="name"
            v-model="name"
          />
          <p v-if="errorText" class="text-danger">{{ errorText }}</p>
        </div>
        <button
          type="submit"
          class="btn btn-large btn-extended blue lighten-4 white-text"
        >
          Sign in as guest
        </button>
      </form>
      <div class="login-buttons">
        <button v-if="!isGuest" v-on:click="signAsGuest" class="button btn grey lighten-4 black-text">
          Guest
        </button>
        <button v-on:click="googleLogin" class="button btn grey lighten-4 black-text">
          Google
        </button>
        <button v-on:click="facebookLogin" class="button btn grey lighten-4 black-text"> 
          Facebook
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "@/firebase/init";
import { auth } from "firebase/app";
export default {
  name: "login",
  data() {
    return {
      name: "",
      errorText: null,
      isGuest: false
    };
  },
  methods: {
    login() {
      if (this.name) {
        this.$router.push({
          name: "Chat",
          params: { name: this.name, status: "Guest" }
        });
      } else {
        this.errorText = "Please enter a name first!";
      }
    },
    signAsGuest() {
      this.isGuest = true;
    },
    googleLogin() {
      var provider = new auth.GoogleAuthProvider();
      this.signInWithPopup(provider, "Google");
    },
    facebookLogin() {
      var provider = new auth.FacebookAuthProvider();
      this.signInWithPopup(provider, "Facebook");
    },
    signInWithPopup(provider, status) {
      auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          this.$router.push({
            name: "Chat",
            params: { name: user.displayName, status: status }
          });
        })
        .catch(error => {
          // Handle Errors here.
          console.log("Error logging in!");
          var errorCode = error.code;
          console.log(`errorCode: ${errorCode}`);
          var errorMessage = error.message;
          console.log(`errorMessage: ${errorMessage}`);
          var email = error.email;
          console.log(`email: ${email}`);
          var credential = error.credential;
          console.log(`credential: ${credential}`);
        });
    }
  }
};
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
.button {
  margin: 5px
}
</style>
