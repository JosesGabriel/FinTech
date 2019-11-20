<template>
  <div>
    <div class="userSettings__dropdown--caret"></div>
    <v-card
      color="primary"
      dark
      max-width="150px"
      class="userSettings__dropdown"
      flat
    >
      <v-card-actions class="d-block">
        <v-btn block text @click="logout()">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<style>
.userSettings__dropdown {
  position: absolute;
  top: 53px;
  right: 10px;
  margin-right: 10px;
}
.userSettings__dropdown--caret {
  width: 0;
  height: 0;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 17px solid #2196f3;
  position: absolute;
  right: 40px;
  top: 36px;
}
</style>
<script>
export default {
  data() {
    return {
      alert: false,
      alertState: false,
      alertMessage: ""
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
      // this.alert = true;
      // this.alertMessage = "Logged out";
    }
  }
};
</script>
