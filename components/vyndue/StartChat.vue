<template>
  <v-card :dark="lightSwitch == 0 ? false : true" min-height="250">
    <v-card-title class="title justify-space-between pl-4 pb-2">
      <span class="font-weight-black">Start a chat</span>
      <v-btn icon small @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-container class="modalContent__container pt-0">
      <v-row>
        <v-col cols="12">
          <div :class="lightSwitch == 0 ? 'black--text' : 'white--text'">
            Who would you like to communicate with?
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pr-1">
          <v-autocomplete
            v-model="selected"
            :items="userSuggestions"
            item-text="display_name"
            item-value="user_id"
            :search-input.sync="search"
            placeholder="Email, Name or Username"
            chips
            outlined
            dense
            :dark="lightSwitch == 0 ? false : true"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="success"
        class="no-transform px-5"
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        color="success"
        class="black--text no-transform px-7 font-weight-bold"
        :disabled="!selected ? true : false"
        @click="startChat()"
      >
        Start Chat
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { client } from "~/assets/js/vyndue/client.js";
export default {
  components: {},
  data() {
    return {
      userSuggestions: [],
      selected: [],
      search: null
    };
  },
  computed: {
    ...mapGetters({
      clientIsPrepared: "vyndue/getClientIsPrepared",
      currentRoom: "vyndue/getCurrentRoom",
      lightSwitch: "global/getLightSwitch"
    })
  },
  watch: {
    /**
     * Fires everytime the user types in the text field
     *
     * @param   {string}  e
     *
     * @return  {[type]}
     */
    search(e) {
      const params = {
        search_term: e
      };
      this.$api.search.search(params).then(response => {
        this.userSuggestions = response.results;
      });
    }
  },
  methods: {
    /**
     * fires when the user clicks the 'Start Chat' button, creates a room
     *
     * @return
     */
    startChat() {
      if (this.clientIsPrepared) {
        let invitees = [];
        invitees.push(this.selected);
        let options = {
          preset: "trusted_private_chat",
          visibility: "private",
          invite: invitees,
          is_direct: true
        };
        client.createRoom(options).then(response => {
          this.$emit("getRooms");
        });
      }
    }
  }
};
</script>
