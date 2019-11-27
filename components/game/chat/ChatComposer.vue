<template>
  <div class="container composer__container py-0">
    <div class="row">
      <div class="col-12 pa-0 d-flex">
        <v-textarea
          v-model="textarea"
          solo
          dark
          label="Send a message..."
          rows="1"
          hide-details
          background-color="transparent"
          no-resize
          single-line
          @keyup.enter="sendmsg()"
        ></v-textarea>
        <v-btn icon color="success" class="mt-2" @click="sendmsg()">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<style>
.composer__container {
  background-color: #0c1a2b;
}
</style>
<script>
const sdk = require("matrix-js-sdk");
const HSUrl = "https://im.arbitrage.ph";
const client = sdk.createClient(HSUrl);
const roomID = "!OlWVatkysuERsuXfCS:im.arbitrage.ph";
export default {
  data() {
    return {
      msg: [],
      textarea: ""
    };
  },
  mounted: function() {
    this.x();
  },
  methods: {
    sendmsg() {
      if (this.textarea != "") {
        var content = {
          body: this.textarea,
          msgtype: "m.notice"
        };
        client.sendEvent(roomID, "m.room.message", content, "", (err, res) => {
          console.log(err);
        });
      }
      this.textarea = "";
    },
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
            // console.log("prepared");
            //       this.sendNotice('test from the game lobby');
            break;
        }
      });

      function sendNotice(body) {}
    }
  }
};
</script>
