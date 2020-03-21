<template>
  <div class="pa-0 pl-2 mb-3">
    <div
      class="body-2 pl-2 pb-2"
      style="font-size:12px !important;"
      :style="{ color: toggleFontColor }"
    >Advertisement</div>
    <v-divider :dark="lightSwitch == true"></v-divider>
    <v-carousel cycle class="mt-2" :show-arrows="false" hide-delimiters interval="3000">
      <v-carousel-item
        class="adsCarousel"
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        @click="redirect(i)"
      >
        <v-card
          v-if="i == 2"
          flat
          class="d-flex pb-8 justify-center align-end"
          height="100%"
          color="transparent"
        >
          <v-btn
            color="success"
            rounded
            class="px-10 caption font-weight-medium black--text text-capitalize"
          >Support Us</v-btn>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items: [
        {
          src: "tradersfair.jpg",
          link: "https://philippines.tradersfair.com/"
        },
        {
          src: "Traders Empire.png",
          link: "http://bit.ly/TradersEmpireBook1"
        },
        // TODO temporarily remove this in release
        // {
        //   src: "backer_ads.jpg",
        //   link: "/backer"
        // }
      ]
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    }
  },
  methods: {
    redirect(i) {
      window.open(this.items[i].link, "_blank");
    }
  }
};
</script>
<style>
.adsCarousel:hover {
  cursor: pointer;
}
.v-carousel__controls__item > .v-btn__content > .v-icon {
  font-size: 14px !important;
}
</style>
