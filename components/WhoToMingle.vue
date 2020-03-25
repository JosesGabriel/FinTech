<template>
  <v-card
    class="mb-3"
    color="transparent"
    :dark="lightSwitch == 0 ? false : true"
    outlined
    :loading="loader"
  >
    <div class="pa-0 pl-2">
      <div class="body-2 font-weight-black pl-2 pb-2">
        Suggested Connections
      </div>
      <v-divider></v-divider>
      <v-list class="transparent">
        <v-list-item
          v-for="n in suggestedUsersObject.length"
          :key="n"
          class="px-0 mb-2"
        >
          <div>
            <router-link
              :to="'/profile/' + suggestedUsersObject[n - 1].username"
              class="no-transform"
            >
              <v-avatar class="mr-2" color="grey" size="35">
                <v-img
                  :src="
                    suggestedUsersObject[n - 1].profile_image
                      ? suggestedUsersObject[n - 1].profile_image
                      : 'default.png'
                  "
                  @error="suggestedUsersObject[n - 1].profile_image = 'default.png'"
                ></v-img>
              </v-avatar>
            </router-link>
          </div>
          <div class="no-wrap caption">
            <router-link
              :to="'/profile/' + suggestedUsersObject[n - 1].username"
              class="no-transform"
            >
              <span
                class="font-weight-medium"
                :class="lightSwitch == 1 ? 'white--text' : 'black--text'"
              >
                {{ suggestedUsersObject[n - 1].first_name }}
                {{ suggestedUsersObject[n - 1].last_name }}
              </span>
            </router-link>
            <br />
            <v-list-item-subtitle>
              <span class="font-weight-thin" style="font-size: 11px;">
                <!-- Empty for now, until followers is added to endpoint -->
              </span>
            </v-list-item-subtitle>
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              v-if="suggestedUsersObject[n - 1].id != $auth.user.data.user.uuid"
              color="success"
              right
              x-small
              filled
              rounded
              class="no-transform font-weight-bold black--text"
              @click="followAccount(suggestedUsersObject[n - 1].id)"
              >Follow</v-btn
            >
          </div>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      suggestedUsersObject: "",
      stockCode: ["", "", "", "", ""],
      loader: false
    };
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    })
  },
  mounted() {
    this.getSuggestedUsers();
  },
  methods: {
    ...mapActions({
      setAlert: "global/setAlert"
    }),
    /**
     * gets current trending stocks
     *
     * @return
     */
    getSuggestedUsers() {
      this.loader = "success";
      const params = {
        count: 5
      };
      this.$api.social.suggestedUsers.index(params).then(
        function(result) {
          this.suggestedUsersObject = result.data.users;
          this.loader = false;
        }.bind(this)
      );
    },
    /**
     * fires when user clicks follow button
     *
     * @param   {string}  user_id
     *
     * @return
     */
    followAccount(user_id) {
      const params = user_id;
      this.$api.social.follow
        .followAccount(params)
        .then(response => {
          if (response.success) {
            this.getSuggestedUsers();
            let alert = {
              model: true,
              state: true,
              message: "Successfully followed!"
            };
            this.setAlert(alert);
          }
        })
        .catch(e => {
          let alert = {
            model: true,
            state: false,
            message: "You are already following this user."
          };
          this.setAlert(alert);
        });
    }
  }
};
</script>

<style scoped>
.whoToMingle__link--viewMembers {
  text-decoration: none;
}
.no-wrap {
  white-space: nowrap;
}
</style>
