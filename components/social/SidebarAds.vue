<template>
    <div class="pa-0 pl-2">
        <div 
            class="body-2 font-weight-black pl-2 pb-2"
            :style="{ color: toggleFontColor }"
            >
           Advertisement
        </div>
      <v-divider></v-divider>
        <v-carousel 
            hide-delimiters 
            cycle
            :show-arrows="false"
            >
            <v-carousel-item
                class="adsCarousel"
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                @click="redirect(i)"
            ></v-carousel-item>
        </v-carousel>
    </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    data () {
      return {
        items: [
          {
            src: 'tradersfair.jpg',
            links: 'https://philippines.tradersfair.com/',
          },
        ],
      }
    },
    computed: {
        ...mapGetters({
            lightSwitch: "global/getLightSwitch"
        }),
        toggleFontColor() {
            return this.lightSwitch == 0
                ? "#000000 !important"
                : "#ffffff !important";
        },
    },
    methods: {
        redirect(i){
            window.open(this.items[i].links, "_blank");
        }
    },
  }
</script>
<style scoped>
.adsCarousel:hover{
    cursor: pointer;
}
</style>
