<template>
  <div class="chat container">
    <h2 class="text-primary text-center">Real-Time Chat</h2>
    <h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>
    <div class="card">
      <div class="card-body">
        <p class="nomessages text-secondary" v-if="messages.length == 0">
          [No messages yet!]
        </p>
        <div class="messages" v-chat-scroll="{ always: false, smooth: true }">
          <div v-for="message in activeMessages" :key="message.id">
            <span class="text-info"
              >[{{ message.name }}]-{{
                message.status ? message.status : "unknown"
              }}:
            </span>
            <span>{{ message.message }}</span>
            <button
              v-if="name == 'Calvin Shum'"
              v-on:click="deleteMessage(message.id)"
            >
              Delete
            </button>
            <span class="text-secondary time">{{ message.timestamp }}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <CreateMessage :name="name" :status="status" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import fb from "@/firebase/init";

export default {
  name: "Chat",
  props: ["name", "status"],
  components: {
    CreateMessage
  },
  data() {
    return {
      messages: []
    };
  },
  computed: {
    activeMessages: function() {
      return this.messages.filter(message => !message.hide);
    }
  },
  created() {
    let ref = fb.collection("messages").orderBy("timestamp");
    let numToHide = null;
    let numToShow;
    let i = 0;
    console.log("status: " + this.status);
    if (this.status == "admin") numToShow = 50;
    else if (this.status == "Guest") numToShow = 0;
    else numToShow = 20;
    ref.onSnapshot(snapshot => {
      if (numToHide == null) numToHide = snapshot.size - numToShow;
      snapshot.docChanges().forEach(change => {
        let doc = change.doc;
        console.log(change.type);
        console.log(change.doc.id);
        if (change.type == "removed") {
          for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id == doc.id) {
              this.messages[i].hide = true;
            }
          }
        }
        if (i >= numToHide && change.type == "added") {
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: this.format(doc.data().timestamp),
            status: doc.data().status,
            hide: false
          });
        }
        i++;
      });
    });
  },
  methods: {
    deleteMessage(id) {
      fb.collection("messages")
        .doc(id)
        .delete()
        .catch(err => {
          console.log(err);
        });
    },
    format(timestamp) {
      var newDate = new Date();
      newDate.setTime(timestamp);
      return newDate.toLocaleTimeString();
    }
  }
};
</script>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 0px;
}

.chat h5 {
  margin-top: 0px;
  margin-bottom: 40px;
}

.chat span {
  font-size: 1.2em;
}

.chat .time {
  display: block;
  font-size: 0.7em;
}

.messages {
  max-height: 300px;
  overflow: auto;
}
</style>
