<template>
  <v-card height="584px" :dark="isLightMode == 0 ? false : true">
    <div
      class="display-1 font-weight-bold loginCard--intro text-center py-2 pt-6"
    >
      Welcome to the community!
    </div>
    <div class="body-2 text-center">
      Check your email to verify your account
    </div>
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <v-row class="login__cardtext">
          <v-col cols="12" class="pa-0">
            <v-img src="/login/castle.png" contain></v-img>
          </v-col>
        </v-row>
        <div class="body-2 text-center login__cardtext">
          You are one of the lucky few who earliest found us. <br />Let your
          friends know you are inside.
        </div>
        <div class="body-2 text-center">
          <v-hover v-slot:default="{ hover }">
            <v-btn x-large class="display-1 mr-4" icon>
              <v-icon
                x-large
                :color="!hover ? '' : 'success'"
                @click="shareToFB()"
                >mdi-facebook</v-icon
              >
            </v-btn>
          </v-hover>
          <v-hover v-slot:default="{ hover }" x-large>
            <v-btn class="display-1 mr-4" icon>
              <v-icon
                x-large
                :color="!hover ? '' : 'success'"
                @click="shareToTwitter()"
                >mdi-twitter</v-icon
              >
            </v-btn>
          </v-hover>
        </div>
      </v-container>
    </v-card-text>
    <a
      class="float-right secondarytext--text skip__btn font-weight-bold overline"
      @click="$emit('stepper', 6)"
      >Skip</a
    >
  </v-card>
</template>

<script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    isLightMode: 0
  }),
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  created() {
    this.fbInitialization();
  },
  methods: {
    /**
     * Initializes facebook SDK
     *
     * @return
     */
    fbInitialization() {
      window.fbAsyncInit = function() {
        FB.init({
          appId: process.env.FB_APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: "v5.0"
        });
      };

      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    },
    shareToFB() {
      FB.ui(
        {
          method: "share",
          href: process.env.LYDUZ_CUSTOM_SHARE_LINK
        },
        function(response) {}
      );
    },
    shareToTwitter() {
      let twitterURL =
        process.env.TWITTER_LINK +
        process.env.LYDUZ_CUSTOM_SHARE_LINK +
        process.env.TWITTER_LINK_EXTENSION;
      window.open(
        twitterURL,
        "mywindow",
        "menubar=1,resizable=1,width=350,height=250"
      );
    }
  }
};
</script>

<style></style>
