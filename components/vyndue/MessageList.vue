<template>
  <div
    v-if="roomIsVisible"
    class="message__wrap"
    @scroll="scroll"
    @click="$emit('clicked')"
  >
    <div
      v-for="(message, index) in messagesObject"
      :key="index"
      class="message__list"
    >
      <v-avatar size="30">
        <img :src="message.AvatarUrl" />
      </v-avatar>
      <div class="message text">
        <div class="px-2 success--text overline">
          {{ message.displayName }}
        </div>
        <p
          class="px-2 caption d-flex"
          v-html="
            message.messagesObject ? message.messagesObject : '[ redacted ]'
          "
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { client } from "~/assets/js/vyndue/client.js";
export default {
  data() {
    return {
      messagesObject: [],
      lastFromToken: "",
      roomIsVisible: true
    };
  },
  computed: {
    ...mapGetters({
      clientIsPrepared: "vyndue/getClientIsPrepared",
      currentRoom: "vyndue/getCurrentRoom"
    })
  },
  watch: {
    /**
     * currentRooms is a vuex variable that changes when a user selects a different room
     * Run switchRoom function when it changes
     *
     * @return
     */
    currentRoom() {
      this.switchRoom();
    }
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    /**
     * Start listening to room events and if specific conditions are met,
     * push it to the messagesObject variable to display it to user.
     * Triggers on mount
     *
     * @return
     */
    getMessages() {
      client.on(
        "Room.timeline",
        function(event, room, toStartOfTimeline) {
          if (event.getType() !== "m.room.message") {
            return; // only use messages
          }
          if (event.getRoomId() === this.currentRoom.roomId) {
            const sender = client.getUser(event.getSender());
            let modified_avatarUrl = "/default.png";
            if (sender.avatarUrl && sender.avatarUrl.includes("mxc://")) {
              modified_avatarUrl = client.mxcUrlToHttp(
                sender.avatarUrl,
                40,
                40,
                "crop"
              );
            } else if (
              sender.avatarUrl &&
              sender.avatarUrl.includes("https://")
            ) {
              modified_avatarUrl = sender.avatarUrl;
            }
            this.messagesObject.unshift({
              AvatarUrl: modified_avatarUrl,
              displayName: sender.displayName,
              messagesObject: event.event.content.body
            });
          }
        }.bind(this)
      );
    },
    /**
     * This function fires when Vuex state 'currentRoom' changes
     * 'currentRoom' state changes based on user clicks on a new room on roomList.vue
     *
     * To get historical messages, an initial endpoint must be called where it will return
     * a pagination token.
     *
     * Use that pagination token and do the request again with the pagination token as a query parameter.
     *
     * @return
     */
    switchRoom() {
      this.messagesObject = [];
      const params = {
        roomId: this.currentRoom.roomId
      };
      this.$api.rooms
        .messages(params)
        .then(
          function(result) {
            this.getHistoricalMessages(result);
            this.roomIsVisible = true;
          }.bind(this)
        )
        .catch(e => {
          if (e.response.data.errcode == "M_GUEST_ACCESS_FORBIDDEN") {
            this.roomIsVisible = false;
          }
        });
    },
    /**
     * gets historical messages of currently selected room
     *
     * this is a recursive function
     *
     * First, must call endpoint that returns ALL events from a specific room.
     * Then, I iterate through the whole response and only accept events that are messages
     *
     * Since I can never know how much message events have occured in a room, I add a condition where
     * it checks my message-only array. If it is less than the specified amount, the function will call itself again.
     *
     * This will repeat until messages reach my specified amount.
     *
     * @param   {object}  data
     *
     * @return
     */
    getHistoricalMessages(data) {
      const params = {
        limit: 30,
        from: data.start,
        dir: "b"
      };
      this.$api.rooms.history(this.currentRoom.roomId, params).then(
        function(result) {
          this.lastFromToken = result.end;
          result.chunk.forEach(event => {
            if (event.type == "m.room.message") {
              let sender = client.getUser(event.user_id);
              let modified_avatarUrl = "/default.png";
              if (sender.avatarUrl && sender.avatarUrl.includes("mxc://")) {
                modified_avatarUrl = client.mxcUrlToHttp(
                  sender.avatarUrl,
                  40,
                  40,
                  "crop"
                );
              } else if (
                sender.avatarUrl &&
                sender.avatarUrl.includes("https://")
              ) {
                modified_avatarUrl = sender.avatarUrl;
              }
              this.messagesObject.push({
                AvatarUrl: modified_avatarUrl,
                displayName: sender.rawDisplayName,
                messagesObject: event.content.body
              });
            }
          });
          if (
            this.messagesObject.length < 20 &&
            this.lastFromToken != data.start
          ) {
            this.getHistoricalMessages({ start: this.lastFromToken });
          }
        }.bind(this)
      );
    },
    /**
     * Fires anytime a user scrolls through this component.
     * Checks whether current scroll position is at top, if true, load more messages.
     *
     * @param   {object}  event
     *
     * @return
     */
    scroll(event) {
      if (event.target.scrollTop == 0) {
        const params = {
          start: this.lastFromToken
        };
        this.getHistoricalMessages(params);
      }
    }
  }
};
</script>

<style>
.invitation__container {
  position: relative;
  top: 20vh;
}
.roomView--height {
  height: calc(100vh - 162px);
}
.container {
  color: white;
}
.chatClient__wrapper {
  border: 2px solid #03dac5;
}
.chatMembers__container {
  border-right: 1px solid #03dac5;
  border-left: 1px solid #03dac5;
}
.message {
  position: relative;
  width: 100%;
  overflow-y: hidden;
  bottom: 7px;
}
.message__wrap {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  padding: 0 15px;
  overflow: auto;
  height: calc(100vh - 370px);
}
.message__list {
  align-self: flex-start;
  max-width: 100%;
  display: inline-flex;
}
.message__sender {
  color: orange;
}
</style>
