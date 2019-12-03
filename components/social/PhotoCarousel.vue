<template>
  <v-container class="pa-0">
    <v-row v-if="images.length == 1">
      <v-col cols="12" class="pa-0 px-1">
        <v-img
          v-if="mediaTypeCheck(images[0]['url'])"
          position="top"
          :src="images[0]['url']"
          max-height="400"
          @click="showCarousel"
        />
        <video v-else controls :src="images[0]['url']"></video>
      </v-col>
    </v-row>
    <v-row v-else-if="images.length == 2">
      <v-col v-for="p in images.length" :key="p" cols="6" class="pa-0 px-1">
        <v-img
          v-if="mediaTypeCheck(images[p - 1]['url'])"
          :src="images[p - 1]['url']"
          max-height="400"
          height="100%"
          @click="showCarousel"
        />
        <video v-else controls :src="images[p - 1]['url']"></video>
      </v-col>
    </v-row>
    <v-row v-else-if="images.length == 3">
      <v-col v-for="p in images.length - 1" :key="p" cols="6" class="pa-0 px-1">
        <v-img
          v-if="mediaTypeCheck(images[p]['url'])"
          max-height="400"
          height="100%"
          :src="images[p]['url']"
          @click="showCarousel"
        />
        <video v-else controls :src="images[p]['url']"></video>
      </v-col>
      <v-col cols="12" class="pa-0 px-1 pt-1">
        <v-img
          v-if="mediaTypeCheck(images[0]['url'])"
          :src="images[0]['url']"
          max-height="400"
          height="100%"
          @click="showCarousel"
        />
        <video v-else controls :src="images[0]['url']"></video>
      </v-col>
    </v-row>
    <v-row v-else-if="images.length >= 4">
      <v-col v-for="p in 4" :key="p" cols="6" class="pa-0 pa-1">
        <v-img
          v-if="mediaTypeCheck(images[p - 1]['url'])"
          :src="images[p - 1]['url']"
          max-height="400"
          height="100%"
          :class="images.length > 4 && p == 4 ? 'lowOpacity' : ''"
          @click="showCarousel"
        />
        <span
          v-if="images.length > 4 && p == 4"
          class="display-1 moreImagesIndicator "
          >+{{ images.length - 4 }}</span
        >
        <video
          v-if="!mediaTypeCheck(images[p - 1]['url'])"
          controls
          :src="images[p - 1]['url']"
        ></video>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="50%">
      <v-card>
        <v-carousel hide-delimiters continuous="false">
          <v-carousel-item v-for="(index, n) in images" :key="n">
            <v-img
              v-if="mediaTypeCheck(images[n]['url'])"
              :src="images[n]['url']"
              height="100%"
              width="100%"
            ></v-img>
            <video
              v-else
              height="100%"
              width="100%"
              controls
              :src="images[n]['url']"
            ></video>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style scoped>
.lowOpacity {
  opacity: 0.2;
}
.moreImagesIndicator {
  position: absolute;
  bottom: 27%;
  right: 20%;
}
</style>
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
    },
    mediaTypeCheck(media) {
      if (
        media.split(".").pop() == "jpg" ||
        media.split(".").pop() == "jpeg" ||
        media.split(".").pop() == "png"
      )
        return true;
      else return false;
    }
  }
};
</script>
