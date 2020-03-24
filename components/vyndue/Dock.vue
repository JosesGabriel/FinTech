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
    <RoomsOverlay
      class="roomOverlay"
      :class="roomOverlayToggle ? 'roomOverlay--show' : 'roomOverlay--hidden'"
      @close="roomOverlayToggle = false"
    />
    <v-scale-transition origin="bottom right 0">
      <v-card
        v-show="dockToggle"
        class="dock__card"
        :class="roomOverlayToggle ? 'dock__overlay' : 'darkchart'"
        width="400px"
        shaped
        dark
        flat
      >
        <Header
          @showRooms="roomOverlayToggle = true"
          @hideDock="dockToggle = false"
        />
        <MessageList @clicked="roomOverlayToggle = false" />
        <Composer @clicked="roomOverlayToggle = false" />
      </v-card>
    </v-scale-transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "~/components/vyndue/Header";
import MessageList from "~/components/vyndue/MessageList";
import Composer from "~/components/vyndue/Composer";
import RoomsOverlay from "~/components/vyndue/RoomsOverlay";
export default {
  components: {
    Header,
    MessageList,
    Composer,
    RoomsOverlay
  },
  data() {
    return {
      dockToggle: false,
      roomOverlayToggle: false
    };
  },
  computed: {
    ...mapGetters({
      clientIsPrepared: "vyndue/getClientIsPrepared",
      vyndueUser: "vyndue/getVyndueUser"
    })
  },
  methods: {
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.roomOverlayToggle = false;
      }
    }
  }
};
</script>

<style>
.roomOverlay {
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}
.roomOverlay--show {
  opacity: 1;
  z-index: 1;
}
.roomOverlay--hidden {
  opacity: 0;
  z-index: 0;
}
.dock__overlay {
  filter: brightness(50%);
  transition: 0.3s;
}
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
