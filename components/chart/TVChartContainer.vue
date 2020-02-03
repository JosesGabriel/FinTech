<template>
  <v-content>
    <div :id="containerId" :class="chartViewClass" />
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Datafeed from "~/providers/tradingview/api";
import __customIndicators from "~/static/vendor/charting_library/custom-indicator.js";

export default {
  name: "TVChartContainer",
  props: {
    dataFeed: {},
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
    timezone: {
      default: "Asia/Hong_Kong",
      type: String
    },
    timeFrames: {
      default: () => [
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
      type: Array
    },
    enabledFeatures: {
      default: () => [
        "narrow_chart_enabled",
        "study_templates",
        "keep_left_toolbar_visible_on_small_screens"
      ],
      type: Array
    },
    disabledFeatures: {
      default: () => ["link_to_tradingview"],
      type: Array
    },
    studesOverrides: {
      default: () => ({
        "volume.show ma": true
      })
    }
  },
  data() {
    return {
      first_load: true,
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
      maximizeTable: "chart/getTableMaximize",
      fullscreenTable: "chart/getTableFullscreen",
      lightSwitch: "global/getLightSwitch",
      marketCode: "chart/marketCode"
    }),
    /**
     * Returns the theme depending on the current light switch value.
     *
     * @return  {String}  theme, Light or Dark
     */
    theme() {
      return this.lightSwitch == 0 ? "Light" : "Dark";
    },
    /**
     * Binds chart view classes depending on the current state of the window selector.
     *
     * @return
     */
    chartView() {
      if (this.ticker && this.table) {
        this.chartViewId = 1;
        this.chartViewClass = "chartViewClass_1";
      } else if (!this.ticker && this.table) {
        this.chartViewId = 2;
        this.chartViewClass = "chartViewClass_2";
      } else if (this.ticker && !this.table) {
        this.chartViewId = 3;
        this.chartViewClass = "chartViewClass_3";
      } else if (!this.ticker && !this.table) {
        this.chartViewId = 4;
        this.chartViewClass = "chartViewClass_4";
      }

      if (this.maximizeTable) {
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

      if (this.fullscreenTable) {
        this.chartViewId = 7;
        this.chartViewClass = "chartViewClass_7";
      }
    }
  },
  watch: {
    /**
     * Watch lightSwitch state changes.
     *
     * @param   {String}  value  the theme
     *
     * @return
     */
    lightSwitch(value) {
      if (this.marketCode) {
        this.loadChart(this.marketCode);
      } else {
        this.loadChart(this.symbol);
      }
    },
    /**
     * Watch marketCode state changes
     *
     * @param   {String}  value  from market code
     * @param   {String}  old    to market code
     *
     * @return
     */
    marketCode(value, old) {
      const params = {
        symbolid: null,
        market_code: value
      };

      // wait for chart to load for 1 sec before run the code
      if (this.$route.params.id) {
        setTimeout(() => {
          this.passTickerToChart(params);
          return;
        }, 1000);
      }

      if (this.first_load === false) {
        this.passTickerToChart(params);
      }
      this.first_load = false;
    }
  },
  methods: {
    ...mapActions({
      setSymbolID: "chart/setSymbolID",
      setLightSwitch: "global/setLightSwitch"
    }),
    /**
     * Load tradingview chart properties and options.
     *
     * @return
     */
    loadChart(symbol) {
      this.$bus.$on("adjustChartView", data => {
        this.chartView;
      });

      // NOTE: BEWARE: no trailing slash is expected in feed URL
      const widgetOptions = {
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
        studies_overrides: this.studesOverrides,
        disabled_features: this.disabledFeatures,
        enabled_features: this.enabledFeatures,
        toolbar_bg: this.lightSwitch == 0 ? "#F2F2F2" : "#00121e", // FIXME configs for hex color
        time_frames: this.timeFrames,
        symbol_search_request_delay: 300, // strict delay to avoid API request overload
        debug: false,
        datafeed: this.dataFeed,
        locale: this.getLanguageFromURL() || "en",
        charts_storage_url: this.chartsStorageUrl,
        custom_indicators_getter: PineJS => {
          return Promise.resolve(__customIndicators(PineJS));
        },
        custom_css_url: this.customCssUrl,
        library_path: this.libraryPath,
        symbol: symbol,
        interval: this.interval,
        container_id: this.containerId,
        charts_storage_api_version: this.chartsStorageApiVersion,
        client_id: this.clientId,
        user_id: this.userId,
        fullscreen: this.fullscreen,
        autosize: this.autosize,
        timezone: this.timezone,
        theme: this.theme
      };

      const tvWidget = new window.TradingView.widget(widgetOptions);
      this.widget = this.tvWidget = tvWidget;

      //chart methods
      tvWidget.onChartReady(() => {
        //onHeaderReady event
        //TODO: add custom headers, this is a guide
        tvWidget.headerReady().then(() => {
          this.widgetCreateButton("Support and Resistance", "S&R", function() {
            tvWidget
              .chart()
              .createStudy("Support and Resistance", false, false);
          });
        });

        // chart onSymbolChanged event
        const that = this;
        tvWidget
          .chart()
          .onSymbolChanged()
          .subscribe(null, symbolInfo => {
            const params = {
              symbolid: symbolInfo.id_str,
              market_code: symbolInfo.full_name
            };

            that.passTickerToChart(params);
          });
      });
    },
    /**
     * Get language from URL.
     *
     * @return  {Any}
     */
    getLanguageFromURL() {
      const regex = new RegExp("[\\?&]lang=([^&#]*)");
      const results = regex.exec(window.location.search);
      return results === null
        ? null
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    /**
     * Pass ticker object from outside component to tv chart.
     *
     * @param   {Object}  object  ticker value
     *
     * @return  {Boolean}          operation is success or not
     */
    passTickerToChart(object) {
      if (object && this.tvWidget) {
        if (object.symbolid != null) {
          this.setSymbolID(object.symbolid);
        }
        this.tvWidget.chart().setSymbol(object.market_code);
      }

      return false;
    },
    /**
     * Create a widget button in tradingview
     *
     * @param   {Any}  title
     * @param   {Any}  content
     * @param   {Any}  callback
     * @param   {Any}  options
     *
     * @return  {Any}
     */
    widgetCreateButton(title, content, callback, options) {
      const button = this.widget.createButton(options);
      button.setAttribute("title", title);
      //button.classList.add('apply-common-tooltip');
      button.addEventListener("click", callback);
      button.innerHTML = `<div class="tradingview-custom-btn">${content}</div>`;
    }
  },
  mounted() {
    if (localStorage.currentMode) {
      this.setLightSwitch(localStorage.currentMode);
    }

    this.loadChart(this.symbol);
  },
  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }
};
</script>

<style scoped>
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
