<template>
  <v-content
    class="template"
    :class="[
      { darkmode__text: lightSwitch == 1 },
      { lightmode__text: lightSwitch == 0 }
    ]"
  >
    <div id="sentiment__caption">{{ caption }}</div>
    <div id="sentiment__container" class="text-center">
      <div id="bull__container">
        <v-img
          class="bull-circle"
          src="/icon/chart/bull-circle.svg"
          @click="bullCircle"
        >
        </v-img>
      </div>
      <v-slide-y-reverse-transition>
        <div v-show="!can_add" id="prgbr__container">
          <v-progress-linear
            background-color="error"
            color="success"
            :indeterminate="loading"
            buffer-value="100"
            height="5"
            :value="bull"
            class="mt-3"
          ></v-progress-linear>
          <v-content>
            <span class="float-left percentage"
              >{{ bull | numeral("0.00") }}%</span
            >
            <span class="float-right percentage"
              >{{ bear | numeral("0.00") }}%</span
            >
          </v-content>
        </div>
      </v-slide-y-reverse-transition>
      <div id="bear__container">
        <v-img
          class="bear-circle"
          src="/icon/chart/bear-circle.svg"
          @click="bearCircle"
        ></v-img>
      </div>
    </div>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sentiment",
  data() {
    return {
      can_add: true,
      bull: "0.00",
      bear: "0.00",
      loading: true,
      first_load: true,
      caption: "Members Sentiment"
    };
  },
  watch: {
    stock(stock) {
      if (this.first_load === false) {
        this.initSentiments(stock.stockidstr, stock.market_code);
      }
    }
  },
  methods: {
    /**
     * Select bearish in as sentiments
     *
     * @return
     */
    bearCircle() {
      this.postSentiment(this.stock.stockidstr, this.stock.market_code, "bear");
    },
    /**
     * Select bullish in as sentiments
     *
     * @return
     */
    bullCircle() {
      this.postSentiment(this.stock.stockidstr, this.stock.market_code, "bull");
    },
    /**
     * Post sentiment to endpoint
     *
     * @param   {String}  stock_id
     * @param   {String}  market_code  ex: PSEI:ALI
     * @param   {String}  sentiment    bull/bear
     *
     * @return  {[type]}               [return description]
     */
    async postSentiment(stock_id, market_code, sentiment) {
      if (this.can_add === false) return;
      this.loading = true;
      try {
        const response = await this.$api.social.posts.postSentiment({
          stock_id,
          market_code,
          sentiment
        });
        const { total_sentiment, bull, bear } = response.data.sentiment;
        this.bull = parseFloat((bull / total_sentiment) * 100);
        this.bear = parseFloat((bear / total_sentiment) * 100);
        this.can_add = false;
        this.loading = false;
        this.caption = "Members Sentiment";
      } catch (error) {}
    },
    /**
     * initialize and request sentiment social API on mount hook
     *
     * @param   {String}  stock_id
     * @param   {String}  market_code
     *
     * @return
     */
    async initSentiments(stock_id, market_code) {
      this.can_add = true;
      this.loading = true;
      try {
        const response = await this.$api.social.posts.getSentiment({
          stock_id,
          market_code
        });
        const { total_sentiment, bull, bear } = response.data.sentiment;
        this.bull = parseFloat((bull / total_sentiment) * 100);
        this.bear = parseFloat((bear / total_sentiment) * 100);
        this.can_add = response.data.user_stats.can_add;
        if (this.can_add == true) {
          this.caption = "Register Sentiment";
        }
        this.loading = false;
      } catch (error) {}
    }
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch",
      stock: "chart/stock"
    })
  },
  mounted() {
    /**
     * set delay 2 secs for a purpose
     */
    setTimeout(() => {
      this.initSentiments(this.stock.stockidstr, this.stock.market_code);
      this.first_load = false;
    }, 2000);
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
.header {
  text-align: center;
}
.progress {
  padding: 0px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  font-size: 10px;
}
.bull-circle {
  cursor: pointer;
  height: 30px;
  width: 30px;
  margin-left: 20px;
}
.bear-circle {
  cursor: pointer;
  height: 30px;
  width: 30px;
}
#sentiment__container {
  display: flex;
  align-items: center;
  justify-content: center;
}
#bull__container {
  flex: 0 0 50px;
  padding-right: 5px;
}
#bear__container {
  flex: 0 0 50px;
  padding-left: 5px;
}
#prgbr__container {
  flex: 0 0 180px;
}
#sentiment__caption {
  width: 100%;
  margin-top: 10px;
  text-align: center;
  font-size: 11px;
}
.percentage {
  font-size: 9px;
}
</style>
