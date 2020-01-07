<template>
  <v-content class="template">
    <div id="headline">
      <div class="headline__arrow">
        <v-content>
          <v-slide-y-reverse-transition>
            <v-icon
              v-show="changetype == 1"
              size="60"
              class="arrow-icon increase"
              >mdi-chevron-up</v-icon
            >
          </v-slide-y-reverse-transition>

          <v-slide-y-transition>
            <v-icon
              v-show="changetype == 2"
              size="60"
              class="arrow-icon decrease"
              >mdi-chevron-down</v-icon
            >
          </v-slide-y-transition>
        </v-content>
      </div>
      <div
        class="headline_description"
        :class="[
          { darkmode__text: lightSwitch == 1 },
          { lightmode__text: lightSwitch == 0 }
        ]"
      >
        <div class="hcontainer_top">
          <span class="htitle">{{
            $globalMethod.limitDisplayString(stock.description, 18, true)
          }}</span>
        </div>
        <div class="hcontainer_mid">
          <span id="stock__last" class="hlast">{{
            stock.last | numeral("0,0.00")
          }}</span>
          <span
            class="hchange"
            :class="[
              { increase: changetype == 1 },
              { decrease: changetype == 2 }
            ]"
          >
            <span id="stock__change">{{
              stock.change | numeral("0.00a")
            }}</span>
            (
            <span id="stock__changepercentage"
              >{{ stock.changepercentage | numeral("0.00a") }}%</span
            >)</span
          >
        </div>
        <div class="hcontainer_bot">
          <span class="hmarcap"
            >Market Capitalization:
            <span
              id="stock__marketcap"
              class="hmarcap text-uppercase font-weight-bold"
              >{{ stock.marketcap | numeral("0.000a") }}</span
            ></span
          >
        </div>
      </div>
    </div>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Headline",
  computed: {
    ...mapGetters({
      stock: "chart/stock",
      lightSwitch: "global/getLightSwitch",
      stock_last: "chart/stock_last",
      stock_change: "chart/stock_change",
      stock_changepercentage: "chart/stock_changepercentage",
      stock_marketcap: "chart/stock_marketcap",
      favicon: "global/favicon"
    }),
    changetype() {
      let value = this.stock.change;
      if (value > 0) {
        return 1;
      } else if (value < 0) {
        return 2;
      } else {
        return 0;
      }
    }
  },
  watch: {
    stock: function(value) {
      //console.log("stock");
      //console.log(value.description);
    },
    stock_marketcap: function(value) {
      this.updateEffect("stock__marketcap");
    },
    stock_last: function(value) {
      this.updateEffect("stock__last");
    },
    stock_change: function(value) {
      this.updateEffect("stock__change");
      const change = this.stock.change[0];
      if (change === undefined) return;
      if (change > 0) {
        this.$store.commit("global/SET_FAVICON", "/favicon/arrow_up.ico");
      } else if (change < 0) {
        this.$store.commit("global/SET_FAVICON", "/favicon/arrow_down.ico");
      } else {
        this.$store.commit("global/SET_FAVICON", "/_favicon.ico");
      }
      setTimeout(
        function() {
          //console.log("set time out");
          this.$store.commit("global/SET_FAVICON", "/_favicon.ico");
        }.bind(this),
        2000
      );
    },
    stock_changepercentage: function(value) {
      this.updateEffect("stock__changepercentage");
    }
  },
  methods: {
    updateEffect: dom => {
      const item = document.getElementById(dom);
      item.style.background = "rgb(182,182,182,.2)";
      setTimeout(function() {
        item.style.background = "";
      }, 100);
    }
  },
  head() {
    return {
      title: this.stock.description,
      meta: [
        {
          hid: this.stock.market_code,
          name: this.stock.description,
          content: this.stock.description
        }
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: this.favicon }]
    };
  }
};
</script>

<style scoped>
.lightmode__text {
  color: #494949;
}
.darkmode__text {
  color: #e5e5e5;
}
div {
  margin: 0;
  padding: 0;
}
.htitle {
  font-size: 16px;
}
.hlast {
  font-size: 22px;
}
.hchange {
  font-size: 14px;
}
.hmarcap {
  font-size: 11px;
}
.template {
  /* font-size: x-small; */
  color: #fff;
  /* font-family: 'Karla', sans-serif !important; */
}
.hcontainer_top {
  margin-top: 2px;
}
.hcontainer_mid {
  margin-top: -7px;
}
.hcontainer_bot {
  margin-top: -10px;
}
.arrow-icon {
  position: absolute;
  right: 40%;
  left: 60%;
  top: -5px;
}
.increase {
  color: #03dac5 !important;
}
.decrease {
  color: #f44336 !important;
}
#headline {
  display: flex;
  /* height: 70px; */
}
.headline__arrow {
  flex: 0 0 60px;
  /* background: red; */
}
.headline_description {
  flex: 0 0 210px;
  /* background: blue; */
}
</style>
