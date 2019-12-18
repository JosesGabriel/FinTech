
<template>
  <v-dialog v-model="show" max-width="450px">
    <v-card :dark="lightSwitch == true" :style="{ background: cardbackground }">
      <v-card-title class="text-center justify-center px-0 py-3 pt-5">
        <h1 class="font-weight-regular subtitle-1" style="color:#00FFC3;">Promote Your Work</h1>
      </v-card-title>
      <v-card color="transparent" class="d-flex justify-center" elevation="0">
        <router-link to="/" class="px-1">
          <v-btn icon>
            <img src="/icon/journal-icons/twitter.svg" width="25" />
          </v-btn>
        </router-link>
        <router-link to="/" class="px-1 routerlink_facebook-link">
          <v-btn icon>
            <v-icon color="#B6B6B6" class="facebook_box-icon display-1" flat>mdi-facebook-box</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/login" class="px-1">
          <v-btn icon>
            <img src="/icon/journal-icons/instagram.svg" width="25" />
          </v-btn>
        </router-link>
      </v-card>
      <v-card-title class="text-center justify-center px-0 py-3 pt-5">
        <h5 class="font-weight-thin caption" style="color:#00FFC3;">or Copy Link</h5>
      </v-card-title>
      <v-container>
        <v-row>
          <v-card color="transparent" class="d-flex justify-center" elevation="0">
            <v-btn icon class="copy_link-btn mr-1">
              <img src="/icon/journal-icons/link.svg" width="20" />
            </v-btn>
            <div class="copy_link-textfield-cont" color="transparent" elevation="0">
              <div class="form-control d-flex textfield_copy-code">
                <span class="body-2 grey--text copy_link-textfield-dis px-2">{{ testingCode }}</span>
                <span
                  class="btn btn-info copy-btn ml-auto copy_link-textfield-btn caption px-2"
                  @click.stop.prevent="copyTestingCode"
                  style="color:#00FFC3;"
                >Copy</span>
                <input type="hidden" id="testing-code" :value="testingCode" />
              </div>
            </div>
          </v-card>
        </v-row>
      </v-container>

      <v-card-actions>
        <!-- <v-btn color="primary" @click.stop="show=false">Close</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible"],
  data() {
    return {
      testingCode:
        "https://www.figma.com/file/5mU1WZVN6cShIg9wMWT6qL/arbitrage-v2?node-id=553%3A1959"
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
      } catch (err) {}

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>
<style>
.copy_link-textfield-cont,
.copy_link-btn {
  border: 2px solid #00f6bd;
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
  background: #00f6bd;
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