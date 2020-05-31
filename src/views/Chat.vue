<template>
  <div class="chat container">
    <h2 class="text-primary text-center">Real-Time Chat</h2>
    <h5 class="text-secondary text-center">Welcome to {{activeRoom.toUpperCase()}}, {{ name }}!</h5>
    <select class="browser-default custom-select" v-model="room">
      <option disabled value="">Select a room</option>
      <option v-for="room in rooms" v-bind:key="room" v-bind:value="room">
        {{ room.toUpperCase() }}
      </option>
    </select>
    <ChatRoom
      v-bind:key="room"
      :name="name"
      :status="status"
      :room="activeRoom"
    />
  </div>
</template>

<script>
import ChatRoom from "@/components/ChatRoom";
export default {
  name: "Chat",
  data() {
    return {
      room: "messages",
      rooms: ["messages", "sports", "news"]
    };
  },
  computed: {
    activeRoom: function() {
      return this.room;
    }
  },
  props: ["name", "status"],
  components: {
    ChatRoom
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
