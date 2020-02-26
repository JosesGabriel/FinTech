-<template>
  <v-content>
    <v-row>
      <!-- toggle bid and ask -->
      <v-col class="py-0 mt-0 mb-1">
        <v-content>
          <v-row
            :class="[
              { darkmode__text: lightSwitch == 1 },
              { lightmode__text: lightSwitch == 0 }
            ]"
          >
            <v-col class="col-5 text-right pa-0">
              <span
                :class="{ 'font-weight-bold': !toggleButton }"
                class="overline"
                >Top Five</span
              >
            </v-col>
            <v-col class="col-2 pa-0">
              <v-content>
                <v-switch
                  v-model="toggleButton"
                  class="toggleButton"
                  :color="color"
                  :disabled="disabled"
                ></v-switch>
              </v-content>
            </v-col>
            <v-col class="col-5 text-left pa-0">
              <span
                :class="{ 'font-weight-bold': toggleButton }"
                class="overline"
                >Full Depth</span
              >
            </v-col>
          </v-row>
        </v-content>
        <v-content class="pl-8 pr-7">
          <v-progress-linear
            :indeterminate="progbar.loading"
            :value="progbar.value"
            background-color="error"
            :color="color"
            height="5"
          ></v-progress-linear>
        </v-content>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DepthBar",
  data() {
    return {
      disabled: true,
      toggleButton: false,
      progbar: {
        loading: true,
        value: 100
      },
      topdepth: [],
      fulldepth: []
    };
  },
  computed: {
    ...mapGetters({
      symbolid: "chart/symbolid",
      index: "chart/index",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * toogle color if component is disabled
     *
     * @return  {String}
     */
    color() {
      return this.disabled ? "secondary" : "success";
    }
  },
  watch: {
    /**
     * toggle on/off to switch data
     *
     * @param   {Boolean}  value  true/false
     *
     * @return
     */
    toggleButton(value) {
      if (value == true) {
        this.progbar.value = this.fulldepth;
      } else {
        this.progbar.value = this.topdepth;
      }
    },
    /**
     * everytime symbol id change, run initDepthbar method
     *
     * @param   {String}  symid  symbol id
     *
     * @return
     */
    symbolid(symid) {
      this.initDepthbar(symid);
    }
  },
  mounted() {
    this.initDepthbar(this.symbolid);
  },
  methods: {
    /**
     * initialise and request market depth api
     *
     * @param   {[type]}  symid  [symid description]
     *
     * @return  {[type]}         [return description]
     */
    async initDepthbar(symid) {
      this.progbar.loading = true;
      this.progbar.value = 100;
      this.disabled = true;
      const params = {
        "symbol-id": symid,
        entry: 5
      };

      try {
        // Top Depth
        const topdepth = await this.$api.chart.stocks.topdepth(params);
        this.topdepth = parseFloat(topdepth.data.bid_total_percent).toFixed(2);
        // Full Depth
        const fulldepth = await this.$api.chart.stocks.fulldepth(params);
        this.fulldepth = parseFloat(fulldepth.data.bid_total_percent).toFixed(
          2
        );
        if (this.toggleButton === false) {
          this.progbar.value = this.topdepth;
          this.progbar.loading = false;
        } else {
          this.progbar.value = this.fulldepth;
          this.progbar.loading = false;
        }
        this.disabled = false;
      } catch (error) {
        this.progbar.value = 100;
        this.progbar.loading = false;
        this.disabled = true;
      }
    }
  }
};
</script>

<style scoped>
.overline {
  font-size: 8px !important;
}
.toggleButton {
  transform: scale(0.675);
  position: absolute;
  top: -24px;
  left: 7px;
}
</style>
