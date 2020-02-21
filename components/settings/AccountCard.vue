<template>
  <div>
    <v-toolbar
      class="settings__toolbar"
      flat
      color="transparent"
      :dark="lightSwitch == 0 ? false : true"
    >
      <v-toolbar-title>
        <strong>
          {{
          deleteAccountToggle
          ? "Deleting Your Account and Information"
          : "Account Settings"
          }}
        </strong>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider class="settings__divider" :dark="lightSwitch == 0 ? false : true" vertical></v-divider>

    <v-card color="transparent" :loading="cardLoader" :dark="lightSwitch == 0 ? false : true" flat>
      <v-card-text class="py-0">
        <v-container v-if="!deleteAccountToggle" class="pa-0 caption">
          <v-row>
            <v-col cols="4">
              <span :class="lightSwitch == 0 ? 'black--text' : 'white--text'">Name</span>
            </v-col>
            <v-col cols="5">
              <span v-if="!nameToggle">{{ firstName }} {{ lastName }}</span>
              <div v-else>
                <v-row>
                  <v-col cols="4" class="py-1">
                    <span class="caption">First Name</span>
                  </v-col>
                  <v-col cols="6" class="py-0">
                    <v-text-field
                      v-model="firstName"
                      class="name__field"
                      color="#b6b6b6"
                      hide-details
                      outlined
                      dense
                      @input="firstNameChanged = true"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="py-1">
                    <span class="caption">Last Name</span>
                  </v-col>
                  <v-col cols="6" class="py-0">
                    <v-text-field
                      v-model="lastName"
                      class="name__field"
                      color="#b6b6b6"
                      hide-details
                      outlined
                      dense
                      @input="lastNameChanged = true"
                    ></v-text-field>
                  </v-col>
                  <span class="pl-3 mt-3">
                    Kindly note: If you want to change your name, you are only allowed to change it again after 30 days.
                    Your full name is always visible to your connections.
                  </span>
                </v-row>
              </div>
            </v-col>
            <v-col cols="2" class="pa-0 py-2 caption">
              <v-btn
                v-if="!nameToggle"
                text
                small
                class="no-transform caption"
                @click="
                  nameToggle = !nameToggle;
                  checkFieldsToggle('name');
                "
              >Change</v-btn>
              <v-btn
                v-else
                text
                small
                class="no-transform caption"
                @click="updateAccount('name')"
              >Save</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <span :class="lightSwitch == 0 ? 'black--text' : 'white--text'">Contact</span>
            </v-col>
            <v-col cols="5">
              <span v-if="!contactToggle">
                <span>Primary: {{ mobile ? mobile : "No number added yet." }}</span>
              </span>
              <v-row v-else class="py-0">
                <v-col cols="12" class="py-0">
                  <span class="contact__label">Primary:</span>
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
                      >Add</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="body-1 success--text">ADD CONTACT</v-card-title>
                      <v-card-text class="addContact__field--wrapper">
                        <span>Phone number:</span>
                        <v-text-field v-model="mobile" color="#b6b6b6" hide-details outlined dense></v-text-field>
                      </v-card-text>

                      <v-card-actions class="mt-2">
                        <v-spacer></v-spacer>
                        <v-btn text @click="mobileDialog = false">Cancel</v-btn>
                        <v-btn color="success" @click="updateAccount('contact')">Confirm</v-btn>
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
                      class="ma-0"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <span class="pl-3">
                  Only you can see your contact information. Stay connected with the community as we provide you with sms alerts.
                  With the mobile number you provided, you will receive SMS notifications informing you about the latest stock picks and market updates.
                </span>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0 py-2 caption">
              <v-btn
                v-if="!contactToggle"
                text
                small
                class="no-transform caption"
                @click="
                  contactToggle = !contactToggle;
                  checkFieldsToggle('contact');
                "
              >Change</v-btn>
              <v-btn
                v-else
                text
                small
                class="no-transform caption"
                @click="updateAccount('contact')"
              >Save</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <span :class="lightSwitch == 0 ? 'black--text' : 'white--text'">Password</span>
            </v-col>
            <v-col cols="5">
              <span v-if="!passwordToggle">*******</span>
              <v-row v-else>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="newPassword"
                    class="name__field"
                    label="New Password"
                    color="#b6b6b6"
                    hide-details
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="confirmNewPassword"
                    class="name__field"
                    label="Re-type new Password"
                    color="#b6b6b6"
                    hide-details
                    outlined
                    dense
                    @input="passwordChanged = true"
                  ></v-text-field>
                </v-col>
                <span class="pl-3 mt-3">
                  It’s a good idea that you use a strong password that you’re not using elsewhere.
                  Stick with passwords that are at least 8 characters in length.
                </span>
              </v-row>
            </v-col>
            <v-col cols="2" class="pa-0 py-2 caption">
              <v-btn
                v-if="!passwordToggle"
                text
                small
                class="no-transform caption"
                @click="
                  passwordToggle = !passwordToggle;
                  checkFieldsToggle('password');
                "
              >Change</v-btn>
              <v-btn
                v-else
                text
                small
                class="no-transform caption"
                :disabled="disabledSavePassword"
                @click="updateAccount('password')"
              >Save</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="font-weight-normal">
              <a
                :class="lightSwitch == 0 ? 'black--text' : 'white--text'"
                @click="deleteAccountToggle = true"
              >Delete Your Account and Information</a>
            </v-col>
          </v-row>
        </v-container>
        <DeleteAccount v-else @cancel="deleteAccountToggle = false" />
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
          <span>You have unsaved changes</span>
          <br />
          <br />
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
          >Cancel</v-btn>
          <v-btn
            class="no-transform black--text"
            color="success"
            @click="
              unsavedChangesDialog = false;
              updateAccountAll();
            "
          >Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteAccount from "~/components/settings/DeleteAccount.vue";
export default {
  components: {
    DeleteAccount
  },
  data() {
    return {
      settingsLabelList: ["Name", "User Account", "Contact", "Password"],
      nameToggle: false,
      contactToggle: false,
      passwordToggle: false,
      deleteAccountToggle: false,
      mobileDialog: false,
      firstNameChanged: false,
      lastNameChanged: false,
      passwordChanged: false,
      currentToggle: "",
      unsavedChangesDialog: false,
      disabledSavePassword: true,
      firstName: this.$auth.user.data.user.first_name,
      lastName: this.$auth.user.data.user.last_name,
      mobile: "(+063) " + this.$auth.user.data.user.mobile,
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
  watch: {
    confirmNewPassword() {
      if (this.newPassword == this.confirmNewPassword) {
        this.disabledSavePassword = false;
      }
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
        mobile: this.mobile,
        password: this.password
      };
      this.cardLoader = "success";
      this.$api.accounts.account
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
        case "contact":
          {
            payload = {
              mobile: this.mobile
            };
          }
          break;
        case "password":
          {
            payload = {
              password: this.confirmNewPassword
            };
          }
          break;
      }
      this.alert = [];

      this.cardLoader = "success";
      this.$api.accounts.account
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
              (this.contactToggle || this.passwordToggle) &&
              this.passwordChanged
            ) {
              this.revertChangedFlags();
              this.currentToggle = "name";
              this.unsavedChangesDialog = true;
            } else {
              this.closeAllToggles("name");
            }
          }
          break;
        case "contact":
          {
            if (this.nameToggle || this.passwordToggle) {
              // this.currentToggle = "contact";
              // this.unsavedChangesDialog = true;
            }
          }
          break;
        case "password":
          {
            if (
              (this.contactToggle || this.nameToggle) &&
              (this.firstNameChanged || this.lastNameChanged)
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
          case "contact":
            {
              this.contactToggle = false;
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
        this.contactToggle = false;
        this.passwordToggle = false;
        switch (open) {
          case "name":
            {
              this.nameToggle = true;
            }
            break;
          case "contact":
            {
              this.contactToggle = true;
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
.contact__label {
  position: relative;
  top: -4px;
}
</style>
