<template>
  <v-container class="pa-0 ma-0" @click="$emit('clicked')">
    <v-row>
      <v-col cols="12" class="pa-0 pl-7 pt-3 d-flex">
        <v-avatar color="success" size="26" class="mt-2 mr-1">
          <img :src="user.avatarUrl" />
        </v-avatar>
        <v-textarea
          v-model="message"
          :dark="lightSwitch == 1"
          flat
          label="Send a message..."
          rows="1"
          rounded
          hide-details
          :background-color="lightSwitch == 0 ? 'lightcard' : '#142530'"
          dense
          class="caption mb-2 mr-5"
          no-resize
          single-line
          @keyup.enter="sendMessage"
        ></v-textarea
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { client } from "~/assets/js/vyndue/client.js";
export default {
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapGetters({
      currentRoom: "vyndue/getCurrentRoom",
      user: "vyndue/getVyndueUser",
      lightSwitch: "global/getLightSwitch"
    })
  },
  methods: {
    /**
     * Fires when user clicks 'enter' button, sends event to matrix client
     *
     * @return
     */
    sendMessage() {
      if (this.message.trim()) {
        const content = {
          body: this.$sanitize(this.message),
          msgtype: "m.text"
        };
        client.sendEvent(
          this.currentRoom.roomId,
          "m.room.message",
          content,
          ""
        );
      }
      this.message = "";
    }
  }
};
</script>
