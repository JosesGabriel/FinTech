<template>
  <v-content>
    <v-card
      class="centerPanel__card mb-3 list-item"
      :dark="lightSwitch == 0 ? false : true"
      outlined
      :style="{ background: cardBackground }"
    >
      <a :href="link" target="_blank">
        <v-img
          class="newsfeed__image"
          :src="image"
          lazy-src="/blur.jpg"
          min-height="250px"
        >
        </v-img>
      </a>
    </v-card>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Ads",
  props: {
    image: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * toggle card background color
     *
     * @return  {String}  dark/light mode
     */
    cardBackground() {
      return this.lightSwitch == 0 ? "#ffffff" : "#142530";
    }
  }
};
</script>

<style scoped>
.newsfeed__image {
  width: 100%;
  padding: 13px;
  height: auto;
}
</style>
