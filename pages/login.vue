<template>
  <v-card class="login__card text-center" color="transparent" dark flat>
    <v-row no-gutters>
      <v-col class="leftPart_col" cols="12" sm="4" md="4" lg="4">
        <div class="leftPart_container">
          <span class="headlineLanding_page text-left d-block" :class="fontColor">
            Looping
            <br />Investors
          </span>
          <span
            class="bodyLanding_page text-left d-block pt-3"
            :class="fontColor"
          >Leap along with the fastest growing community of self-directed investors and discover how the Stock Market can improve your financial prospects.</span>
          <div class="pa-10">
            <v-btn
              text
              tile
              medium
              class="font-weight-bold caption success--text px-8 mr-7"
              @click="registerDialogModel = true, state = 'login'"
            >LOG IN</v-btn>
            <v-btn
              color="success"
              tile
              medium
              class="font-weight-bold caption px-8 black--text"
              @click="registerDialogModel = true, state = 'register'"
            >SIGN UP</v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="8" md="8" lg="8">
        <img :src="landingImg" alt width="100%" />
      </v-col>
    </v-row>
    <div class="d-block text-center caption pt-5">
      <router-link to="/" class="no-transform tertiary--text">Privacy Policy</router-link>·
      <router-link to="/" class="no-transform tertiary--text">Terms of Use</router-link>·
      <router-link to="/" class="no-transform tertiary--text">About Us</router-link>·
      <router-link to="/" class="no-transform tertiary--text">Help Desk</router-link>·
      <router-link to="/" class="no-transform tertiary--text">Affliate</router-link>·
      <router-link to="/" class="no-transform tertiary--text">Contact Us</router-link>·
      <span class="success--text">Lyduz © 2019</span>
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
        ? "/landing-page-dark.svg"
        : "/landing-page-light.svg";
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
      state: '',
    };
  },
  mounted() {
    this.retrieveParams();
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
    retrieveParams() {
      let param = this.$route.fullPath;
      const { query } = this.$route;
      if (Object.prototype.hasOwnProperty.call(query, "auth_provider")) {
        return this.$api.authentication.providers
          .getRedirectCallback(query["auth_provider"], query)
          .then(({ data }) => {
            if (data.success) {
              this.$auth.setUserToken(data.data.token.access_token).then(() =>
                this.setAlert({
                  model: true,
                  state: "success",
                  message: data.message
                })
              );
            }
          })
          .catch(e => {
            this.setAlert({
              model: true,
              state: "error",
              message: "An error has occurred."
            });
          });
      }
      if (param.includes("redirected=true")) {
        this.setLoginModalState(true);
      }
    }
  }
};
</script>

<style scoped>
.leftPart_col {
  position: relative;
}
.leftPart_container {
  position: absolute;
  transform: translateY(25%);
}
.headlineLanding_page {
  font-style: normal;
  font-weight: 900;
  font-size: 64px;
  line-height: 97.9%;
}
.bodyLanding_page {
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.5px;
}
.login__card {
  margin-top: 100px;
}
</style>
