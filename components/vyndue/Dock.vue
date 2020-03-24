<template>
  <div class="dock__container">
    <v-btn
      v-show="!dockToggle"
      class="dock__button"
      color="success"
      fab
      dark
      fixed
      right
      @click="dockToggle = true"
    >
      <v-icon>mdi-message-processing-outline</v-icon>
    </v-btn>
    <v-card
      v-show="dockToggle"
      class="dock__card darkchart"
      width="400px"
      shaped
      dark
    >
      <Header />
      <MessageList />
      <Composer />
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { client } from "~/assets/js/vyndue/client.js";
import Header from "~/components/vyndue/Header";
import MessageList from "~/components/vyndue/MessageList";
import Composer from "~/components/vyndue/Composer";
export default {
  components: {
    Header,
    MessageList,
    Composer
  },
  data() {
    return {
      dockToggle: false,
      test: ""
    };
  },
  computed: {
    ...mapGetters({
      clientIsPrepared: "vyndue/getClientIsPrepared",
      vyndueUser: "vyndue/getVyndueUser"
    })
  },
  watch: {
    /**
     * gets current users data and sets is to the 'user' vuex state
     *
     * @return
     */
    clientIsPrepared() {
      this.testt();
    }
  },
  mounted() {},
  methods: {
    testt() {
      //   console.log("HAHAHAH");
      //   console.log(this.vyndueUser);
    }
  }
};
</script>

<style>
.dock__container {
  position: fixed;
  bottom: 1vw;
  right: 0;
  z-index: 3;
}
.dock__button {
  bottom: 1vw;
}
.dock__card {
  right: 1vw;
}
.dock__container ::-webkit-scrollbar {
  width: 5px;
}
.dock__container ::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}
.dock__container ::-webkit-scrollbar-thumb {
  background: #e5e5e5;
  border-radius: 20px;
}
.dock__container ::-webkit-scrollbar-thumb:hover {
  background: #e5e5e5;
}
</style>
