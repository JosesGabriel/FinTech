<template>
  <v-content>
    <br />
    <Banner :imageurl="imageurl">
      <v-content
        class="mt-10 font-weight-bold body-2 banner__content"
        align="justify"
      >
        <p class="mt-10">
          Every company has a story to tell. Although ours is just starting, it
          is rather a fascinating tale of how we are forced to evolve beyond the
          blueprint of our already mapped-out journey.
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
          class="body-2 pr-12"
        >
          <!-- Start Content -->
          <h4
            class="mt-4"
            :class="[
              { 'white--text': lightSwitch == 1 },
              { 'black--text': lightSwitch == 0 }
            ]"
          >
            Our Aim
          </h4>
          <p class="mt-10">
            Lyduz aims to be a private online facility to cater to our stock
            trading requirements. Having found the great limitations of
            meticulously developing our trading tools via MS Excel and other
            similar tools, we give the idea of migrating such tools into its
            online equivalent. Using free online tools, we tried to hack on,
            improve and develop tools that we thought will give us our
            competitive advantage as a Stock Trader. For one, the Bid/Ask
            comparison which used to automatically extract online data and feed
            it in a form of a report via googel sheets now has web-based
            equivalent we call the Bid/Ask Bar. The tailor-made trading journal
            showed its real power when its website equivalent came into form.
          </p>

          <h4
            class="mt-10"
            :class="[
              { 'white--text': lightSwitch == 1 },
              { 'black--text': lightSwitch == 0 }
            ]"
          >
            We are getting out of the box.
          </h4>
          <p class="mt-10">
            After these realizations, our mission shifted. What used to be a
            personal goal became organizational and, from there it transcended
            somewhere bigger than all of us combined. A vision pop-out. What we
            plan to arm ourselves now became a mission of arming everyone else.
            That, with a thought in mind that the beauty we saw will be seen by
            everyone else. We gave a select group of people a peek of what we
            have developed so far and instantly saw the glare in their eyes, the
            same glare present in our eyes everytime we look at Lyduz. It was a
            privilege. Something we will forever hold in high regard. We have
            done something right.
          </p>

          <h4
            class="mt-10"
            :class="[
              { 'white--text': lightSwitch == 1 },
              { 'black--text': lightSwitch == 0 }
            ]"
          >
            Our vision has finally zoomed out.
          </h4>
          <p class="mt-10">
            After these realizations, our mission shifted. What used to be a
            personal goal became organizational and, from there it transcended
            somewhere bigger than all of us combined. A vision pop-out. What we
            plan to arm ourselves now became a mission of arming everyone else.
            That, with a thought in mind that the beauty we saw will be seen by
            everyone else. We gave a select group of people a peek of what we
            have developed so far and instantly saw the glare in their eyes, the
            same glare present in our eyes everytime we look at Lyduz. It was a
            privilege. Something we will forever hold in high regard. We have
            done something right.
          </p>
          <h4
            class="mt-10"
            :class="[
              { 'white--text': lightSwitch == 1 },
              { 'black--text': lightSwitch == 0 }
            ]"
          >
            This is merely our humble beginning.
          </h4>
          <p class="mt-10">
            The real journey is about to begin. We know that it is going to be
            exciting. As we write our story, we invite you to come to take this
            journey with us. We will traverse off the beaten track and leave a
            trail for everyone else to follow. We will cultivate tools and
            approach way beyond the TA prevalent highway. We will make everyone
            see how other fronts prove effective and effecient to attaining a
            successful trading journey. Tools like fairk market value calculator
            are in the pipeline. Research and barney style explanations,
            understanding business dynamics, sales cycle, enterprise seasonality
            and the strengths and weaknesses of each industry. A glimpse of how
            economies work, how money works, all easy to understand and painless
            to navigate online trading platform.
          </p>
          <p class="mt-10 mb-10">
            The road ahead is long, we could use some company.
            <router-link
              tag="span"
              class="contact__links font-weight-bold"
              to="/about-us"
            >
              Join us!
            </router-link>
          </p>
          <!-- End Content -->
        </v-content>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import Banner from "~/components/static/Banner";

export default {
  auth: false,
  layout: "static",
  head() {
    return {
      title: "About Us",
      meta: [
        {
          hid: "about_us"
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
      imageurl: "about_us.svg",
      favicon: `${process.env.APP_URL}/favicon/favicon.ico?v=${Math.round(
        Math.random() * 999
      )}`
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
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
.contact__links {
  cursor: pointer;
}
.contact__links:hover {
  color: #03dac5 !important;
}
</style>
