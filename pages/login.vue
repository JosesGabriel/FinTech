<template>
  <v-card class="login__card text-center mx-5" color="transparent" dark flat>
    <v-row no-gutters>
      <v-col class="leftPart_col" cols="12" sm="12" md="5" lg="4">
        <v-card
          flat
          height="100%"
          color="transparent"
          class="leftPart_container d-flex align-center"
        >
          <v-card flat color="transparent">
            <span class="headlineLanding_page text-md-left text-sm-center d-block" :class="[{'pt-10': $vuetify.breakpoint.xsOnly}, fontColor]">
              Looping
              <br />Investors
            </span>
            <span class="bodyLanding_page text-md-left text-sm-center d-block pt-3" :class="[{'pt-5': $vuetify.breakpoint.smAndDown}, fontColor]">
              Leap along with the fastest growing community of self-directed
              investors and discover how the Stock Market can improve your
              financial prospects.
            </span>
            <div class="pa-10">
              <v-btn
                text
                tile
                medium
                class="font-weight-bold caption success--text px-8 mr-7"
                @click="(registerDialogModel = true), (state = 'login')"
              >LOG IN</v-btn>
              <v-btn
                color="success"
                tile
                medium
                class="font-weight-bold caption px-8 black--text"
                @click="(registerDialogModel = true), (state = 'register')"
              >SIGN UP</v-btn>
            </div>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="8">
        <img :src="landingImg" class="landingImage" alt width="100%" />
      </v-col>
    </v-row>
    <div class="d-block text-center caption pt-10">
      <client-only>
        <router-link to="/privacy-policy" class="no-transform tertiary--text">Privacy Policy</router-link>•
        <router-link to="/terms-of-use" class="no-transform tertiary--text">Terms of Use</router-link>•
        <router-link to="/about-us" class="no-transform tertiary--text">About Us</router-link>•
        <router-link to="/help-desk" class="no-transform tertiary--text">Help Desk</router-link>•
        <!-- <router-link to="/affiliate" class="no-transform tertiary--text">Affliate</router-link>· -->
        <router-link to="/contact-us" class="no-transform tertiary--text">Contact Us</router-link>•
        <span class="success--text">Lyduz © 2020</span>
      </client-only>
    </div>

    <LoginRegister v-model="registerDialogModel" :state="state" />
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginRegister from "~/components/LoginRegister";

export default {
  head() {
    return {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          property: "description",
          hid: "description",
          content:
            "Lyduz is a free stock trading platform in the Philippines. Effectively trade the Philippine Equity Market with our realtime market data & multiple stock trading tools."
        },
        { property: "og:title", content: "Lyduz" },
        {
          property: "og:description",
          content:
            "Lyduz is a free stock trading platform in the Philippines. Effectively trade the Philippine Equity Market with our realtime market data & multiple stock trading tools."
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://lyduz.com/login"
        },
        {
          property: "og:image",
          content: this.postImage
        },
        {
          property: "fb:app_id",
          content: "407039123333666"
        }
      ]
    };
  },
  components: {
    LoginRegister
  },
  layout: "main",
  middleware: ["auth"],
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    landingImg() {
      return this.lightSwitch == 1
        ? "/landing-page-dark.gif"
        : "/landing-page-light.gif";
    },
    fontColor() {
      return this.lightSwitch == 1 ? "white--text" : "headlinedark--text";
    }
  },
  data() {
    return {
      isOpen: true,
      postImage: "https://lyduz.com/png_logo.png",
      registerDialogModel: false,
      state: ""
    };
  },
  mounted() {
    this.retrieveParams();
    localStorage.notificationStatus = 0;
  },
  created() {
    // since this page is allowed in middleware, temporarily, catch user if mobile
    // if (
    //   this.$route.query.redirect == undefined&&
    //   this.$device.isMobileOrTablet == true
    // ) {
    //   this.$router.push("/mobile");
    // }
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert",
      setLoginModalState: "login/setLoginModalState"
    }),
    /**
     * Redirect for auth provider (facebook)
     *
     * @return
     */
    async retrieveParams() {
      let param = this.$route.fullPath;
      const { query } = this.$route;
      if (Object.prototype.hasOwnProperty.call(query, "auth_provider")) {
        try {
          const response = await this.$api.authentication.providers.getRedirectCallback(
            query["auth_provider"],
            query
          );
          this.$auth
            .setUserToken(response.data.data.token.access_token)
            .then(() =>
              this.setAlert({
                model: true,
                state: "success",
                message: response.data.message
              })
            );
        } catch (error) {
          this.setAlert({
            model: true,
            state: "error",
            message: "An error has occurred."
          });
        }
      }
      if (param.includes("redirected=true")) {
        if (window.localStorage.getItem("_verifiedFromMobile") === false) {
          this.$router.push("mobile");
        } else {
          this.setLoginModalState(true);
        }
      }
    }
  }
};
</script>

<style scoped>
#app .leftPart_container .headlineLanding_page {
  font-style: normal;
  font-weight: 600;
  font-size: 64px;
  line-height: 97.9%;
  font-family: "Montserrat", sans-serif !important;
}
.bodyLanding_page {
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.5px;
}
.login__card {
  margin-top: 50px;
}
.lamp__btn {
  z-index: 99999;
  position: absolute;
  width: 8%;
  right: 337px;
}
.footer__links:hover {
  color: #03dac5;
}
</style>
