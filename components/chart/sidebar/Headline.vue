<template>
  <v-content class="template">
    <div id="headline">
      <div class="headline__arrow">
        <v-content>
          <v-slide-y-reverse-transition>
            <v-icon
              v-show="changeType == 1"
              size="60"
              class="arrow-icon increase"
              >mdi-chevron-up</v-icon
            >
          </v-slide-y-reverse-transition>

          <v-slide-y-transition>
            <v-icon
              v-show="changeType == 2"
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
              { increase: changeType == 1 },
              { decrease: changeType == 2 }
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
import { mapGetters, mapActions } from "vuex";
import { nativeBus } from "~/helpers/native-bus";

export default {
  name: "Headline",
  data() {
    return {
      counter: 0
    };
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
  },
  mounted() {
    // request of sir davin to have a dynamic favicon
    window.setInterval(() => {
      this.counter += 1;
      if (this.counter >= 20) {
        this.$store.commit(
          "global/SET_FAVICON",
          `${process.env.APP_URL}/favicon/favicon.ico?v=${Math.round(
            Math.random() * 999
          )}`
        );
        this.counter = 0;
      }
    }, 100);
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      stock: "chart/stock",
      lightSwitch: "global/getLightSwitch",
      stock_last: "chart/stock_last",
      stock_change: "chart/stock_change",
      stock_changepercentage: "chart/stock_changepercentage",
      stock_marketcap: "chart/stock_marketcap",
      headlineLoading: "chart/headlineLoading",
      favicon: "global/favicon",
      sse: "chart/sse",
      blink: "chart/blink"
    }),
    /**
     * toggle type for up/down arrow
     *
     * @return
     */
    changeType() {
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
    headlineLoading(value) {
      if (value === false) {
        this.sse.addEventListener("info", this.sseInfo);
      }
    },
    stock_marketcap() {
      this.updateEffect("stock__marketcap");
    },
    stock_last() {
      this.updateEffect("stock__last");
    },
    stock_change() {
      this.updateEffect("stock__change");
    },
    stock_changepercentage() {
      this.updateEffect("stock__changepercentage");
    }
  },
  methods: {
    ...mapActions({
      setSSEInfo: "chart/setSSEInfo"
    }),
    /**
     * add blink simple effect animation
     *
     * @param   {String}  dom  id of element
     *
     * @return
     */
    updateEffect(dom) {
      const item = document.getElementById(dom);
      item.style.background = "rgb(182,182,182,.2)";
      setTimeout(() => {
        item.style.background = "";
      }, this.blink);
    },
    /**
     * trgger sound effect and dynamic favicon
     *
     * @param   {Float}  change  stock change
     *
     * @return
     */
    tickSoundFavicon(change) {
      const beepSound = new Audio("/audio/vk_notification.mp3");
      beepSound.play();
      // reset counter
      this.counter = 0;

      if (change > 0) {
        this.$store.commit(
          "global/SET_FAVICON",
          `${process.env.APP_URL}/favicon/up.ico?v=${Math.round(
            Math.random() * 999
          )}`
        );
      } else if (change < 0) {
        this.$store.commit(
          "global/SET_FAVICON",
          `${process.env.APP_URL}/favicon/down.ico?v=${Math.round(
            Math.random() * 999
          )}`
        );
      } else {
        this.$store.commit(
          "global/SET_FAVICON",
          `${process.env.APP_URL}/favicon/favicon.ico?v=${Math.round(
            Math.random() * 999
          )}`
        );
      }
    },
    sseInfo(e) {
      try {
        if (this.symbolid == undefined) return;
        const data = JSON.parse(e.data);
        // set sse info to state
        //this.setSSEInfo(data);
        // emit sse info
        nativeBus.$emit("b-tv-sse-all", data);

        if (this.symbolid !== data.sym_id) return;

        this.$store.commit("chart/SET_STOCK_OBJ", {
          trades: parseInt(data.tr)
        });
        if (parseFloat(this.stock.weekyearlow) > parseFloat(data.l)) {
          //console.log(this.stock.weekyearlow + " > " + data.l);
          this.$store.commit("chart/SET_STOCK_OBJ", { weekyearlow: data.l });
        }
        if (parseFloat(this.stock.weekyearhigh) < parseFloat(data.l)) {
          this.$store.commit("chart/SET_STOCK_OBJ", { weekyearhigh: data.h });
        }
        //this.$store.commit("chart/SET_STOCK_OBJ", { marketcap: data.c });
        this.$store.commit("chart/SET_STOCK_OBJ", { last: data.c });
        this.$store.commit("chart/SET_STOCK_OBJ", { volume: data.vol });
        this.$store.commit("chart/SET_STOCK_OBJ", { value: data.val });
        this.$store.commit("chart/SET_STOCK_OBJ", { change: data.chg });
        this.$store.commit("chart/SET_STOCK_OBJ", {
          changepercentage: data.chgpc
        });
        this.$store.commit("chart/SET_STOCK_OBJ", { high: data.h });
        this.$store.commit("chart/SET_STOCK_OBJ", { low: data.l });
        this.$store.commit("chart/SET_STOCK_OBJ", { open: data.o });

        const totalaverage = data.val / data.vol;
        const average = isNaN(totalaverage) ? 0 : totalaverage;
        this.$store.commit("chart/SET_STOCK_OBJ", {
          average
        });
        // create a tick sound and favicon for every update in sse
        this.tickSoundFavicon(data.chg);
      } catch (error) {
        //console.log(error);
      }
    }
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
  color: #fff;
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
}
.headline__arrow {
  flex: 0 0 60px;
}
.headline_description {
  flex: 0 0 210px;
}
</style>
