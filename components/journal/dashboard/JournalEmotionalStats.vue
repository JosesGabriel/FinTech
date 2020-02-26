<template>
  <v-row no-gutters ref="componentWrapper">
    <!-- Don't remove ref value. Used for sharing -->
    <v-col cols="12">
      <v-card-title class="text-left justify-left px-0 pb-2 pt-0" :style="borderColor">
        <span
          class="font-weight-bold subtitle-2"
          :style="{ color: this.lightSwitch == 0 ? 'black' : 'white' }"
        >EMOTIONAL STATISTICS</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
          <v-icon small color="tertiary">mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
    </v-col>
    <v-col class="pa-0" cols="6" sm="6" md="6">
      <div id="chart">
        <client-only>
          <apexcharts
            ref="emotionalStatistics"
            type="bar"
            height="200"
            :options="chartOptions"
            :series="series"
          />
        </client-only>
      </div>
    </v-col>
    <v-col class="pa-0 pt-3" cols="6" sm="6" md="6">
      <v-simple-table :dense="true" :dark="lightSwitch == true" id="liveportfolio-table">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="item_caption text-left px-1">Emotions</th>
              <th class="item_caption text-right px-1">Trade</th>
              <th class="item_caption text-right px-1">Wins</th>
              <th class="item_caption text-right px-1">Losses</th>
              <th class="item_caption text-right px-1">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in emotionalArray" :key="item.name" id="table_tr_port-cont">
              <td class="caption px-1 py-2">{{ item.name }}</td>
              <td class="caption text-right px-1 py-0">{{ item.win + item.loss }}</td>
              <td class="caption text-right px-1 py-0">{{ item.win }}</td>
              <td class="caption text-right px-1 py-0">{{ item.loss }}</td>
              <td
                class="caption text-right px-1 py-0"
              >{{ ((item.win * 100) / (item.win + item.loss)).toFixed(2) }}%</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <share-modal v-if="showShareForm" :imageid="shareLink" @closeModal="showShareForm = false" />
  </v-row>
</template>
<script>
import shareModal from "~/components/modals/Share";
import { mapGetters } from "vuex";

export default {
  components: {
    shareModal
  },
  computed: {
    ...mapGetters({
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      journalCharts: "journal/getJournalCharts",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns secondary font color
     *
     * @return  {string}  returns string
     */
    fontColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    /**
     * returns attribute border bottom
     *
     * @return  {string}  returns string
     */
    borderColor() {
      return this.lightSwitch == 0
        ? "border-bottom: 1px solid #dadada"
        : "border-bottom: 1px solid #172431";
    }
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showScheduleForm: false,
      emotionalArray: [],
      series: [
        {
          name: "Win",
          data: [null, null, null]
        },
        {
          name: "loss",
          data: [null, null, null]
        }
      ],
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "40",
            endingShape: "rounded",
            dropShadow: {
              enabled: true,
              opacity: 0.3,
              blur: 2,
              left: 3,
              top: 10
            }
          }
        },
        chart: {
          toolbar: {
            show: false
          }
        },
        colors: ["#03DAC5", "#F44336"],
        dataLabels: {
          enabled: false,
          offsetX: 0,
          style: {
            fontSize: "12px",
            colors: ["#fff"]
          }
        },
        stroke: {
          show: false,
          colors: ["#fff"]
        },
        grid: {
          show: false,
          borderColor: "#17314B",
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        legend: {
          show: false,
          position: "right"
        },
        xaxis: {
          show: true,
          categories: [" ", " ", " "],
          labels: {
            show: false,
            style: {
              colors: "#b6b6b6",
              fontSize: "12px",
              fontFamily: "'Nunito' !important",
              cssClass: "apexcharts-xaxis-label"
            }
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            align: "left",
            minWidth: 0,
            maxWidth: 160,
            style: {
              color: "#b6b6b6",
              fontSize: "12px",
              fontFamily: "'Nunito' !important",
              cssClass: "apexcharts-yaxis-label"
            }
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        tooltip: {
          y: {
            show: false,
            formatter: function(value) {
              let val = (value / 1).toFixed(2).replace(".", ".");
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          },
          x: {
            show: false
          },
          marker: {
            show: false
          },
          theme: false,
          style: {
            fontFamily: "'Nunito' !important"
          }
        }
      }
    };
  },
  mounted() {
    this.lightSwitcher();
  },
  watch: {
    /**
     * Watch journalCharts vuex if data changed execute function inside
     *
     * @return  {array}  getting buy value data from journalCharts vuex
     */
    journalCharts() {
      this.getEmotionalStats();
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
     * getEmotionalStats update chart series
     *
     * @return  {[array]} updating series with this array
     */
    getEmotionalStats() {
      this.emotionalArray = [];
      if (this.journalCharts != null) {
        const objStrategy = this.journalCharts.data.emotional_statistics;

        let emotionalArray = [];
        if (objStrategy.length != 0) {
          Object.keys(objStrategy).forEach(function(key) {
            emotionalArray.push({ ...objStrategy[key], name: key });
          });
          this.emotionalArray = emotionalArray;
        }

        const winEmotional = [null, null, null, null];
        const lossEmotional = [null, null, null, null];
        const nameEmotional = [" ", " ", " ", " "];

        for (let i = 0; i < this.emotionalArray.length; i++) {
          winEmotional.unshift(this.emotionalArray[i].win);
          lossEmotional.unshift(this.emotionalArray[i].loss);
          nameEmotional.unshift(this.emotionalArray[i].name);
        }

        // load data series on bar graph
        this.$refs.emotionalStatistics.updateSeries([
          {
            data: winEmotional.slice(0, 3)
          },
          {
            data: lossEmotional.slice(0, 3)
          }
        ]);

        // load data names on bar graph
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: {
              categories: [
                ...nameEmotional.slice(0, 3),
                ...this.chartOptions.xaxis.categories
              ].slice(0, 3)
            }
          }
        };
      }
      this.componentKeys++;
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