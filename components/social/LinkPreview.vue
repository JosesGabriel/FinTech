<template>
  <v-container class="pa-0">
    <v-row v-show="hasImage">
      <v-col cols="12" class="pa-0 pr-1">
        <div class="newsfeed__imageWrapper">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-img
                class="newsfeed__image"
                position="top"
                :alt="link.title"
                :src="link.image"
                :title="link.title"
                lazy-src="/blur.jpg"
                min-height="250"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="secondary">
                    <v-hover v-slot:default="{ onHover }">
                      <v-btn
                        class="black--text font-weight-bold text-capitalize body-1"
                        :color="!onHover ? 'success' : 'successhover'"
                        outlined
                        x-large
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
  width: 101%;
  padding: 13px;
  height: auto;
}
.newsfeed__imageWrapper {
  max-height: 500px;
}
</style>
<script>
export default {
  props: {
    meta: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    hasImage() {
      return this.meta != null && this.meta.links[0].meta.image ? true : false;
    },
    link() {
      return this.meta.links[0].meta;
    }
  },
  methods: {
    visitLink() {
      this.$emit("visitLink", this.meta.links[0].url);
    }
  }
};
</script>
