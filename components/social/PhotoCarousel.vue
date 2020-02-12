<template>
  <v-container class="pa-0">
    <v-row v-if="images.length == 1">
      <v-col cols="12" class="pa-0 pr-1">
        <!--  :style="'background-image: url(' + '' + images[0]['url'] + ')'" -->
        <div
          v-if="mediaTypeCheck(images[0]['url'])"
          class="newsfeed__imageWrapper"
        >
          <img
            class="newsfeed__image"
            position="top"
            :src="images[0]['url']"
            @click="showCarousel"
          />
        </div>
        <video
          v-else
          class="fullWidth"
          controls
          :src="images[0]['url']"
        ></video>
      </v-col>
    </v-row>
    <v-row v-else-if="images.length == 2">
      <v-col v-for="p in images.length" :key="p" cols="6" class="pa-0 pr-1">
        <v-img
          v-if="mediaTypeCheck(images[p - 1]['url'])"
          :src="images[p - 1]['url']"
          max-height="200"
          height="100%"
          @click="showCarousel"
        />
        <video
          v-else
          class="fullWidth"
          controls
          :src="images[p - 1]['url']"
        ></video>
      </v-col>
    </v-row>
    <v-row v-else-if="images.length == 3">
      <v-col v-for="p in images.length - 1" :key="p" cols="6" class="pa-0 pr-1">
        <v-img
          v-if="mediaTypeCheck(images[p]['url'])"
          max-height="200"
          height="100%"
          :src="images[p]['url']"
          @click="showCarousel"
        />
        <video
          v-else
          class="fullWidth"
          controls
          :src="images[p]['url']"
        ></video>
      </v-col>
      <v-col cols="12" class="pa-0 pr-1 pt-1">
        <v-img
          v-if="mediaTypeCheck(images[0]['url'])"
          :src="images[0]['url']"
          max-height="200"
          height="100%"
          @click="showCarousel"
        />
        <video
          v-else
          class="fullWidth"
          controls
          :src="images[0]['url']"
        ></video>
      </v-col>
    </v-row>
    <v-row v-else-if="images.length >= 4">
      <v-col v-for="p in 4" :key="p" cols="6" class="pa-05">
        <v-img
          v-if="mediaTypeCheck(images[p - 1]['url'])"
          :src="images[p - 1]['url']"
          max-height="200"
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
      <v-card class="black">
        <v-carousel hide-delimiters>
          <v-carousel-item v-for="(index, n) in images" :key="n">
            <v-img
              v-if="mediaTypeCheck(images[n]['url'])"
              :src="images[n]['url']"
              contain
              height="100%"
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
.fullWidth {
  width: 100%;
}
.newsfeed__image {
  width: 100%;
  height: auto;
}
.newsfeed__imageWrapper {
  max-height: 500px;
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
        media.split(".").pop() == "png" ||
        media.split(".").pop() == "gif"
      )
        return true;
      else return false;
    }
  }
};
</script>
