<template>
  <div class="message__wrap">
    <div v-for="n in msg.length" :key="n" class="message__list">
<!--      <v-avatar class="profile" color="grey" size="34">-->
        <v-img :src=" msg[n - 1].AvatarUrl"></v-img>
<!--      </v-avatar>-->
      <div class="message">
        <div class="px-2 message__sender">{{ msg[n - 1].displayName }}</div>
        <p class="px-2 py-1">{{ msg[n - 1].msg }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.message {
  position: relative;
  bottom: 7px;
}
.message__wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  overflow: auto;
  height: calc(100vh - 567px);
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
const sdk = require("matrix-js-sdk");
const HSUrl = "https://im.arbitrage.ph";
const client = sdk.createClient(HSUrl);
export default {
  data() {
    return {
      msg: []
    };
  },
  mounted: function() {
    this.x();
  },
  methods: {
    x() {
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
            console.log("prepared");
            break;
        }
      });
      const roomID = "!OlWVatkysuERsuXfCS:im.arbitrage.ph";
      client.on(
        "Room.timeline",
        function(event, room, toStartOfTimeline,user) {
          if (event.getRoomId() === roomID) {
            var usr = client.getUser(event.getSender());
            console.log(usr.displayName);
            this.msg.push({'displayName':usr.displayName});
            console.log(usr.avatarUrl);
            var avtURLorig = usr.avatarUrl;
            var avtURL = avtURLorig.substring(6);
            var renderAvatarURL = 'https://im.arbitrage.ph/_matrix/media/r0/thumbnail/' + avtURL + '?width=30;height=30;method=crop';
            this.msg.push({'AvatarUrl':renderAvatarURL});
            console.log(event.getSender());
            console.log(event.event.content.body);

            this.msg.push({'msg':event.event.content.body});

          }
        }.bind(this)
      );
    }
  }
};
</script>
