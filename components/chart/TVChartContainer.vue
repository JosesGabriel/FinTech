<template>
  <v-content>
    <div :id="containerId" :class="chartViewClass" />
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TVChartContainer",
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
      maximize_table: "chart/getTableMaximize",
      fullscreen_table: "chart/getTableFullscreen"
    }),
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
  mounted() {
    // listen to ticker toggle
    this.$bus.$on("adjustChartView", data => {
      this.chartView;
      //console.log(this.chartViewId);
      //console.log(this.chartViewClass);
    });

    const widgetOptions = {
      symbol: this.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
      interval: this.interval,
      container_id: this.containerId,
      library_path: this.libraryPath,

      locale: this.getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings"],
      //   enabled_features: ["study_templates"],
      studies: ["ACCD@tv-basicstudies", "AROON@tv-basicstudies"],
      charts_storage_url: this.chartsStorageUrl,
      charts_storage_api_version: this.chartsStorageApiVersion,
      client_id: this.clientId,
      user_id: this.userId,
      fullscreen: this.fullscreen,
      autosize: this.autosize,
      studies_overrides: this.studiesOverrides,
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
      toolbar_bg: "#00121e",
      custom_css_url: "~/components/chart/tradingview.css",
      theme: "Dark"
    };

    const tvWidget = new window.TradingView.widget(widgetOptions);
    this.widget = this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        this.widgetCreateButton(
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
        );
      });
    });
  },
  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  },
  methods: {
    widgetCreateButton: function(title, content, callback, options) {
      const button = this.widget.createButton(options);
      button.setAttribute("title", title);
      //button.classList.add('apply-common-tooltip');
      button.addEventListener("click", callback);
      button.innerHTML = content;
    },
    getLanguageFromURL: function() {
      const regex = new RegExp("[\\?&]lang=([^&#]*)");
      const results = regex.exec(window.location.search);
      return results === null
        ? null
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  },
  props: {
    symbol: {
      default: "AAPL",
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
    datafeedUrl: {
      default: "https://demo_feed.tradingview.com",
      type: String
    },
    libraryPath: {
      default: "/vendor/charting_library/",
      type: String
    },
    chartsStorageUrl: {
      default: "https://saveload.tradingview.com",
      type: String
    },
    chartsStorageApiVersion: {
      default: "1.1",
      type: String
    },
    clientId: {
      default: "tradingview.com",
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
    studiesOverrides: {
      type: Object
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
  height: calc(100vh - 152px);
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
