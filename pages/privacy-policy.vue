<template>
  <v-content>
    <br />
    <Banner :imageurl="imageurl">
      <v-content
        class="mt-10 font-weight-bold body-2 banner__content"
        align="justify"
      >
        <p>
          This page informs you of our policies regarding the collection, use,
          and disclosure of Personal Information we receive form users of the
          site.
        </p>
        <p>
          We use your Personal Information only for providing and improvicng the
          site. By using the site, you agree to the collection and use of
          information in accordance with this policy.
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
          <h4 class="mt-4">
            Information Collection and Use
          </h4>
          <p class="mt-10">
            While using our site, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you. Your identifiable information may be included but it
            si not limited to your name (“Personal Information”).
          </p>
          <h4 class="mt-10">
            Log Data
          </h4>
          <p class="mt-10">
            Like many site operators, we collect information that your browser
            sends whenever you visit our site (“Log Data”).
          </p>
          <p class="mt-10">
            This Log Data may include information such as your computer’s
            Internet Protocol (“IP”) address, browser type, browser version, the
            pages of our site that you visit, the time and date of your visi,
            the time spent on those pages, and other statistics.
          </p>
          <p class="mt-10">
            Also , we may use third party services such as Google Analytics that
            collect, monitor and analyze this.
          </p>
          <h4 class="mt-10">
            Communications
          </h4>
          <p class="mt-10">
            We may use your Personal Information to contact you with
            newsletters, marketing or promotional materials, and other
            information that we deemed helpful for your trading & investing
            activities.
          </p>
          <h4 class="mt-10">
            Cookies
          </h4>
          <p class="mt-10">
            Cookies are files with small amount of data, which may include an
            anonymouse unique identifier. Cookies are sent to your browser from
            a website and stored on your computer’s hard drive.
          </p>
          <p class="mt-10">
            Like many sites, we use “cookies” to collect information. You can
            instruct your browser to refuse all cookies or to indicate when a
            cookie is being sent. However, if you do not accept cookies, you may
            not be able to use som portions of our site.
          </p>
          <h4 class="mt-10">
            Security
          </h4>
          <p class="mt-10">
            The security your Personal Information is important to us, but
            remember that no method of transmission over the Internet, or method
            of electronic storage is 100% secure. While we strive to use
            commercially acceptable means to protect your Personal Information,
            we cannot guarantee its absolute security.
          </p>
          <h4 class="mt-10">
            Changes To This Privace Policy
          </h4>
          <p class="mt-10">
            This Privacy Policy is effective as of Jan 21, 2020, and will remain
            in effect except concerning any changes in its provisions in the
            future, which wil be in effect immediately after being posted on
            this page.
          </p>
          <p class="mt-10">
            We reserve the right to update or change our Privacy Policy at any
            time and you should check this Privacy Policy periodically. Your
            continued use of the service after we post any modifications to the
            Privace Policy on this page will constitute your acknowledgment of
            the modifications and your consent to abide and be bound by modified
            Privacy Policy.
          </p>
          <p class="mt-10">
            If we make any material changes to this Privacy Policy, we will
            notify you either through the email address you have provided us or
            by placing a prominent notice on your website.
          </p>
          <h4 class="mt-10">
            Contact Us
          </h4>
          <p class="mt-10">
            If your have any question about this Privacy Policy, please
            <a href="/contact-us" class="contact__link font-weight-bold"
              >contact us</a
            >
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
  components: {
    Banner
  },
  data() {
    return {
      imageurl: "privacy.svg"
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
.contact__link {
  text-decoration: none;
  color: inherit;
}
</style>
