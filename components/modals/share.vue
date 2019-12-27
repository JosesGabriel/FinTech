<template>
  <v-dialog v-model="show" max-width="450px" persistent>
    <v-card :dark="lightSwitch == true">
      <v-card-title class="text-center justify-center px-0 py-3 pt-5">
        <h1 class="font-weight-regular subtitle-1 success--text">
          Promote Your Work
        </h1>
      </v-card-title>
      <v-card color="transparent" class="d-flex justify-center" elevation="0">
        <router-link to="/" class="px-1">
          <v-btn icon>
            <img src="/icon/journal-icons/twitter.svg" width="25" />
          </v-btn>
        </router-link>
        <router-link to="/" class="px-1 routerlink_facebook-link">
          <v-btn icon @click="shareToFb">
            <v-icon color="#B6B6B6" class="facebook_box-icon display-1" flat
              >mdi-facebook-box</v-icon
            >
          </v-btn>
        </router-link>
        <router-link to="/login" class="px-1">
          <v-btn icon>
            <img src="/icon/journal-icons/instagram.svg" width="25" />
          </v-btn>
        </router-link>
      </v-card>
      <v-card-title class="text-center justify-center px-0 py-3 pt-5">
        <h5 class="font-weight-thin caption success--text">or Copy Link</h5>
      </v-card-title>
      <v-container>
        <v-row>
          <v-card
            color="transparent"
            class="d-flex justify-center"
            elevation="0"
          >
            <v-btn icon class="copy_link-btn mr-1">
              <img src="/icon/journal-icons/link.svg" width="20" />
            </v-btn>
            <div
              class="copy_link-textfield-cont"
              color="transparent"
              elevation="0"
            >
              <div class="form-control d-flex textfield_copy-code flex-grow">
                <span class="body-2 grey--text copy_link-textfield-dis px-2">{{
                  shareURL
                }}</span>
                <span
                  class="btn btn-info copy-btn ml-auto copy_link-textfield-btn caption px-2 success--text"
                  @click.stop.prevent="copyshareURL"
                  >Copy</span
                >
                <input id="testing-code" type="hidden" :value="shareURL" />
              </div>
            </div>
          </v-card>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn
          class="shareModal__button--close"
          icon
          color="success"
          @click.stop="closeEmit"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
<script>
require("dotenv").config();
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    postid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      shareURL: process.env.CURRENT_DOMAIN + "/post?id=" + this.postid
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted: function() {
    if (this.postid) this.show = true;
  },
  created: function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: "407039123333666",
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
  methods: {
    copyshareURL() {
      let shareURLToCopy = document.querySelector("#testing-code");
      shareURLToCopy.setAttribute("type", "text");
      shareURLToCopy.select();

      try {
        var successful = document.execCommand("copy");
      } catch (err) {}

      /* unselect the range */
      shareURLToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    closeEmit() {
      this.$emit("closeModal");
    },
    shareToFb() {
      FB.ui(
        {
          method: "share",
          href: this.shareURL
        },
        function(response) {}
      );
    }
  }
};
</script>
<style>
.shareModal__button--close {
  position: absolute;
  top: 5px;
  right: 5px;
}
.copy_link-textfield-cont,
.copy_link-btn {
  border: 2px solid #03dac5;
  border-radius: 0 !important;
  /* width: 100% */
}
.copy_link-textfield-cont {
  width: 80%;
  display: block !important;
}
.copy_link-textfield {
  color: #fff;
}
.copy_link-textfield-dis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.copy_link-textfield-btn:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.copy_link-textfield-btn:active {
  background: #03dac5;
  color: #00121e !important;
  font-weight: 600;
}
.textfield_copy-code {
  padding: 6px 0;
}
.facebook_box-icon {
  font-size: 31px;
}
.routerlink_facebook-link {
  text-decoration: none;
}
</style>
