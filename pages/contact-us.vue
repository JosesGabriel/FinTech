<template>
  <v-content>
    <br />
    <Banner :imageurl="imageurl">
      <v-content
        class="mt-10 font-weight-bold body-2 banner__content"
        align="justify"
      >
        <p class="mt-12">
          We’re here and we’ve been waiting for you to reach us.
        </p>
      </v-content>
    </Banner>
    <v-row no-gutters>
      <v-col cols="7" offset="3">
        <v-content
          align="justify"
          :class="[
            { light_mode: lightSwitch == 0 },
            { dark_mode: lightSwitch == 1 }
          ]"
          class="text-center body-2 pr-12 mb-12"
        >
          <!-- Start Content -->
          <v-content class="contact__container">
            <h2 class="contact__header mt-10 mb-12">It’s About Time</h2>

            <p class="mt-12 pb-12">
              The team is all ears. We’re always here for a good chat.
            </p>

            <v-row no-gutters class="ml-12 pl-12 mt-12">
              <v-col cols="4">
                <v-content class="mb-4">
                  <v-hover v-slot:default="{ hover }">
                    <v-btn icon x-large @click="openEmail">
                      <v-icon size="70" :color="!hover ? textColor : 'success'"
                        >mdi-email</v-icon
                      >
                    </v-btn>
                  </v-hover>
                </v-content>
                <span class="body-2 font-weight-bold">Email</span>
              </v-col>
              <v-col cols="2">
                <h1 class="mt-6">OR</h1>
              </v-col>
              <v-col cols="4">
                <v-content class="mb-4">
                  <v-hover v-slot:default="{ hover }">
                    <v-btn icon x-large @click="openMessenger">
                      <v-icon size="70" :color="!hover ? textColor : 'success'"
                        >mdi-facebook-messenger</v-icon
                      >
                    </v-btn>
                  </v-hover>
                </v-content>
                <span class="body-2 font-weight-bold">Messenger</span>
              </v-col>
            </v-row>
          </v-content>

          <v-row v-show="false" no-gutters>
            <v-col cols="5">
              <v-text-field
                label="What do your friends call you?"
                :dark="lightSwitch == true"
                color="success"
                class="my-9"
              ></v-text-field>
              <v-text-field
                label="Where can we email you back?"
                :dark="lightSwitch == true"
                color="success"
                class="my-9"
              ></v-text-field>
            </v-col>
            <v-col cols="7">
              <v-textarea
                solo
                height="190"
                full-width
                :dark="lightSwitch == true"
                label="The team is all ears. We’re always here for a good chat."
                auto-grow
                class="ml-6 mt-2"
              ></v-textarea>
            </v-col>
            <v-spacer />
          </v-row>
          <!-- End Content -->
        </v-content>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-content>
</template>

<script>
import Vue from "vue";
import VueFbCustomerChat from "vue-fb-customer-chat";

Vue.use(VueFbCustomerChat, {
  page_id: 102524821282907, //  change 'null' to your Facebook Page ID,
  theme_color: "#03DAC5", // theme color in HEX
  locale: "en_US" // default 'en_US'
});

import { mapGetters } from "vuex";
import Banner from "~/components/static/Banner";

export default {
  auth: false,
  layout: "static",
  head() {
    return {
      title: "Contact Us",
      meta: [
        {
          hid: "contact_us"
        }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: this.favicon }]
    };
  },
  components: {
    Banner
  },
  data() {
    return {
      imageurl: "contact_us.svg",
      favicon: `${process.env.APP_URL}/favicon/favicon.ico?v=${Math.round(
        Math.random() * 999
      )}`
    };
  },
  mounted() {
    const fbmessenger = document.getElementById("fb-root");
    if (fbmessenger != undefined) {
      fbmessenger.style.display = "block";
    }
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * toggle between ligth/dark mode
     *n
     * @return  {String}
     */
    textColor() {
      return this.lightSwitch == 0 ? "#455A64" : "#eeeeee";
    }
  },
  beforeDestroy() {
    const fbmessenger = document.getElementById("fb-root");
    if (fbmessenger != undefined) {
      fbmessenger.style.display = "none";
    }
  },
  methods: {
    openMessenger() {
      window.open("https://www.messenger.com/t/lyduz", "_blank");
    },
    openEmail() {
      window.location.href = "mailto:info@lyduz.com";
    }
  }
};
</script>

<style scoped>
.banner__content {
  color: #455a64 !important;
}
.light_mode {
  color: #455a64 !important;
}
.dark_mode {
  color: #eeeeee !important;
}
.contact__header {
  /* margin-right: 75px; */
}
.contact__container {
  margin-right: 70px;
}
</style>
