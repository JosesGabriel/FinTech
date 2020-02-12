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
        width="364"
        src="/popup.png"
       />
    <v-icon 
        class="fb_logo"
        >mdi-facebook
    </v-icon>
    <v-icon 
        class="twitter_logo"
        >mdi-twitter
    </v-icon>
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
        //this.fbInitialization();
        this.showPopUp();
     },
     methods: {
        showPopUp(){
            setTimeout(() => { this.display = true; }, 10000);
        },       
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
.fb_logo{
    color: #3b5998;
    font-size: 35px;
    position: fixed;
    bottom: 58px;
    right: 115px;
}
.twitter_logo {
    color: #00acee;
    font-size: 35px;
    position: fixed;
    bottom: 58px;
    right: 70px;
}
.fb_logo:hover,
.twitter_logo:hover {
    cursor: pointer;
}
</style>