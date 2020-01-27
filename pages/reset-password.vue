<template>
  <v-container
    class="page__container"
    :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
    :dark="lightSwitch == 0 ? false : true"
  >
    <v-row class="mb-5" no-gutters>
      <v-col class="hidden-xs-only px-3" cols="4"> </v-col>
      <v-col cols="4">
        <v-img
          class="pl-2 pt-1 resetPass__logo"
          :src="lightSwitch == 0 ? '/logo-light.svg' : '/logo-dark.svg'"
          contain
          alt=""
          width="85"
          height="85"
        />
        <div class="pt-7">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            type="password"
            label="New Password"
            :append-icon="password.length > 8 ? 'mdi-check' : ''"
            :dark="lightSwitch == 0 ? false : true"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :rules="passwordConfirmationRule"
            type="password"
            label="Confirm Password"
            :append-icon="
              password.length > 8 && password == confirmPassword
                ? 'mdi-check'
                : ''
            "
            :dark="lightSwitch == 0 ? false : true"
          ></v-text-field>
        </div>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="6">
            <v-btn
              class="mb-2 no-transform"
              block
              full-width
              outlined
              rounded
              color="success"
              :disabled="confirmDisable"
              @click="changePassword()"
            >
              Change Password
            </v-btn>
            <router-link to="/" class="navbar__links no-transform">
              <v-btn
                class="mb-2 no-transform"
                block
                full-width
                outlined
                rounded
                color="success"
              >
                Cancel
              </v-btn>
            </router-link>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-col>
      <v-col class="px-3 hidden-sm-and-down" cols="4"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      password: "",
      confirmPassword: "",
      passwordRules: [
        v => !!v || "Password is required.",
        v => (v && v.length >= 8) || "Password must be atleast 8 characters"
      ],
      confirmPasswordRules: [
        v => !!v || "Confirm Password is required.",
        v => (v && v === this.confirmPassword) || "Passwords do not moatch"
      ],
      confirmDisable: true
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Ruleset for password confirmation
     *
     * @return
     */
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
    }
  },
  watch: {
    confirmPassword() {
      if (this.password.length > 8 && this.password == this.confirmPassword) {
        this.confirmDisable = false;
      } else {
        this.confirmDisable = true;
      }
    }
  },
  auth: false,
  layout: "main",
  mounted() {},
  methods: {
    ...mapActions({
      setAlert: "global/setAlert"
    }),
    changePassword() {
      const payload = {
        password: this.password
      };
      const param = this.$route.fullPath.indexOf("?");
      this.$axios
        .$get(process.env.API_URL + this.$route.fullPath.substr(param), payload)
        .then(response => {
          const alert = {
            model: true,
            state: true,
            message: response.message
          };
          this.setAlert(alert);
          setTimeout(() => {
            this.$router.push("login");
          }, 3000);
        });
    }
  }
};
</script>

<style scoped>
.page__container {
  max-width: 1080px;
  margin-top: 40px;
}
.resetPass__logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
