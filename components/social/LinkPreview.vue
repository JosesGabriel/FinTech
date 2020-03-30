<template>
  <v-container class="pa-0">
    <v-row v-if="hasImage">
      <v-col cols="12" class="pa-0 pr-1">
        <div class="newsfeed__imageWrapper">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-img
                class="newsfeed__image"
                :src="image"
                lazy-src="/blur.jpg"
                min-height="250px"
              >
                <v-content
                  v-show="hasDescription"
                  class="description__container"
                >
                  <v-card class="mr-5" min-height="120px" tile outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="description__title mb-1">{{
                          title
                        }}</v-list-item-title>
                        <v-list-item-subtitle
                          >{{ description }}
                        </v-list-item-subtitle>

                        <v-list-item-action-text class="mt-4 description__url">
                          {{ url | limitString(100, true) }}
                        </v-list-item-action-text>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-content>
                <!-- template animation -->
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      size="64"
                      color="#03dac5"
                    ></v-progress-circular>
                  </v-row>
                </template>
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="secondary">
                    <v-hover v-slot:default="{ onHover }">
                      <v-btn
                        class="black--text font-weight-bold text-capitalize body-1"
                        color="success"
                        x-large
                        elevation="1"
                        @click.prevent="visitLink()"
                        >Visit Link</v-btn
                      >
                    </v-hover>
                  </v-overlay>
                </v-fade-transition>
              </v-img>
            </template>
          </v-hover>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    meta: {
      default: null,
      type: Object
    }
  },
  computed: {
    hasImage() {
      if (this.meta != null && this.meta.links[0].meta != undefined) {
        return this.meta.links[0].meta.image != undefined ||
          this.meta.links[0].meta.images != undefined
          ? true
          : false;
      }
      return false;
    },
    hasDescription() {
      if (this.meta != null && this.meta.links[0].meta != undefined) {
        return this.meta.links[0].meta.description != undefined ? true : false;
      }
      return false;
    },
    title() {
      if (this.meta.links[0].meta.title != undefined) {
        return this.meta.links[0].meta.title;
      }
      return "";
    },
    description() {
      return this.meta.links[0].meta.description;
    },
    image() {
      if (this.meta.links[0].meta.images != undefined) {
        return this.meta.links[0].meta.images[0];
      }
      return this.meta.links[0].meta.image;
    },
    url() {
      return this.meta.links[0].url;
    }
  },
  methods: {
    visitLink() {
      this.$emit("visitLink", this.meta.links[0].url);
    }
  }
};
</script>

<style scoped>
.description__title {
  font-size: 18px;
}
.description__url {
  font-size: 10px;
}
.description__container {
  position: absolute;
  background: #ffffff;
  opacity: 0.7;
  min-height: 120px;
  bottom: 0;
  width: 100%;
  margin-left: -1px;
}
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
  padding: 13px;
  height: auto;
}
.newsfeed__imageWrapper {
  max-height: 500px;
}
</style>
