<template>
  <div id="logreg-forms">
    <form class="form-signin" v-if="!isGuest">
      <h1 class="h3 mb-3 font-weight-normal" style="text-align: center">
        Sign in
      </h1>
      <div class="social-login">
        <button v-on:click="facebookLogin" class="btn facebook-btn social-btn" type="button">
          <span><i class="fab fa-facebook-f"></i> Sign in with Facebook</span>
        </button>
        <button v-on:click="googleLogin" class="btn google-btn social-btn" color="black" type="button">
          <span><i class="fab fa-google-plus-g"></i> Sign in with Google+</span>
        </button>
      </div>
      <div class="social-login">
        <button v-on:click="signAsGuest" class="btn" type="button">
          <span><i class="fas fa-user"></i> Sign in as Guest</span>
        </button>
      </div>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required=""
        autofocus=""
      />
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required=""
      />
      <button class="btn btn-success btn-block" type="submit">
        <i class="fas fa-sign-in-alt"></i> Sign in
      </button>
    </form>

    <form class="form-signin" v-if="isGuest" @submit.prevent="login">
		<h1 class="h3 mb-3 font-weight-normal" style="text-align: center">
        Sign in
      </h1>
      <input
        type="text"
        id="name"
        class="form-control"
        placeholder="Enter your name"
        required=""
        autofocus=""
		v-model="name"
		name="name"
      />
      <button class="btn btn-success btn-block" type="submit">
        <i class="fas fa-sign-in-alt"></i> Sign in
      </button>
    </form>
    <hr />
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
/* sign in FORM */
#logreg-forms {
  width: 412px;
  margin: 10vh auto;
  background-color: #f3f3f3;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
#logreg-forms form {
  width: 100%;
  max-width: 410px;
  padding: 15px;
  margin: auto;
}
#logreg-forms .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
#logreg-forms .form-control:focus {
  z-index: 2;
}
#logreg-forms .form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
#logreg-forms .form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#logreg-forms .social-login {
  width: 390px;
  margin: 0 auto;
  margin-bottom: 14px;
}
#logreg-forms .social-btn {
  font-weight: 100;
  color: white;
  width: 190px;
  font-size: 0.9rem;
}

#logreg-forms a {
  display: block;
  padding-top: 10px;
  color: lightseagreen;
}

#logreg-form .lines {
  width: 200px;
  border: 1px solid red;
}

#logreg-forms button[type="submit"] {
  margin-top: 10px;
}

#logreg-forms .facebook-btn {
  background-color: #3c589c;
}

#logreg-forms .google-btn {
  background-color: #df4b3b;
}

#logreg-forms .form-reset,
#logreg-forms .form-signup {
  display: none;
}

#logreg-forms .form-signup .social-btn {
  width: 210px;
}

#logreg-forms .form-signup input {
  margin-bottom: 2px;
}

.form-signup .social-login {
  width: 210px !important;
  margin: 0 auto;
}

/* Mobile */

@media screen and (max-width: 500px) {
  #logreg-forms {
    width: 300px;
  }

  #logreg-forms .social-login {
    width: 200px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  #logreg-forms .social-btn {
    font-size: 1.3rem;
    font-weight: 100;
    color: white;
    width: 200px;
    height: 56px;
  }
  #logreg-forms .social-btn:nth-child(1) {
    margin-bottom: 5px;
  }
  #logreg-forms .social-btn span {
    display: none;
  }
  #logreg-forms .facebook-btn:after {
    content: "Facebook";
  }

  #logreg-forms .google-btn:after {
    content: "Google+";
  }
}
</style>
