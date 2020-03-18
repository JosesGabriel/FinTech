<template>
  <v-container class="d-block">
    <v-carousel class="plan__bg--carousel" cycle hide-delimiters :show-arrows="false">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        height="100%"
        :interval="6000"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card flat :dark="lightSwitch == 1" color="transparent">
          <v-img
            v-if="lightSwitch == 0"
            width="110"
            height="auto"
            src="/lyduz-logo/Lyduz-Dark-Highres.svg"
          ></v-img>
          <v-img v-else width="125" height="auto" src="/lyduz-logo/Lyduz-Light-Highres.svg"></v-img>

          <span class="backer__headline--text pt-10 my-10 d-block">
            Looping
            <br />Investors
          </span>

          <span class="backer__subheadline--text d-block">
            Building the best community of investors from all over
            the world housed under an
            <strong
              class="success--text"
            >end to end platform</strong> where
            idea sharing is promoted, mutual respect is upheld
            and above all, technology cuts above the rest.
          </span>

          <v-divider :dark="lightSwitch == 1" class="my-10" width="85%"></v-divider>

          <span class="backer__quoteheadline--text d-block text-justify">
            We aim to create the LinkedIn for retail traders and self-directed
            investors, packed with
            <strong
              class="success--text"
            >institutional-grade</strong> features, insights, market
            intelligence and everything that is in-between, all streamed into a
            data superhighway that enables any user to
            <strong
              class="success--text"
            >early detect</strong> real-world
            market opportunities.
          </span>
          <v-divider :dark="lightSwitch == 1" class="mt-10" width="85%"></v-divider>
        </v-card>
      </v-col>
      <v-col cols="6" class="pa-10">
        <v-card :dark="lightSwitch == 1" class="plan__card--container ml-auto pa-7">
          <span class="plan__headline--text success--text d-block">Be our Early Backer</span>
          <span class="plan__subheadline--text caption normal d-block">
            In return, you will gain a Lifetime Full-Access Pass
            <br />into all of Lyduz’s features.
          </span>
          <div class="text-center d-block my-7">
            <span class="plan__amount--number display-2">$60</span>
            <span class="caption">pay onetime</span>
          </div>
          <div class="body-2 plan__inclusion--icon">
            <span class="d-block">Other benefits are:</span>
            <span class="d-block">
              <v-icon class="body-2 mr-1" color="success">mdi-check-bold</v-icon>Early access to new features & trading tools
            </span>
            <span class="d-block">
              <v-icon class="body-2 mr-1" color="success">mdi-check-bold</v-icon>Full access to broker-quality research
            </span>
            <span class="d-block">
              <v-icon class="body-2" width="10%" color="success">mdi-check-bold</v-icon>
              <span width="90%">Realtime notifications to acquired Market Intelligence</span>
            </span>
            <span class="d-block">
              <v-icon class="body-2 mr-1" color="success">mdi-check-bold</v-icon>Priority & discounted pass to Lyduz events
            </span>
            <span class="d-block">
              <v-icon class="body-2 mr-1" color="success">mdi-check-bold</v-icon>Full & lifetime access to all of Lyduz’s feature
            </span>
            <span class="d-block">
              <v-icon class="body-2 mr-1" color="success">mdi-check-bold</v-icon>Ad-free experience
            </span>
            <span class="d-block">
              <v-icon class="body-2 mr-1" color="success">mdi-check-bold</v-icon>Early-backer badge
            </span>
            <span class="d-block overline font-italic mt-2 no-transform tertiary--text">
              Note: Contents provided by third parties are excluded.
              <br />Offer is limited to the first 6,000 supporters only.
            </span>
            <v-btn
              @click="checkUserLogin"
              rounded
              color="success"
              block
              class="black--text text-capitalize bold mt-8"
            >
              <span v-show="!toggleElements">
                Back
                <span class="text-lowercase mx-1">us</span> Today
              </span>
              <v-progress-circular
                v-show="toggleElements"
                small
                indeterminate
                color="gray"
                :width="2"
                :size="20"
              ></v-progress-circular>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  auth: false,
  layout: "public",
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  data() {
    return {
      toggleElements: false,
      items: [
        {
          src: "/background-carousel/bg-id1.jpg"
        },
        {
          src: "/background-carousel/bg-id2.jpg"
        }
      ]
    };
  },
  mounted() {
    let paramsString = window.location.href;
    let searchParams = new URLSearchParams(paramsString);
    console.log(searchParams)
  },
  methods: {
    checkUserLogin() {
      this.toggleElements = true;
      switch (this.$auth.state.loggedIn) {
        case true:
          this.$api.accounts.payment.payments().then(response => {
            if (response.success) {
              window.location.href = response.meta.redirect.url;

              this.toggleElements = false;
            }
          });
          break;
        case false:
          window.location.href = "/login";
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
#app .backer__headline--text {
  font-style: normal;
  font-weight: 600;
  font-size: 72px;
  line-height: 97.9%;
  font-family: "Montserrat", sans-serif !important;
}
#app .backer__subheadline--text {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  align-items: center;
  letter-spacing: 0.15px;
  width: 85%;
}
#app .backer__quoteheadline--text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  width: 85%;
}
#app .plan__headline--text {
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  font-family: "Montserrat", sans-serif !important;
}
#app .plan__subheadline--text {
  line-height: 16px;
}
.plan__card--container {
  width: 78%;
  border-radius: 12px !important;
}
.plan__amount--number {
  font-family: "Montserrat", sans-serif !important;
  font-style: normal;
  font-weight: 800;
}
#app .plan__inclusion--icon {
  line-height: 25px;
  font-weight: 400;
}
#app .plan__bg--carousel {
  height: 100% !important;
  position: absolute;
  left: 0;
  top: 0;
}
</style>

<style>
#app .plan__bg--carousel .v-image.v-carousel__item {
  height: 100% !important;
}
</style>