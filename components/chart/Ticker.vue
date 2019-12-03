<template>
  <v-content>
    <v-content v-show="lightSwitch == false">
      <!-- TradingView Widget BEGIN -->
      <div class="tradingview-widget-container">
        <div class="tradingview-widget-container__widget"></div>
        <div class="tradingview-widget-copyright">
          <a href="https://www.tradingview.com" rel="noopener" target="_blank"
            ><span class="blue-text">Ticker Tape</span></a
          >
          by TradingView
        </div>
        <script
          type="text/javascript"
          src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
          async
        >
            {
            "symbols": [
              {
                "proName": "OANDA:SPX500USD",
                "title": "S&P 500"
              },
              {
                "proName": "OANDA:NAS100USD",
                "title": "Nasdaq 100"
              },
              {
                "proName": "FX_IDC:EURUSD",
                "title": "EUR/USD"
              },
              {
                "proName": "BITSTAMP:BTCUSD",
                "title": "BTC/USD"
              },
              {
                "proName": "BITSTAMP:ETHUSD",
                "title": "ETH/USD"
              }
            ],
            "colorTheme": "light",
            "isTransparent": true,
            "displayMode": "adaptive",
            "locale": "en"
          }
        </script>
      </div>
      <!-- TradingView Widget END -->
    </v-content>
    <v-content v-show="lightSwitch == true">
      <!-- TradingView Widget BEGIN -->
      <div class="tradingview-widget-container">
        <div class="tradingview-widget-container__widget"></div>
        <div class="tradingview-widget-copyright">
          <a href="https://www.tradingview.com" rel="noopener" target="_blank"
            ><span class="blue-text">Ticker Tape</span></a
          >
          by TradingView
        </div>
        <script
          type="text/javascript"
          src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
          async
        >
            {
            "symbols": [
              {
                "proName": "OANDA:SPX500USD",
                "title": "S&P 500"
              },
              {
                "proName": "OANDA:NAS100USD",
                "title": "Nasdaq 100"
              },
              {
                "proName": "FX_IDC:EURUSD",
                "title": "EUR/USD"
              },
              {
                "proName": "BITSTAMP:BTCUSD",
                "title": "BTC/USD"
              },
              {
                "proName": "BITSTAMP:ETHUSD",
                "title": "ETH/USD"
              }
            ],
            "colorTheme": "dark",
            "isTransparent": true,
            "displayMode": "adaptive",
            "locale": "en"
          }
        </script>
      </div>
      <!-- TradingView Widget END -->
    </v-content>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Ticker",
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    mode: function() {
      return this.lightSwitch == false ? "light" : "dark";
    }
  },
  watch: {
    lightSwitch(value) {
      console.log("light");
      console.log(this.mode);
    }
  }
};
</script>

<style></style>
