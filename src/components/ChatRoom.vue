<template>
    <div class="card">
      <div class="card-body">
        <p class="nomessages text-secondary" v-if="activeMessages.length == 0">
          [No messages yet!]
        </p>
        <div class="messages" v-chat-scroll="{ always: false, smooth: true }">
          <div v-for="message in activeMessages" :key="message.id">
            <span class="text-info"
              >[{{ message.name }}]-{{
                message.status ? message.status : "unknown"
              }}:
            </span>
            <span
              v-if="!message.update"
              v-on:click="onClickUpdate(message, name, status)"
              v-bind:class="editableMessage(message, name, status)"
              >{{ message.message }}</span
            >
            <input
              v-if="message.update"
              type="text"
              placeholder="edit message"
              name="edit"
              v-model="message.message"
              v-on:keyup.enter="editMessage(message)"
            />
            <span class="text-secondary time">{{ message.timestamp + ` ${message.updatedBy?"updated by: " + message.updatedBy:""}` }}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <CreateMessage :name="name" :status="status" :room="room" />
      </div>
    </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import fb from "@/firebase/init";
let firestore = fb.firestore;
export default {
  name: "ChatRoom",
  props: ["name", "status", "room"],
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
    let ref = firestore.collection(this.room).orderBy("timestamp");
    let numToHide = null;
    let numToShow;
    let i = 0;
    if (this.status == "Admin") numToShow = 50;
    else if (this.status == "Guest") numToShow = 0;
    else numToShow = 20;
    ref.onSnapshot(snapshot => {
      if (numToHide == null) numToHide = snapshot.size - numToShow;
      snapshot.docChanges().forEach(change => {
        let doc = change.doc;
        // modified
        if (change.type == "modified") {
          for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id == doc.id) {
              this.messages[i].message = doc.data().message;
              this.messages[i].updatedBy = doc.data().updatedBy;
            }
          }
        }
        // remove
        if (change.type == "removed") {
          for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id == doc.id) {
              this.messages[i].hide = true;
            }
          }
        }
        //add
        if (i >= numToHide && change.type == "added") {
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: this.format(doc.data().timestamp),
            status: doc.data().status,
            hide: false,
            update: false,
            updatedBy: doc.data().updatedBy
          });
        }
        i++;
      });
    });
  },
  methods: {
    deleteMessage(id) {
      firestore
        .collection(this.room)
        .doc(id)
        .delete()
        .catch(err => {
          console.log(err);
        });
    },
    editMessage(doc) {
      // Delete the message if the input message is empty
      if (doc.message == "") this.deleteMessage(doc.id);
      else
        firestore
          .collection(this.room)
          .doc(doc.id)
          .update({ message: doc.message, updatedBy: this.name })
          .then(() => {
            doc.update = false;
            doc.updatedBy = this.name;
          })
          .catch(err => {
            console.log(err);
          });
    },
    isEditable(doc, name, status) {
      if (doc.status == "Guest") return false;
      if (doc.name !== name) return false;
      if (doc.status !== status) return false;
      return true;
    },
    onClickUpdate(doc, name, status) {
      // Only allow same verified user to edit message
      if (status !== "Admin" && !this.isEditable(doc, name, status)) return;
      doc.update = true;
    },
    format(timestamp) {
      var newDate = new Date();
      newDate.setTime(timestamp);
      return newDate.toLocaleTimeString();
    },
    editableMessage: function(doc, name, status) {
      return {
        editable: this.isEditable(doc, name, status)
      };
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

.editable {
  font-weight: bold;
}
</style>
