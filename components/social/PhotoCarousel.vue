<template>
  <v-container class="pa-0">
    <v-row v-if="images.length == 1">
      <v-col cols="12" class="pa-0 px-1">
        <v-img :src="images[0]['url']" height="250" @click="showCarousel" />
      </v-col>
    </v-row>
    <v-row v-else-if="images.length == 2">
      <v-col v-for="p in images.length" :key="p" cols="6" class="pa-0 px-1">
        <v-img
          :src="images[p - 1]['url']"
          max-height="200"
          @click="showCarousel"
        />
      </v-col>
    </v-row>
    <v-row v-else-if="images.length == 3">
      <v-col v-for="p in images.length - 1" :key="p" cols="6" class="pa-0 px-1">
        <v-img :src="images[p]['url']" @click="showCarousel" />
      </v-col>
      <v-col cols="12" class="pa-0 px-1 pt-1">
        <v-img :src="images[2]['url']" height="250" />
      </v-col>
    </v-row>
    <v-row v-else-if="images.length == 4">
      <v-col v-for="p in images.length" :key="p" cols="6" class="pa-0 pa-1">
        <v-img :src="images[p - 1]['url']" height="250" @click="showCarousel" />
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="490">
      <v-card>
        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="(index, n) in images"
            :key="n"
            :src="images[n]['url']"
          ></v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  props: {
    images: {
      default: function() {
        return [];
      },
      type: Array
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    showCarousel() {
      this.dialog = "true";
    }
  }
};
</script>
