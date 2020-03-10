<template>
    <div class="pa-0 pl-2 mb-3">
        <div 
            class="body-2 pl-2 pb-2"
            style="font-size:12px !important;"
            :style="{ color: toggleFontColor }"
            >
           Advertisement
        </div>
      <v-divider></v-divider>
        <v-carousel 
            hide-delimiters 
            cycle
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
            link: 'https://philippines.tradersfair.com/',
          },
          {
            src: 'Traders Empire.png',
            link: 'http://bit.ly/TradersEmpireBook1',
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
            window.open(this.items[i].link, "_blank");
        }
    },
  }
</script>
<style scoped>
.adsCarousel:hover{
    cursor: pointer;
}
</style>
