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
    },
    theme: {
      default: "Dark",
      type: String
    }
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
      fullscreen_table: "chart/getTableFullscreen"
    })
  },
  mounted() {
    // listen to ticker toggle
    this.$bus.$on("adjustChartView", data => {
      this.chartView;
      console.log(this.chartViewId);
      console.log(this.chartViewClass);
    });

    //! BEWARE: no trailing slash is expected in feed URL
    const widgetOptions = {
      //region overrides
      overrides: {
        "paneProperties.background": "#00121e",
        "paneProperties.gridProperties.color": "#bdc3c7",
        "scalesProperties.textColor": "#bdc3c7",
        "scalesProperties.lineColor": "#34495e",
        "scalesProperties.backgroundColor": "#2c3e50",
        "paneProperties.vertGridProperties.color": "rgba(52, 73, 94, 0)",
        "paneProperties.horzGridProperties.color": "rgba(52, 73, 94, 0)",
        "symbolWatermarkProperties.color": "#808080",
        "symbolWatermarkProperties.transparency": 90,
        volumePaneSize: "tiny",
        "mainSeriesProperties.showCountdown": true,
        "scalesProperties.showStudyPlotLabels": true
      },
      studies_overrides: {
        "volume.show ma": true
      },
      allow_symbol_change: false,
      //endregion overrides
      //region perma static
      disabled_features: [
        "header_fullscreen_button",
        "header_saveload",
        "header_symbol_search",
        "symbol_search_hot_key",
        "header_resolutions",
        "show_interval_dialog_on_key_press",
        "header_compare",
        "display_market_status",
        "symbol_info",
        "link_to_tradingview"
      ],
      enabled_features: [
        "keep_left_toolbar_visible_on_small_screens",
        "move_logo_to_main_pane",
        "cl_feed_return_all_data",
        "same_data_requery",
        "study_templates"
      ],
      toolbar_bg: "#00121e",
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
          that.setSymbolID(symbolInfo.id_str);

          //TODO: call this function ralph, ito yung example nilagay ko lang dito
          //TODO: need mo ipasa yung market_code completo, append mo
          //TODO: <EXCHANGE>:<SYMBOL> or kunin mo sa response -> market_code
          //TODO: author: kbaluyot
          //that.passTickerToChart("PSE:KPPI");
        });
      //! endregion subscribe
      this.tvWidget.chart().setSymbol("PSE:2GO");
    });
  },
  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  },
  methods: {
    ...mapActions({
      setSymbolID: "chart/setSymbolID"
    }),
    getLanguageFromURL() {
      const regex = new RegExp("[\\?&]lang=([^&#]*)");
      const results = regex.exec(window.location.search);
      return results === null
        ? null
        : decodeURIComponent(results[1].replace(/\+/g, " "));
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
  height: calc(100vh - 203px);
}
.chartViewClass_2 {
  /* table only */
  height: calc(100vh - 102px);
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
  height: calc(100vh - 502px);
}
.chartViewClass_6 {
  /* maximize close ticker */
  height: calc(100vh - 452px);
}

.chartViewClass_7 {
  /* maximize table */
  height: 0;
}
</style>
