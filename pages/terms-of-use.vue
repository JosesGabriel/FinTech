<template>
  <v-content>
    <br />
    <Banner :imageurl="imageurl">
      <v-content class="mt-10 font-weight-bold body-2 banner__content" align="justify">
        By accessing the website at /, you are agreeing to be bound by these
        terms of service, all applicable laws and regulations, and agree that
        you are responsible for compliance with any applicable local laws. If
        you do not agree with any of these terms, you are prohibited from using
        or accessing this site. The materials contained in this website are
        protected by applicable copyright and trademark law.
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
            Use License
          </h4>
          <p class="mt-10">
            Permission is granted to temporarily download one copy of the
            materials (information or software) on Lyduz’s website for personal,
            non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license, you may
            not:
          </p>
          <p class="mt-10 ml-12">
              <ul class="ml-12" style="list-style-type: circle;">
                  <li>Modify or copy the materials;</li>
                  <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                  <li>Attempt to decompile or reverse engineer any software contained on Lyduz’s website;</li>
                  <li>Remove any copyright or other proprietary notations from the materials; or</li>
                  <li>Transfer the materials to another person or “mirror” the materials on any other server.</li>
              </ul>
          </p>
          <p class="mt-10">
            This license shall automaticall terminate if you violate any of
            these restrictions and may be terminated by Lyduz at any time. Upon
            terminating your viewing of these materials or upon the termination
            of this license, you must destroy any downloaded materials in your
            possession whether in electronic or printed format.
          </p>
          <h4 class="mt-10">
            Disclaimer
          </h4>
          <p class="mt-10">
            The information in this site has been obtained form reliable sources
            such as The Philippines Stock Exchange (PSE), Local and
            International News Firms and other relevant sources which we may
            deem helpful to the overall relevance of the “site”. The accuracy or
            completeness is not guaranteed. Opinions expressed by individual
            users remained to be their own opinions and should be taken together
            with your own due diligence.
          </p>
          <p class="mt-10">
            Lyduz accepts no liability for any direct or incidental loss arising
            from the use of this site. This site is not to be construed as an
            offer or a solicitation of an offer to buy or sell any securities.
          </p>

          <h4 class="mt-10">
            Limitations
          </h4>
          <p class="mt-10">
            In no event shall Lyduz or its affiliates be liable for any negative
            results (including, without limitation, damages for loss of money or
            profit, or due to informations served in the site) arising out fo
            the use or inability to use the materials on Lyduz’s website, even
            if Lyduz or a Lyduz authorized representative has been notified
            orally or in writing of the possibility of such damage. Because some
            jurisdictions do not allow limitations on implied warranties, or
            limitations of liability for consequential or incidental damages,
            these limitations may not apply to you.
          </p>
          <h4 class="mt-10">
            Accuracy of Materials
          </h4>
          <p class="mt-10">
            The materials appearing on Lyduz website could include techncal,
            typographical, or photographic errors. Lyduz does not warrant that
            any of the materials on its website are accurate, complete or
            current. Lyduz may make changes to the materials contained on its
            website at any time without notice. However, Lyduz does not make any
            commitment to update the materials.
          </p>

          <h4 class="mt-10">
            Links
          </h4>
          <p class="mt-10">
            Lyduz has not reviewed all of the sites linked to its website and is
            not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by Lyduz of the
            site. Use of any such linked website is at the user’s own risk.
          </p>
          <h4 class="mt-10">
            Modifications
          </h4>
          <p class="mt-10">
            Lyduz may revise these terms of service for its website at any time
            without notice. By using this website you are agreeing ot be bound
            by the then current version of these terms of service.
          </p>

          <h4 class="mt-10">
            Governing Law
          </h4>
          <p class="mt-10">
            These terms and conditions are governed by and construed in
            accordance with the laws of Philippines and you irrevocably submit
            to the exclusive jurisdiction of the courts in that state or
            location.
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
      imageurl: "terms_of_use.svg",
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
</style>
