<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
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
          <button type="submit" class="btn btn-primary">
            Sign in as guest
          </button>
        </form>
        <div class="login-buttons">
          <button v-if="!isGuest" v-on:click="signAsGuest" class="login-button">
            Guest
          </button>
          <button v-on:click="googleLogin" class="login-button">Google</button>
          <button v-on:click="facebookLogin" class="login-button">
            Facebook
          </button>
        </div>
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
.login-button {
  max-width: 450px;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
