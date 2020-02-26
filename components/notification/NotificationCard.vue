<template>
  <v-list-item
    @click="linkTo(notification.id)"
    class="notification__item py-1"
    :class="notification.status"
  >
    <v-list-item-avatar class="mr-3" size="35">
      <!-- if notification is specific user notification -->
      <img
        v-if="meta.user && meta.post || typeof meta.post == 'undefined' && typeof meta.stock == 'undefined' && meta.user"
        :src="meta.user.profile_image != null
      ? meta.user.profile_image
      : '/default.png'"
      />
      <!-- if notification is watchlist notification -->
      <span v-else-if="meta.user && meta.stock">{{ meta.stock.symbol }}</span>
    </v-list-item-avatar>

    <v-list-item-content class="listItem__content py-1">
      <div class="body-2 ma-0 userMessage__dropdown-title">
        <span
          v-if="meta.user && meta.post || typeof meta.post == 'undefined' && typeof meta.stock == 'undefined' && meta.user"
          class="body-2 ma-0 userMessage__message caption"
        >{{ notification.notificable.message }}</span>
        <span
          v-else-if="meta.user && meta.stock ? meta.stock.trigger === 'Entry Price' : ''"
          class="body-2 ma-0 userMessage__message caption"
        >{{ entry.first_message + meta.stock.symbol + entry.second_message + ' Current price is now ₱' + meta.stock.executed_price }}</span>
        <span
          v-else-if="meta.user && meta.stock ? meta.stock.trigger === 'Take Profit' : ''"
          class="body-2 ma-0 userMessage__message caption"
        >{{ take.first_message + meta.stock.symbol + entry.second_message + ' Current price is now ₱' + meta.stock.executed_price }}</span>
        <span
          v-else-if="meta.user && meta.stock ? meta.stock.trigger === 'Stop Lost' : ''"
          class="body-2 ma-0 userMessage__message caption"
        >{{ stop.first_message + meta.stock.symbol + entry.second_message + ' Current price is now ₱' + meta.stock.executed_price }}</span>
      </div>
      <span class="caption tertiary--text">{{ localFormat(notification.created_at, "fn") }}</span>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { AddDynamicTime, LocalFormat } from "~/assets/js/helpers/datetime";
import { mapGetters } from "vuex";

export default {
  props: {
    notification: {
      default() {
        return {};
      },
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      stockList: "global/getStockList"
    }),
    /**
     * transfer data to meta to make code shorter.
     *
     * @return  {Object}  returns object
     */
    meta() {
      return this.notification.notificable.meta;
    }
  },
  data() {
    return {
      entry: {
        first_message: "Your entry price for ",
        second_message: " is hit. Buy now."
      },
      take: {
        first_message: "Your take profit price for ",
        second_message: " is hit. Sell now."
      },
      stop: {
        first_message: "Your cut loss price for ",
        second_message: " is hit. Sell now."
      }
    };
  },
  mounted() {
    this.getSymbol();
  },
  methods: {
    localFormat: LocalFormat,
    addDynamicTime: AddDynamicTime,

    /**
     * get the equivalent symbol of a symbol id from filtered stocklist
     *
     * @return  {Object}  returns object
     */
    getSymbol() {
      if (
        typeof this.meta.stock != "undefined" &&
        typeof this.meta.stock.symbol != "undefined"
      ) {
        const sym = this.meta.stock.id;
        const filteredStocks = this.stockList.data.filter(stock => {
          return stock.id_str == sym;
        });

        this.meta.stock.symbol = filteredStocks[0].symbol;
      }
    },
    /**
     * building link for each item
     *
     * @param   {string}  post_id          carries the post id
     * @param   {string}  notification_id  carries the notification id
     *
     * @return  {string}                   returns the build link
     */
    linkTo(notification_id) {
      /**
       * Read flag notification
       */
      this.$api.social.notification.read(notification_id).then(response => {
        if (response.success) {
          this.notification.status = "read";

          if (this.meta.user && this.meta.post) {
            window.location = "/post/" + this.meta.post.id;

          } else if(typeof this.meta.post == "undefined" && typeof this.meta.stock == "undefined" && this.meta.user){
            window.location = "/profile/" + this.meta.user.username;

          } else if(this.meta.user && this.meta.stock){
            window.location = "/watchlist";
          }
        }
      });
    }
  }
};
</script>