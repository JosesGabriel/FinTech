<template>
  <div class="container py-0 chatClient__wrapper">
    <div class="row">
      <div class="col-5 py-2" style="font-weight: 100;">Traders</div>
      <div class="col-7 py-2 pr-3" style="color: #03dac5; background:#24323c;">
        Lyduz Community
        <v-icon class="hide__icon" style="color: #03dac5;" @click="hideChat"
          >mdi-chevron-down</v-icon
        >
      </div>
    </div>
    <div class="row">
      <div class="col-5 pr-0">
        <div class="row"></div>
        <div class="row">
          <div class="col-12 py-2" style="font-weight: 100;">
            Trading Communities
          </div>
        </div>
      </div>
      <div class="col-7 pr-0 message__box">
        <v-card
          class=""
          :dark="lightSwitch == 0 ? false : true"
          :loading="loader"
          flat
        >
          <div
            class="message__wrap pa-0"
            :class="
              !playerInGame ? 'message__wrap--full' : 'message__wrap--mini'
            "
          >
            <div
              v-for="n in messagesObject.length"
              :key="n"
              class="message__list"
            >
              <v-avatar size="30">
                <v-img :src="messagesObject[n - 1].AvatarUrl"></v-img>
              </v-avatar>
              <div
                class="message text"
                :class="lightSwitch == 0 ? 'text__secondary--light' : ''"
              >
                <div class="px-2 success--text overline">
                  {{ messagesObject[n - 1].displayName }}
                </div>
                <p class="px-2 caption">
                  {{ messagesObject[n - 1].messagesObject }}
                </p>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <div class="row">
      <div class="col-5 pr-0"></div>
      <div class="col-7 pa-0 d-flex chat__box">
        <v-textarea
          v-model="textarea"
          solo
          :dark="lightSwitch == 0 ? false : true"
          flat
          label="Send a message..."
          rows="1"
          hide-details
          background-color="#00121e"
          no-resize
          single-line
          @keyup.enter="sendMessage()"
        ></v-textarea>
        <v-divider vertical class="success" inset></v-divider>
        <v-btn
          icon
          color="success"
          class="mt-2 send__btn"
          @click="sendMessage()"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { client } from "~/assets/js/vyndue/client.js";
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "main",
  data() {
    return {
      textarea: "",
      messagesObject: [],
      loader: false
    };
  },
  computed: {
    ...mapGetters({
      playerInGame: "game/getPlayerInGame",
      lightSwitch: "global/getLightSwitch",
      playerCurrentChatRoom: "game/getPlayerCurrentChatRoom",
      playerLoggedInVyndue: "game/getPlayerLoggedInVyndue"
    })
  },
  props: {
    showChat: {
      default() {
        return "";
      }
    }
  },
  watch: {
    messagesObject: function() {
      this.loader = false;
    },
    playerCurrentChatRoom: function() {
      this.messagesObject = [];
      this.loadClient();
    }
  },
  beforeMount: function() {
    this.checkCurrentRoom();
  },
  mounted: function() {
    this.loadClient();
  },
  methods: {
    ...mapActions({
      setPlayerInGame: "game/setPlayerInGame",
      setPlayerCurrentChatRoom: "game/setPlayerCurrentChatRoom"
    }),
    checkCurrentRoom() {
      let currentChatRoom = localStorage.getItem("currentChatRoom");
      this.setPlayerCurrentChatRoom(currentChatRoom);
    },
    loadClient() {
      // this.loader = "primary";
      const roomID = this.playerCurrentChatRoom;
      client.on(
        "Room.timeline",
        function(event, room, toStartOfTimeline, user) {
          if (event.getType() !== "m.room.message") {
            return;
          }
          if (event.getRoomId() === roomID) {
            var usr = client.getUser(event.getSender());
            var avtURLorig = usr.avatarUrl;
            var avtURL = avtURLorig.substring(6);
            var renderAvatarURL =
              "https://im.arbitrage.ph/_matrix/media/r0/thumbnail/" +
              avtURL +
              "?width=40;height=40;method=crop";
            this.messagesObject.unshift({
              AvatarUrl: renderAvatarURL,
              displayName: usr.displayName,
              messagesObject: event.event.content.body
            });
          }
        }.bind(this)
      );
    },
    sendMessage() {
      if (this.textarea != "") {
        var content = {
          body: this.textarea,
          msgtype: "m.notice"
        };
        client.sendEvent(
          this.playerCurrentChatRoom,
          "m.room.message",
          content,
          "",
          (err, res) => {
            console.log(err);
          }
        );
      }
      this.textarea = "";
    },
    hideChat() {
      this.$emit("showChat", false);
    }
  }
};
</script>
<style scoped>
.container {
  color: white;
}
.chatClient__wrapper {
  border: 2px solid #24323c;
  background: #00121e;
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
  padding: 15px;
  overflow: auto;
}
.message__wrap--full {
  height: calc(80vh - 199px);
}
.message__wrap--mini {
  height: calc(80vh - 530px);
}
.message__list {
  align-self: flex-start;
  max-width: 70%;
  display: inline-flex;
}
.message__sender {
  color: orange;
}
.hide__icon {
  float: right;
}
.chat__box {
  border-left: 2px solid #24323c;
}
.message__box {
  border-left: 2px solid #24323c;
  border-bottom: 2px solid #24323c;
}
</style>
