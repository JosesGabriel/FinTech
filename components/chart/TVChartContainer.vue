<template>
  <v-content>
    <div :id="containerId" :class="chartViewClass" />
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Datafeed from "~/providers/tradingview/api";

export default {
  name: "TVChartContainer",
  props: {
    //region url
    datafeedUrl: {
      default: "https://demo_feed.tradingview.com",
      type: String
    },
    chartsStorageUrl: {
      default: "https://saveload.tradingview.com",
      type: String
    },
    customCssUrl: {
      default: "tradingview.css",
      type: String
    },
    libraryPath: {
      default: "/vendor/charting_library/",
      type: String
    },
    //endregion url

    symbol: {
      default: "PSE:PSEI",
      type: String
    },
    interval: {
      default: "D",
      type: String
    },
    containerId: {
      default: "tv_chart_container",
      type: String
    },
    chartsStorageApiVersion: {
      default: "1.1",
      type: String
    },
    clientId: {
      default: "arbitrage.ph",
      type: String
    },
    userId: {
      default: "public_user_id",
      type: String
    },
    fullscreen: {
      default: false,
      type: Boolean
    },
    autosize: {
      default: true,
      type: Boolean
    },
    timezone: {
      default: "Asia/Hong_Kong",
      type: String
    }
    // theme: {
    //   default: "Dark",
    //   type: String
    // }
  },
  data() {
    return {
      widget: null,
      tvWidget: null,
      chartViewId: 0,
      chartViewClass: "chartViewClass_1"
    };
  },
  computed: {
    ...mapGetters({
      ticker: "chart/getTicker",
      table: "chart/getTable",
      symbolid: "chart/symbolid",
      stock: "chart/stock",
      maximize_table: "chart/getTableMaximize",
      fullscreen_table: "chart/getTableFullscreen",
      lightSwitch: "global/getLightSwitch",
      market_code: "chart/market_code"
    }),
    theme: function() {
      return this.lightSwitch == 0 ? "Light" : "Dark";
    },
    chartView: function() {
      if (this.ticker && this.table) {
        //console.log('both open');
        this.chartViewId = 1;
        this.chartViewClass = "chartViewClass_1";
      } else if (!this.ticker && this.table) {
        //console.log('table only');
        this.chartViewId = 2;
        this.chartViewClass = "chartViewClass_2";
      } else if (this.ticker && !this.table) {
        //console.log('ticker only');
        this.chartViewId = 3;
        this.chartViewClass = "chartViewClass_3";
      } else if (!this.ticker && !this.table) {
        //console.log('both close');
        this.chartViewId = 4;
        this.chartViewClass = "chartViewClass_4";
      }

      if (this.maximize_table) {
        switch (this.chartViewId) {
          case 1:
            this.chartViewId = 5;
            this.chartViewClass = "chartViewClass_5";
            break;

          case 2:
            this.chartViewId = 6;
            this.chartViewClass = "chartViewClass_6";
            break;
        }
      }

      if (this.fullscreen_table) {
        this.chartViewId = 7;
        this.chartViewClass = "chartViewClass_7";
      }
    }
  },
  watch: {
    lightSwitch(value) {
      //   console.log("chart switch");
      //   console.log(value);
      this.loadChart();
    },
    market_code(value, old) {
      if (old == null) return;
      const params = {
        symbolid: null,
        market_code: value
      };
      this.passTickerToChart(params);
    }
  },
  mounted() {
    if (localStorage.currentMode) {
      this.setLightSwitch(localStorage.currentMode);
    }
    this.loadChart();
  },
  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  },
  methods: {
    ...mapActions({
      setSymbolID: "chart/setSymbolID",
      setLightSwitch: "global/setLightSwitch"
    }),
    loadChart() {
      // listen to ticker toggle
      this.$bus.$on("adjustChartView", data => {
        this.chartView;
        //console.log(this.chartViewId);
        //console.log(this.chartViewClass);
      });
      //! BEWARE: no trailing slash is expected in feed URL
      const widgetOptions = {
        //region overrides
        overrides: {
          "paneProperties.background":
            this.lightSwitch == 0 ? "#f2f2f2" : "#00121e",
          "paneProperties.gridProperties.color":
            this.lightSwitch == 0 ? "#000" : "#bdc3c7",
          "scalesProperties.textColor":
            this.lightSwitch == 0 ? "#000" : "#bdc3c7",
          "scalesProperties.lineColor":
            this.lightSwitch == 0 ? "#000" : "#34495e",
          "scalesProperties.backgroundColor":
            this.lightSwitch == 0 ? "#OOO" : "#2c3e50",
          "paneProperties.vertGridProperties.color":
            this.lightSwitch == 0 ? "#f2f2f2" : "rgba(52, 73, 94, 0)",
          "paneProperties.horzGridProperties.color":
            this.lightSwitch == 0 ? "#f2f2f2" : "rgba(52, 73, 94, 0)",
          "symbolWatermarkProperties.color":
            this.lightSwitch == 0 ? "#OOO" : "#808080",
          "symbolWatermarkProperties.transparency": 90,
          volumePaneSize: "tiny",
          "mainSeriesProperties.showCountdown": true,
          "scalesProperties.showStudyPlotLabels": true
        },
        studies_overrides: {
          "volume.show ma": true
        },
        //endregion overrides

        //region perma static
        disabled_features: ["link_to_tradingview"],
        enabled_features: [
          "narrow_chart_enabled",
          "study_templates",
          "keep_left_toolbar_visible_on_small_screens"
        ],
        toolbar_bg: this.lightSwitch == 0 ? "#F2F2F2" : "#00121e",
        time_frames: [
          { text: "50y", resolution: "D" },
          { text: "20y", resolution: "D" },
          { text: "10y", resolution: "D" },
          { text: "5y", resolution: "D" },
          { text: "4y", resolution: "D" },
          { text: "3y", resolution: "D" },
          { text: "2y", resolution: "D" },
          { text: "1y", resolution: "D" },
          { text: "6m", resolution: "D" },
          { text: "3m", resolution: "D" },
          { text: "2m", resolution: "D" },
          { text: "1m", resolution: "D" },
          { text: "1w", resolution: "30" },
          { text: "3d", resolution: "15" },
          { text: "1d", resolution: "5" }
        ],
        symbol_search_request_delay: 300,
        //endregion perma static

        //region default
        debug: false,
        symbol: this.symbol,
        datafeed: Datafeed,
        interval: this.interval,
        container_id: this.containerId,
        library_path: this.libraryPath,
        locale: this.getLanguageFromURL() || "en",
        charts_storage_url: this.chartsStorageUrl,
        charts_storage_api_version: this.chartsStorageApiVersion,
        client_id: this.clientId,
        user_id: this.userId,
        fullscreen: this.fullscreen,
        autosize: this.autosize,
        //custom_css_url: this.custom_css_url,
        custom_css_url: "tradingview.css",
        timezone: this.timezone,
        theme: this.theme

        //endregion default
      };

      const tvWidget = new window.TradingView.widget(widgetOptions);
      this.widget = this.tvWidget = tvWidget;

      //chart methods
      tvWidget.onChartReady(() => {
        //! region subscribe
        //onHeaderReady event
        //TODO: add custom headers
        tvWidget.headerReady().then(() => {
          /*this.widgetCreateButton(
          "Click to show a notification popup",
          "Setting",
          function() {
            tvWidget.showNoticeDialog({
              title: "Notification",
              body:
                "TradingView Charting Library API works correctly <button>Ticker</button>",
              callback: () => {
                // eslint-disable-next-line no-console
                console.log("Noticed!");
              }
            });
          }
        );*/
        });

        //chart onSymbolChanged event
        const that = this;
        tvWidget
          .chart()
          .onSymbolChanged()
          .subscribe(null, symbolInfo => {
            // console.log(symbolInfo.full_name);
            //that.setSymbolID(symbolInfo.id_str);
            //TODO: call this function ralph, ito yung example nilagay ko lang dito
            //TODO: need mo ipasa yung market_code completo, append mo
            //TODO: <EXCHANGE>:<SYMBOL> or kunin mo sa response -> market_code
            //TODO: author: kbaluyot
            const params = {
              symbolid: symbolInfo.id_str,
              market_code: symbolInfo.full_name
            };
            that.passTickerToChart(params);
          });
        //! endregion subscribe
      });
    },
    getLanguageFromURL() {
      const regex = new RegExp("[\\?&]lang=([^&#]*)");
      const results = regex.exec(window.location.search);
      return results === null
        ? null
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    passTickerToChart(object) {
      if (object && this.tvWidget) {
        //console.log(object);
        if (object.symbolid != null) {
          this.setSymbolID(object.symbolid);
        }
        this.tvWidget.chart().setSymbol(object.market_code);
      }

      return false;
    },
    widgetCreateButton(title, content, callback, options) {
      const button = this.widget.createButton(options);
      button.setAttribute("title", title);
      //button.classList.add('apply-common-tooltip');
      button.addEventListener("click", callback);
      button.innerHTML = content;
    }
  }
};
</script>

<style scoped>
/* .TVChartContainer {
  height: calc(100vh - 152px); 
} */
.chartViewClass_1 {
  /* both open */
  height: calc(100vh - 132px);
}
.chartViewClass_2 {
  /* table only */
  height: calc(100vh - 82px);
}
.chartViewClass_3 {
  /* ticker only */
  height: calc(100vh - 102px);
}
.chartViewClass_4 {
  /* both close */
  height: calc(100vh - 52px);
}

.chartViewClass_5 {
  /* maximize open ticker */
  height: calc(100vh - 402px);
}
.chartViewClass_6 {
  /* maximize close ticker */
  height: calc(100vh - 352px);
}

.chartViewClass_7 {
  /* maximize table */
  height: 0;
}
</style>
