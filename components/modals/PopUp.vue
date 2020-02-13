<template>
  <span
   class="popupImg"
   :class="display ? 'display' : 'nodisplay'"
  >
   <v-icon 
    small color="black"
    class="popUpClose" 
    @click="display = false"
   >mdi-close</v-icon>
       <img 
        width="300"
        src="/popup.jpg"
       />
    <v-btn  @click="shareToFB()" class="fb_logo_btn" fab x-small>
        <v-icon 
        class="fb_logo"
            >mdi-facebook
        </v-icon>
    </v-btn>
    <v-btn @click="shareToTwitter()" color="success" class="twitter_logo_btn" fab x-small>
        <v-icon       
         class="twitter_logo"
            >mdi-twitter
        </v-icon>
    </v-btn>
  </span>
</template>
<script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
<script>
export default {
     data() {
          return {
              display: false,
          };
     },
     created() {
        this.fbInitialization();
        this.showPopUp();
     },
     methods: {
        showPopUp(){
            setTimeout(() => { this.display = true; }, 10000);
        }, 
            /**
     * Initializes facebook SDK
     *
     * @return
     */
    fbInitialization() {
      window.fbAsyncInit = function() {
        FB.init({
          appId: process.env.FB_APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: "v5.0"
        });
      };

      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    },
    shareToFB() {
      FB.ui(
        {
          method: "share",
          href: process.env.LYDUZ_CUSTOM_SHARE_LINK
        },
        function(response) {}
      );
    },
    shareToTwitter() {
      let twitterURL =
        process.env.TWITTER_LINK +
        process.env.LYDUZ_CUSTOM_SHARE_LINK +
        process.env.TWITTER_LINK_EXTENSION;
      window.open(
        twitterURL,
        "mywindow",
        "menubar=1,resizable=1,width=350,height=250"
      );
    }      
     },
     
};
</script>
<style scoped>
.popupImg {
    position:fixed;
    right: 10px;
    bottom: 0;
    z-index: 999;
}
.popUpClose{
    position: fixed;
    right: 12px;
}
.popUpClose:hover{
    cursor: pointer;
}
.display{
    display: block;
}
.nodisplay{
    display:none;
}
.fb_logo_btn{
    color: #03dac5;
    /*font-size: 35px;*/
    position: fixed;
    bottom:20px;
    right: 100px;
}
.twitter_logo_btn {
    color: #00acee;
    /*font-size: 35px;*/
    position: fixed;
    bottom: 20px;
    right: 55px;
}
.fb_logo:hover,
.twitter_logo:hover {
    cursor: pointer;
}
.fb_logo{
    font-size: 40px;
}
</style>
<style>
.fb_logo_btn > .v-btn__content > .fb_logo {
    font-size: 38px;
}
.twitter_logo_btn > .v-btn__content > .twitter_logo {
    font-size: 25px;
}
</style>