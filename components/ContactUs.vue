<template>
  <v-row class="__contactPage">
    <v-row class="__banner">
      <v-row class="__bannerLogo">
        <v-col cols="3" class="pt-6" style="text-align:center;">
          <img
            class="ml-6 mt-5 pl-6 pt-3"
            src="/contact_us.svg"
            alt
            width="180"
            height="100"
          />
        </v-col>
        <v-col cols="9" class="headerText">
          <p class="mr-12" align="justify" style="margin-top:80px;">
            We’re here and we’ve been waiting for you to reach us.
          </p>
        </v-col>
      </v-row>
    </v-row>
    <v-row class="mt-3" style="width:100%" :style="{ color: toggleFontColor }">
      <v-col cols="12" style="text-align:center;">
        It’s About Time
      </v-col>
    </v-row>
    <v-row class="mt-3" :style="{ color: toggleFontColor }">
      <v-col cols="6" class="pl-12 pr-12">
        <p>
          What do your friends call you?
        </p>
        <v-text-field
          hide-details
          :dark="lightSwitch == true"
          background-color="transparent"
        ></v-text-field>

        <p class="mt-12">
          Where can we email you back?
        </p>
        <v-text-field
          hide-details
          :dark="lightSwitch == true"
          background-color="transparent"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-container fluid>
          <v-textarea
            name="input-7-1"
            height="205"
            :dark="lightSwitch == true"
            filled
            label="The team is all ears. We’re always here for a good chat."
            auto-grow
          ></v-textarea>
        </v-container>
      </v-col>
    </v-row>
    <v-row style="width:100%; justify-content: center;">
      <v-btn depressed color="success">Submit</v-btn>
    </v-row>
    <v-row style="width:100%; justify-content: center;" class="mt-6">
      <div style="text-align:center;padding-top: 20px;">
        <v-icon large color="tertiary">mdi-facebook</v-icon>
        <v-icon large color="tertiary">mdi-twitter</v-icon>
      </div>
    </v-row>
    <v-row style="width:100%; justify-content: center;">
      <div style="text-align:center;padding-top: 20px;">
        <v-icon large color="tertiary">mdi-facebook</v-icon>
        <v-icon large color="tertiary">mdi-twitter</v-icon>
      </div>
      <div style="text-align:center;">
        <div class="footer-main">
          <router-link to="/privacy-policy">
            <span class="caption tertiary--text">Privacy Policy •</span>
          </router-link>
          <router-link to="/terms-of-use">
            <span class="caption tertiary--text">Terms of Use •</span>
          </router-link>
          <router-link to="/contact-us">
            <span class="caption tertiary--text">Contact Us •</span>
          </router-link>
          <router-link to="/about-us">
            <span class="caption tertiary--text">About Us</span>
          </router-link>
        </div>
        <div>
          <a class="caption success--text">Copyright © 2020 Lyduz</a>
        </div>
      </div>
    </v-row>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    toggleFontColor() {
      return this.lightSwitch == 0
        ? "#000000 !important"
        : "#ffffff !important";
    }
  }
};
</script>
<style scoped>
.__banner {
  height: 200px;
  width: 100%;
  background: #03dac5;
}
.__bannerLogo {
  height: 100%;
}
.headerText {
  font-size: 14px;
  font-weight: 600;
}
.bodyText {
  font-size: 14px;
}
</style>
