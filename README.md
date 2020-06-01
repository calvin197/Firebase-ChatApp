# Firebase-ChatApp

> This is a Chat App built with Firebase, Vue.js, Node.js, Bootstrap and Font Awesome.

> It is deployed using Heroku: <a href="https://vue-js-firebase-chat-app.herokuapp.com/">https://vue-js-firebase-chat-app.herokuapp.com/</a>

<a href="https://www.flickr.com/photos/188674698@N05/49957567913/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/49957567913_85dce131be_b.jpg" title="Login"></a>

***Login Page***

<a href="https://www.flickr.com/photos/188674698@N05/49958065786/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/49958065786_73651d02c1_b.jpg" title="Chat"></a>

***Chat Page***

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Tests](#tests)

## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/calvin197/Firebase-ChatApp.git`

### Setup

> Install npm and bower packages and compiles and hot-reload for development

```shell
$ npm install
$ npm run serve

```

---

## Features

### Max number in the database

> For each chat room, there is a max number of 50 messages. When the number of messages exceed 50, the oldest message will be deleted. This is done by Firebase Cloud Functions.

### How to send a message

![Recordit GIF](http://g.recordit.co/ufJa2n0Kdg.gif)

### How to edit a message

**1) Click on the message content**

**2) Edit the text in the text box**

**3) Press Enter/ Return**

![Recordit GIF](http://g.recordit.co/gShLErgpAZ.gif)

### How to delete a message

**1) Click on the message content**

**2) Delete the text in the text box**

**3) Press Enter/ Return**

![Recordit GIF](http://g.recordit.co/3r7t8EcRpd.gif)

### Sign in/ Register methods

**1) Facebook**

**2) Google+**

**3) Email/ Password**

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
- Can edit his/her own messages and it will leave a record
- Can delete his/her own messages

## Tests 

> Run unit test

```shell
$ npm run test:unit

```

---
