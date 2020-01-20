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
              <span :class="lightSwitch == 0 ? '' : 'white--text'">Name</span>
            </v-col>
            <v-col cols="5">
              <span v-if="!nameToggle">{{ firstName }} {{ lastName }}</span>
              <div v-else>
                <v-row>
                  <v-col cols="4" class="py-1">
                    <span class="caption">First Name</span>
                  </v-col>
                  <v-col cols="6" class="py-1">
                    <v-text-field
                      v-model="firstName"
                      class="name__field"
                      color="#b6b6b6"
                      hide-details
                      outlined
                      dense
                      @input="firstNameChanged = true"
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row
                  ><v-col cols="4" class="py-1">
                    <span class="caption">Last Name</span>
                  </v-col>
                  <v-col cols="6" class="py-1"
                    ><v-text-field
                      v-model="lastName"
                      class="name__field"
                      color="#b6b6b6"
                      hide-details
                      outlined
                      dense
                      @input="lastNameChanged = true"
                    ></v-text-field></v-col
                ></v-row>
              </div>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!nameToggle"
                text
                class="no-transform"
                @click="
                  nameToggle = !nameToggle;
                  checkFieldsToggle('name');
                "
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
              <span :class="lightSwitch == 0 ? '' : 'white--text'"
                >User Name</span
              >
            </v-col>
            <v-col cols="5">
              <span v-if="!usernameToggle">{{ userName }}</span>
              <v-row v-else>
                <v-col cols="12"
                  ><v-text-field
                    v-model="userName"
                    class="name__field"
                    color="#b6b6b6"
                    hide-details
                    outlined
                    dense
                    @input="usernameChanged = true"
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!usernameToggle"
                text
                class="no-transform"
                @click="
                  usernameToggle = !usernameToggle;
                  checkFieldsToggle('username');
                "
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
              <span :class="lightSwitch == 0 ? '' : 'white--text'"
                >Contact</span
              >
            </v-col>
            <v-col cols="5">
              <span v-if="!contactToggle"
                ><i>{{ mobile ? mobile : "No number added yet." }}</i></span
              >
              <v-row v-else class="py-0">
                <v-col cols="12" class="py-0">
                  <span>Primary: </span>
                  <v-dialog
                    v-model="mobileDialog"
                    :dark="lightSwitch == 0 ? false : true"
                    persistent
                    max-width="290"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-if="!mobile"
                        class="no-transform mb-1"
                        color="success"
                        text
                        v-on="on"
                        >Add</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-title class="body-1 success--text"
                        >ADD CONTACT</v-card-title
                      >
                      <v-card-text class="addContact__field--wrapper"
                        ><span>Phone number: </span>
                        <v-text-field
                          v-model="mobile"
                          color="#b6b6b6"
                          hide-details
                          outlined
                          dense
                        ></v-text-field
                      ></v-card-text>

                      <v-card-actions class="mt-2">
                        <v-spacer></v-spacer>
                        <v-btn text @click="mobileDialog = false">Cancel</v-btn>
                        <v-btn color="success" @click="updateAccount('contact')"
                          >Confirm</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-radio-group
                    v-if="mobile"
                    v-model="mobile"
                    class="d-inline-flex caption mobile__radio mt-0"
                    :mandatory="false"
                  >
                    <v-radio
                      :label="mobile ? mobile : 'No number added yet.'"
                      :value="mobile ? mobile : 'No number added yet.'"
                      color="success"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <span class="pl-3"
                  >Only you can see your contact information. Stay connected
                  with the community as we provide you with sms alerts.</span
                >
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!contactToggle"
                text
                class="no-transform"
                @click="
                  contactToggle = !contactToggle;
                  checkFieldsToggle('contact');
                "
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
              <span :class="lightSwitch == 0 ? '' : 'white--text'"
                >Email Address</span
              >
            </v-col>
            <v-col cols="5">
              <span v-if="!emailToggle">{{ email }}</span>
              <v-row v-else>
                <v-col cols="12"
                  ><v-text-field
                    v-model="email"
                    class="name__field"
                    color="#b6b6b6"
                    hide-details
                    outlined
                    dense
                    @input="emailChanged = true"
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!emailToggle"
                text
                class="no-transform"
                @click="
                  emailToggle = !emailToggle;
                  checkFieldsToggle('email');
                "
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
              <span :class="lightSwitch == 0 ? '' : 'white--text'"
                >Password</span
              >
            </v-col>
            <v-col cols="5">
              <span v-if="!passwordToggle">*******</span>
              <v-row v-else>
                <v-col cols="12" class="py-0"
                  ><v-text-field
                    v-model="currentPassword"
                    class="name__field"
                    label="Current Password"
                    color="#b6b6b6"
                    hide-details
                    outlined
                    dense
                  ></v-text-field
                ></v-col>
                <v-col cols="12" class="py-0"
                  ><v-text-field
                    v-model="newPassword"
                    class="name__field"
                    label="New Password"
                    color="#b6b6b6"
                    hide-details
                    outlined
                    dense
                  ></v-text-field
                ></v-col>
                <v-col cols="12" class="py-0"
                  ><v-text-field
                    v-model="confirmNewPassword"
                    class="name__field"
                    label="Re-type new Password"
                    color="#b6b6b6"
                    hide-details
                    outlined
                    dense
                    @input="passwordChanged = true"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" class="py-0">
                  <a class="success--text caption">Forgot your password?</a>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0">
              <v-btn
                v-if="!passwordToggle"
                text
                class="no-transform"
                @click="
                  passwordToggle = !passwordToggle;
                  checkFieldsToggle('password');
                "
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
          <v-row>
            <v-col cols="12">
              <a :class="lightSwitch == 0 ? '' : 'white--text'"
                >Delete Your Account and Information</a
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="unsavedChangesDialog"
      :dark="lightSwitch == 0 ? false : true"
      persistent
      max-width="320"
    >
      <v-card persistent>
        <v-card-text class="pt-4">
          <span>You have unsaved changes</span><br /><br />
          <span>Save changes before leaving?</span>
        </v-card-text>

        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-btn
            class="no-transform"
            text
            @click="
              unsavedChangesDialog = false;
              closeAllToggles('cancel');
            "
            >Cancel</v-btn
          >
          <v-btn
            class="no-transform black--text"
            color="success"
            @click="
              unsavedChangesDialog = false;
              updateAccountAll();
            "
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
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
      mobileDialog: false,
      firstNameChanged: false,
      lastNameChanged: false,
      usernameChanged: false,
      emailChanged: false,
      passwordChanged: false,
      currentToggle: "",
      unsavedChangesDialog: false,
      firstName: this.$auth.user.data.user.first_name,
      lastName: this.$auth.user.data.user.last_name,
      userName: this.$auth.user.data.user.username,
      mobile: this.$auth.user.data.user.mobile,
      email: this.$auth.user.data.user.email,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      alert: [],
      cardLoader: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * Simply a combination of first_name and last_name
     *
     * @return  {[type]}  [return description]
     */
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  methods: {
    /**
     * Updates all user account settings based on user input
     * Not sure what is most efficient so I have two update functions.
     * this one and updateAccount.
     *
     * Only difference is this passes all fields and the other only passes the fields that were changed.
     * To discuss
     *
     * @return  {[type]}  [return description]
     */
    updateAccountAll() {
      let payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        name: this.fullName,
        username: this.userName,
        mobile: this.mobile,
        email: this.email,
        password: this.password
      };
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
    /**
     * Updates user account settings based on user input
     *
     * @param   {string}  value
     *
     * @return
     */
    updateAccount(value) {
      this.cardLoader = "success";
      let payload;
      switch (value) {
        case "name":
          {
            payload = {
              first_name: this.firstName,
              last_name: this.lastName,
              name: this.fullName
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
    /**
     * Fires when user clicks a 'Change' button while an input field is open
     * Sets currentToggle value to what change button that user clicked.
     *
     * So if I click the Change contact button while a previous input field is already opened, currentToggle value will be = 'contact'.
     * Setting this value is important because it will be the identifier for when the user clicks the 'Cancel' or 'Confirm' button for the
     * confirm changes modal.
     *
     * @param   {string}  value
     *
     * @return
     */
    checkFieldsToggle(value) {
      switch (value) {
        case "name":
          {
            if (
              (this.usernameToggle ||
                this.contactToggle ||
                this.emailToggle ||
                this.passwordToggle) &&
              (this.usernameChanged ||
                this.emailChanged ||
                this.passwordChanged)
            ) {
              this.revertChangedFlags();
              this.currentToggle = "name";
              this.unsavedChangesDialog = true;
            } else {
              this.closeAllToggles("name");
            }
          }
          break;
        case "username":
          {
            if (
              (this.nameToggle ||
                this.contactToggle ||
                this.emailToggle ||
                this.passwordToggle) &&
              (this.firstNameChanged ||
                this.lastNameChanged ||
                this.passwordChanged ||
                this.emailChanged)
            ) {
              this.revertChangedFlags();
              this.currentToggle = "username";
              this.unsavedChangesDialog = true;
            } else {
              this.closeAllToggles("username");
            }
          }
          break;
        case "contact":
          {
            if (
              this.usernameToggle ||
              this.nameToggle ||
              this.emailToggle ||
              this.passwordToggle
            ) {
              // this.currentToggle = "contact";
              // this.unsavedChangesDialog = true;
            }
          }
          break;
        case "email":
          {
            if (
              (this.usernameToggle ||
                this.contactToggle ||
                this.nameToggle ||
                this.passwordToggle) &&
              (this.firstNameChanged ||
                this.lastNameChanged ||
                this.usernameChanged ||
                this.passwordChanged)
            ) {
              this.revertChangedFlags();
              this.currentToggle = "email";
              this.unsavedChangesDialog = true;
            } else {
              this.closeAllToggles("email");
            }
          }
          break;
        case "password":
          {
            if (
              (this.usernameToggle ||
                this.contactToggle ||
                this.emailToggle ||
                this.nameToggle) &&
              (this.firstNameChanged ||
                this.lastNameChanged ||
                this.usernameChanged ||
                this.emailChanged)
            ) {
              this.revertChangedFlags();
              this.currentToggle = "password";
              this.unsavedChangesDialog = true;
            } else {
              this.closeAllToggles("password");
            }
          }
          break;
      }
    },
    /**
     * Closes toggles based on whether user clicks 'Cancel' or 'Confirm' button.
     *
     * @param   {string}  open
     *
     * @return
     */
    closeAllToggles(open) {
      if (open == "cancel") {
        switch (this.currentToggle) {
          case "name":
            {
              this.nameToggle = false;
            }
            break;
          case "username":
            {
              this.usernameToggle = false;
            }
            break;
          case "contact":
            {
              this.contactToggle = false;
            }
            break;
          case "email":
            {
              this.emailToggle = false;
            }
            break;
          case "password":
            {
              this.passwordToggle = false;
            }
            break;
        }
      }
      if (open != "cancel") {
        this.nameToggle = false;
        this.usernameToggle = false;
        this.contactToggle = false;
        this.emailToggle = false;
        this.passwordToggle = false;

        // this.firstName = this.$auth.user.data.user.first_name;
        // this.lastName = this.$auth.user.data.user.last_name;
        // this.userName = this.$auth.user.data.user.username;
        // this.mobile = this.$auth.user.data.user.mobile;
        // this.email = this.$auth.user.data.user.email;
        switch (open) {
          case "name":
            {
              this.nameToggle = true;
            }
            break;
          case "username":
            {
              this.usernameToggle = true;
            }
            break;
          case "contact":
            {
              this.contactToggle = true;
            }
            break;
          case "email":
            {
              this.emailToggle = true;
            }
            break;
          case "password":
            {
              this.passwordToggle = true;
            }
            break;
        }
      }
    },
    /**
     * reverts all 'Changed' flags.
     * 'Changed' flags are used for detecting if user changed the value inside text fields.
     * Used for determining whether 'Save Changes' modal should show or not
     *
     * @return
     */
    revertChangedFlags() {
      this.firstNameChanged = false;
      this.lastNameChanged = false;
      this.usernameChanged = false;
      this.emailChanged = false;
      this.passwordChanged = false;
    }
  }
};
</script>

<style>
.name__field {
  transform: scale(0.7);
  transform-origin: top left;
}
.mobile__radio {
  transform: scale(0.8);
  transform-origin: center left;
}
.addContact__field--wrapper {
  padding: 0 60px !important;
}
</style>
