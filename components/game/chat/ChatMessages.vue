<template>
  <v-card style="background-color: transparent;" dark :loading="loader">
    <div
      class="message__wrap pa-0"
      :class="!playerInGame ? 'message__wrap--full' : 'message__wrap--mini'"
    >
      <div v-for="n in messagesObject.length" :key="n" class="message__list">
        <v-avatar>
          <v-img :src="messagesObject[n - 1].AvatarUrl"></v-img>
        </v-avatar>
        <div class="message">
          <div class="px-2 text--green">
            {{ messagesObject[n - 1].displayName }}
          </div>
          <p class="px-2 py-1 caption">
            {{ messagesObject[n - 1].messagesObject }}
          </p>
        </div>
      </div>
    </div>
  </v-card>
</template>
<style scoped>
.message {
  position: relative;
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
  height: 603px;
}
.message__wrap--mini {
  height: calc(100vh - 530px);
}
.message__list {
  align-self: flex-start;
  max-width: 70%;
  display: inline-flex;
}
.message__list--me {
  align-self: flex-end;
}
.message__sender {
  color: orange;
}
</style>
<script>
import { mapGetters } from "vuex";
const sdk = require("matrix-js-sdk");
const HSUrl = "https://im.arbitrage.ph";
const client = sdk.createClient(HSUrl);
export default {
  data() {
    return {
      messagesObject: [],
      loader: false
    };
  },
  computed: {
    ...mapGetters({
      playerInGame: "game/getPlayerInGame"
    })
  },
  watch: {
    messagesObject: function() {
      this.loader = false;
    }
  },
  mounted: function() {
    this.loader = "primary";
    this.loadClient();
  },
  methods: {
    loadClient() {
      client
        .login("m.login.password", {
          user: "@lerroux:im.arbitrage.ph",
          password: "angelus69"
        })
        .then(response => {
          myToken = response.access_token;
        });
      client.startClient();
      client.on("sync", function(state, prevState, data) {
        switch (state) {
          case "PREPARED":
            break;
        }
      });
      const roomID = "!OlWVatkysuERsuXfCS:im.arbitrage.ph";
      client.on(
        "Room.timeline",
        function(event, room, toStartOfTimeline, user) {
          if (event.getRoomId() === roomID) {
            var usr = client.getUser(event.getSender());
            var avtURLorig = usr.avatarUrl;
            var avtURL = avtURLorig.substring(6);
            var renderAvatarURL =
              "https://im.arbitrage.ph/_matrix/media/r0/thumbnail/" +
              avtURL +
              "?width=30;height=30;method=crop";
            this.messagesObject.unshift({
              AvatarUrl: renderAvatarURL,
              displayName: usr.displayName,
              messagesObject: event.event.content.body
            });
          }
        }.bind(this)
      );
    }
  }
};
</script>
