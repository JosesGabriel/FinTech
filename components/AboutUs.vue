<template>
<v-row class="__aboutPage">
    <v-row class="__banner" no-gutters>
      <v-row class="__bannerLogo">
        <v-col cols="3" class="pt-6" style="text-align:center;">
          <img
              class="ml-6 mt-5 pl-6 pt-3"
               src="/about_us.svg"
              alt
              width="180"
              height="100"
            />
        </v-col>
        <v-col cols="8" class="headerText" >
          <p class="mr-12 mt-12" align="justify" > 
           Every company has a story to tell. Although ours is just starting, it is rather a fascinating tale of how we are forced to evolve beyond the blueprint of our already mapped-out journey.
          </p>
         
        </v-col>
      </v-row>
    
    </v-row>

      <v-row class="mt-3" :style="{ color: toggleFontColor }" >
         <v-col cols="3">
         </v-col>
         <v-col cols="8 mt-3">
           <h4 class="pt-3">
            Our Aim
           </h4>
           <p class="bodyText pt-6 mr-12" align="justify">
            Lyduz aims to be a private online facility to cater to our stock trading requirements. Having found the great limitations of meticulously developing our trading tools via MS Excel and other similar tools, we give the idea of migrating such tools into its online equivalent. Using free online tools, we tried to hack on, improve and develop tools that we thought will give us our competitive advantage as a Stock Trader. For one, the Bid/Ask comparison which used to automatically extract online data and feed it in a form of a report via googel sheets now has web-based equivalent we call the Bid/Ask Bar. The tailor-made trading journal showed its real power when its website equivalent came into form.
           </p>
           
           <h4 class="pt-3">
            We are getting out of the box.
           </h4>
           <p class="bodyText pt-6 mr-12" align="justify">
            After these realizations, our mission shifted. What used to be a personal goal became organizational and, from there it transcended somewhere bigger than all of us combined. A vision pop-out. What we plan to arm ourselves now became a mission of arming everyone else. That, with a thought in mind that the beauty we saw will be seen by everyone else. We gave a select group of people a peek of what we have developed so far and instantly saw the glare in their eyes, the same glare present in our eyes everytime we look at Lyduz. It was a privilege. Something we will forever hold in high regard. We have done something right.
           </p>
                      
           <h4 class="pt-3">
            Our vision has finally zoomed out.
           </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
            After these realizations, our mission shifted. What used to be a personal goal became organizational and, from there it transcended somewhere bigger than all of us combined. A vision pop-out. What we plan to arm ourselves now became a mission of arming everyone else. That, with a thought in mind that the beauty we saw will be seen by everyone else. We gave a select group of people a peek of what we have developed so far and instantly saw the glare in their eyes, the same glare present in our eyes everytime we look at Lyduz. It was a privilege. Something we will forever hold in high regard. We have done something right.
            </p>
            <h4 class="pt-3">
           This is merely our humble beginning.
           </h4>
            <p class="bodyText pt-6 mr-12" align="justify">
            The real journey is about to begin. We know that it is going to be exciting. As we write our story, we invite you to come to take this journey with us. We will traverse off the beaten track and leave a trail for everyone else to follow. We will cultivate tools and approach way beyond the TA prevalent highway. We will make everyone see how other fronts prove effective and effecient to attaining a successful trading journey. Tools like fairk market value calculator are in the pipeline. Research and barney style explanations, understanding business dynamics, sales cycle, enterprise seasonality and the strengths and weaknesses of each industry. A glimpse of how economies work, how money works, all easy to understand and painless to navigate online trading platform.
            </p>
            <p class="bodyText mr-12" align="justify">
                The road ahead is long, we could use some company. <a href="">Join us!</a>
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
      
    <!--</v-row>-->
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