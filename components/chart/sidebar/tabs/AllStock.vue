<template>
  <v-content>
    <div class="sub__title">All Stock</div>
    <v-card
      :dark="lightSwitch == true"
      :color="lightSwitch == false ? 'lightchart' : 'darkchart'"
      :loading="loading"
      class="pl-3 pr-2"
      style="height: calc(100vh - 315px)"
      flat
      tile
    >
      <v-data-table
        :headers="headers"
        :items="stocks"
        class="data_table-container custom_table"
        dense
        :dark="lightSwitch == true"
        fixed-header
        calculate-widths
        disable-pagination
        hide-default-footer
        height="calc(100vh - 315px)"
        :style="{ background: cardbackground }"
      >
        <!-- <template #item.symbol="{item}">
            SYM
        </template> -->
        <template v-slot:item="props">
          <tr
            class="tr_custom"
            :class="[
              { darkmode__text: lightSwitch },
              { lightmode__text: !lightSwitch }
            ]"
            @click="setSymbolID(props.item.stockidstr)"
          >
            <td class="text-left" style="width:40px;">
              <span>{{ props.item.symbol }}</span>
            </td>
            <td class="text-right" style="width:35px">
              <span
                :class="[
                  { increase: props.item.change > 0 },
                  { decrease: props.item.change < 0 },
                  { neutral: props.item.change == 0 }
                ]"
              >
                {{ props.item.last | numeral("0.0a") }}
              </span>
            </td>
            <td class="text-right" style="width:55px">
              <span
                :class="[
                  { increase: props.item.change > 0 },
                  { decrease: props.item.change < 0 },
                  { neutral: props.item.change == 0 }
                ]"
              >
                {{ props.item.changepercentage | numeral("0,0.00") }}
              </span>
            </td>
            <td class="text-right" style="width:60px">
              <span class="text-uppercase">{{
                props.item.value | numeral("0.000a")
              }}</span>
            </td>
            <td class="text-right" style="width:45px">
              <span class="">{{ props.item.trades | numeral("0,0") }}</span>
            </td>
            <td style="width:5px"></td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AllStock",
  data() {
    return {
      stocks: [],
      headers: [
        {
          text: "Symbol",
          value: "symbol",
          class: "text-left"
        },
        { text: "Last", value: "last", class: "text-right" },
        {
          text: "%Change",
          value: "change",
          class: "text-right"
        },
        {
          text: "Value",
          value: "value",
          class: "text-right"
        },
        {
          text: "Trades",
          value: "trades",
          class: "text-right"
        }
      ],
      loading: "#03dac5"
    };
  },
  mounted() {
    this.$api.chart.stocks
      .history({
        exchange: "PSE"
      })
      .then(response => {
        // console.log("all stock");
        // console.log(response.data);
        // this.stocks = response.data
        this.stocks = response.data.filter(data => parseInt(data.value) > 0);
        this.loading = false;
      });
  },
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  methods: {
    ...mapActions({
      setSymbolID: "chart/setSymbolID"
    })
  }
};
</script>

<style scoped>
.tr_custom {
  line-height: 0.1rem !important;
  cursor: pointer;
}
</style>
