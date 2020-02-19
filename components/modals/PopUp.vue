<template>
  <span class="popupImg" :class="display ? 'display' : 'nodisplay'">
    <v-icon small color="black" class="popUpClose" @click="closePopUp"
      >mdi-close</v-icon
    >
      <img class="imgPop" width="361" src="/popup2.jpg" />
    
       <img class="fb_logo_btn" width="85" src="/Frame 296.svg" @click="shareToFB()" />
       <img class="twitter_logo_btn" width="85" src="/Frame 295.svg" @click="shareToTwitter()" />
    </v-btn>
  </span>
</template>
<script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
<script>
export default {
  data() {
    return {
      display: false
    };
  },
  created() {
    this.showPopUp();
  },
  mounted() {
    this.fbInitialization();
  },
  methods: {
    /**
     * show PopUp after 10 seconds
     *
     * 
     */
    showPopUp() {
           let gettlocal = localStorage.getItem('showpopup1');
                gettlocal = JSON.parse(gettlocal);
          if(gettlocal == null){      
          setTimeout(() => {
             this.display = true;     
          }, 10000);
        }  
    },
    /**
     * close Popup when u click "x" button
     *
     */
    closePopUp(){
      this.display = false;
      localStorage.setItem('showpopup1', true);
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
    /**
     * Share to Facebook button
     *
     */
    shareToFB() {
      FB.ui(
        {
          method: "share",
          href: process.env.LYDUZ_CUSTOM_SHARE_LINK,
          quote: "Sharing this newfound free trading platform. Try it now!"
        },
        function(response) {}
      );
    },
    /**
     * Share to Twitter button
     *
     */
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
  }
};
</script>
<style scoped>
.popupImg {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 999;
 /* box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.47); */
}
.popUpClose {
  position: fixed;
  right: 18px;
  bottom: 272px;
}
.popUpClose:hover {
  cursor: pointer;
}
.display {
  display: block;
}
.nodisplay {
  display: none;
}
.fb_logo_btn {
  position: fixed;
  bottom: 85px;
  right: 60px;
  border-radius: 20px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.47);
}
.twitter_logo_btn {
  position: fixed;
  bottom: 45px;
  right: 60px;
  border-radius: 20px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.47);
}
.fb_logo_btn:hover,
.twitter_logo_btn:hover {
  cursor: pointer;
}
.imgPop {
  border-radius: 5px;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.47);
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
