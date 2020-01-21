<template>
  <v-col ref="componentWrapper" class="pa-0" cols="8" sm="8" md="8">
    <v-card-title class="text-left justify-left mx-3 px-0 pb-2 pt-5" :style="borderColor">
      <h6 class="font-weight-regular subtitle-2" :style="{ color: fontColor }">CURRENT ALLOCATION</h6>
      <v-spacer></v-spacer>
      <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-title>
    <v-row no-gutters>
      <v-col class="pa-0 pt-3 pl-5 pr-10" cols="6" sm="6" md="6">
        <v-simple-table id="liveportfolio-table" :dense="true" dark>
          <template v-slot:default>
            <tbody>
              <tr v-for="item in allodata.slice(0, 9)" id="table_tr_snap-cont" :key="item.stocks">
                <v-icon class="pa-1 caption" :style="{ color: item.color }">mdi-circle</v-icon>
                <td
                  class="item_position-prop caption text-capitalize px-1 py-1"
                  :style="{ color: fontColor }"
                >{{ item.stock_id }}</td>
                <td
                  class="item_position-prop caption text-right px-1 py-1"
                  width="75%"
                  :style="{ color: fontColor }"
                >
                  {{
                  item.position
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col class="pa-0 pt-5" cols="6" sm="6" md="6">
        <div class="small">
          <client-only>
            <apexcharts
              width="280"
              height="280"
              type="donut"
              :options="chartOptions"
              :series="series"
            />
          </client-only>
        </div>
      </v-col>
    </v-row>
    <share-modal v-if="showShareForm" :imageid="shareLink" @closeModal="showShareForm = false" />
  </v-col>
</template>

<script>
import shareModal from "~/components/modals/Share";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal
  },
  computed: {
    ...mapGetters({
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      stockList: "global/getStockList",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns font secondary font color
     *
     * @return  {string}  returns string
     */
    fontColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    /**
     * returns border bottom attribute
     *
     * @return  {string}  returns string
     */
    borderColor() {
      return this.lightSwitch == 0
        ? "border-bottom: 1px solid #b6b6b6"
        : "border-bottom: 1px solid #535358";
    }
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showScheduleForm: false,
      isLightMode: 0,
      darkText: "#b6b6b6",
      allodata: [],
      cash: null,
      series: [],
      labelArray: [],
      stockarr: [],
      updateSeries: [],
      chartOptions: {
        labels: [],
        colors: [
          "#1CDECB",
          "#03DAC5",
          "#03C4B1",
          "#02AE9E",
          "#02998A",
          "#028376",
          "#026D63",
          "#01574F",
          "#01413B",
          "#012C27",
          "#001614"
        ],
        legend: {
          show: false
        },
        chart: {},
        stroke: {
          show: false,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1,
          dashArray: 0
        },
        grid: {
          padding: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        value: {
          show: false
        },
        responsive: [
          {
            breakpoint: 450,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "left"
              }
            }
          }
        ],
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            donut: {
              size: "55%",
              background: "transparent",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "12px",
                  color: "",
                  fontFamily: "'Nunito' !important",
                  offsetY: -5
                },
                value: {
                  show: true,
                  fontSize: "12px",
                  color: "",
                  fontFamily: "'Nunito' !important",
                  offsetY: -5,
                  formatter: function(value) {
                    let val = (value / 1).toFixed(2).replace(".", ".");
                    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                },
                total: {
                  show: true,
                  label: "Total Equity",
                  fontSize: "12px",
                  color: "",
                  fontFamily: "'Nunito' !important",
                  formatter: function(value) {
                    const formattedResult = value.globals.seriesTotals.reduce(
                      (a, b) => {
                        let result = a + b;
                        let val = (result / 1).toFixed(2).replace(".", ".");
                        return parseFloat(val.replace(/,/g, ""));
                      },
                      0
                    );
                    return formattedResult
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                }
              }
            }
          }
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          colors: "#00FFC3",
          theme: false,
          style: {
            fontSize: "12px",
            fontFamily: "'Nunito' !important"
          },
          y: {
            show: false,
            formatter: function(value) {
              let val = (value / 1).toFixed(2).replace(".", ".");
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          },
          fixed: {
            enabled: false,
            position: "topRight",
            offsetX: 0,
            offsetY: 0
          }
        },
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 20,
          color: "#fff",
          opacity: 0.9
        }
      }
    };
  },
  watch: {
    /**
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.getAllocations();
    },

    /**
     * Watch renderPortfolioKey vuex if key changed perform function inside
     *
     * @return  {number}  get increment key
     */
    renderPortfolioKey() {
      this.getAllocations();
    },

    /**
     * watch stockList, container of all stock list from vuex state
     *
     * @return  {array}  get all stock list from this state
     */
    stockList() {
      this.getAllocations();
    },

    /**
     * Watch lightSwitch if number changed light=0 dark=1
     *
     * @return  {number}  current number 0/1 for theme mode
     */
    lightSwitch() {
      this.lightSwitcher();
    }
  },
  mounted() {
    this.lightSwitcher();
  },
  methods: {
    /**
     * Capture components then draw to canvas and share
     *
     * @return  {image}  get captured components as canvas
     */
    async showShareModal() {
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    /**
     * Generate array from user allocation with filtered stock
     *
     * @return  {[array]}  updating chart series by this returned data
     */
    getAllocations() {
      this.updateLabels = [];
      if (this.defaultPortfolioId != null) {
        const openparams = {
          fund: this.defaultPortfolioId
        };
        this.$api.journal.portfolio.open(openparams).then(response => {
          this.allodata = response.data.allocations;

          this.chartOptions.labels = ["Cash"];
          for (let i = 1; i < this.allodata.length; i++) {
            const filteredStocks = this.stockList.data.filter(stock => {
              return stock.id_str == this.allodata[i].stock_id;
            });

            this.allodata[i].stock_id = filteredStocks[0].symbol;
            this.allodata[i] = {
              color: this.chartOptions.colors[i],
              ...this.allodata[i]
            };

            this.chartOptions.labels.push(filteredStocks[0].symbol);
          }
          this.chartOptions = {
            ...this.chartOptions,
            ...{
              labels: this.chartOptions.labels
            }
          };

          this.series = [];
          this.updateSeries = [];
          for (let i = 0; i < this.allodata.length; i++) {
            this.updateSeries.push(this.allodata[i].position);

            this.series.push(this.updateSeries[i]);
          }
        });
      }
    },
    /**
     * Light mode and dark on chart
     *
     * @return  {object}  iterate to update chart theme mode
     */
    lightSwitcher() {
      if (this.lightSwitch == 0) {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            theme: {
              mode: "light"
            }
          }
        };
      } else if (this.lightSwitch == 1) {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            theme: {
              mode: "dark"
            }
          }
        };
      }
    }
  }
};
</script>

<style scoped>
.small {
  width: 100%;
}
.theme--dark.v-data-table thead tr:last-child th,
.theme--dark.v-data-table
  tbody
  tr:not(:last-child)
  td:not(.v-data-table__mobile-row) {
  border: none;
}
.item_position-prop {
  color: #b6b6b6;
}
</style>
