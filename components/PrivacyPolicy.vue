<template>
<v-row class="privacyPolicy">
    <v-row class="__banner" no-gutters>
      <v-row class="__bannerLogo">
        <v-col cols="3" class="pt-6" style="text-align:center;">
          <img
              class="ml-6 mt-5 pl-6 pt-3"
              src="/privacy.svg"
              alt
              width="180"
              height="100"
            />
        </v-col>
        <v-col cols="8" class="headerText" >
          <p class="mr-12 mt-10" align="justify" > 
            This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive form users of the site.
          </p>
          <p class="mr-12" align="justify">
            We use your Personal Information only for providing and improvicng the site. By using the site, you agree to the collection and use of information in accordance with this policy.
          </p>
        </v-col>
      </v-row>
    </v-row>

      <v-row class="mt-3" :style="{ color: toggleFontColor }" >
         <v-col cols="3">
         </v-col>
         <v-col cols="8 mt-3">
           <h4 class="pt-3">
             Information Collection and Use
           </h4>
           <p class="bodyText pt-6 mr-12" align="justify">
             While using our site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Your identifiable information may be included but it si not limited to your name (“Personal Information”).
           </p>
           <h4 class="pt-3">
             Log Data
           </h4>
           <p class="bodyText pt-6 mr-12" align="justify">
             Like many site operators, we collect information that your browser sends whenever you visit our site (“Log Data”).
           </p>
           <p class="bodyText mr-12" align="justify">
             This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser type, browser version, the pages of our site that you visit, the time and date of your visi, the time spent on those pages, and other statistics.
           </p>
           <p class="bodyText mr-12" align="justify">
             Also , we may use third party services such as Google Analytics that collect, monitor and analyze this.
           </p>
           <h4 class="pt-3">
             Communications
           </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
            We may use your Personal Information to contact you with newsletters, marketing or promotional materials, and other information that we deemed helpful for your trading & investing activities.
            </p>
            <h4 class="pt-3">
            Cookies
           </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
              Cookies are files with small amount of data, which may include an anonymouse unique identifier. Cookies are sent to your browser from a website and stored on your computer’s hard drive.
            </p>
            <p class="bodyText mr-12" align="justify">
              Like many sites, we use “cookies” to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use som portions of our site.
            </p>
            <h4 class="pt-3">
            Security
            </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
              The security your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
            <h4 class="pt-3">
            Changes To This Privace Policy
            </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
              This Privacy Policy is effective as of Jan 21, 2020, and will remain in effect except concerning any changes in its provisions in the future, which wil be in effect immediately after being posted on this page.
            </p>
            <p class="bodyText mr-12" align="justify">
              We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the service after we post any modifications to the Privace Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by modified Privacy Policy.
            </p>
            <p class="bodyText mr-12" align="justify">
              If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us or by placing a prominent notice on your website.
            </p>
            <h4 class="pt-3">
            Contact Us
            </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
              If your have any question about this Privacy Policy, please <a href="/contact-us">contact us</a>
            </p>
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
         </v-col>
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
    },
    }
}
</script>
<style scoped>
.__banner{
  height:200px;
  width: 100%;
  background: #03dac5;
}
.__bannerLogo{
  height: 100%;
}
.headerText{
  font-size:14px;
  font-weight: 600;
}
.bodyText{
  font-size:14px;
}

</style>