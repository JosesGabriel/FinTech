<template>
<v-row class="__termOfUse" >
    <v-row class="__banner" no-gutters>
      <v-row class="__bannerLogo">
        <v-col cols="3" class="pt-6" style="text-align:center;">
          <img
              class="ml-6 mt-5 pl-6 pt-3"
               src="/terms_of_use.svg"
              alt
              width="180"
              height="100"
            />
        </v-col>
        <v-col cols="8" class="headerText" >
          <p class="mr-12 mt-10" align="justify" > 
           By accessing the website at /, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
          </p>
         
        </v-col>
      </v-row>
     </v-row>
      <v-row class="mt-3" :style="{ color: toggleFontColor }" >
         <v-col cols="3">
         </v-col>
         <v-col cols="8 mt-3">
           <h4 class="pt-3">
             Use License
           </h4>
           <p class="bodyText pt-6 mr-12" align="justify">
            Permission is granted to temporarily download one copy of the materials (information or software) on Lyduz’s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
           </p>
           <p class="bodyText mr-12" style="padding-left:170px;" align="justify">
               Modify or copy the materials; Use the materials for any commercial purpose, or for any public display (commercial or non-commercial); Attempt to decompile or reverse engineer any software contained on Lyduz’s website; Remove any copyright or other proprietary notations from the materials; or Transfer the materials to another person or “mirror” the materials on any other server.
           </p>
           <p class="bodyText mr-12" align="justify">
               This license shall automaticall terminate if you violate any of these restrictions and may be terminated by Lyduz at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
           </p>
           <h4 class="pt-3">
             Disclaimer
           </h4>
           <p class="bodyText pt-6 mr-12" align="justify">
            The information in this site has been obtained form reliable sources such as The Philippines Stock Exchange (PSE), Local and International News Firms and other relevant sources which we may deem helpful to the overall relevance of the “site”. The accuracy or completeness is not guaranteed. Opinions expressed by individual users remained to be their own opinions and should be taken together with your own due diligence.
           </p>
           <p class="bodyText mr-12" align="justify">
              Lyduz accepts no liability for any direct or incidental loss arising from the use of this site. This site is not to be construed as an offer or a solicitation of an offer to buy or sell any securities.
           </p>
           
           <h4 class="pt-3">
             Limitations
           </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
            In no event shall Lyduz or its affiliates be liable for any negative results (including, without limitation, damages for loss of money or profit, or due to informations served in the site) arising out fo the use or inability to use the materials on Lyduz’s website, even if Lyduz or a Lyduz authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
            <h4 class="pt-3">
            Accuracy of Materials
           </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
            The materials appearing on Lyduz website could include techncal, typographical, or photographic errors. Lyduz does not warrant that any of the materials on its website are accurate, complete or current. Lyduz may make changes to the materials contained on its website at any time without notice. However, Lyduz does not make any commitment to update the materials.
            </p>
            
            <h4 class="pt-3">
             Links
            </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
              Lyduz has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Lyduz of the site. Use of any such linked website is at the user’s own risk.
            </p>
            <h4 class="pt-3">
            Modifications
            </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
              Lyduz may revise these terms of service for its website at any time without notice. By using this website you are agreeing ot be bound by the then current version of these terms of service.
            </p>
            
            <h4 class="pt-3">
             Governing Law
            </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
              These terms and conditions are governed by and construed in accordance with the laws of Philippines and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
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