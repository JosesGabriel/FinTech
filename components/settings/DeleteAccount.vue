<template>
  <v-container class="pa-0 body-1">
    <div v-if="!deleteConfirmationToggle">
      <v-row>
        <v-col cols="12">
          <span
            >{{ $auth.user.data.user.username }}, are you sure you want to
            delete your account?</span
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span>Please tell us the reason why: </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-radio-group dense column>
            <v-radio label="I have another account"></v-radio>
            <v-radio label="I'm receiving too many emails"></v-radio>
            <v-radio label="I rarely find use for my account"></v-radio>
            <v-radio
              label="I have privacy concerns with your website"
            ></v-radio>
            <v-radio label="Other"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            no-resize
            outlined
            label="Your feedback matters. Is there anything else you'd like us to know?"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn
            class="no-transform"
            color="success"
            text
            @click="cancelDelete()"
            >I'd like to keep my account</v-btn
          >
          <v-btn
            class="no-transform"
            color="tertiary"
            text
            @click="deleteConfirmationToggle = true"
            >Continue</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12">
          <span>We're sad to see you go.</span><br />
          <span>You will lose your profile and all your data from Lyduz.</span
          ><br />
          <span
            >Please note that this action is permanent and can't be
            undone.</span
          >
        </v-col>
        <v-col cols="3 pr-0">
          <span class="no-transform">Input password to confirm: </span>
        </v-col>
        <v-col cols="4">
          <v-text-field
            class="name__field"
            type="password"
            color="#b6b6b6"
            hide-details
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="pt-7">
        <v-col cols="6" class="d-flex justify-end">
          <v-btn
            class="no-transform"
            color="success"
            text
            @click="cancelDelete()"
            >I'd like to keep my account</v-btn
          >
          <v-btn
            class="no-transform black--text"
            color="success"
            @click="deleteAccount()"
            >Continue</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      deleteConfirmationToggle: false
    };
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert"
    }),
    deleteAccount() {
      this.$api.accounts.account.deletenoid().then(response => {
        if (response.success) {
          let alert = {
            model: true,
            state: true,
            message: "Successfully deleted your account."
          };
          this.setAlert(alert);
          setTimeout(() => {
            this.$auth.logout();
          }, 3000);
        }
      });
    },
    cancelDelete() {
      this.$emit("cancel");
    }
  }
};
</script>
