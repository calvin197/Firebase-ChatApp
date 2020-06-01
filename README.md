# Firebase-ChatApp

> This is a Chat App built with Firebase, Vue.js, Node.js, Bootstrap and Font Awesome.

> It is deployed using Heroku: <a href="https://vue-js-firebase-chat-app.herokuapp.com/">https://vue-js-firebase-chat-app.herokuapp.com/</a>

> This Chat App has achieved a <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fvue-js-firebase-chat-app.herokuapp.com%2F&tab=desktop">95+% Google PageSpeed Insights score </a>

<a href="https://www.flickr.com/photos/188674698@N05/49957567913/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/49957567913_85dce131be_b.jpg" title="Login"></a>

***Login Page***

<a href="https://www.flickr.com/photos/188674698@N05/49958065786/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/49958065786_73651d02c1_b.jpg" title="Chat"></a>

***Chat Page***

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Performance](#performance)
- [Tests](#tests)

## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/calvin197/Firebase-ChatApp.git`

### Setup

> Install npm packages and compiles and hot-reload for development

```shell
$ npm install
$ npm run serve

```

---

## Features

### Max number of messages in the database

> For each chat room, there is a max number of 50 messages. When the number of messages exceed 50, the oldest message will be deleted. This is done by Firebase Cloud Functions.

### Sign in/ Register methods

1) Facebook

2) Google+

3) Email/ Password

### Type of Users

> There are three types of users and they have different user permissions: 

**1) admin**
- Can read all 50 past messages in each chat room after log in
- Can write new message
- Can edit any user's messages and it will leave a record
- Can delete any user's messages

**2) unverified users**
- Users who sign in as guest are classified as unverified user
- Cannot read any past message in any chat room after log in
- Can write new message
- Cannot edit/ delete any message

**3) verified users**
- Users who sign in using Facebook/ Google/ email are classified as verified user
- Can read 20 past messages in each chat room after log in
- Can write new message
- Can edit his/ her own messages and it will leave a record
- Can delete his/ her own messages

### How to switch to other chat room

![Recordit GIF](http://g.recordit.co/7tmwXgpIFw.gif)

### How to send a message

![Recordit GIF](http://g.recordit.co/ufJa2n0Kdg.gif)

### How to edit a message

1) Click on the message content

2) Edit the text in the text box

3) Press Enter/ Return

![Recordit GIF](http://g.recordit.co/gShLErgpAZ.gif)

### How to delete a message

1) Click on the message content

2) Delete the text in the text box

3) Press Enter/ Return

![Recordit GIF](http://g.recordit.co/3r7t8EcRpd.gif)

## Performance

> To optimize the web site performance, the following techniques are used: 

### Gzip and Brotli compression webpack plugin

> Both Gzip and Brotli are compression algorithms used to compress Javascript/ HTML/ CSS files. After applying the compression plugins, the bundle size are significantly(~ 75%) lighter than before. 

```shell
$ npm install brotli-webpack-plugin compression-webpack-plugin express-static-gzip

```

### Removed heavy dependency (e.g. Moment.js)

> The size of Moment.js is massive. It was removed and replaced with native JS code (see the following code). After removing Moment.js, the largest JS bundle size reduced more than 350KB (around 30-40% of the original bundle size). 

```javascript
// vue-chat1/src/components/ChatRoom.vue
// line 143-147
format(timestamp) {
    var newDate = new Date();
    newDate.setTime(timestamp);
    return newDate.toLocaleTimeString();
}
```

### Lazy loading 

> ES6 import() was used to import dependencies(e.g. Firebase) / components dynamically. Dependencies/ components are imported only when they are needed. The Javascript bundle is split into multiple smaller bundles and hence the web site loads way faster because it only loads necessary components. 

> Notice how different components are lazy loaded in vue-chat1/src/router/index.js

```javascript
// vue-chat1/src/router/index.js
// line 6-8
function lazyLoad(view){
  return() => import(`@/views/${view}.vue`)
}
```

> Notice how firebase is lazy loaded in vue-chat1/src/views/Login.vue

```javascript
// vue-chat1/src/views/Login.vue
// line 114-124
googleLogin() {
  // lazy load firebase
  import("@/firebase/init")
    .then(init => {
      return init.default.auth;
    })
    .then(auth => {
      var provider = new auth.GoogleAuthProvider();
      this.signInWithPopup(auth, provider, "Google");
    });
}
```

### Preconnect

> Preconnect is a method that performs DNS lookups ahead of time so that by the time you make a request to your server, your browser already knows where to make the request.

> vue-chat1/public/index.html

```html
<link rel="preconnect" href="https://vue-js-firebase-chat-app.herokuapp.com/">
```

### Result

> 95+% Google PageSpeed Insights score

> <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fvue-js-firebase-chat-app.herokuapp.com%2F&tab=desktop">https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fvue-js-firebase-chat-app.herokuapp.com%2F&tab=desktop</a>

<a href="https://www.flickr.com/photos/188674698@N05/49958784637/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/49958784637_69785d0478_b.jpg" title="result"></a>

## Tests 

> Unit test will be added and integrated with Circle CI.

> Run unit test

```shell
$ npm run test:unit

```

---
