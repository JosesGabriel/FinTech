<template>
  <div>
    <v-toolbar
      class="settings__toolbar"
      flat
      color="transparent"
      :dark="lightSwitch == 0 ? false : true"
    >
      <v-toolbar-title><strong>Account Settings</strong></v-toolbar-title>
    </v-toolbar>
    <v-divider
      class="settings__divider"
      :dark="lightSwitch == 0 ? false : true"
      vertical
    ></v-divider>

    <v-card
      color="transparent"
      :loading="cardLoader"
      :dark="lightSwitch == 0 ? false : true"
      flat
    >
      <v-card-text class="py-0">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="4">
              <span>Name</span>
            </v-col>
            <v-col cols="6">
              <span v-if="!nameToggle">{{ firstName }} {{ lastName }}</span>
              <v-row v-else>
                <v-col cols="5"
                  ><v-text-field
                    v-model="firstName"
                    label="First Name"
                    success
                    hide-details
                    outlined
                    dense
                  ></v-text-field
                ></v-col>
                <v-col cols="5"
                  ><v-text-field
                    v-model="lastName"
                    label="Last Name"
                    success
                    hide-details
                    outlined
                    dense
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!nameToggle"
                text
                class="no-transform"
                @click="nameToggle = !nameToggle"
                >Change</v-btn
              >
              <v-btn
                v-else
                text
                class="no-transform"
                @click="updateAccount('name')"
                >Save</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <span>User Name</span>
            </v-col>
            <v-col cols="6">
              <span v-if="!usernameToggle">{{ userName }}</span>
              <v-row v-else>
                <v-col cols="12"
                  ><v-text-field
                    v-model="userName"
                    label="Username"
                    success
                    hide-details
                    outlined
                    dense
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!usernameToggle"
                text
                class="no-transform"
                @click="usernameToggle = !usernameToggle"
                >Change</v-btn
              >
              <v-btn
                v-else
                text
                class="no-transform"
                @click="updateAccount('username')"
                >Save</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <span>Contact</span>
            </v-col>
            <v-col cols="6">
              <span v-if="!contactToggle"
                ><i>{{ mobile ? mobile : "No number added yet." }}</i></span
              >
              <v-row v-else>
                <v-col cols="12"
                  ><v-text-field
                    v-model="mobile"
                    label="Contact"
                    success
                    hide-details
                    outlined
                    dense
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!contactToggle"
                text
                class="no-transform"
                @click="contactToggle = !contactToggle"
                >Change</v-btn
              >
              <v-btn
                v-else
                text
                class="no-transform"
                @click="updateAccount('contact')"
                >Save</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <span>Email Address</span>
            </v-col>
            <v-col cols="6">
              <span v-if="!emailToggle">{{ email }}</span>
              <v-row v-else>
                <v-col cols="12"
                  ><v-text-field
                    v-model="email"
                    label="Email Address"
                    success
                    hide-details
                    outlined
                    dense
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!emailToggle"
                text
                class="no-transform"
                @click="emailToggle = !emailToggle"
                >Change</v-btn
              >
              <v-btn
                v-else
                text
                class="no-transform"
                @click="updateAccount('email')"
                >Save</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <span>Password</span>
            </v-col>
            <v-col cols="6">
              <span v-if="!passwordToggle">*******</span>
              <v-row v-else>
                <v-col cols="12"
                  ><v-text-field
                    v-model="password"
                    label="Password"
                    success
                    hide-details
                    outlined
                    dense
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!passwordToggle"
                text
                class="no-transform"
                @click="passwordToggle = !passwordToggle"
                >Change</v-btn
              >
              <v-btn
                v-else
                text
                class="no-transform"
                @click="updateAccount('password')"
                >Save</v-btn
              >
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col cols="12">
              <a>Feed Preferences</a>
            </v-col>
          </v-row> -->
          <v-row>
            <v-col cols="12">
              <a>Delete Your Account and Information</a>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      settingsLabelList: [
        "Name",
        "User Account",
        "Contact",
        "Email Address",
        "Password"
      ],
      nameToggle: false,
      usernameToggle: false,
      contactToggle: false,
      emailToggle: false,
      passwordToggle: false,
      firstName: this.$auth.user.data.user.first_name,
      lastName: this.$auth.user.data.user.last_name,
      userName: this.$auth.user.data.user.username,
      mobile: this.$auth.user.data.user.mobile,
      email: this.$auth.user.data.user.email,
      password: "",
      alert: [],
      cardLoader: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {},
  methods: {
    updateAccount(value) {
      this.cardLoader = "success";
      let payload;
      switch (value) {
        case "name":
          {
            payload = {
              first_name: this.firstName,
              last_name: this.lastName
            };
          }
          break;
        case "username":
          {
            payload = {
              username: this.userName
            };
          }
          break;
        case "contact":
          {
            payload = {
              mobile: this.mobile
            };
          }
          break;
        case "email":
          {
            payload = {
              email: this.email
            };
          }
          break;
        case "password":
          {
            payload = {
              password: this.password
            };
          }
          break;
      }
      this.alert = [];

      this.cardLoader = "success";
      this.$api.accounts.updateAccount
        .putnoid(payload)
        .then(response => {
          this.alert.push(true);
          this.alert.push(response.message);
        })
        .catch(e => {
          this.alert.push(false);
          this.alert.push("Error Updating");
        })
        .finally(
          function() {
            this.cardLoader = false;
            this.$emit("alert", this.alert);
          }.bind(this)
        );
      this.closeAllToggles();
    },
    closeAllToggles() {
      this.nameToggle = false;
      this.usernameToggle = false;
      this.contactToggle = false;
      this.emailToggle = false;
      this.passwordToggle = false;
    }
  }
};
</script>
